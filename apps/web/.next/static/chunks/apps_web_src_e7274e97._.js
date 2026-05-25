(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/apps/web/src/lib/api/client.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "authApi": (()=>authApi),
    "automationApi": (()=>automationApi),
    "bopApi": (()=>bopApi),
    "certificatesApi": (()=>certificatesApi),
    "copilotApi": (()=>copilotApi),
    "failuresApi": (()=>failuresApi),
    "fleetApi": (()=>fleetApi),
    "http": (()=>http),
    "maintenanceApi": (()=>maintenanceApi),
    "notificationsApi": (()=>notificationsApi),
    "nptApi": (()=>nptApi),
    "observationsApi": (()=>observationsApi),
    "recommendationsApi": (()=>recommendationsApi),
    "reportsApi": (()=>reportsApi),
    "rigsApi": (()=>rigsApi),
    "rtmApi": (()=>rtmApi),
    "wellsApi": (()=>wellsApi)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const DEV_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlUxc1g0WUZIUzdaNlZsN1ZITEl6VGVqYnZqMCJ9.eyJhdWQiOiI4YjgwNjk4OC00NTg2LTQwNTktYjhjOS0xMzFjZjk5ZWU5NWUiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNTY1YjBjOTYtNGRmMi00YWE3LWFlM2YtODI2YmIxYTlmZDVlL3YyLjAiLCJpYXQiOjE3Nzc1NTQyMzgsIm5iZiI6MTc3NzU1NDIzOCwiZXhwIjoxNzc3NTU5NzcxLCJhaW8iOiJBZVFBRy84YkFBQUE3c01pWDRGZ2diVWtIelNzQTFVRzJSbVdmenVsajBLcG00OGc1Q2xQSmJRL2NlRTB1cXNqU05mbzErUHlDa3JFNHl6V241S0J1ZXNDbDNPZjE0am9wUjZCd0NoNUk0Sm1aWkFvNHFrTTZ6dXhCV3RaU0ZKK245Uk44R2FoSGVsM1FVa280cXpqSEE5VXVmYjBkeU9UU0JsN0xsV0tkMG9rR2c1OWpqaHBmWjhHQllneW9HSDM0MzRRZisvZDBvZ0RFd0JXbEc3Wk52bnkwZ3orakJOTEZXUmtQM0VIc2JoVDhoWFNnOU81MUdmb3AzTTQyN1E5dUlrUHZqN0J3MWZkTHI3UUpoVitVNENLaEtmQlVvWERZbm5Uek5TN2tESElpOFhzQmxTZktscz0iLCJhenAiOiIwNjI2YjlmYi1kZDk5LTQxYTEtOTc4My02YTYxZGU4ZmE4MWMiLCJhenBhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDU4NTkyYWMtNGRjZi00ODU1LTg1ZGMtNGM0ODNiYmM4NzEwLyIsIm5hbWUiOiJBc2hpZiBTYXl5YWQiLCJvaWQiOiI4YjliYTE1Zi04OTExLTRiOGEtOGJjNi1kYzZhYTU1MWQ5MDgiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhc2hpZi5zYXl5YWRAYXF1aWxhLWVuZ2luZWVyLmNvbSIsInJoIjoiMS5BYjBBbGd4YlZ2Sk5wMHF1UDRKcnNhbjlYb2hwZ0l1R1JWbEF1TWtUSFBtZTZWNEFBTmU5QUEuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lkIjoiMDAyMjVjZmEtZDA4NS1kZTQ2LTY3ODEtMTg0OWQzNzQzODQ0Iiwic3ViIjoiVXRJM19jYWNsWHRqc3BXaE9CcE1wTnA1Yks1SXAwRVRJaEcwWXVjUjE4QSIsInRpZCI6IjU2NWIwYzk2LTRkZjItNGFhNy1hZTNmLTgyNmJiMWE5ZmQ1ZSIsInV0aSI6ImZ6TWFEQ3JQQVVhSmM2eTFVSXdEQUEiLCJ2ZXIiOiIyLjAiLCJ4bXNfZnRkIjoieU5SaFZDQVBERUstMnhyMk9pTjNSRzQxZTBEU2xlQUtTcHB3YjFvRkZxRUJkWE5sWVhOMExXUnpiWE0ifQ.TRB6F88aqHugNXZGc10unTxANjb6iC1VhvXXA5goVZ_zVL51uH8Mum31_0z9n4R1uj7g5-FbKKEnLR4OZ5VUOmbtXEvl84Nf-RBvVf_sKSbs54IxmjJsO-ARrCY3PzD1fdV53yutnQdN9GjDfaB9BIDunJZ0Fstekx5gp89NDoZJyJdKauMhdxjopEJ-tyX_TvWWTpwIS0O2RX55iNROsKZnU6Z6Wkwkgya2y6pywevfg-NAMQzi_UjVgBf7SilBXEVtZpAk6beB5nJA-WvYQIPveleDYCv_A_P_BPZuIzE0F-uDrp-GvO80U1M7OnlHAsnQswtSwLqvIF6qwJ-Vlw';
const http = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: ("TURBOPACK compile-time value", "http://localhost:4000") ?? 'http://localhost:4000',
    timeout: 30_000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEV_TOKEN}`
    }
});
// Attach JWT (stored token overrides DEV_TOKEN if present)
http.interceptors.request.use((cfg)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            const { state } = JSON.parse(localStorage.getItem('rigmind-v1') ?? '{}');
            if (state?.token) cfg.headers.Authorization = `Bearer ${state.token}`;
        } catch  {}
    }
    return cfg;
});
// Global 401 → redirect
http.interceptors.response.use((r)=>r, (err)=>{
    if (err.response?.status === 401 && "object" !== 'undefined') {
        window.location.href = '/auth/login';
    }
    return Promise.reject(err);
});
async function get(url, params) {
    const r = await http.get(url, {
        params
    });
    return r.data.data;
}
async function post(url, body = {}) {
    const r = await http.post(url, body);
    return r.data.data;
}
async function put(url, body = {}) {
    const r = await http.put(url, body);
    return r.data.data;
}
async function del(url) {
    const r = await http.delete(url);
    return r.data.data;
}
const authApi = {
    login: (email, password)=>post('/api/v1/auth/login', {
            email,
            password
        }),
    refresh: ()=>post('/api/v1/auth/refresh'),
    logout: ()=>post('/api/v1/auth/logout'),
    me: ()=>get('/api/v1/auth/me')
};
const fleetApi = {
    getMetrics: ()=>get('/api/v1/fleet/health'),
    getGlobalMap: ()=>get('/api/v1/fleet/map'),
    getHealthHistory: (days = 30)=>get('/api/v1/fleet/health-history', {
            days
        }),
    getPredictions: ()=>get('/api/v1/fleet/predictions'),
    getHealthScores: ()=>get('/api/v1/rigs', {
            pageSize: 100
        })
};
const rigsApi = {
    list: (p)=>get('/api/v1/rigs', p),
    get: (id)=>get(`/api/v1/rigs/${id}`),
    create: (b)=>post('/api/v1/rigs', b),
    update: (id, b)=>put(`/api/v1/rigs/${id}`, b),
    getHealthScore: (id)=>get(`/api/v1/rigs/${id}/health`),
    getTimeline: (id, days)=>get(`/api/v1/rigs/${id}/timeline`, {
            days
        }),
    getComponents: (id)=>get(`/api/v1/rigs/${id}/components`)
};
const wellsApi = {
    list: (p)=>get('/api/v1/wells', p),
    get: (id)=>get(`/api/v1/wells/${id}`),
    create: (b)=>post('/api/v1/wells', b),
    update: (id, b)=>put(`/api/v1/wells/${id}`, b)
};
const failuresApi = {
    list: (p)=>get('/api/v1/failures', p),
    get: (id)=>get(`/api/v1/failures/${id}`),
    create: (b)=>post('/api/v1/failures', b),
    update: (id, b)=>put(`/api/v1/failures/${id}`, b),
    delete: (id)=>del(`/api/v1/failures/${id}`),
    getByRig: (rigId, p)=>get(`/api/v1/rigs/${rigId}/failures`, p),
    getSimilar: (id)=>get(`/api/v1/failures/${id}/similar`),
    getRootCause: (id)=>post(`/api/v1/failures/${id}/root-cause`),
    getTimeline: (id)=>get(`/api/v1/failures/${id}/timeline`),
    getStats: (rigId, days)=>get('/api/v1/failures/stats', {
            rigId,
            days
        }),
    addCorrectiveAction: (failureId, b)=>post(`/api/v1/failures/${failureId}/corrective-actions`, b)
};
const maintenanceApi = {
    listDeferred: (p)=>get('/api/v1/maintenance/deferred', p),
    getDeferred: (id)=>get(`/api/v1/maintenance/deferred/${id}`),
    createDeferred: (b)=>post('/api/v1/maintenance/deferred', b),
    updateDeferred: (id, b)=>put(`/api/v1/maintenance/deferred/${id}`, b),
    deleteDeferred: (id)=>del(`/api/v1/maintenance/deferred/${id}`),
    getOverdue: (rigId)=>get('/api/v1/maintenance/overdue', rigId ? {
            rigId
        } : undefined),
    getSchedule: (rigId)=>get(`/api/v1/rigs/${rigId}/maintenance/schedule`)
};
const certificatesApi = {
    list: (p)=>get('/api/v1/certificates', p),
    get: (id)=>get(`/api/v1/certificates/${id}`),
    create: (b)=>post('/api/v1/certificates', b),
    update: (id, b)=>put(`/api/v1/certificates/${id}`, b),
    delete: (id)=>del(`/api/v1/certificates/${id}`),
    getExpiringSoon: (days)=>get('/api/v1/certificates/expiring', {
            days: days ?? 60
        })
};
const nptApi = {
    list: (p)=>get('/api/v1/npt', p),
    getSummary: (p)=>get('/api/v1/npt/summary', p),
    getTrend: (rigId, months)=>get('/api/v1/npt/trend', {
            rigId,
            months
        }),
    getByCategory: ()=>get('/api/v1/npt/by-category')
};
const observationsApi = {
    list: (p)=>get('/api/v1/observations', p),
    get: (id)=>get(`/api/v1/observations/${id}`),
    create: (b)=>post('/api/v1/observations', b),
    update: (id, b)=>put(`/api/v1/observations/${id}`, b),
    delete: (id)=>del(`/api/v1/observations/${id}`)
};
const recommendationsApi = {
    list: (p)=>get('/api/v1/recommendations', p),
    getAll: (p)=>get('/api/v1/recommendations', p),
    get: (id)=>get(`/api/v1/recommendations/${id}`),
    markCommunicated: (id)=>put(`/api/v1/recommendations/${id}/communicate`),
    updateStatus: (id, status)=>put(`/api/v1/recommendations/${id}/status`, {
            status
        }),
    getStats: ()=>get('/api/v1/recommendations/stats')
};
const bopApi = {
    getEvents: (rigId, p)=>get(`/api/v1/rigs/${rigId}/bop-events`, p),
    getChanges: (bopId)=>get(`/api/v1/bops/${bopId}/changes`),
    getAssignments: (rigId)=>get(`/api/v1/rigs/${rigId}/bop-assignments`)
};
const rtmApi = {
    getEvents: (rigId, p)=>get(`/api/v1/rigs/${rigId}/rtm-events`, p),
    getAlarmConfigs: (rigId)=>get(`/api/v1/rigs/${rigId}/alarm-configs`),
    getSensorData: (rigId, param, hours)=>get(`/api/v1/rigs/${rigId}/sensors/${param}`, {
            hours
        }),
    acknowledgeEvent: (id)=>put(`/api/v1/rtm-events/${id}/acknowledge`)
};
const copilotApi = {
    ask: (question, history)=>post('/api/v1/copilot/ask', {
            question,
            history
        }),
    generateReport: (rigId, type)=>post('/api/v1/copilot/report', {
            rigId,
            type
        }),
    getRca: (failureId)=>post(`/api/v1/copilot/rca/${failureId}`),
    getPrediction: (rigId)=>post('/api/v1/copilot/predict', {
            rigId
        })
};
const notificationsApi = {
    list: ()=>get('/api/v1/notifications'),
    markRead: (id)=>put(`/api/v1/notifications/${id}/read`),
    markAllRead: ()=>put('/api/v1/notifications/read-all')
};
const reportsApi = {
    generate: (rigId, type, dateRange)=>post('/api/v1/reports/generate', {
            rigId,
            type,
            dateRange
        }),
    list: ()=>get('/api/v1/reports'),
    download: (id)=>`${"TURBOPACK compile-time value", "http://localhost:4000"}/api/v1/reports/${id}/download`
};
const automationApi = {
    getWorkflows: ()=>get('/api/v1/automation/workflows'),
    toggleWorkflow: (id, active)=>put(`/api/v1/automation/workflows/${id}`, {
            active
        }),
    triggerWorkflow: (id)=>post(`/api/v1/automation/workflows/${id}/trigger`)
};
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/app/dashboard/maintenance/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MaintenancePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function MaintenancePage() {
    _s();
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { data: statsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'maintenance-stats'
        ],
        queryFn: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maintenanceApi"].getStats
    });
    const { data: listData, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'maintenance-deferred',
            page
        ],
        queryFn: {
            "MaintenancePage.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maintenanceApi"].getDeferredTasks({
                    page,
                    limit: 25
                })
        }["MaintenancePage.useQuery"],
        keepPreviousData: true
    });
    const closeMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "MaintenancePage.useMutation[closeMutation]": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maintenanceApi"].closeDeferredTask(id)
        }["MaintenancePage.useMutation[closeMutation]"],
        onSuccess: {
            "MaintenancePage.useMutation[closeMutation]": ()=>qc.invalidateQueries({
                    queryKey: [
                        'maintenance-deferred'
                    ]
                })
        }["MaintenancePage.useMutation[closeMutation]"]
    });
    const tasks = listData?.data?.items ?? [];
    const total = listData?.data?.total ?? 0;
    const pages = listData?.data?.pages ?? 1;
    const stats = statsData?.data;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-white",
                        children: "Maintenance"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-surface-400 text-sm mt-1",
                        children: "Deferred tasks & component maintenance history"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 lg:grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-surface-800/60 border border-surface-700/60 rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        className: "w-4 h-4 text-amber-400"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                        lineNumber: 40,
                                        columnNumber: 57
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-surface-400",
                                        children: "Total Deferred"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                        lineNumber: 40,
                                        columnNumber: 109
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold text-amber-400",
                                children: stats?.totalDeferred ?? '—'
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    (stats?.byRig ?? []).slice(0, 2).map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-surface-800/60 border border-surface-700/60 rounded-xl p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-surface-400 mb-1 truncate",
                                    children: [
                                        "Rig #",
                                        r.rigId
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl font-bold text-white",
                                    children: r._count?.id
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-surface-500",
                                    children: "deferred tasks"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, r.rigId, true, {
                            fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-surface-800/60 border border-surface-700/60 rounded-xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b border-surface-700/60",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm font-semibold text-white",
                            children: [
                                "Deferred Maintenance Tasks (",
                                total,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "text-xs text-surface-400 uppercase tracking-wide",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left px-4 py-3",
                                            children: "ID"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                            lineNumber: 60,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left px-4 py-3",
                                            children: "Rig"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                            lineNumber: 61,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left px-4 py-3",
                                            children: "Issue Type"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left px-4 py-3",
                                            children: "Issue ID"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left px-4 py-3",
                                            children: "Deferred"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "divide-y divide-surface-700/40",
                                children: isLoading ? Array.from({
                                    length: 6
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: Array.from({
                                            length: 6
                                        }).map((_, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-4 bg-surface-700/50 rounded animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 144
                                                }, this)
                                            }, j, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                                lineNumber: 70,
                                                columnNumber: 110
                                            }, this))
                                    }, i, false, {
                                        fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                        lineNumber: 70,
                                        columnNumber: 57
                                    }, this)) : tasks.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "hover:bg-surface-700/20 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-xs text-surface-500 font-mono",
                                                children: [
                                                    "#",
                                                    t.id
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                                lineNumber: 73,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-sm text-surface-200",
                                                children: t.rigs?.name ?? '—'
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                                lineNumber: 74,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-xs text-surface-400",
                                                children: t.issueType
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                                lineNumber: 75,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-xs text-surface-400 font-mono",
                                                children: [
                                                    "#",
                                                    t.issueId
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                                lineNumber: 76,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-xs text-surface-400",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeAgo"])(t.createdAt)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                                lineNumber: 77,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>closeMutation.mutate(t.id),
                                                    disabled: closeMutation.isPending,
                                                    className: "flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors disabled:opacity-40",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                                            lineNumber: 84,
                                                            columnNumber: 25
                                                        }, this),
                                                        " Close"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                                lineNumber: 78,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, t.id, true, {
                                        fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-4 py-3 border-t border-surface-700/40",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-surface-400",
                                children: [
                                    "Page ",
                                    page,
                                    "/",
                                    pages
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPage((p)=>Math.max(1, p - 1)),
                                        disabled: page === 1,
                                        className: "px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 text-white",
                                        children: "Prev"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPage((p)=>Math.min(pages, p + 1)),
                                        disabled: page === pages,
                                        className: "px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 text-white",
                                        children: "Next"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/app/dashboard/maintenance/page.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(MaintenancePage, "GAKcvRR45ymhcYoMLsqIQcVTgDQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c = MaintenancePage;
var _c;
__turbopack_context__.k.register(_c, "MaintenancePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=apps_web_src_e7274e97._.js.map