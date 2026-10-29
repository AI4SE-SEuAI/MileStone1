(()=>{"use strict";module.exports = [
"[project]/target-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/target-app/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
"[project]/target-app/src/components/WeatherSearch.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WeatherSearch",
    ()=>WeatherSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$weather$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/weather.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$temperature_converter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/temperature_converter.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function formatDay(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric"
    });
}
function WeatherSearch() {
    const [city, setCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [weather, setWeather] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [unit, setUnit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("celsius");
    async function handleSubmit(event) {
        event.preventDefault();
        if (loading) {
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$weather$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWeather"])(city);
            if (result.ok) {
                setWeather(result.data);
            } else {
                setWeather(null);
                setError(result.error.message);
            }
        } catch  {
            setWeather(null);
            setError("Something went wrong while loading the weather.");
        } finally{
            setLoading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "weather",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "search",
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "sr-only",
                        htmlFor: "city",
                        children: "City name"
                    }, void 0, false, {
                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "city",
                        name: "city",
                        type: "search",
                        placeholder: "Search a city, e.g. Hannover",
                        autoComplete: "off",
                        value: city,
                        onChange: (event)=>setCity(event.target.value)
                    }, void 0, false, {
                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading || city.trim().length === 0,
                        children: loading ? "Loading…" : "Get forecast"
                    }, void 0, false, {
                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error",
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this) : null,
            weather ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "card-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "eyebrow",
                                        children: "Current weather"
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: weather.city
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "condition",
                                        children: weather.condition
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "unit-toggle",
                                "aria-label": "Temperature unit",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: unit === "celsius" ? "active" : "",
                                        onClick: ()=>setUnit("celsius"),
                                        children: "°C"
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: unit === "fahrenheit" ? "active" : "",
                                        onClick: ()=>setUnit("fahrenheit"),
                                        children: "°F"
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "temperature",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$temperature_converter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTemperature"])(weather.temperatureC, unit)
                    }, void 0, false, {
                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                        className: "stats",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Humidity"
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: [
                                            weather.humidity,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 113,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Wind"
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: [
                                            weather.windSpeedKph,
                                            " km/h"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Updated"
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: new Date(weather.timestamp).toLocaleString()
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "forecast-title",
                        children: "7-day forecast"
                    }, void 0, false, {
                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "forecast",
                        children: weather.forecast.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: formatDay(day.date)
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: day.condition
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 130,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "forecast-temps",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$temperature_converter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTemperature"])(day.temperatureMaxC, unit),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$temperature_converter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTemperature"])(day.temperatureMinC, unit)
                                            }, void 0, false, {
                                                fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                                lineNumber: 133,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 131,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, day.date, true, {
                                fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                lineNumber: 128,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
}),
"[project]/target-app/src/services/weather/conditions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "describeWeatherCode",
    ()=>describeWeatherCode
]);
const WEATHER_CODES = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
};
function describeWeatherCode(code) {
    return WEATHER_CODES[code] ?? "Unknown conditions";
}
}),
"[project]/target-app/src/services/weather/errors.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "describeError",
    ()=>describeError,
    "fail",
    ()=>fail,
    "isFiniteNumber",
    ()=>isFiniteNumber,
    "isRecord",
    ()=>isRecord,
    "ok",
    ()=>ok
]);
function ok(data) {
    return {
        ok: true,
        data
    };
}
function fail(code, message, extra = {}) {
    return {
        ok: false,
        error: {
            code,
            message,
            ...extra
        }
    };
}
function describeError(error) {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isFiniteNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
}
}),
"[project]/target-app/src/services/weather/forecast.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchForecast",
    ()=>fetchForecast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$conditions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/conditions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/errors.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/http.ts [app-ssr] (ecmascript)");
