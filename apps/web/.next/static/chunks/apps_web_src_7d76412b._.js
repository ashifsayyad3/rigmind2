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
const http = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
    timeout: 30_000,
    headers: {
        'Content-Type': 'application/json'
    }
});
// Attach JWT
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
    login: (email, password)=>post('/api/auth/login', {
            email,
            password
        }),
    refresh: ()=>post('/api/auth/refresh'),
    logout: ()=>post('/api/auth/logout'),
    me: ()=>get('/api/auth/me')
};
const fleetApi = {
    getMetrics: ()=>get('/api/fleet/health'),
    getGlobalMap: ()=>get('/api/fleet/map'),
    getHealthHistory: (days = 30)=>get('/api/fleet/health-history', {
            days
        }),
    getPredictions: ()=>get('/api/fleet/predictions'),
    getHealthScores: ()=>get('/api/rigs', {
            pageSize: 100
        })
};
const rigsApi = {
    list: (p)=>get('/api/rigs', p),
    get: (id)=>get(`/api/rigs/${id}`),
    create: (b)=>post('/api/rigs', b),
    update: (id, b)=>put(`/api/rigs/${id}`, b),
    getHealthScore: (id)=>get(`/api/rigs/${id}/health`),
    getTimeline: (id, days)=>get(`/api/rigs/${id}/timeline`, {
            days
        }),
    getComponents: (id)=>get(`/api/rigs/${id}/components`)
};
const wellsApi = {
    list: (p)=>get('/api/wells', p),
    get: (id)=>get(`/api/wells/${id}`),
    create: (b)=>post('/api/wells', b),
    update: (id, b)=>put(`/api/wells/${id}`, b)
};
const failuresApi = {
    list: (p)=>get('/api/failures', p),
    get: (id)=>get(`/api/failures/${id}`),
    create: (b)=>post('/api/failures', b),
    update: (id, b)=>put(`/api/failures/${id}`, b),
    delete: (id)=>del(`/api/failures/${id}`),
    getByRig: (rigId, p)=>get(`/api/rigs/${rigId}/failures`, p),
    getSimilar: (id)=>get(`/api/failures/${id}/similar`),
    getRootCause: (id)=>post(`/api/failures/${id}/root-cause`),
    getTimeline: (id)=>get(`/api/failures/${id}/timeline`),
    getStats: (rigId, days)=>get('/api/failures/stats', {
            rigId,
            days
        }),
    addCorrectiveAction: (failureId, b)=>post(`/api/failures/${failureId}/corrective-actions`, b)
};
const maintenanceApi = {
    listDeferred: (p)=>get('/api/maintenance/deferred', p),
    getDeferred: (id)=>get(`/api/maintenance/deferred/${id}`),
    createDeferred: (b)=>post('/api/maintenance/deferred', b),
    updateDeferred: (id, b)=>put(`/api/maintenance/deferred/${id}`, b),
    deleteDeferred: (id)=>del(`/api/maintenance/deferred/${id}`),
    getOverdue: (rigId)=>get('/api/maintenance/overdue', rigId ? {
            rigId
        } : undefined),
    getSchedule: (rigId)=>get(`/api/rigs/${rigId}/maintenance/schedule`)
};
const certificatesApi = {
    list: (p)=>get('/api/certificates', p),
    get: (id)=>get(`/api/certificates/${id}`),
    create: (b)=>post('/api/certificates', b),
    update: (id, b)=>put(`/api/certificates/${id}`, b),
    delete: (id)=>del(`/api/certificates/${id}`),
    getExpiringSoon: (days)=>get('/api/certificates/expiring', {
            days: days ?? 60
        })
};
const nptApi = {
    list: (p)=>get('/api/npt', p),
    getSummary: (p)=>get('/api/npt/summary', p),
    getTrend: (rigId, months)=>get('/api/npt/trend', {
            rigId,
            months
        }),
    getByCategory: ()=>get('/api/npt/by-category')
};
const observationsApi = {
    list: (p)=>get('/api/observations', p),
    get: (id)=>get(`/api/observations/${id}`),
    create: (b)=>post('/api/observations', b),
    update: (id, b)=>put(`/api/observations/${id}`, b),
    delete: (id)=>del(`/api/observations/${id}`)
};
const recommendationsApi = {
    list: (p)=>get('/api/recommendations', p),
    getAll: (p)=>get('/api/recommendations', p),
    get: (id)=>get(`/api/recommendations/${id}`),
    markCommunicated: (id)=>put(`/api/recommendations/${id}/communicate`),
    updateStatus: (id, status)=>put(`/api/recommendations/${id}/status`, {
            status
        }),
    getStats: ()=>get('/api/recommendations/stats')
};
const bopApi = {
    getEvents: (rigId, p)=>get(`/api/rigs/${rigId}/bop-events`, p),
    getChanges: (bopId)=>get(`/api/bops/${bopId}/changes`),
    getAssignments: (rigId)=>get(`/api/rigs/${rigId}/bop-assignments`)
};
const rtmApi = {
    getEvents: (rigId, p)=>get(`/api/rigs/${rigId}/rtm-events`, p),
    getAlarmConfigs: (rigId)=>get(`/api/rigs/${rigId}/alarm-configs`),
    getSensorData: (rigId, param, hours)=>get(`/api/rigs/${rigId}/sensors/${param}`, {
            hours
        }),
    acknowledgeEvent: (id)=>put(`/api/rtm-events/${id}/acknowledge`)
};
const copilotApi = {
    ask: (question, history)=>post('/api/copilot/ask', {
            question,
            history
        }),
    generateReport: (rigId, type)=>post('/api/copilot/report', {
            rigId,
            type
        }),
    getRca: (failureId)=>post(`/api/copilot/rca/${failureId}`),
    getPrediction: (rigId)=>post('/api/copilot/predict', {
            rigId
        })
};
const notificationsApi = {
    list: ()=>get('/api/notifications'),
    markRead: (id)=>put(`/api/notifications/${id}/read`),
    markAllRead: ()=>put('/api/notifications/read-all')
};
const reportsApi = {
    generate: (rigId, type, dateRange)=>post('/api/reports/generate', {
            rigId,
            type,
            dateRange
        }),
    list: ()=>get('/api/reports'),
    download: (id)=>`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL}/api/reports/${id}/download`
};
const automationApi = {
    getWorkflows: ()=>get('/api/automation/workflows'),
    toggleWorkflow: (id, active)=>put(`/api/automation/workflows/${id}`, {
            active
        }),
    triggerWorkflow: (id)=>post(`/api/automation/workflows/${id}/trigger`)
};
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/app/dashboard/recommendations/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>RecommendationsPage)
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
function PriorityBadge({ priority }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-2 py-0.5 rounded text-xs uppercase font-semibold', priority === 'critical' ? 'bg-red-500/15 text-red-400' : priority === 'high' ? 'bg-orange-500/15 text-orange-400' : priority === 'medium' ? 'bg-amber-500/15 text-amber-400' : 'bg-green-500/15 text-green-400'),
        children: priority ?? '—'
    }, void 0, false, {
        fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = PriorityBadge;
function RecommendationsPage() {
    _s();
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [priority, setPriority] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { data, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'recommendations',
            {
                priority,
                page
            }
        ],
        queryFn: {
            "RecommendationsPage.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recommendationsApi"].getAll({
                    priority,
                    page,
                    limit: 25
                })
        }["RecommendationsPage.useQuery"],
        keepPreviousData: true
    });
    const { data: statsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'rec-stats'
        ],
        queryFn: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recommendationsApi"].getStats
    });
    const statusMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "RecommendationsPage.useMutation[statusMutation]": ({ id, status })=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recommendationsApi"].updateStatus(id, status)
        }["RecommendationsPage.useMutation[statusMutation]"],
        onSuccess: {
            "RecommendationsPage.useMutation[statusMutation]": ()=>qc.invalidateQueries({
                    queryKey: [
                        'recommendations'
                    ]
                })
        }["RecommendationsPage.useMutation[statusMutation]"]
    });
    const items = data?.data?.items ?? [];
    const total = data?.data?.total ?? 0;
    const pages = data?.data?.pages ?? 1;
    const stats = statsData?.data;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-white",
                        children: "RCM Recommendations"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-surface-400 text-sm mt-1",
                        children: [
                            total,
                            " recommendations tracked"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            stats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
                children: [
                    {
                        label: 'Total',
                        value: stats.total,
                        color: 'text-white'
                    },
                    {
                        label: 'Overdue',
                        value: stats.overdue,
                        color: 'text-red-400',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
                    },
                    {
                        label: 'Open',
                        value: stats.byStatus?.find((s)=>s.status === 'open')?._count?.id ?? 0,
                        color: 'text-blue-400'
                    },
                    {
                        label: 'Closed',
                        value: stats.byStatus?.find((s)=>s.status === 'closed')?._count?.id ?? 0,
                        color: 'text-green-400'
                    }
                ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-surface-800/60 border border-surface-700/60 rounded-xl p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-surface-400 mb-1",
                                children: s.label
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-xl font-bold', s.color),
                                children: s.value ?? '—'
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this)
                        ]
                    }, s.label, true, {
                        fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                        lineNumber: 60,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    '',
                    'critical',
                    'high',
                    'medium',
                    'low'
                ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setPriority(p);
                            setPage(1);
                        },
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-3 py-1.5 text-xs rounded-lg border transition-all capitalize', priority === p ? 'bg-brand-500/20 border-brand-500/40 text-brand-300' : 'border-surface-700 text-surface-400'),
                        children: p || 'All'
                    }, p, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-surface-800/60 border border-surface-700/60 rounded-xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "text-xs text-surface-400 uppercase tracking-wide border-b border-surface-700/60",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left px-4 py-3",
                                            children: "Priority"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                            lineNumber: 83,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left px-4 py-3",
                                            children: "Description"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                            lineNumber: 84,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left px-4 py-3",
                                            children: "Rig"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left px-4 py-3",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left px-4 py-3",
                                            children: "Due"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                            lineNumber: 87,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "divide-y divide-surface-700/40",
                                children: isLoading ? Array.from({
                                    length: 8
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: Array.from({
                                            length: 6
                                        }).map((_, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-4 bg-surface-700/50 rounded animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 144
                                                }, this)
                                            }, j, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                                lineNumber: 93,
                                                columnNumber: 110
                                            }, this))
                                    }, i, false, {
                                        fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                        lineNumber: 93,
                                        columnNumber: 57
                                    }, this)) : items.map((rec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "hover:bg-surface-700/20 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PriorityBadge, {
                                                    priority: rec.priority
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 47
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                                lineNumber: 96,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 max-w-xs",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-surface-200 truncate",
                                                    children: rec.description
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 56
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                                lineNumber: 97,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-sm text-surface-300",
                                                children: rec.rcmReports?.rigs?.name ?? '—'
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                                lineNumber: 98,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-xs capitalize', rec.status === 'closed' ? 'text-green-400' : rec.status === 'open' ? 'text-blue-400' : 'text-amber-400'),
                                                    children: rec.status
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                                lineNumber: 99,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-xs text-surface-400",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(rec.dueDate)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                                lineNumber: 102,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3",
                                                children: rec.status !== 'closed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>statusMutation.mutate({
                                                            id: rec.id,
                                                            status: 'closed'
                                                        }),
                                                    className: "flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                                            lineNumber: 109,
                                                            columnNumber: 27
                                                        }, this),
                                                        " Close"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                                lineNumber: 103,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, rec.id, true, {
                                        fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                        lineNumber: 80,
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
                                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                lineNumber: 118,
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
                                        fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPage((p)=>Math.min(pages, p + 1)),
                                        disabled: page === pages,
                                        className: "px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 text-white",
                                        children: "Next"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/app/dashboard/recommendations/page.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(RecommendationsPage, "JSIkRFQvr7t56TRkbc1ukPbaFnM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c1 = RecommendationsPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "PriorityBadge");
__turbopack_context__.k.register(_c1, "RecommendationsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=apps_web_src_7d76412b._.js.map