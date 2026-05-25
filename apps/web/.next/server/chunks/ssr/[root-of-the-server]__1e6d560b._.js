module.exports = {

"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/http2 [external] (http2, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[project]/apps/web/src/lib/api/client.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
;
const DEV_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlUxc1g0WUZIUzdaNlZsN1ZITEl6VGVqYnZqMCJ9.eyJhdWQiOiI4YjgwNjk4OC00NTg2LTQwNTktYjhjOS0xMzFjZjk5ZWU5NWUiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNTY1YjBjOTYtNGRmMi00YWE3LWFlM2YtODI2YmIxYTlmZDVlL3YyLjAiLCJpYXQiOjE3Nzc1NTQyMzgsIm5iZiI6MTc3NzU1NDIzOCwiZXhwIjoxNzc3NTU5NzcxLCJhaW8iOiJBZVFBRy84YkFBQUE3c01pWDRGZ2diVWtIelNzQTFVRzJSbVdmenVsajBLcG00OGc1Q2xQSmJRL2NlRTB1cXNqU05mbzErUHlDa3JFNHl6V241S0J1ZXNDbDNPZjE0am9wUjZCd0NoNUk0Sm1aWkFvNHFrTTZ6dXhCV3RaU0ZKK245Uk44R2FoSGVsM1FVa280cXpqSEE5VXVmYjBkeU9UU0JsN0xsV0tkMG9rR2c1OWpqaHBmWjhHQllneW9HSDM0MzRRZisvZDBvZ0RFd0JXbEc3Wk52bnkwZ3orakJOTEZXUmtQM0VIc2JoVDhoWFNnOU81MUdmb3AzTTQyN1E5dUlrUHZqN0J3MWZkTHI3UUpoVitVNENLaEtmQlVvWERZbm5Uek5TN2tESElpOFhzQmxTZktscz0iLCJhenAiOiIwNjI2YjlmYi1kZDk5LTQxYTEtOTc4My02YTYxZGU4ZmE4MWMiLCJhenBhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDU4NTkyYWMtNGRjZi00ODU1LTg1ZGMtNGM0ODNiYmM4NzEwLyIsIm5hbWUiOiJBc2hpZiBTYXl5YWQiLCJvaWQiOiI4YjliYTE1Zi04OTExLTRiOGEtOGJjNi1kYzZhYTU1MWQ5MDgiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhc2hpZi5zYXl5YWRAYXF1aWxhLWVuZ2luZWVyLmNvbSIsInJoIjoiMS5BYjBBbGd4YlZ2Sk5wMHF1UDRKcnNhbjlYb2hwZ0l1R1JWbEF1TWtUSFBtZTZWNEFBTmU5QUEuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lkIjoiMDAyMjVjZmEtZDA4NS1kZTQ2LTY3ODEtMTg0OWQzNzQzODQ0Iiwic3ViIjoiVXRJM19jYWNsWHRqc3BXaE9CcE1wTnA1Yks1SXAwRVRJaEcwWXVjUjE4QSIsInRpZCI6IjU2NWIwYzk2LTRkZjItNGFhNy1hZTNmLTgyNmJiMWE5ZmQ1ZSIsInV0aSI6ImZ6TWFEQ3JQQVVhSmM2eTFVSXdEQUEiLCJ2ZXIiOiIyLjAiLCJ4bXNfZnRkIjoieU5SaFZDQVBERUstMnhyMk9pTjNSRzQxZTBEU2xlQUtTcHB3YjFvRkZxRUJkWE5sWVhOMExXUnpiWE0ifQ.TRB6F88aqHugNXZGc10unTxANjb6iC1VhvXXA5goVZ_zVL51uH8Mum31_0z9n4R1uj7g5-FbKKEnLR4OZ5VUOmbtXEvl84Nf-RBvVf_sKSbs54IxmjJsO-ARrCY3PzD1fdV53yutnQdN9GjDfaB9BIDunJZ0Fstekx5gp89NDoZJyJdKauMhdxjopEJ-tyX_TvWWTpwIS0O2RX55iNROsKZnU6Z6Wkwkgya2y6pywevfg-NAMQzi_UjVgBf7SilBXEVtZpAk6beB5nJA-WvYQIPveleDYCv_A_P_BPZuIzE0F-uDrp-GvO80U1M7OnlHAsnQswtSwLqvIF6qwJ-Vlw';
const http = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: ("TURBOPACK compile-time value", "http://localhost:4000") ?? 'http://localhost:4000',
    timeout: 30_000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEV_TOKEN}`
    }
});
// Attach JWT (stored token overrides DEV_TOKEN if present)
http.interceptors.request.use((cfg)=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return cfg;
});
// Global 401 → redirect
http.interceptors.response.use((r)=>r, (err)=>{
    if (err.response?.status === 401 && "undefined" !== 'undefined') {
        "TURBOPACK unreachable";
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
}}),
"[project]/apps/web/src/app/dashboard/admin/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AdminPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/key.js [app-ssr] (ecmascript) <export default as Key>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function AdminPage() {
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('users');
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const { data: usersData, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'admin-users'
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get('/api/auth/users').then((r)=>r.data),
        enabled: tab === 'users',
        retry: false
    });
    const users = usersData?.data?.items ?? usersData?.data ?? [];
    const filtered = search ? users.filter((u)=>u.email?.toLowerCase().includes(search.toLowerCase()) || `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase())) : users;
    const TABS = [
        {
            id: 'users',
            label: 'Users',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
        },
        {
            id: 'roles',
            label: 'Roles',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"]
        },
        {
            id: 'permissions',
            label: 'Permissions',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"]
        },
        {
            id: 'audit',
            label: 'Audit Log',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                            className: "w-4 h-4 text-red-400"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-white",
                                children: "Administration"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-surface-400 text-sm",
                                children: "User management, roles, RBAC, and audit"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 bg-surface-800/60 rounded-xl p-1 w-fit",
                children: TABS.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setTab(t.id),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-colors', tab === t.id ? 'bg-surface-700 text-white' : 'text-surface-400 hover:text-white'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(t.icon, {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this),
                            t.label
                        ]
                    }, t.id, true, {
                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            tab === 'users' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative max-w-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "w-full bg-surface-800 border border-surface-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500",
                                placeholder: "Search users...",
                                value: search,
                                onChange: (e)=>setSearch(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-surface-800/60 border border-surface-700/60 rounded-xl overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "text-xs text-surface-400 uppercase tracking-wide border-b border-surface-700/60",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-4 py-3",
                                                children: "User"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                lineNumber: 79,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-4 py-3",
                                                children: "Role"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                lineNumber: 80,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-4 py-3",
                                                children: "Company"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                lineNumber: 81,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-4 py-3",
                                                children: "Last Active"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                lineNumber: 82,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-center px-4 py-3",
                                                children: "Enabled"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                lineNumber: 83,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-center px-4 py-3",
                                                children: "All Rigs"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                lineNumber: 84,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                        lineNumber: 78,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-surface-700/40",
                                    children: isLoading ? Array.from({
                                        length: 6
                                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: Array.from({
                                                length: 6
                                            }).map((_, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-4 bg-surface-700/50 rounded animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 110
                                                    }, this)
                                                }, j, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 76
                                                }, this))
                                        }, i, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                            lineNumber: 90,
                                            columnNumber: 23
                                        }, this)) : filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 6,
                                            className: "px-4 py-10 text-center text-surface-500 text-sm",
                                            children: users.length === 0 ? 'No users found — admin endpoint may require elevated privileges' : 'No results match your search'
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                            lineNumber: 94,
                                            columnNumber: 27
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                        lineNumber: 94,
                                        columnNumber: 23
                                    }, this) : filtered.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "hover:bg-surface-700/20 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-7 h-7 rounded-full bg-brand-600/30 flex items-center justify-center text-xs font-semibold text-brand-300",
                                                                children: (u.firstName?.[0] ?? u.email?.[0] ?? '?').toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                                lineNumber: 102,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-white",
                                                                        children: [
                                                                            u.firstName,
                                                                            " ",
                                                                            u.lastName
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                                        lineNumber: 106,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-surface-400",
                                                                        children: u.email
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                                        lineNumber: 107,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                                lineNumber: 105,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 29
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs bg-surface-700 px-2 py-0.5 rounded text-surface-300",
                                                        children: u.roles?.name ?? 'No role'
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 29
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3 text-sm text-surface-400",
                                                    children: u.company ?? '—'
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3 text-xs text-surface-400",
                                                    children: u.lastActive ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["timeAgo"])(u.lastActive) : 'Never'
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3 text-center",
                                                    children: u.enabled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                        className: "w-4 h-4 text-green-400 mx-auto"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 33
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                        className: "w-4 h-4 text-red-400 mx-auto"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 33
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3 text-center",
                                                    children: u.canAccessAllRigs ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                        className: "w-4 h-4 text-brand-400 mx-auto"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 33
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                        className: "w-4 h-4 text-surface-600 mx-auto"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 33
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, u.id, true, {
                                            fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                            lineNumber: 99,
                                            columnNumber: 25
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, this),
            tab === 'roles' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-surface-800/60 border border-surface-700/60 rounded-xl p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-white mb-4",
                        children: "Role-Based Access Control"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            {
                                name: 'Admin',
                                desc: 'Full platform access including user management',
                                color: 'text-red-400',
                                bg: 'bg-red-500/10'
                            },
                            {
                                name: 'Manager',
                                desc: 'Access to all operational modules, can delete records',
                                color: 'text-orange-400',
                                bg: 'bg-orange-500/10'
                            },
                            {
                                name: 'Engineer',
                                desc: 'Read/write on failures, maintenance, observations',
                                color: 'text-brand-400',
                                bg: 'bg-brand-500/10'
                            },
                            {
                                name: 'Surveyor',
                                desc: 'Read access to rig data and certificates',
                                color: 'text-green-400',
                                bg: 'bg-green-500/10'
                            },
                            {
                                name: 'RTOC',
                                desc: 'Remote Technical Operations Centre — RTM and alerts only',
                                color: 'text-purple-400',
                                bg: 'bg-purple-500/10'
                            },
                            {
                                name: 'Read Only',
                                desc: 'View-only across all modules',
                                color: 'text-surface-400',
                                bg: 'bg-surface-700'
                            }
                        ].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-start gap-3 p-3 rounded-lg', r.bg),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-2 h-2 rounded-full mt-1.5 shrink-0', r.color.replace('text-', 'bg-'))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-sm font-semibold', r.color),
                                                children: r.name
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                lineNumber: 152,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-surface-400 mt-0.5",
                                                children: r.desc
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                                lineNumber: 153,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, r.name, true, {
                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                lineNumber: 149,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                        lineNumber: 140,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-surface-500 mt-4",
                        children: "Role assignments are managed in the database. Contact your DBA to modify role permissions."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                lineNumber: 138,
                columnNumber: 9
            }, this),
            tab === 'permissions' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-surface-800/60 border border-surface-700/60 rounded-xl p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-white mb-4",
                        children: "Security Configuration"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            {
                                label: 'JWT Authentication',
                                status: 'Active',
                                color: 'text-green-400'
                            },
                            {
                                label: 'Azure AD SSO',
                                status: 'Configured',
                                color: 'text-green-400'
                            },
                            {
                                label: 'Row-Level Security',
                                status: 'Active (via userRigs)',
                                color: 'text-green-400'
                            },
                            {
                                label: 'Soft-Delete Middleware',
                                status: 'Enabled',
                                color: 'text-green-400'
                            },
                            {
                                label: 'Rate Limiting',
                                status: '100 req/min per IP',
                                color: 'text-brand-400'
                            },
                            {
                                label: 'CORS',
                                status: ("TURBOPACK compile-time value", "http://localhost:4000") ?? 'localhost only',
                                color: 'text-amber-400'
                            },
                            {
                                label: 'Audit Logging',
                                status: 'All writes logged',
                                color: 'text-green-400'
                            }
                        ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between py-2 border-b border-surface-700/30 last:border-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-surface-300",
                                        children: p.label
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-xs font-medium', p.color),
                                        children: p.status
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, p.label, true, {
                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                lineNumber: 176,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                lineNumber: 164,
                columnNumber: 9
            }, this),
            tab === 'audit' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-surface-800/60 border border-surface-700/60 rounded-xl p-6 text-center py-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                        className: "w-10 h-10 mx-auto mb-3 text-surface-600"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-surface-400 text-sm",
                        children: [
                            "Audit log is stored in the ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                className: "text-brand-400",
                                children: "events"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                                lineNumber: 189,
                                columnNumber: 78
                            }, this),
                            " table."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-surface-500 text-xs mt-1",
                        children: 'Use the AI Copilot to query: "Show all events from the last 24 hours"'
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
                lineNumber: 187,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/app/dashboard/admin/page.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__1e6d560b._.js.map