terraform {
  required_version = ">= 1.7.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.48"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rigmind-infra-rg"
    storage_account_name = "rigmindtfstate"
    container_name       = "tfstate"
    key                  = "rigmind.terraform.tfstate"
  }
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy    = false
      recover_soft_deleted_key_vaults = true
    }
  }
  subscription_id = var.subscription_id
}

# ── Variables ──────────────────────────────────────────────────────────────
variable "subscription_id" { type = string }
variable "location" { type = string; default = "East US 2" }
variable "environment" { type = string; default = "production" }
variable "project" { type = string; default = "rigmind" }
variable "sql_admin_username" { type = string; sensitive = true }
variable "sql_admin_password" { type = string; sensitive = true }
variable "jwt_secret" { type = string; sensitive = true }
variable "anthropic_api_key" { type = string; sensitive = true }

locals {
  prefix = "${var.project}-${var.environment}"
  tags = {
    Project     = var.project
    Environment = var.environment
    ManagedBy   = "Terraform"
    Owner       = "Aquila Engineering"
  }
}

# ── Resource Group ────────────────────────────────────────────────────────
resource "azurerm_resource_group" "main" {
  name     = "${local.prefix}-rg"
  location = var.location
  tags     = local.tags
}

# ── AKS Cluster ───────────────────────────────────────────────────────────
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "${local.prefix}-aks"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = local.prefix
  kubernetes_version  = "1.29"
  tags                = local.tags

  default_node_pool {
    name                = "system"
    node_count          = 2
    vm_size             = "Standard_D4s_v5"
    os_disk_size_gb     = 128
    type                = "VirtualMachineScaleSets"
    enable_auto_scaling = true
    min_count           = 2
    max_count           = 6
    zones               = ["1", "2", "3"]
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin    = "azure"
    load_balancer_sku = "standard"
    outbound_type     = "loadBalancer"
  }

  oms_agent {
    log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id
  }

  azure_active_directory_role_based_access_control {
    managed            = true
    azure_rbac_enabled = true
  }
}

# User node pool for application workloads
resource "azurerm_kubernetes_cluster_node_pool" "app" {
  name                  = "app"
  kubernetes_cluster_id = azurerm_kubernetes_cluster.aks.id
  vm_size               = "Standard_D4s_v5"
  node_count            = 3
  enable_auto_scaling   = true
  min_count             = 2
  max_count             = 10
  zones                 = ["1", "2", "3"]
  node_labels           = { "workload" = "app" }
  node_taints           = []
}

# ── Azure Container Registry ───────────────────────────────────────────────
resource "azurerm_container_registry" "acr" {
  name                = replace("${local.prefix}acr", "-", "")
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Premium"
  admin_enabled       = false
  tags                = local.tags

  georeplications {
    location                = "West US 2"
    zone_redundancy_enabled = true
  }
}

# Grant AKS pull access to ACR
resource "azurerm_role_assignment" "aks_acr" {
  principal_id                     = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.acr.id
  skip_service_principal_aad_check = true
}

# ── Azure SQL Database ─────────────────────────────────────────────────────
resource "azurerm_mssql_server" "sql" {
  name                         = "${local.prefix}-sql"
  resource_group_name          = azurerm_resource_group.main.name
  location                     = azurerm_resource_group.main.location
  version                      = "12.0"
  administrator_login          = var.sql_admin_username
  administrator_login_password = var.sql_admin_password
  minimum_tls_version          = "1.2"
  tags                         = local.tags

  azuread_administrator {
    login_username = "rigmind-db-admins"
    object_id      = data.azuread_group.db_admins.object_id
  }
}

resource "azurerm_mssql_database" "prod" {
  name                        = "prod"
  server_id                   = azurerm_mssql_server.sql.id
  sku_name                    = "S3"
  max_size_gb                 = 250
  zone_redundant              = true
  geo_backup_enabled          = true
  ledger_enabled              = false
  auto_pause_delay_in_minutes = -1 # disabled
  tags                        = local.tags
}

