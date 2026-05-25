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
"[project]/apps/web/src/app/dashboard/digital-twin/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DigitalTwinPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cpu.js [app-client] (ecmascript) <export default as Cpu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
// Three.js dynamically imported to avoid SSR issues
function RigModel({ healthScores, selectedRigId }) {
    _s();
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RigModel.useEffect": ()=>{
            if (!mountRef.current) return;
            let THREE, renderer, scene, camera, animId;
            const init = {
                "RigModel.useEffect.init": async ()=>{
                    THREE = await __turbopack_context__.r("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
                    const { OrbitControls } = await __turbopack_context__.r("[project]/node_modules/three/examples/jsm/controls/OrbitControls.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i).catch({
                        "RigModel.useEffect.init": ()=>({
                                OrbitControls: null
                            })
                    }["RigModel.useEffect.init"]);
                    const w = mountRef.current.clientWidth;
                    const h = mountRef.current.clientHeight;
                    // Scene
                    scene = new THREE.Scene();
                    scene.background = new THREE.Color(0x0a0e1a);
                    scene.fog = new THREE.FogExp2(0x0a0e1a, 0.018);
                    // Camera
                    camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 500);
                    camera.position.set(18, 14, 22);
                    // Renderer
                    renderer = new THREE.WebGLRenderer({
                        antialias: true
                    });
                    renderer.setSize(w, h);
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                    renderer.shadowMap.enabled = true;
                    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                    mountRef.current.appendChild(renderer.domElement);
                    // Controls
                    if (OrbitControls) {
                        const controls = new OrbitControls(camera, renderer.domElement);
                        controls.enableDamping = true;
                        controls.dampingFactor = 0.05;
                        controls.maxPolarAngle = Math.PI / 2;
                        sceneRef.current = {
                            controls
                        };
                    }
                    // Lighting
                    const ambient = new THREE.AmbientLight(0x334466, 0.6);
                    scene.add(ambient);
                    const sun = new THREE.DirectionalLight(0x88aaff, 1.2);
                    sun.position.set(20, 30, 10);
                    sun.castShadow = true;
                    scene.add(sun);
                    const blue = new THREE.PointLight(0x0066ff, 2, 30);
                    blue.position.set(0, 8, 0);
                    scene.add(blue);
                    // Ocean plane
                    const oceanGeo = new THREE.PlaneGeometry(200, 200, 32, 32);
                    const oceanMat = new THREE.MeshStandardMaterial({
                        color: 0x001133,
                        roughness: 0.1,
                        metalness: 0.8,
                        transparent: true,
                        opacity: 0.85
                    });
                    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
                    ocean.rotation.x = -Math.PI / 2;
                    ocean.receiveShadow = true;
                    scene.add(ocean);
                    // Grid
                    const grid = new THREE.GridHelper(80, 40, 0x112244, 0x0d1a2e);
                    grid.position.y = 0.01;
                    scene.add(grid);
                    // Build rig model
                    buildRig(THREE, scene, healthScores);
                    // Animate
                    const clock = new THREE.Clock();
                    const animate = {
                        "RigModel.useEffect.init.animate": ()=>{
                            animId = requestAnimationFrame(animate);
                            const t = clock.getElapsedTime();
                            blue.intensity = 1.5 + Math.sin(t * 2) * 0.5;
                            if (sceneRef.current?.controls) sceneRef.current.controls.update();
                            renderer.render(scene, camera);
                        }
                    }["RigModel.useEffect.init.animate"];
                    animate();
                    // Resize handler
                    const onResize = {
                        "RigModel.useEffect.init.onResize": ()=>{
                            if (!mountRef.current) return;
                            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
                            camera.updateProjectionMatrix();
                            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
                        }
                    }["RigModel.useEffect.init.onResize"];
                    window.addEventListener('resize', onResize);
                    sceneRef.current = {
                        ...sceneRef.current,
                        cleanup: ({
                            "RigModel.useEffect.init": ()=>window.removeEventListener('resize', onResize)
                        })["RigModel.useEffect.init"]
                    };
                }
            }["RigModel.useEffect.init"];
            init();
            return ({
                "RigModel.useEffect": ()=>{
                    cancelAnimationFrame(animId);
                    if (sceneRef.current?.cleanup) sceneRef.current.cleanup();
                    if (renderer) {
                        renderer.dispose();
                        mountRef.current?.removeChild(renderer.domElement);
                    }
                }
            })["RigModel.useEffect"];
        }
    }["RigModel.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: mountRef,
        className: "w-full h-full"
    }, void 0, false, {
        fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
        lineNumber: 116,
        columnNumber: 10
    }, this);
}
_s(RigModel, "fTngvglZ51/ZfcBvyjlXBMMFK9c=");
_c = RigModel;
function buildRig(THREE, scene, healthScores) {
    const mat = (hex, emissive = 0, rough = 0.5)=>new THREE.MeshStandardMaterial({
            color: hex,
            emissive,
            emissiveIntensity: emissive ? 0.3 : 0,
            roughness: rough,
            metalness: 0.7
        });
    // Jacket legs (4 corner columns)
    const legPositions = [
        [
            -3,
            -3
        ],
        [
            3,
            -3
        ],
        [
            -3,
            3
        ],
        [
            3,
            3
        ]
    ];
    legPositions.forEach(([x, z])=>{
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 14, 8), mat(0x334466));
        leg.position.set(x, 7, z);
        leg.castShadow = true;
        scene.add(leg);
    });
    // Main deck
    const deck = new THREE.Mesh(new THREE.BoxGeometry(9, 0.6, 9), mat(0x445577));
    deck.position.set(0, 14.3, 0);
    deck.castShadow = true;
    deck.receiveShadow = true;
    scene.add(deck);
    // Derrick tower (tall lattice approximation)
    const derrick = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.8, 18, 6), mat(0x667799, 0x003355));
    derrick.position.set(0, 23, 0);
    derrick.castShadow = true;
    scene.add(derrick);
    // Crown block at top
    const crown = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), mat(0xffd700, 0xaa7700));
    crown.position.set(0, 32.5, 0);
    scene.add(crown);
    // BOP stack — color by health
    const bopScore = healthScores[0]?.componentHealth ?? 80;
    const bopColor = bopScore >= 80 ? 0x00cc66 : bopScore >= 60 ? 0xffaa00 : 0xff3333;
    const bop = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 3.5, 12), mat(bopColor, bopColor, 0.3));
    bop.position.set(0.5, 16.5, 0);
    scene.add(bop);
    // Module buildings on deck
    const modules = [
        {
            pos: [
                -2.5,
                15,
                -2.5
            ],
            size: [
                2,
                2,
                2
            ],
            color: 0x445566
        },
        {
            pos: [
                2.5,
                15,
                -2.5
            ],
            size: [
                2,
                1.5,
                2
            ],
            color: 0x334455
        },
        {
            pos: [
                -2.5,
                15,
                2.5
            ],
            size: [
                1.5,
                2.5,
                1.5
            ],
            color: 0x445566
        },
        {
            pos: [
                2.5,
                15.5,
                2.5
            ],
            size: [
                2.5,
                1,
                2.5
            ],
            color: 0x556677
        }
    ];
    modules.forEach(({ pos, size, color })=>{
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), mat(color));
        mesh.position.set(...pos);
        mesh.castShadow = true;
        scene.add(mesh);
    });
    // Helideck
    const heli = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 0.15, 20), mat(0x334455));
    heli.position.set(3.5, 15.1, 0);
    scene.add(heli);
    const heliH = new THREE.Mesh(new THREE.RingGeometry(0.8, 1.0, 20), mat(0xffffff));
    heliH.rotation.x = -Math.PI / 2;
    heliH.position.set(3.5, 15.25, 0);
    scene.add(heliH);
    // Flare stack
    const flare = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.1, 7, 6), mat(0x888899));
    flare.position.set(-4, 18, -4);
    scene.add(flare);
    const flame = new THREE.PointLight(0xff6600, 3, 5);
    flame.position.set(-4, 22, -4);
    scene.add(flame);
    // Cross bracing
    for(let y = 2; y < 14; y += 4){
        legPositions.forEach(([x, z], i)=>{
            const next = legPositions[(i + 1) % 4];
            const brace = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 5.5, 4), mat(0x2a3a55));
            brace.position.set((x + next[0]) / 2, y, (z + next[1]) / 2);
            brace.lookAt(x, y, z);
            brace.rotateX(Math.PI / 2);
            scene.add(brace);
        });
    }
    // Health indicator lights on deck
    healthScores.slice(0, 4).forEach((rig, i)=>{
        const score = rig?.overallScore ?? 75;
        const lightColor = score >= 80 ? 0x00ff88 : score >= 60 ? 0xffaa00 : 0xff3333;
        const light = new THREE.PointLight(lightColor, 1.5, 4);
        const angle = i / 4 * Math.PI * 2;
        light.position.set(Math.cos(angle) * 3, 15, Math.sin(angle) * 3);
        scene.add(light);
    });
}
function DigitalTwinPage() {
    _s1();
    const [selectedRigId, setSelectedRigId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activePanel, setActivePanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('health');
    const { data: healthData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'fleet-health-scores'
        ],
        queryFn: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fleetApi"].getHealthScores,
        refetchInterval: 30_000
    });
    const healthScores = healthData?.data ?? [];
    const selectedRig = healthScores.find((r)=>r.rigId === selectedRigId) ?? healthScores[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-[calc(100vh-64px)] flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RigModel, {
                        healthScores: healthScores,
                        selectedRigId: selectedRigId
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-4 left-4 flex flex-col gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-surface-900/80 backdrop-blur border border-surface-700/60 rounded-xl p-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-surface-400 mb-2 font-semibold uppercase tracking-wide",
                                    children: "Select Rig"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this),
                                healthScores.slice(0, 8).map((rig)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelectedRigId(rig.rigId === selectedRigId ? null : rig.rigId),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 w-full text-left px-2 py-1.5 rounded text-xs transition-colors', selectedRigId === rig.rigId ? 'bg-brand-500/20 text-brand-300' : 'text-surface-300 hover:bg-surface-700/50'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-2 h-2 rounded-full shrink-0', rig.overallScore >= 80 ? 'bg-green-400' : rig.overallScore >= 60 ? 'bg-amber-400' : 'bg-red-400')
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                                lineNumber: 243,
                                                columnNumber: 17
                                            }, this),
                                            rig.rigName
                                        ]
                                    }, rig.rigId, true, {
                                        fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                        lineNumber: 235,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-4 left-4 bg-surface-900/70 backdrop-blur rounded-lg px-3 py-2 flex gap-4 text-xs",
                        children: [
                            [
                                'bg-green-400',
                                '≥80 Healthy'
                            ],
                            [
                                'bg-amber-400',
                                '60–79 Caution'
                            ],
                            [
                                'bg-red-400',
                                '<60 Critical'
                            ]
                        ].map(([c, l])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-2.5 h-2.5 rounded-full', c)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                        lineNumber: 256,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-surface-400",
                                        children: l
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, l, true, {
                                fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                lineNumber: 255,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                        lineNumber: 253,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-4 right-4 text-xs text-surface-500 bg-surface-900/60 rounded px-2 py-1",
                        children: "Drag to orbit · Scroll to zoom · Right-drag to pan"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    width: 0,
                    opacity: 0
                },
                animate: {
                    width: 320,
                    opacity: 1
                },
                className: "w-80 bg-surface-900 border-l border-surface-700 overflow-y-auto shrink-0",
                children: selectedRig ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-white font-bold",
                                    children: selectedRig.rigName
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                    lineNumber: 277,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mt-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-2xl font-bold', (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["healthScoreColor"])(selectedRig.overallScore)),
                                            children: selectedRig.overallScore
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                            lineNumber: 279,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-surface-400 text-sm",
                                            children: "/ 100"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                            lineNumber: 282,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                    lineNumber: 278,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-surface-500 capitalize",
                                    children: [
                                        selectedRig.trend,
                                        " trend"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                    lineNumber: 284,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                            lineNumber: 276,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-1 bg-surface-800 rounded-lg p-1",
                            children: [
                                'health',
                                'sensors',
                                'alerts'
                            ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActivePanel(t),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex-1 py-1.5 text-xs rounded capitalize transition-colors', activePanel === t ? 'bg-surface-700 text-white' : 'text-surface-400 hover:text-white'),
                                    children: t
                                }, t, false, {
                                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                    lineNumber: 290,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                            lineNumber: 288,
                            columnNumber: 13
                        }, this),
                        activePanel === 'health' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                [
                                    {
                                        label: 'Component Health',
                                        value: selectedRig.componentHealth
                                    },
                                    {
                                        label: 'Maintenance',
                                        value: selectedRig.maintenanceCompliance
                                    },
                                    {
                                        label: 'Certification',
                                        value: selectedRig.certificationStatus
                                    },
                                    {
                                        label: 'NPT Score',
                                        value: selectedRig.nptScore
                                    }
                                ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-xs mb-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-surface-400",
                                                        children: d.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["healthScoreColor"])(d.value),
                                                        children: d.value
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                                lineNumber: 309,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-2 bg-surface-700 rounded-full overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-full rounded-full', d.value >= 80 ? 'bg-green-400' : d.value >= 60 ? 'bg-amber-400' : 'bg-red-400'),
                                                    initial: {
                                                        width: 0
                                                    },
                                                    animate: {
                                                        width: `${d.value}%`
                                                    },
                                                    transition: {
                                                        duration: 0.8
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                                lineNumber: 313,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, d.label, true, {
                                        fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                        lineNumber: 308,
                                        columnNumber: 19
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-2 pt-2",
                                    children: [
                                        {
                                            label: 'Open Failures',
                                            value: selectedRig.openFailures,
                                            color: 'text-red-400'
                                        },
                                        {
                                            label: 'Maintenance',
                                            value: selectedRig.openMaintenance,
                                            color: 'text-amber-400'
                                        },
                                        {
                                            label: 'Certs',
                                            value: selectedRig.expiringCerts,
                                            color: 'text-orange-400'
                                        }
                                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-surface-800 rounded-lg p-2 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-lg font-bold', s.color),
                                                    children: s.value
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-surface-500",
                                                    children: s.label
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, s.label, true, {
                                            fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                            lineNumber: 332,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                    lineNumber: 326,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                            lineNumber: 301,
                            columnNumber: 15
                        }, this),
                        activePanel === 'sensors' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-8 text-surface-400 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                    className: "w-8 h-8 mx-auto mb-2 opacity-40"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                    lineNumber: 343,
                                    columnNumber: 17
                                }, this),
                                "Connect RTM feed to view live sensor data"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                            lineNumber: 342,
                            columnNumber: 15
                        }, this),
                        activePanel === 'alerts' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                selectedRig.openFailures > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                            className: "w-4 h-4 text-red-400 shrink-0 mt-0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                            lineNumber: 352,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-red-300",
                                            children: [
                                                selectedRig.openFailures,
                                                " open failure",
                                                selectedRig.openFailures > 1 ? 's' : '',
                                                " require attention"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                            lineNumber: 353,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                    lineNumber: 351,
                                    columnNumber: 19
                                }, this),
                                selectedRig.expiringCerts > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                            className: "w-4 h-4 text-amber-400 shrink-0 mt-0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                            lineNumber: 358,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-amber-300",
                                            children: [
                                                selectedRig.expiringCerts,
                                                " certificate",
                                                selectedRig.expiringCerts > 1 ? 's' : '',
                                                " expiring within 60 days"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                            lineNumber: 359,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                    lineNumber: 357,
                                    columnNumber: 19
                                }, this),
                                selectedRig.openFailures === 0 && selectedRig.expiringCerts === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-6 text-surface-400 text-sm",
                                    children: "No active alerts"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                    lineNumber: 363,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                            lineNumber: 349,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                    lineNumber: 275,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center h-full text-surface-400 text-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__["Cpu"], {
                                className: "w-10 h-10 mx-auto mb-3 opacity-30"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                                lineNumber: 371,
                                columnNumber: 15
                            }, this),
                            "Select a rig to view details"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                        lineNumber: 370,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                    lineNumber: 369,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/app/dashboard/digital-twin/page.tsx",
        lineNumber: 225,
        columnNumber: 5
    }, this);
}
_s1(DigitalTwinPage, "1fbCnXB4ZMlZgO6xxCxG436r6Vw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c1 = DigitalTwinPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "RigModel");
__turbopack_context__.k.register(_c1, "DigitalTwinPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=apps_web_src_b372c108._.js.map