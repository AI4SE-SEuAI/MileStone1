(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/target-app/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/target-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/target-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/target-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/target-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/target-app/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/target-app/src/components/WeatherSearch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WeatherSearch",
    ()=>WeatherSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$weather$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/weather.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$temperature_converter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/temperature_converter.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
    _s();
    const [city, setCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [weather, setWeather] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [unit, setUnit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("celsius");
    async function handleSubmit(event) {
        event.preventDefault();
        if (loading) {
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$weather$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWeather"])(city);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "weather",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "search",
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "sr-only",
                        htmlFor: "city",
                        children: "City name"
                    }, void 0, false, {
                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error",
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this) : null,
            weather ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "card-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "eyebrow",
                                        children: "Current weather"
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: weather.city
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "unit-toggle",
                                "aria-label": "Temperature unit",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: unit === "celsius" ? "active" : "",
                                        onClick: ()=>setUnit("celsius"),
                                        children: "°C"
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "temperature",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$temperature_converter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTemperature"])(weather.temperatureC, unit)
                    }, void 0, false, {
                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                        className: "stats",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Humidity"
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Wind"
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Updated"
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "forecast-title",
                        children: "7-day forecast"
                    }, void 0, false, {
                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "forecast",
                        children: weather.forecast.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: formatDay(day.date)
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: day.condition
                                    }, void 0, false, {
                                        fileName: "[project]/target-app/src/components/WeatherSearch.tsx",
                                        lineNumber: 130,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "forecast-temps",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$temperature_converter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTemperature"])(day.temperatureMaxC, unit),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$temperature_converter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTemperature"])(day.temperatureMinC, unit)
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
_s(WeatherSearch, "wqvXXzSlJbSz3NNZ0XS/uZH1vh0=");
_c = WeatherSearch;
var _c;
__turbopack_context__.k.register(_c, "WeatherSearch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/target-app/src/services/weather/conditions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/target-app/src/services/weather/errors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/target-app/src/services/weather/forecast.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchForecast",
    ()=>fetchForecast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$conditions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/conditions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/errors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/http.ts [app-client] (ecmascript)");
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
    return value.every(__TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFiniteNumber"]) ? value : null;
}
function readStringArray(value) {
    if (!Array.isArray(value)) {
        return null;
    }
    return value.every((entry)=>typeof entry === "string") ? value : null;
}
async function fetchForecast(location, options = {}) {
    if (!isValidCoordinate(location.latitude, location.longitude)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("INVALID_INPUT", "A forecast requires valid latitude and longitude coordinates.");
    }
    const url = new URL(FORECAST_ENDPOINT);
    url.searchParams.set("latitude", String(location.latitude));
    url.searchParams.set("longitude", String(location.longitude));
    url.searchParams.set("current", "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m");
    url.searchParams.set("daily", "weather_code,temperature_2m_max,temperature_2m_min");
    url.searchParams.set("timezone", "auto");
    url.searchParams.set("forecast_days", String(FORECAST_DAYS));
    url.searchParams.set("wind_speed_unit", "kmh");
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestJson"])(url, options);
    if (!response.ok) {
        return response;
    }
    const payload = response.data;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(payload)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The forecast service returned an unexpected payload.");
    }
    if (payload.error === true) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("HTTP_ERROR", typeof payload.reason === "string" ? payload.reason : "The forecast service reported an error.");
    }
    const current = payload.current;
    const daily = payload.daily;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(current) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(daily)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The forecast service response is missing current or daily data.");
    }
    const temperature = current.temperature_2m;
    const humidity = current.relative_humidity_2m;
    const weatherCode = current.weather_code;
    const windSpeed = current.wind_speed_10m;
    const timestamp = current.time;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFiniteNumber"])(temperature) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFiniteNumber"])(humidity) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFiniteNumber"])(weatherCode) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFiniteNumber"])(windSpeed) || typeof timestamp !== "string") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The forecast service returned incomplete current conditions.");
    }
    const dates = readStringArray(daily.time);
    const maxTemperatures = readNumberArray(daily.temperature_2m_max);
    const minTemperatures = readNumberArray(daily.temperature_2m_min);
    const weatherCodes = readNumberArray(daily.weather_code);
    if (dates === null || maxTemperatures === null || minTemperatures === null || weatherCodes === null) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The forecast service returned malformed daily data.");
    }
    if (dates.length === 0) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("EMPTY_RESULT", "No forecast data is available for this location.");
    }
    if (maxTemperatures.length < dates.length || minTemperatures.length < dates.length || weatherCodes.length < dates.length) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The forecast service returned mismatched daily arrays.");
    }
    const dayCount = Math.min(dates.length, FORECAST_DAYS);
    const dailyForecast = [];
    for(let index = 0; index < dayCount; index += 1){
        const date = dates[index];
        const maxTemperature = maxTemperatures[index];
        const minTemperature = minTemperatures[index];
        const code = weatherCodes[index];
        if (date === undefined || maxTemperature === undefined || minTemperature === undefined || code === undefined) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The forecast service returned an incomplete daily entry.");
        }
        dailyForecast.push({
            date,
            condition: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$conditions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["describeWeatherCode"])(code),
            temperatureMaxC: maxTemperature,
            temperatureMinC: minTemperature,
            weatherCode: code
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])({
        location,
        current: {
            temperatureC: temperature,
            condition: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$conditions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["describeWeatherCode"])(weatherCode),
            humidity,
            windSpeedKph: windSpeed,
            weatherCode,
            timestamp
        },
        daily: dailyForecast,
        timezone: typeof payload.timezone === "string" ? payload.timezone : "UTC"
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/target-app/src/services/weather/geocoding.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveCity",
    ()=>resolveCity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/errors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/http.ts [app-client] (ecmascript)");
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("INVALID_INPUT", "Please enter a city name.");
    }
    const url = new URL(GEOCODING_ENDPOINT);
    url.searchParams.set("name", query);
    url.searchParams.set("count", "1");
    url.searchParams.set("language", "en");
    url.searchParams.set("format", "json");
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestJson"])(url, options);
    if (!response.ok) {
        return response;
    }
    const payload = response.data;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(payload)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The geocoding service returned an unexpected payload.");
    }
    if (payload.error === true) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("HTTP_ERROR", typeof payload.reason === "string" ? payload.reason : "The geocoding service reported an error.");
    }
    const results = payload.results;
    if (results === undefined || results === null) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("EMPTY_RESULT", `No location found for "${query}". Try a different city name.`);
    }
    if (!Array.isArray(results)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The geocoding service returned an unexpected results format.");
    }
    if (results.length === 0) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("EMPTY_RESULT", `No location found for "${query}". Try a different city name.`);
    }
    const first = results[0];
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(first) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFiniteNumber"])(first.latitude) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFiniteNumber"])(first.longitude)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The geocoding service returned a location without valid coordinates.");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(location);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/target-app/src/services/weather/http.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_TIMEOUT_MS",
    ()=>DEFAULT_TIMEOUT_MS,
    "requestJson",
    ()=>requestJson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/errors.ts [app-client] (ecmascript)");
