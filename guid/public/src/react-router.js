! function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e(require("react")) : "function" == typeof define && define.amd ? define(["react"], e) : "object" == typeof exports ? exports.ReactRouter = e(require("react")) : t.ReactRouter = e(t.React)
}(this, function(t) {
    return function(t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return t[r].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.p = "", e(0)
    }([function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        e.__esModule = !0, e.withRouter = e.matchPath = e.Switch = e.StaticRouter = e.Router = e.Route = e.Redirect = e.Prompt = e.MemoryRouter = void 0;
        var o = n(9),
            i = r(o),
            a = n(10),
            u = r(a),
            c = n(11),
            s = r(c),
            f = n(7),
            l = r(f),
            p = n(4),
            h = r(p),
            d = n(12),
            y = r(d),
            m = n(13),
            v = r(m),
            b = n(5),
            g = r(b),
            x = n(14),
            w = r(x);
        e.MemoryRouter = i.default, e.Prompt = u.default, e.Redirect = s.default, e.Route = l.default, e.Router = h.default, e.StaticRouter = y.default, e.Switch = v.default, e.matchPath = g.default, e.withRouter = w.default
    }, function(t, e, n) {
        t.exports = n(23)()
    }, function(e, n) {
        e.exports = t
    }, function(t, e, n) {
        "use strict";
        var r = function() {};
        t.exports = r
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        e.__esModule = !0;
        var u = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                }
                return t
            },
            c = n(3),
            s = (r(c), n(8)),
            f = r(s),
            l = n(2),
            p = r(l),
            h = n(1),
            d = r(h),
            y = function(t) {
                function e() {
                    var n, r, a;
                    o(this, e);
                    for (var u = arguments.length, c = Array(u), s = 0; s < u; s++) c[s] = arguments[s];
                    return n = r = i(this, t.call.apply(t, [this].concat(c))), r.state = {
                        match: r.computeMatch(r.props.history.location.pathname)
                    }, a = n, i(r, a)
                }
                return a(e, t), e.prototype.getChildContext = function() {
                    return {
                        router: u({}, this.context.router, {
                            history: this.props.history,
                            route: {
                                location: this.props.history.location,
                                match: this.state.match
                            }
                        })
                    }
                }, e.prototype.computeMatch = function(t) {
                    return {
                        path: "/",
                        url: "/",
                        params: {},
                        isExact: "/" === t
                    }
                }, e.prototype.componentWillMount = function() {
                    var t = this,
                        e = this.props,
                        n = e.children,
                        r = e.history;
                    null != n && 1 !== p.default.Children.count(n) ? (0, f.default)(!1) : void 0, this.unlisten = r.listen(function() {
                        t.setState({
                            match: t.computeMatch(r.location.pathname)
                        })
                    })
                }, e.prototype.componentWillReceiveProps = function(t) {}, e.prototype.componentWillUnmount = function() {
                    this.unlisten()
                }, e.prototype.render = function() {
                    var t = this.props.children;
                    return t ? p.default.Children.only(t) : null
                }, e
            }(p.default.Component);
        y.contextTypes = {
            router: d.default.object
        }, y.childContextTypes = {
            router: d.default.object.isRequired
        }, e.default = y
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        e.__esModule = !0;
        var o = n(21),
            i = r(o),
            a = {},
            u = 1e4,
            c = 0,
            s = function(t, e) {
                var n = "" + e.end + e.strict,
                    r = a[n] || (a[n] = {});
                if (r[t]) return r[t];
                var o = [],
                    s = (0, i.default)(t, o, e),
                    f = {
                        re: s,
                        keys: o
                    };
                return c < u && (r[t] = f, c++), f
            },
            f = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                "string" == typeof e && (e = {
                    path: e
                });
                var n = e,
                    r = n.path,
                    o = void 0 === r ? "/" : r,
                    i = n.exact,
                    a = void 0 !== i && i,
                    u = n.strict,
                    c = void 0 !== u && u,
                    f = s(o, {
                        end: a,
                        strict: c
                    }),
                    l = f.re,
                    p = f.keys,
                    h = l.exec(t);
                if (!h) return null;
                var d = h[0],
                    y = h.slice(1),
                    m = t === d;
                return a && !m ? null : {
                    path: o,
                    url: "/" === o && "" === d ? "/" : d,
                    isExact: m,
                    params: p.reduce(function(t, e, n) {
                        return t[e.name] = y[n], t
                    }, {})
                }
            };
        e.default = f
    }, function(t, e) {
        "use strict";
        e.__esModule = !0;
        e.addLeadingSlash = function(t) {
            return "/" === t.charAt(0) ? t : "/" + t
        }, e.stripLeadingSlash = function(t) {
            return "/" === t.charAt(0) ? t.substr(1) : t
        }, e.stripPrefix = function(t, e) {
            return 0 === t.indexOf(e) ? t.substr(e.length) : t
        }, e.stripTrailingSlash = function(t) {
            return "/" === t.charAt(t.length - 1) ? t.slice(0, -1) : t
        }, e.parsePath = function(t) {
            var e = t || "/",
                n = "",
                r = "",
                o = e.indexOf("#");
            o !== -1 && (r = e.substr(o), e = e.substr(0, o));
            var i = e.indexOf("?");
            return i !== -1 && (n = e.substr(i), e = e.substr(0, i)), e = decodeURI(e), {
                pathname: e,
                search: "?" === n ? "" : n,
                hash: "#" === r ? "" : r
            }
        }, e.createPath = function(t) {
            var e = t.pathname,
                n = t.search,
                r = t.hash,
                o = encodeURI(e || "/");
            return n && "?" !== n && (o += "?" === n.charAt(0) ? n : "?" + n), r && "#" !== r && (o += "#" === r.charAt(0) ? r : "#" + r), o
        }
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        e.__esModule = !0;
        var u = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                }
                return t
            },
            c = n(3),
            s = (r(c), n(2)),
            f = r(s),
            l = n(1),
            p = r(l),
            h = n(5),
            d = r(h),
            y = function(t) {
                function e() {
                    var n, r, a;
                    o(this, e);
                    for (var u = arguments.length, c = Array(u), s = 0; s < u; s++) c[s] = arguments[s];
                    return n = r = i(this, t.call.apply(t, [this].concat(c))), r.state = {
                        match: r.computeMatch(r.props, r.context.router)
                    }, a = n, i(r, a)
                }
                return a(e, t), e.prototype.getChildContext = function() {
                    return {
                        router: u({}, this.context.router, {
                            route: {
                                location: this.props.location || this.context.router.route.location,
                                match: this.state.match
                            }
                        })
                    }
                }, e.prototype.computeMatch = function(t, e) {
                    var n = t.computedMatch,
                        r = t.location,
                        o = t.path,
                        i = t.strict,
                        a = t.exact,
                        u = e.route;
                    if (n) return n;
                    var c = (r || u.location).pathname;
                    return o ? (0, d.default)(c, {
                        path: o,
                        strict: i,
                        exact: a
                    }) : u.match
                }, e.prototype.componentWillMount = function() {
                    var t = this.props;
                    t.component, t.render, t.children
                }, e.prototype.componentWillReceiveProps = function(t, e) {
                    this.setState({
                        match: this.computeMatch(t, e.router)
                    })
                }, e.prototype.render = function t() {
                    var e = this.state.match,
                        n = this.props,
                        r = n.children,
                        o = n.component,
                        t = n.render,
                        i = this.context.router,
                        a = i.history,
                        u = i.route,
                        c = i.staticContext,
                        s = this.props.location || u.location,
                        l = {
                            match: e,
                            location: s,
                            history: a,
                            staticContext: c
                        };
                    return o ? e ? f.default.createElement(o, l) : null : t ? e ? t(l) : null : r ? "function" == typeof r ? r(l) : !Array.isArray(r) || r.length ? f.default.Children.only(r) : null : null
                }, e
            }(f.default.Component);
        y.contextTypes = {
            router: p.default.shape({
                history: p.default.object.isRequired,
                route: p.default.object.isRequired,
                staticContext: p.default.object
            })
        }, y.childContextTypes = {
            router: p.default.object.isRequired
        }, e.default = y
    }, function(t, e, n) {
        "use strict";
        var r = function(t, e, n, r, o, i, a, u) {
            if (!t) {
                var c;
                if (void 0 === e) c = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                else {
                    var s = [n, r, o, i, a, u],
                        f = 0;
                    c = new Error(e.replace(/%s/g, function() {
                        return s[f++]
                    })), c.name = "Invariant Violation"
                }
                throw c.framesToPop = 1, c
            }
        };
        t.exports = r
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        e.__esModule = !0;
        var u = n(2),
            c = r(u),
            s = n(1),
            f = (r(s), n(18)),
            l = r(f),
            p = n(4),
            h = r(p),
            d = function(t) {
                function e() {
                    var n, r, a;
                    o(this, e);
                    for (var u = arguments.length, c = Array(u), s = 0; s < u; s++) c[s] = arguments[s];
                    return n = r = i(this, t.call.apply(t, [this].concat(c))), r.history = (0, l.default)(r.props), a = n, i(r, a)
                }
                return a(e, t), e.prototype.render = function() {
                    return c.default.createElement(h.default, {
                        history: this.history,
                        children: this.props.children
                    })
                }, e
            }(c.default.Component);
        e.default = d
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        e.__esModule = !0;
        var u = n(2),
            c = r(u),
            s = n(1),
            f = r(s),
            l = function(t) {
                function e() {
                    return o(this, e), i(this, t.apply(this, arguments))
                }
                return a(e, t), e.prototype.enable = function(t) {
                    this.unblock && this.unblock(), this.unblock = this.context.router.history.block(t)
                }, e.prototype.disable = function() {
                    this.unblock && (this.unblock(), this.unblock = null)
                }, e.prototype.componentWillMount = function() {
                    this.props.when && this.enable(this.props.message)
                }, e.prototype.componentWillReceiveProps = function(t) {
                    t.when ? this.props.when && this.props.message === t.message || this.enable(t.message) : this.disable()
                }, e.prototype.componentWillUnmount = function() {
                    this.disable()
                }, e.prototype.render = function() {
                    return null
                }, e
            }(c.default.Component);
        l.defaultProps = {
            when: !0
        }, l.contextTypes = {
            router: f.default.shape({
                history: f.default.shape({
                    block: f.default.func.isRequired
                }).isRequired
            }).isRequired
        }, e.default = l
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        e.__esModule = !0;
        var u = n(2),
            c = r(u),
            s = n(1),
            f = r(s),
            l = function(t) {
                function e() {
                    return o(this, e), i(this, t.apply(this, arguments))
                }
                return a(e, t), e.prototype.isStatic = function() {
                    return this.context.router && this.context.router.staticContext
                }, e.prototype.componentWillMount = function() {
                    this.isStatic() && this.perform()
                }, e.prototype.componentDidMount = function() {
                    this.isStatic() || this.perform()
                }, e.prototype.perform = function() {
                    var t = this.context.router.history,
                        e = this.props,
                        n = e.push,
                        r = e.to;
                    n ? t.push(r) : t.replace(r)
                }, e.prototype.render = function() {
                    return null
                }, e
            }(c.default.Component);
        l.defaultProps = {
            push: !1
        }, l.contextTypes = {
            router: f.default.shape({
                history: f.default.shape({
                    push: f.default.func.isRequired,
                    replace: f.default.func.isRequired
                }).isRequired,
                staticContext: f.default.object
            }).isRequired
        }, e.default = l
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function o(t, e) {
            var n = {};
            for (var r in t) e.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
            return n
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function a(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function u(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        e.__esModule = !0;
        var c = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                }
                return t
            },
            s = n(8),
            f = r(s),
            l = n(2),
            p = r(l),
            h = n(1),
            d = r(h),
            y = n(6),
            m = n(4),
            v = r(m),
            b = function(t) {
                var e = t.pathname,
                    n = void 0 === e ? "/" : e,
                    r = t.search,
                    o = void 0 === r ? "" : r,
                    i = t.hash,
                    a = void 0 === i ? "" : i;
                return {
                    pathname: n,
                    search: "?" === o ? "" : o,
                    hash: "#" === a ? "" : a
                }
            },
            g = function(t, e) {
                return t ? c({}, e, {
                    pathname: (0, y.addLeadingSlash)(t) + e.pathname
                }) : e
            },
            x = function(t, e) {
                if (!t) return e;
                var n = (0, y.addLeadingSlash)(t);
                return 0 !== e.pathname.indexOf(n) ? e : c({}, e, {
                    pathname: e.pathname.substr(n.length)
                })
            },
            w = function(t) {
                return "string" == typeof t ? (0, y.parsePath)(t) : b(t)
            },
            O = function(t) {
                return "string" == typeof t ? t : (0, y.createPath)(t)
            },
            _ = function(t) {
                return function() {
                    (0, f.default)(!1)
                }
            },
            j = function() {},
            R = function(t) {
                function e() {
                    var n, r, o;
                    i(this, e);
                    for (var u = arguments.length, c = Array(u), s = 0; s < u; s++) c[s] = arguments[s];
                    return n = r = a(this, t.call.apply(t, [this].concat(c))), r.createHref = function(t) {
                        return (0, y.addLeadingSlash)(r.props.basename + O(t))
                    }, r.handlePush = function(t) {
                        var e = r.props,
                            n = e.basename,
                            o = e.context;
                        o.action = "PUSH", o.location = g(n, w(t)), o.url = O(o.location)
                    }, r.handleReplace = function(t) {
                        var e = r.props,
                            n = e.basename,
                            o = e.context;
                        o.action = "REPLACE", o.location = g(n, w(t)), o.url = O(o.location)
                    }, r.handleListen = function() {
                        return j
                    }, r.handleBlock = function() {
                        return j
                    }, o = n, a(r, o)
                }
                return u(e, t), e.prototype.getChildContext = function() {
                    return {
                        router: {
                            staticContext: this.props.context
                        }
                    }
                }, e.prototype.render = function() {
                    var t = this.props,
                        e = t.basename,
                        n = (t.context, t.location),
                        r = o(t, ["basename", "context", "location"]),
                        i = {
                            createHref: this.createHref,
                            action: "POP",
                            location: x(e, w(n)),
                            push: this.handlePush,
                            replace: this.handleReplace,
                            go: _("go"),
                            goBack: _("goBack"),
                            goForward: _("goForward"),
                            listen: this.handleListen,
                            block: this.handleBlock
                        };
                    return p.default.createElement(v.default, c({}, r, {
                        history: i
                    }))
                }, e
            }(p.default.Component);
        R.defaultProps = {
            basename: "",
            location: "/"
        }, R.childContextTypes = {
            router: d.default.object.isRequired
        }, e.default = R
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        e.__esModule = !0;
        var u = n(2),
            c = r(u),
            s = n(1),
            f = r(s),
            l = n(3),
            p = (r(l), n(5)),
            h = r(p),
            d = function(t) {
                function e() {
                    return o(this, e), i(this, t.apply(this, arguments))
                }
                return a(e, t), e.prototype.componentWillReceiveProps = function(t) {}, e.prototype.render = function() {
                    var t = this.context.router.route,
                        e = this.props.children,
                        n = this.props.location || t.location,
                        r = void 0,
                        o = void 0;
                    return c.default.Children.forEach(e, function(e) {
                        if (c.default.isValidElement(e)) {
                            var i = e.props,
                                a = i.path,
                                u = i.exact,
                                s = i.strict,
                                f = i.from,
                                l = a || f;
                            null == r && (o = e, r = l ? (0, h.default)(n.pathname, {
                                path: l,
                                exact: u,
                                strict: s
                            }) : t.match)
                        }
                    }), r ? c.default.cloneElement(o, {
                        location: n,
                        computedMatch: r
                    }) : null
                }, e
            }(c.default.Component);
        d.contextTypes = {
            router: f.default.shape({
                route: f.default.object.isRequired
            }).isRequired
        }, e.default = d
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function o(t, e) {
            var n = {};
            for (var r in t) e.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
            return n
        }
        e.__esModule = !0;
        var i = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                }
                return t
            },
            a = n(2),
            u = r(a),
            c = n(1),
            s = (r(c), n(20)),
            f = r(s),
            l = n(7),
            p = r(l),
            h = function(t) {
                var e = function(e) {
                    var n = e.wrappedComponentRef,
                        r = o(e, ["wrappedComponentRef"]);
                    return u.default.createElement(p.default, {
                        render: function(e) {
                            return u.default.createElement(t, i({}, r, e, {
                                ref: n
                            }))
                        }
                    })
                };
                return e.displayName = "withRouter(" + (t.displayName || t.name) + ")", e.WrappedComponent = t, (0, f.default)(e, t)
            };
        e.default = h
    }, function(t, e) {
        "use strict";

        function n(t) {
            return function() {
                return t
            }
        }
        var r = function() {};
        r.thatReturns = n, r.thatReturnsFalse = n(!1), r.thatReturnsTrue = n(!0), r.thatReturnsNull = n(null), r.thatReturnsThis = function() {
            return this
        }, r.thatReturnsArgument = function(t) {
            return t
        }, t.exports = r
    }, function(t, e, n) {
        "use strict";

        function r(t, e, n, r, i, a, u, c) {
            if (o(e), !t) {
                var s;
                if (void 0 === e) s = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                else {
                    var f = [n, r, i, a, u, c],
                        l = 0;
                    s = new Error(e.replace(/%s/g, function() {
                        return f[l++]
                    })), s.name = "Invariant Violation"
                }
                throw s.framesToPop = 1, s
            }
        }
        var o = function(t) {};
        t.exports = r
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        e.__esModule = !0, e.locationsAreEqual = e.createLocation = void 0;
        var o = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                }
                return t
            },
            i = n(24),
            a = r(i),
            u = n(25),
            c = r(u),
            s = n(6);
        e.createLocation = function(t, e, n, r) {
            var i = void 0;
            return "string" == typeof t ? (i = (0, s.parsePath)(t), i.state = e) : (i = o({}, t), void 0 === i.pathname && (i.pathname = ""), i.search ? "?" !== i.search.charAt(0) && (i.search = "?" + i.search) : i.search = "", i.hash ? "#" !== i.hash.charAt(0) && (i.hash = "#" + i.hash) : i.hash = "", void 0 !== e && void 0 === i.state && (i.state = e)), i.key = n, r && (i.pathname ? "/" !== i.pathname.charAt(0) && (i.pathname = (0, a.default)(i.pathname, r.pathname)) : i.pathname = r.pathname), i
        }, e.locationsAreEqual = function(t, e) {
            return t.pathname === e.pathname && t.search === e.search && t.hash === e.hash && t.key === e.key && (0, c.default)(t.state, e.state)
        }
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        e.__esModule = !0;
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            i = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                }
                return t
            },
            a = n(3),
            u = r(a),
            c = n(6),
            s = n(17),
            f = n(19),
            l = r(f),
            p = function(t, e, n) {
                return Math.min(Math.max(t, e), n)
            },
            h = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    e = t.getUserConfirmation,
                    n = t.initialEntries,
                    r = void 0 === n ? ["/"] : n,
                    a = t.initialIndex,
                    f = void 0 === a ? 0 : a,
                    h = t.keyLength,
                    d = void 0 === h ? 6 : h,
                    y = (0, l.default)(),
                    m = function(t) {
                        i(M, t), M.length = M.entries.length, y.notifyListeners(M.location, M.action)
                    },
                    v = function() {
                        return Math.random().toString(36).substr(2, d)
                    },
                    b = p(f, 0, r.length - 1),
                    g = r.map(function(t) {
                        return "string" == typeof t ? (0, s.createLocation)(t, void 0, v()) : (0, s.createLocation)(t, void 0, t.key || v())
                    }),
                    x = c.createPath,
                    w = function(t, n) {
                        (0, u.default)(!("object" === ("undefined" == typeof t ? "undefined" : o(t)) && void 0 !== t.state && void 0 !== n), "You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");
                        var r = "PUSH",
                            i = (0, s.createLocation)(t, n, v(), M.location);
                        y.confirmTransitionTo(i, r, e, function(t) {
                            if (t) {
                                var e = M.index,
                                    n = e + 1,
                                    o = M.entries.slice(0);
                                o.length > n ? o.splice(n, o.length - n, i) : o.push(i), m({
                                    action: r,
                                    location: i,
                                    index: n,
                                    entries: o
                                })
                            }
                        })
                    },
                    O = function(t, n) {
                        (0, u.default)(!("object" === ("undefined" == typeof t ? "undefined" : o(t)) && void 0 !== t.state && void 0 !== n), "You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");
                        var r = "REPLACE",
                            i = (0, s.createLocation)(t, n, v(), M.location);
                        y.confirmTransitionTo(i, r, e, function(t) {
                            t && (M.entries[M.index] = i, m({
                                action: r,
                                location: i
                            }))
                        })
                    },
                    _ = function(t) {
                        var n = p(M.index + t, 0, M.entries.length - 1),
                            r = "POP",
                            o = M.entries[n];
                        y.confirmTransitionTo(o, r, e, function(t) {
                            t ? m({
                                action: r,
                                location: o,
                                index: n
                            }) : m()
                        })
                    },
                    j = function() {
                        return _(-1)
                    },
                    R = function() {
                        return _(1)
                    },
                    P = function(t) {
                        var e = M.index + t;
                        return e >= 0 && e < M.entries.length
                    },
                    E = function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        return y.setPrompt(t)
                    },
                    T = function(t) {
                        return y.appendListener(t)
                    },
                    M = {
                        length: g.length,
                        action: "POP",
                        location: g[b],
                        index: b,
                        entries: g,
                        createHref: x,
                        push: w,
                        replace: O,
                        go: _,
                        goBack: j,
                        goForward: R,
                        canGo: P,
                        block: E,
                        listen: T
                    };
                return M
            };
        e.default = h
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        e.__esModule = !0;
        var o = n(3),
            i = r(o),
            a = function() {
                var t = null,
                    e = function(e) {
                        return (0, i.default)(null == t, "A history supports only one prompt at a time"), t = e,
                            function() {
                                t === e && (t = null)
                            }
                    },
                    n = function(e, n, r, o) {
                        if (null != t) {
                            var a = "function" == typeof t ? t(e, n) : t;
                            "string" == typeof a ? "function" == typeof r ? r(a, o) : ((0, i.default)(!1, "A history needs a getUserConfirmation function in order to use a prompt message"), o(!0)) : o(a !== !1)
                        } else o(!0)
                    },
                    r = [],
                    o = function(t) {
                        var e = !0,
                            n = function() {
                                e && t.apply(void 0, arguments)
                            };
                        return r.push(n),
                            function() {
                                e = !1, r = r.filter(function(t) {
                                    return t !== n
                                })
                            }
                    },
                    a = function() {
                        for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                        r.forEach(function(t) {
                            return t.apply(void 0, e)
                        })
                    };
                return {
                    setPrompt: e,
                    confirmTransitionTo: n,
                    appendListener: o,
                    notifyListeners: a
                }
            };
        e.default = a
    }, function(t, e) {
        "use strict";
        var n = {
                childContextTypes: !0,
                contextTypes: !0,
                defaultProps: !0,
                displayName: !0,
                getDefaultProps: !0,
                mixins: !0,
                propTypes: !0,
                type: !0
            },
            r = {
                name: !0,
                length: !0,
                prototype: !0,
                caller: !0,
                arguments: !0,
                arity: !0
            },
            o = "function" == typeof Object.getOwnPropertySymbols;
        t.exports = function(t, e, i) {
            if ("string" != typeof e) {
                var a = Object.getOwnPropertyNames(e);
                o && (a = a.concat(Object.getOwnPropertySymbols(e)));
                for (var u = 0; u < a.length; ++u)
                    if (!(n[a[u]] || r[a[u]] || i && i[a[u]])) try {
                        t[a[u]] = e[a[u]]
                    } catch (t) {}
            }
            return t
        }
    }, function(t, e, n) {
        function r(t, e) {
            for (var n, r = [], o = 0, i = 0, a = "", u = e && e.delimiter || "/"; null != (n = b.exec(t));) {
                var f = n[0],
                    l = n[1],
                    p = n.index;
                if (a += t.slice(i, p), i = p + f.length, l) a += l[1];
                else {
                    var h = t[i],
                        d = n[2],
                        y = n[3],
                        m = n[4],
                        v = n[5],
                        g = n[6],
                        x = n[7];
                    a && (r.push(a), a = "");
                    var w = null != d && null != h && h !== d,
                        O = "+" === g || "*" === g,
                        _ = "?" === g || "*" === g,
                        j = n[2] || u,
                        R = m || v;
                    r.push({
                        name: y || o++,
                        prefix: d || "",
                        delimiter: j,
                        optional: _,
                        repeat: O,
                        partial: w,
                        asterisk: !!x,
                        pattern: R ? s(R) : x ? ".*" : "[^" + c(j) + "]+?"
                    })
                }
            }
            return i < t.length && (a += t.substr(i)), a && r.push(a), r
        }

        function o(t, e) {
            return u(r(t, e))
        }

        function i(t) {
            return encodeURI(t).replace(/[\/?#]/g, function(t) {
                return "%" + t.charCodeAt(0).toString(16).toUpperCase()
            })
        }

        function a(t) {
            return encodeURI(t).replace(/[?#]/g, function(t) {
                return "%" + t.charCodeAt(0).toString(16).toUpperCase()
            })
        }

        function u(t) {
            for (var e = new Array(t.length), n = 0; n < t.length; n++) "object" == typeof t[n] && (e[n] = new RegExp("^(?:" + t[n].pattern + ")$"));
            return function(n, r) {
                for (var o = "", u = n || {}, c = r || {}, s = c.pretty ? i : encodeURIComponent, f = 0; f < t.length; f++) {
                    var l = t[f];
                    if ("string" != typeof l) {
                        var p, h = u[l.name];
                        if (null == h) {
                            if (l.optional) {
                                l.partial && (o += l.prefix);
                                continue
                            }
                            throw new TypeError('Expected "' + l.name + '" to be defined')
                        }
                        if (v(h)) {
                            if (!l.repeat) throw new TypeError('Expected "' + l.name + '" to not repeat, but received `' + JSON.stringify(h) + "`");
                            if (0 === h.length) {
                                if (l.optional) continue;
                                throw new TypeError('Expected "' + l.name + '" to not be empty')
                            }
                            for (var d = 0; d < h.length; d++) {
                                if (p = s(h[d]), !e[f].test(p)) throw new TypeError('Expected all "' + l.name + '" to match "' + l.pattern + '", but received `' + JSON.stringify(p) + "`");
                                o += (0 === d ? l.prefix : l.delimiter) + p
                            }
                        } else {
                            if (p = l.asterisk ? a(h) : s(h), !e[f].test(p)) throw new TypeError('Expected "' + l.name + '" to match "' + l.pattern + '", but received "' + p + '"');
                            o += l.prefix + p
                        }
                    } else o += l
                }
                return o
            }
        }

        function c(t) {
            return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1")
        }

        function s(t) {
            return t.replace(/([=!:$\/()])/g, "\\$1")
        }

        function f(t, e) {
            return t.keys = e, t
        }

        function l(t) {
            return t.sensitive ? "" : "i"
        }

        function p(t, e) {
            var n = t.source.match(/\((?!\?)/g);
            if (n)
                for (var r = 0; r < n.length; r++) e.push({
                    name: r,
                    prefix: null,
                    delimiter: null,
                    optional: !1,
                    repeat: !1,
                    partial: !1,
                    asterisk: !1,
                    pattern: null
                });
            return f(t, e)
        }

        function h(t, e, n) {
            for (var r = [], o = 0; o < t.length; o++) r.push(m(t[o], e, n).source);
            var i = new RegExp("(?:" + r.join("|") + ")", l(n));
            return f(i, e)
        }

        function d(t, e, n) {
            return y(r(t, n), e, n)
        }

        function y(t, e, n) {
            v(e) || (n = e || n, e = []), n = n || {};
            for (var r = n.strict, o = n.end !== !1, i = "", a = 0; a < t.length; a++) {
                var u = t[a];
                if ("string" == typeof u) i += c(u);
                else {
                    var s = c(u.prefix),
                        p = "(?:" + u.pattern + ")";
                    e.push(u), u.repeat && (p += "(?:" + s + p + ")*"), p = u.optional ? u.partial ? s + "(" + p + ")?" : "(?:" + s + "(" + p + "))?" : s + "(" + p + ")", i += p
                }
            }
            var h = c(n.delimiter || "/"),
                d = i.slice(-h.length) === h;
            return r || (i = (d ? i.slice(0, -h.length) : i) + "(?:" + h + "(?=$))?"), i += o ? "$" : r && d ? "" : "(?=" + h + "|$)", f(new RegExp("^" + i, l(n)), e)
        }

        function m(t, e, n) {
            return v(e) || (n = e || n, e = []), n = n || {}, t instanceof RegExp ? p(t, e) : v(t) ? h(t, e, n) : d(t, e, n)
        }
        var v = n(22);
        t.exports = m, t.exports.parse = r, t.exports.compile = o, t.exports.tokensToFunction = u, t.exports.tokensToRegExp = y;
        var b = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g")
    }, function(t, e) {
        t.exports = Array.isArray || function(t) {
            return "[object Array]" == Object.prototype.toString.call(t)
        }
    }, function(t, e, n) {
        "use strict";
        var r = n(15),
            o = n(16);
        t.exports = function() {
            function t() {
                o(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")
            }

            function e() {
                return t
            }
            t.isRequired = t;
            var n = {
                array: t,
                bool: t,
                func: t,
                number: t,
                object: t,
                string: t,
                symbol: t,
                any: t,
                arrayOf: e,
                element: t,
                instanceOf: e,
                node: t,
                objectOf: e,
                oneOf: e,
                oneOfType: e,
                shape: e
            };
            return n.checkPropTypes = r, n.PropTypes = n, n
        }
    }, function(t, e) {
        "use strict";
        var n = function(t) {
                return "/" === t.charAt(0)
            },
            r = function(t, e) {
                for (var n = e, r = n + 1, o = t.length; r < o; n += 1, r += 1) t[n] = t[r];
                t.pop()
            },
            o = function(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1],
                    o = t && t.split("/") || [],
                    i = e && e.split("/") || [],
                    a = t && n(t),
                    u = e && n(e),
                    c = a || u;
                if (t && n(t) ? i = o : o.length && (i.pop(), i = i.concat(o)), !i.length) return "/";
                var s = void 0;
                if (i.length) {
                    var f = i[i.length - 1];
                    s = "." === f || ".." === f || "" === f
                } else s = !1;
                for (var l = 0, p = i.length; p >= 0; p--) {
                    var h = i[p];
                    "." === h ? r(i, p) : ".." === h ? (r(i, p), l++) : l && (r(i, p), l--)
                }
                if (!c)
                    for (; l--; l) i.unshift("..");
                !c || "" === i[0] || i[0] && n(i[0]) || i.unshift("");
                var d = i.join("/");
                return s && "/" !== d.substr(-1) && (d += "/"), d
            };
        t.exports = o
    }, function(t, e) {
        "use strict";
        e.__esModule = !0;
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            r = function t(e, r) {
                if (e === r) return !0;
                if (null == e || null == r) return !1;
                if (Array.isArray(e)) return !(!Array.isArray(r) || e.length !== r.length) && e.every(function(e, n) {
                    return t(e, r[n])
                });
                var o = "undefined" == typeof e ? "undefined" : n(e),
                    i = "undefined" == typeof r ? "undefined" : n(r);
                if (o !== i) return !1;
                if ("object" === o) {
                    var a = e.valueOf(),
                        u = r.valueOf();
                    if (a !== e || u !== r) return t(a, u);
                    var c = Object.keys(e),
                        s = Object.keys(r);
                    return c.length === s.length && c.every(function(n) {
                        return t(e[n], r[n])
                    })
                }
                return !1
            };
        e.default = r
    }])
});