;
;
;
const FORECAST_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
const FORECAST_DAYS = 7;
function isValidCoordinate(latitude, longitude) {
    return Number.isFinite(latitude) && Number.isFinite(longitude) && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180;
}
function readNumberArray(value) {
    if (!Array.isArray(value)) {
        return null;
    }
    return value.every(__TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFiniteNumber"]) ? value : null;
}
function readStringArray(value) {
    if (!Array.isArray(value)) {
        return null;
    }
    return value.every((entry)=>typeof entry === "string") ? value : null;
}
async function fetchForecast(location, options = {}) {
    if (!isValidCoordinate(location.latitude, location.longitude)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("INVALID_INPUT", "A forecast requires valid latitude and longitude coordinates.");
    }
    const url = new URL(FORECAST_ENDPOINT);
    url.searchParams.set("latitude", String(location.latitude));
    url.searchParams.set("longitude", String(location.longitude));
    url.searchParams.set("current", "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m");
    url.searchParams.set("daily", "weather_code,temperature_2m_max,temperature_2m_min");
    url.searchParams.set("timezone", "auto");
    url.searchParams.set("forecast_days", String(FORECAST_DAYS));
    url.searchParams.set("wind_speed_unit", "kmh");
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["requestJson"])(url, options);
    if (!response.ok) {
        return response;
    }
    const payload = response.data;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRecord"])(payload)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The forecast service returned an unexpected payload.");
    }
    if (payload.error === true) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("HTTP_ERROR", typeof payload.reason === "string" ? payload.reason : "The forecast service reported an error.");
    }
    const current = payload.current;
    const daily = payload.daily;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRecord"])(current) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRecord"])(daily)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The forecast service response is missing current or daily data.");
    }
    const temperature = current.temperature_2m;
    const humidity = current.relative_humidity_2m;
    const weatherCode = current.weather_code;
    const windSpeed = current.wind_speed_10m;
    const timestamp = current.time;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFiniteNumber"])(temperature) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFiniteNumber"])(humidity) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFiniteNumber"])(weatherCode) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFiniteNumber"])(windSpeed) || typeof timestamp !== "string") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The forecast service returned incomplete current conditions.");
    }
    const dates = readStringArray(daily.time);
    const maxTemperatures = readNumberArray(daily.temperature_2m_max);
    const minTemperatures = readNumberArray(daily.temperature_2m_min);
    const weatherCodes = readNumberArray(daily.weather_code);
    if (dates === null || maxTemperatures === null || minTemperatures === null || weatherCodes === null) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The forecast service returned malformed daily data.");
    }
    if (dates.length === 0) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("EMPTY_RESULT", "No forecast data is available for this location.");
    }
    if (maxTemperatures.length < dates.length || minTemperatures.length < dates.length || weatherCodes.length < dates.length) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The forecast service returned mismatched daily arrays.");
    }
    const dayCount = Math.min(dates.length, FORECAST_DAYS);
    const dailyForecast = [];
    for(let index = 0; index < dayCount; index += 1){
        const date = dates[index];
        const maxTemperature = maxTemperatures[index];
        const minTemperature = minTemperatures[index];
        const code = weatherCodes[index];
        if (date === undefined || maxTemperature === undefined || minTemperature === undefined || code === undefined) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The forecast service returned an incomplete daily entry.");
        }
        dailyForecast.push({
            date,
            condition: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$conditions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["describeWeatherCode"])(code),
            temperatureMaxC: maxTemperature,
            temperatureMinC: minTemperature,
            weatherCode: code
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])({
        location,
        current: {
            temperatureC: temperature,
            condition: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$conditions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["describeWeatherCode"])(weatherCode),
            humidity,
            windSpeedKph: windSpeed,
            weatherCode,
            timestamp
        },
        daily: dailyForecast,
        timezone: typeof payload.timezone === "string" ? payload.timezone : "UTC"
    });
}
}),
"[project]/target-app/src/services/weather/geocoding.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveCity",
    ()=>resolveCity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/errors.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/http.ts [app-ssr] (ecmascript)");
;
;
const GEOCODING_ENDPOINT = "https://geocoding-api.open-meteo.com/v1/search";
function readOptionalString(value, key) {
    const candidate = value[key];
    return typeof candidate === "string" && candidate.length > 0 ? candidate : undefined;
}
async function resolveCity(city, options = {}) {
    const query = city.trim();
    if (query.length === 0) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("INVALID_INPUT", "Please enter a city name.");
    }
    const url = new URL(GEOCODING_ENDPOINT);
    url.searchParams.set("name", query);
    url.searchParams.set("count", "1");
    url.searchParams.set("language", "en");
    url.searchParams.set("format", "json");
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["requestJson"])(url, options);
    if (!response.ok) {
        return response;
    }
    const payload = response.data;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRecord"])(payload)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The geocoding service returned an unexpected payload.");
    }
    if (payload.error === true) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("HTTP_ERROR", typeof payload.reason === "string" ? payload.reason : "The geocoding service reported an error.");
    }
    const results = payload.results;
    if (results === undefined || results === null) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("EMPTY_RESULT", `No location found for "${query}". Try a different city name.`);
    }
    if (!Array.isArray(results)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The geocoding service returned an unexpected results format.");
    }
    if (results.length === 0) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("EMPTY_RESULT", `No location found for "${query}". Try a different city name.`);
    }
    const first = results[0];
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRecord"])(first) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFiniteNumber"])(first.latitude) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFiniteNumber"])(first.longitude)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The geocoding service returned a location without valid coordinates.");
    }
    const location = {
        name: readOptionalString(first, "name") ?? query,
        latitude: first.latitude,
        longitude: first.longitude
    };
    const country = readOptionalString(first, "country");
    const admin1 = readOptionalString(first, "admin1");
    const timezone = readOptionalString(first, "timezone");
    if (country !== undefined) {
        location.country = country;
    }
    if (admin1 !== undefined) {
        location.admin1 = admin1;
    }
    if (timezone !== undefined) {
        location.timezone = timezone;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(location);
}
}),
"[project]/target-app/src/services/weather/http.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_TIMEOUT_MS",
    ()=>DEFAULT_TIMEOUT_MS,
    "requestJson",
    ()=>requestJson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/errors.ts [app-ssr] (ecmascript)");
