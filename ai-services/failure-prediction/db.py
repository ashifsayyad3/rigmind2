"""Azure SQL connection for AI services using pyodbc."""

import os
import pyodbc
import structlog

logger = structlog.get_logger()

_conn = None


async def get_db_connection():
    global _conn
    if _conn is None:
        conn_str = os.getenv("DATABASE_URL", "")
        # Convert sqlserver:// URL to ODBC connection string
        if conn_str.startswith("sqlserver://"):
            _conn = pyodbc.connect(
                "DRIVER={ODBC Driver 18 for SQL Server};" +
                conn_str.replace("sqlserver://", "Server=").replace("?", ";") +
                ";TrustServerCertificate=yes;"
            )
        else:
            _conn = pyodbc.connect(conn_str)
        logger.info("Database connection established")
    return _conn
