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
    getPredictions: ()=>get('/api/fleet/predictions')
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
    get: (id)=>get(`/api/recommendations/${id}`),
    markCommunicated: (id)=>put(`/api/recommendations/${id}/communicate`)
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
"[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "FleetHealthBanner": (()=>FleetHealthBanner)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils/index.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function FleetHealthBanner() {
    _s();
    const { data, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'fleet',
            'health'
        ],
        queryFn: {
            "FleetHealthBanner.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fleetApi"].getMetrics()
        }["FleetHealthBanner.useQuery"],
        refetchInterval: 60_000
    });
    const score = data?.avgHealthScore ?? 0;
    const pct = score / 100 * 251.2 // circumference of r=40 circle
    ;
    const ringColor = score >= 80 ? '#00e676' : score >= 60 ? '#ffab40' : '#ff1744';
    const label = score >= 80 ? 'Fleet Healthy' : score >= 60 ? 'Attention Required' : 'Critical State';
    if (isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass h-[88px] rounded-xl animate-pulse"
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
        lineNumber: 21,
        columnNumber: 25
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass rounded-xl px-5 py-4 flex items-center justify-between gap-6 flex-wrap",
        style: {
            borderColor: `${ringColor}30`,
            boxShadow: `0 0 25px ${ringColor}12`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-16 h-16 flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 100 100",
                                className: "w-full h-full -rotate-90",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "50",
                                        cy: "50",
                                        r: "40",
                                        fill: "none",
                                        stroke: "rgba(255,255,255,0.06)",
                                        strokeWidth: "8"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                                        lineNumber: 30,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "50",
                                        cy: "50",
                                        r: "40",
                                        fill: "none",
                                        stroke: ringColor,
                                        strokeWidth: "8",
                                        strokeDasharray: `${pct} 251.2`,
                                        strokeLinecap: "round",
                                        style: {
                                            filter: `drop-shadow(0 0 6px ${ringColor})`,
                                            transition: 'stroke-dasharray 1s ease-out'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                                        lineNumber: 31,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[15px] font-bold tabular-nums",
                                    style: {
                                        color: ringColor
                                    },
                                    children: Math.round(score)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-surface-500 uppercase tracking-widest mb-0.5",
                                children: "Fleet Health Score"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-lg font-bold text-white",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] text-surface-500 mt-0.5 mono",
                                children: [
                                    "Reliability Index: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-brand-400",
                                        children: [
                                            ((data?.reliabilityIndex ?? 0) * 100).toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                                        lineNumber: 43,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-5 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Total Rigs",
                        value: data?.totalRigs ?? 0
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Active",
                        value: data?.activeRigs ?? 0,
                        color: "text-green-400"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Critical",
                        value: data?.criticalRigs ?? 0,
                        color: "text-red-400"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Open Failures",
                        value: data?.totalOpenFailures ?? 0,
                        color: "text-orange-400"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "NPT (30d)",
                        value: `${(data?.totalNptHours30d ?? 0).toFixed(0)}h`,
                        color: "text-amber-400"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Est. NPT Cost",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nptCostEstimate"])(data?.totalNptHours30d ?? 0)),
                        color: "text-red-400"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Certs Expiring",
                        value: data?.certificatesExpiringSoon ?? 0,
                        color: "text-purple-400"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Overdue Maint.",
                        value: data?.overdueMaintenanceTasks ?? 0,
                        color: "text-cyan-400"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(FleetHealthBanner, "0VB955moqGTEiUXXbAcRWgIKjHQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = FleetHealthBanner;
function Stat({ label, value, color = 'text-white' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-center min-w-[56px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-xl font-bold tabular-nums', color),
                children: value
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[9px] text-surface-500 uppercase tracking-wider mt-0.5 max-w-[64px]",
                children: label
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/dashboard/FleetHealthBanner.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_c1 = Stat;
var _c, _c1;
__turbopack_context__.k.register(_c, "FleetHealthBanner");
__turbopack_context__.k.register(_c1, "Stat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/components/dashboard/FleetMetricsGrid.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "FleetMetricsGrid": (()=>FleetMetricsGrid)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function FleetMetricsGrid() {
    _s();
    const { data, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'fleet',
            'health'
        ],
        queryFn: {
            "FleetMetricsGrid.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fleetApi"].getMetrics()
        }["FleetMetricsGrid.useQuery"],
        refetchInterval: 60_000
    });
    const metrics = [
        {
            label: 'Active Rigs',
            value: data?.activeRigs ?? '—',
            sub: `of ${data?.totalRigs ?? 0} total`,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"],
            color: 'text-green-400',
            glow: '00e676'
        },
        {
            label: 'Critical Rigs',
            value: data?.criticalRigs ?? '—',
            sub: 'require immediate action',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
            color: 'text-red-400',
            glow: 'ff1744'
        },
        {
            label: 'Open Failures',
            value: data?.totalOpenFailures ?? '—',
            sub: 'fleet-wide',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
            color: 'text-orange-400',
            glow: 'ff6d00'
        },
        {
            label: 'NPT Hours (30d)',
            value: `${(data?.totalNptHours30d ?? 0).toFixed(0)}h`,
            sub: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nptCostEstimate"])(data?.totalNptHours30d ?? 0)),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
            color: 'text-amber-400',
            glow: 'ffab40'
        },
        {
            label: 'Certs Expiring (60d)',
            value: data?.certificatesExpiringSoon ?? '—',
            sub: 'need renewal soon',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"],
            color: 'text-purple-400',
            glow: 'd500f9'
        },
        {
            label: 'Overdue Maintenance',
            value: data?.overdueMaintenanceTasks ?? '—',
            sub: 'deferred tasks',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"],
            color: 'text-cyan-400',
            glow: '00d4ff'
        }
    ];
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3",
            children: Array.from({
                length: 6
            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass rounded-xl h-24 animate-pulse"
                }, i, false, {
                    fileName: "[project]/apps/web/src/components/dashboard/FleetMetricsGrid.tsx",
                    lineNumber: 28,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/dashboard/FleetMetricsGrid.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3",
        children: metrics.map((m)=>{
            const Icon = m.icon;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-xl p-3.5 hover:border-surface-600/60 transition-colors",
                style: {
                    borderColor: `rgba(${hexToRgb(m.glow)},0.15)`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[9px] text-surface-500 uppercase tracking-wider leading-tight max-w-[80px]",
                                children: m.label
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/dashboard/FleetMetricsGrid.tsx",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-3.5 h-3.5 flex-shrink-0', m.color)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/dashboard/FleetMetricsGrid.tsx",
                                lineNumber: 43,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/dashboard/FleetMetricsGrid.tsx",
                        lineNumber: 41,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-2xl font-bold tabular-nums', m.color),
                        children: m.value
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/dashboard/FleetMetricsGrid.tsx",
                        lineNumber: 45,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[9px] text-surface-600 mt-1 truncate",
                        children: m.sub
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/dashboard/FleetMetricsGrid.tsx",
                        lineNumber: 46,
                        columnNumber: 13
                    }, this)
                ]
            }, m.label, true, {
                fileName: "[project]/apps/web/src/components/dashboard/FleetMetricsGrid.tsx",
                lineNumber: 39,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/dashboard/FleetMetricsGrid.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(FleetMetricsGrid, "0VB955moqGTEiUXXbAcRWgIKjHQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = FleetMetricsGrid;
function hexToRgb(hex) {
    const n = parseInt(hex, 16);
    return `${n >> 16 & 255},${n >> 8 & 255},${n & 255}`;
}
var _c;
__turbopack_context__.k.register(_c, "FleetMetricsGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "RigStatusGrid": (()=>RigStatusGrid)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const STATUS_CFG = {
    active: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
        label: 'Active',
        dotClass: 'dot-active'
    },
    maintenance: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"],
        label: 'Maintenance',
        dotClass: 'dot-warning'
    },
    critical: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"],
        label: 'Critical',
        dotClass: 'dot-critical'
    },
    idle: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
        label: 'Idle',
        dotClass: 'dot-idle'
    },
    offContract: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
        label: 'Off Contract',
        dotClass: 'dot-offline'
    }
};
function RigStatusGrid() {
    _s();
    const { data, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'rigs',
            'list'
        ],
        queryFn: {
            "RigStatusGrid.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rigsApi"].list({
                    pageSize: 16
                })
        }["RigStatusGrid.useQuery"],
        refetchInterval: 30_000
    });
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-label mb-0",
                        children: "Fleet Status"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3",
                    children: Array.from({
                        length: 10
                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass rounded-xl h-36 animate-pulse"
                        }, i, false, {
                            fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this);
    }
    const rigs = data?.data ?? [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-label mb-0",
                        children: [
                            "Fleet Status · ",
                            rigs.length,
                            " rigs"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/dashboard/fleet",
                        className: "flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 transition-colors",
                        children: [
                            "View all ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                                lineNumber: 48,
                                columnNumber: 20
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3",
                children: rigs.map((rig, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 12
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: i * 0.03
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RigCard, {
                            rig: rig
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                            lineNumber: 54,
                            columnNumber: 13
                        }, this)
                    }, rig.id, false, {
                        fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(RigStatusGrid, "0VB955moqGTEiUXXbAcRWgIKjHQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = RigStatusGrid;
function RigCard({ rig }) {
    const cfg = STATUS_CFG[rig.status] ?? STATUS_CFG.idle;
    const scoreClr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["healthScoreColor"])(rig.healthScore);
    const scoreBg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["healthScoreBg"])(rig.healthScore);
    const isCrit = rig.status === 'critical';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/dashboard/rigs/${rig.id}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('glass rounded-xl p-3.5 hover:border-brand-500/30 transition-all duration-200 cursor-pointer group h-full', isCrit && 'glow-red'),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between mb-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[12px] font-bold text-white group-hover:text-brand-300 transition-colors truncate",
                                    children: rig.name
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this),
                                rig.operatorName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[9px] text-surface-500 truncate mt-0.5",
                                    children: rig.operatorName
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                                    lineNumber: 78,
                                    columnNumber: 34
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('dot mt-1 ml-1', cfg.dotClass)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[9px] text-surface-500 uppercase tracking-wider",
                                    children: "Health"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-[11px] font-bold tabular-nums', scoreClr),
                                    children: rig.healthScore
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-1 bg-surface-800 rounded-full overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-full rounded-full', scoreBg),
                                initial: {
                                    width: 0
                                },
                                animate: {
                                    width: `${rig.healthScore}%`
                                },
                                transition: {
                                    duration: 0.8,
                                    ease: 'easeOut',
                                    delay: 0.2
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-3 gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniStat, {
                            label: "Fail",
                            value: rig.activeFailures,
                            crit: rig.activeFailures > 2
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniStat, {
                            label: "NPT",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNptHours"])(rig.nptHoursLast30d),
                            crit: rig.nptHoursLast30d > 48
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniStat, {
                            label: "Cert",
                            value: rig.certExpiringSoon,
                            crit: rig.certExpiringSoon > 0
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_c1 = RigCard;
function MiniStat({ label, value, crit = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-center bg-surface-900/40 rounded p-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-[11px] font-bold tabular-nums', crit ? 'text-red-400' : 'text-surface-300'),
                children: value
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[8px] text-surface-600 uppercase tracking-wider",
                children: label
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/dashboard/RigStatusGrid.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
_c2 = MiniStat;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "RigStatusGrid");
__turbopack_context__.k.register(_c1, "RigCard");
__turbopack_context__.k.register(_c2, "MiniStat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/components/charts/amcharts/NptTrendChart.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "NptTrendChart": (()=>NptTrendChart)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// amCharts 4 is loaded dynamically to avoid SSR issues
let am4core = null;
let am4charts = null;
let am4themes_dark = null;
let am4themes_animated = null;
function NptTrendChart() {
    _s();
    const chartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chartInst = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'npt',
            'trend'
        ],
        queryFn: {
            "NptTrendChart.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nptApi"].getTrend(undefined, 12)
        }["NptTrendChart.useQuery"]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NptTrendChart.useEffect": ()=>{
            var _s = __turbopack_context__.k.signature();
            if (!chartRef.current || isLoading) return;
            let disposed = false;
            async function init() {
                _s();
                // Lazy-load amCharts 4 (browser only)
                if (!am4core) {
                    [am4core, am4charts, { default: am4themes_dark }, { default: am4themes_animated }] = await Promise.all([
                        __turbopack_context__.r("[project]/node_modules/@amcharts/amcharts4/core.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i),
                        __turbopack_context__.r("[project]/node_modules/@amcharts/amcharts4/charts.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i),
                        __turbopack_context__.r("[project]/node_modules/@amcharts/amcharts4/themes/amchartsdark.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i),
                        __turbopack_context__.r("[project]/node_modules/@amcharts/amcharts4/themes/animated.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i)
                    ]);
                }
                if (disposed || !am4core || !am4charts || !chartRef.current) return;
                // Apply themes
                am4core.useTheme(am4themes_dark);
                am4core.useTheme(am4themes_animated);
                const chart = am4core.create(chartRef.current, am4charts.XYChart);
                chartInst.current = chart;
                // Transparent background
                chart.background.fill = am4core.color('transparent');
                chart.background.opacity = 0;
                // Padding
                chart.paddingTop = 10;
                chart.paddingRight = 20;
                chart.paddingBottom = 5;
                chart.paddingLeft = 5;
                // Data — map from API or use mock
                chart.data = data?.map({
                    "NptTrendChart.useEffect.init": (d)=>({
                            month: d.month,
                            hours: d.hours,
                            cost: d.cost
                        })
                }["NptTrendChart.useEffect.init"]) ?? [];
                // Category axis (X)
                const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = 'month';
                categoryAxis.renderer.grid.template.stroke = am4core.color('#1a2438');
                categoryAxis.renderer.labels.template.fill = am4core.color('#687a96');
                categoryAxis.renderer.labels.template.fontSize = 10;
                categoryAxis.renderer.minGridDistance = 30;
                // Value axis (Y)
                const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.renderer.grid.template.stroke = am4core.color('#1a2438');
                valueAxis.renderer.labels.template.fill = am4core.color('#687a96');
                valueAxis.renderer.labels.template.fontSize = 10;
                valueAxis.title.text = 'NPT Hours';
                valueAxis.title.fill = am4core.color('#687a96');
                valueAxis.title.fontSize = 10;
                // Line series — NPT hours
                const series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = 'hours';
                series.dataFields.categoryX = 'month';
                series.name = 'NPT Hours';
                series.stroke = am4core.color('#0082ff');
                series.strokeWidth = 2;
                series.tensionX = 0.8;
                series.fillOpacity = 0.08;
                series.fill = am4core.color('#0082ff');
                // Tooltip
                series.tooltipText = '{month}: [bold]{hours}h[/]\nCost: ~${cost}';
                if (series.tooltip) {
                    series.tooltip.background.fill = am4core.color('#0e1520');
                    series.tooltip.background.stroke = am4core.color('#0082ff');
                    series.tooltip.label.fill = am4core.color('#e8edf5');
                    series.tooltip.getFillFromObject = false;
                }
                // Bullet
                const bullet = series.bullets.push(new am4charts.CircleBullet());
                bullet.circle.stroke = am4core.color('#0082ff');
                bullet.circle.strokeWidth = 2;
                bullet.circle.fill = am4core.color('#070b12');
                bullet.circle.radius = 4;
                // Hover state
                const hs = bullet.states.create('hover');
                hs.properties.scale = 1.5;
                // Cursor
                chart.cursor = new am4charts.XYCursor();
                chart.cursor.lineX.stroke = am4core.color('#0082ff');
                chart.cursor.lineX.strokeOpacity = 0.4;
                chart.cursor.lineY.disabled = true;
                // Scrollbar
                chart.scrollbarX = new am4core.Scrollbar();
                chart.scrollbarX.background.fill = am4core.color('#1a2438');
                chart.scrollbarX.thumb.background.fill = am4core.color('#0082ff');
                // Export
                chart.exporting.menu = new am4core.ExportMenu();
                chart.exporting.menu.align = 'right';
                chart.exporting.menu.items = [
                    {
                        label: '⋯',
                        menu: [
                            {
                                label: 'PNG',
                                type: 'png'
                            },
                            {
                                label: 'CSV',
                                type: 'csv'
                            },
                            {
                                label: 'XLSX',
                                type: 'xlsx'
                            },
                            {
                                label: 'PDF',
                                type: 'pdf'
                            }
                        ]
                    }
                ];
            }
            _s(init, "SGVKaihNoPaFHSK8fC2WGPRZubA=", false, {
                "NptTrendChart.useEffect": function() {
                    return [
                        am4core.useTheme,
                        am4core.useTheme
                    ];
                }
            }["NptTrendChart.useEffect"]);
            init();
            return ({
                "NptTrendChart.useEffect": ()=>{
                    disposed = true;
                    if (chartInst.current) {
                        chartInst.current.dispose();
                        chartInst.current = null;
                    }
                }
            })["NptTrendChart.useEffect"];
        }
    }["NptTrendChart.useEffect"], [
        data,
        isLoading
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "chart-container p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "section-label",
                children: "NPT Trend — Last 12 Months"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/charts/amcharts/NptTrendChart.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-64 bg-surface-800/30 rounded-lg animate-pulse"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/charts/amcharts/NptTrendChart.tsx",
                lineNumber: 151,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: chartRef,
                style: {
                    width: '100%',
                    height: 260
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/charts/amcharts/NptTrendChart.tsx",
                lineNumber: 153,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/charts/amcharts/NptTrendChart.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
_s(NptTrendChart, "WI+UB9XmN1VFU4GmW+72t1wlFMQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = NptTrendChart;
var _c;
__turbopack_context__.k.register(_c, "NptTrendChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/components/charts/amcharts/FailureSeverityChart.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "FailureSeverityChart": (()=>FailureSeverityChart)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
let am4core = null;
let am4charts = null;
let am4themes_dark = null;
let am4themes_animated = null;
const SEVERITY_COLORS = {
    critical: '#ff1744',
    high: '#ff6d00',
    medium: '#ffab40',
    low: '#00e676',
    unknown: '#546e7a'
};
function FailureSeverityChart() {
    _s();
    const chartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chartInst = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data: stats, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'failures',
            'stats'
        ],
        queryFn: {
            "FailureSeverityChart.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["failuresApi"].getStats(undefined, 30)
        }["FailureSeverityChart.useQuery"]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FailureSeverityChart.useEffect": ()=>{
            var _s = __turbopack_context__.k.signature();
            if (!chartRef.current || isLoading) return;
            let disposed = false;
            async function init() {
                _s();
                if (!am4core) {
                    [am4core, am4charts, { default: am4themes_dark }, { default: am4themes_animated }] = await Promise.all([
                        __turbopack_context__.r("[project]/node_modules/@amcharts/amcharts4/core.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i),
                        __turbopack_context__.r("[project]/node_modules/@amcharts/amcharts4/charts.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i),
                        __turbopack_context__.r("[project]/node_modules/@amcharts/amcharts4/themes/amchartsdark.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i),
                        __turbopack_context__.r("[project]/node_modules/@amcharts/amcharts4/themes/animated.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i)
                    ]);
                }
                if (disposed || !am4core || !am4charts || !chartRef.current) return;
                am4core.useTheme(am4themes_dark);
                am4core.useTheme(am4themes_animated);
                const chart = am4core.create(chartRef.current, am4charts.PieChart);
                chartInst.current = chart;
                chart.background.fill = am4core.color('transparent');
                chart.background.opacity = 0;
                chart.innerRadius = am4core.percent(60);
                chart.radius = am4core.percent(85);
                // Data from API stats
                const bySeverity = stats?.bySeverity ?? {};
                chart.data = Object.entries(bySeverity).map({
                    "FailureSeverityChart.useEffect.init": ([severity, count])=>({
                            severity: severity.charAt(0).toUpperCase() + severity.slice(1),
                            count,
                            color: am4core.color(SEVERITY_COLORS[severity] ?? '#546e7a')
                        })
                }["FailureSeverityChart.useEffect.init"]);
                const pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = 'count';
                pieSeries.dataFields.category = 'severity';
                pieSeries.slices.template.propertyFields.fill = 'color';
                pieSeries.slices.template.stroke = am4core.color('#070b12');
                pieSeries.slices.template.strokeWidth = 2;
                pieSeries.labels.template.disabled = true;
                pieSeries.ticks.template.disabled = true;
                // Tooltip
                pieSeries.slices.template.tooltipText = '{category}: [bold]{value}[/] failures';
                pieSeries.tooltip.background.fill = am4core.color('#0e1520');
                pieSeries.tooltip.background.stroke = am4core.color('#1a2438');
                pieSeries.tooltip.label.fill = am4core.color('#e8edf5');
                pieSeries.tooltip.getFillFromObject = false;
                // Center label
                const label = chart.seriesContainer.createChild(am4core.Label);
                label.text = `[font-size:22px bold #ffffff]${stats?.total ?? 0}[/]\n[font-size:10px #687a96]FAILURES[/]`;
                label.horizontalCenter = 'middle';
                label.verticalCenter = 'middle';
                label.textAlign = 'middle';
                // Legend
                chart.legend = new am4charts.Legend();
                chart.legend.position = 'right';
                chart.legend.valign = 'middle';
                chart.legend.labels.template.fill = am4core.color('#687a96');
                chart.legend.labels.template.fontSize = 10;
                chart.legend.valueLabels.template.fill = am4core.color('#e8edf5');
                chart.legend.valueLabels.template.fontSize = 11;
                chart.legend.valueLabels.template.fontWeight = '700';
                // Export
                chart.exporting.menu = new am4core.ExportMenu();
                chart.exporting.menu.align = 'right';
                chart.exporting.menu.items = [
                    {
                        label: '⋯',
                        menu: [
                            {
                                label: 'PNG',
                                type: 'png'
                            },
                            {
                                label: 'CSV',
                                type: 'csv'
                            }
                        ]
                    }
                ];
            }
            _s(init, "SGVKaihNoPaFHSK8fC2WGPRZubA=", false, {
                "FailureSeverityChart.useEffect": function() {
                    return [
                        am4core.useTheme,
                        am4core.useTheme
                    ];
                }
            }["FailureSeverityChart.useEffect"]);
            init();
            return ({
                "FailureSeverityChart.useEffect": ()=>{
                    disposed = true;
                    if (chartInst.current) {
                        chartInst.current.dispose();
                        chartInst.current = null;
                    }
                }
            })["FailureSeverityChart.useEffect"];
        }
    }["FailureSeverityChart.useEffect"], [
        stats,
        isLoading
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "chart-container p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-label mb-0",
                        children: "Failures by Severity — Last 30 Days"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/charts/amcharts/FailureSeverityChart.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    stats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[11px] text-surface-500 mono",
                        children: [
                            "NPT: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-amber-400",
                                children: [
                                    stats.totalNptHours.toFixed(1),
                                    "h"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/charts/amcharts/FailureSeverityChart.tsx",
                                lineNumber: 116,
                                columnNumber: 75
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/charts/amcharts/FailureSeverityChart.tsx",
                        lineNumber: 116,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/charts/amcharts/FailureSeverityChart.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-60 bg-surface-800/30 rounded-lg animate-pulse"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/charts/amcharts/FailureSeverityChart.tsx",
                lineNumber: 119,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: chartRef,
                style: {
                    width: '100%',
                    height: 240
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/charts/amcharts/FailureSeverityChart.tsx",
                lineNumber: 120,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/charts/amcharts/FailureSeverityChart.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s(FailureSeverityChart, "Q1FVRGxrfnr1Tdg9iSDg42U58Fs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = FailureSeverityChart;
var _c;
__turbopack_context__.k.register(_c, "FailureSeverityChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=apps_web_src_1a4e865f._.js.map