resource "azurerm_mssql_firewall_rule" "azure_services" {
  name             = "AllowAzureServices"
  server_id        = azurerm_mssql_server.sql.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# ── Redis Cache ────────────────────────────────────────────────────────────
resource "azurerm_redis_cache" "cache" {
  name                = "${local.prefix}-redis"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  capacity            = 2
  family              = "C"
  sku_name            = "Standard"
  enable_non_ssl_port = false
  minimum_tls_version = "1.2"
  tags                = local.tags

  redis_configuration {
    maxmemory_reserved = 256
    maxmemory_delta    = 256
    maxmemory_policy   = "allkeys-lru"
  }
}

# ── Azure Service Bus ──────────────────────────────────────────────────────
resource "azurerm_servicebus_namespace" "sb" {
  name                = "${local.prefix}-sb"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "Standard"
  tags                = local.tags
}

resource "azurerm_servicebus_queue" "failure_events" {
  name         = "failure-events"
  namespace_id = azurerm_servicebus_namespace.sb.id
  max_size_in_megabytes    = 1024
  default_message_ttl      = "P14D"
  lock_duration            = "PT5M"
  dead_lettering_on_message_expiration = true
}

resource "azurerm_servicebus_queue" "cert_expiry" {
  name         = "cert-expiry-notifications"
  namespace_id = azurerm_servicebus_namespace.sb.id
  max_size_in_megabytes = 1024
  default_message_ttl   = "P7D"
}

# ── Key Vault ─────────────────────────────────────────────────────────────
data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "kv" {
  name                        = "${local.prefix}-kv"
  location                    = azurerm_resource_group.main.location
  resource_group_name         = azurerm_resource_group.main.name
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  sku_name                    = "standard"
  soft_delete_retention_days  = 90
  purge_protection_enabled    = true
  enable_rbac_authorization   = true
  tags                        = local.tags
}

resource "azurerm_key_vault_secret" "jwt_secret" {
  name         = "jwt-secret"
  value        = var.jwt_secret
  key_vault_id = azurerm_key_vault.kv.id
}

resource "azurerm_key_vault_secret" "anthropic_key" {
  name         = "anthropic-api-key"
  value        = var.anthropic_api_key
  key_vault_id = azurerm_key_vault.kv.id
}

resource "azurerm_key_vault_secret" "db_connection" {
  name         = "database-url"
  value        = "sqlserver://${azurerm_mssql_server.sql.fully_qualified_domain_name};database=prod;user=${var.sql_admin_username};password=${var.sql_admin_password}"
  key_vault_id = azurerm_key_vault.kv.id
}

# ── Log Analytics + App Insights ──────────────────────────────────────────
resource "azurerm_log_analytics_workspace" "main" {
  name                = "${local.prefix}-logs"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "PerGB2018"
  retention_in_days   = 90
  tags                = local.tags
}

resource "azurerm_application_insights" "appinsights" {
  name                = "${local.prefix}-appinsights"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  workspace_id        = azurerm_log_analytics_workspace.main.id
  application_type    = "web"
  tags                = local.tags
}

# ── Blob Storage ───────────────────────────────────────────────────────────
resource "azurerm_storage_account" "blobs" {
  name                     = replace("${local.prefix}blobs", "-", "")
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
  min_tls_version          = "TLS1_2"
  tags                     = local.tags
}

resource "azurerm_storage_container" "attachments" {
  name                  = "attachments"
  storage_account_name  = azurerm_storage_account.blobs.name
  container_access_type = "private"
}

# ── Outputs ───────────────────────────────────────────────────────────────
output "aks_cluster_name" { value = azurerm_kubernetes_cluster.aks.name }
output "acr_login_server" { value = azurerm_container_registry.acr.login_server }
output "sql_server_fqdn" { value = azurerm_mssql_server.sql.fully_qualified_domain_name }
output "redis_hostname" { value = azurerm_redis_cache.cache.hostname; sensitive = true }
output "key_vault_uri" { value = azurerm_key_vault.kv.vault_uri }
output "app_insights_key" { value = azurerm_application_insights.appinsights.instrumentation_key; sensitive = true }

data "azuread_group" "db_admins" {
  display_name     = "RigMind-DB-Admins"
  security_enabled = true
}