;
const DEFAULT_TIMEOUT_MS = 8000;
function isAbortError(error) {
    return error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError");
}
async function requestJson(url, options = {}) {
    const fetchImpl = options.fetchImpl ?? globalThis.fetch;
    if (typeof fetchImpl !== "function") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("NETWORK_ERROR", "No fetch implementation is available in this environment.");
    }
    const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const controller = new AbortController();
    let timedOut = false;
    const timer = setTimeout(()=>{
        timedOut = true;
        controller.abort();
    }, timeoutMs);
    const abortFromCaller = ()=>controller.abort();
    if (options.signal) {
        if (options.signal.aborted) {
            clearTimeout(timer);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("TIMEOUT", "The request was aborted before it started.");
        }
        options.signal.addEventListener("abort", abortFromCaller, {
            once: true
        });
    }
    try {
        const response = await fetchImpl(url, {
            signal: controller.signal,
            headers: {
                accept: "application/json"
            }
        });
        if (!response.ok) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("HTTP_ERROR", `The weather service responded with HTTP ${response.status}.`, {
                status: response.status
            });
        }
        try {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(await response.json());
        } catch (error) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The weather service returned malformed JSON.", {
                cause: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["describeError"])(error)
            });
        }
    } catch (error) {
        if (timedOut) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("TIMEOUT", `The weather service did not respond within ${timeoutMs}ms.`, {
                cause: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["describeError"])(error)
            });
        }
        if (isAbortError(error)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("TIMEOUT", "The weather request was aborted.", {
                cause: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["describeError"])(error)
            });
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fail"])("NETWORK_ERROR", "Unable to reach the weather service. Check your connection.", {
            cause: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["describeError"])(error)
        });
    } finally{
        clearTimeout(timer);
        options.signal?.removeEventListener("abort", abortFromCaller);
    }
}
}),
"[project]/target-app/src/services/weather/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$conditions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/conditions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$weather$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/weather.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$forecast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/forecast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$geocoding$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/geocoding.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/http.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/target-app/src/services/weather/temperature_converter.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "convertTemperature",
    ()=>convertTemperature,
    "formatTemperature",
    ()=>formatTemperature
]);
function convertTemperature(value, fromUnit) {
    if (fromUnit === "celsius") {
        return value * 9 / 5 + 32;
    }
    return (value - 32) * 5 / 9;
}
function formatTemperature(celsius, unit) {
    const value = unit === "celsius" ? celsius : convertTemperature(celsius, "celsius");
    return `${value.toFixed(1)}°${unit === "celsius" ? "C" : "F"}`;
}
}),
"[project]/target-app/src/services/weather/weather.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getWeather",
    ()=>getWeather
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/errors.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$forecast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/forecast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$geocoding$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/geocoding.ts [app-ssr] (ecmascript)");
;
;
;
async function getWeather(city, options = {}) {
    const location = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$geocoding$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveCity"])(city, options);
    if (!location.ok) {
        return location;
    }
    const forecast = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$forecast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchForecast"])(location.data, options);
    if (!forecast.ok) {
        return forecast;
    }
    const { location: resolvedLocation, current, daily } = forecast.data;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])({
        city: resolvedLocation.name,
        temperatureC: current.temperatureC,
        condition: current.condition,
        humidity: current.humidity,
        windSpeedKph: current.windSpeedKph,
        timestamp: current.timestamp,
        forecast: daily
    });
}
}),
];})()

//# sourceMappingURL=target-app_06gmxoio0ne2r._.js.map