;
const DEFAULT_TIMEOUT_MS = 8000;
function isAbortError(error) {
    return error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError");
}
async function requestJson(url, options = {}) {
    const fetchImpl = options.fetchImpl ?? globalThis.fetch;
    if (typeof fetchImpl !== "function") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("NETWORK_ERROR", "No fetch implementation is available in this environment.");
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
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("TIMEOUT", "The request was aborted before it started.");
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
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("HTTP_ERROR", `The weather service responded with HTTP ${response.status}.`, {
                status: response.status
            });
        }
        try {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(await response.json());
        } catch (error) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("INVALID_RESPONSE", "The weather service returned malformed JSON.", {
                cause: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["describeError"])(error)
            });
        }
    } catch (error) {
        if (timedOut) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("TIMEOUT", `The weather service did not respond within ${timeoutMs}ms.`, {
                cause: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["describeError"])(error)
            });
        }
        if (isAbortError(error)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("TIMEOUT", "The weather request was aborted.", {
                cause: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["describeError"])(error)
            });
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fail"])("NETWORK_ERROR", "Unable to reach the weather service. Check your connection.", {
            cause: (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["describeError"])(error)
        });
    } finally{
        clearTimeout(timer);
        options.signal?.removeEventListener("abort", abortFromCaller);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/target-app/src/services/weather/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$conditions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/conditions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$weather$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/weather.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$forecast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/forecast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$geocoding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/geocoding.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/http.ts [app-client] (ecmascript)");
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/target-app/src/services/weather/temperature_converter.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/target-app/src/services/weather/weather.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getWeather",
    ()=>getWeather
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/errors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$forecast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/forecast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$geocoding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/target-app/src/services/weather/geocoding.ts [app-client] (ecmascript)");
;
;
;
async function getWeather(city, options = {}) {
    const location = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$geocoding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveCity"])(city, options);
    if (!location.ok) {
        return location;
    }
    const forecast = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$forecast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchForecast"])(location.data, options);
    if (!forecast.ok) {
        return forecast;
    }
    const { location: resolvedLocation, current, daily } = forecast.data;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$target$2d$app$2f$src$2f$services$2f$weather$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])({
        city: resolvedLocation.name,
        temperatureC: current.temperatureC,
        condition: current.condition,
        humidity: current.humidity,
        windSpeedKph: current.windSpeedKph,
        timestamp: current.timestamp,
        forecast: daily
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=target-app_099ujewqox5ra._.js.map