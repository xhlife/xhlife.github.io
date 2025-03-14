var Oauthcallback = (function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  return (
    (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 0))
  );
})([
  function (e, t, n) {
    "use strict";
    var r = n(1);
    e.exports = function () {
      var e = r.Query.parse();
      // debugger
      // e.code &&
      //   (window.location.href = decodeURIComponent(
      //     e.bkurl + "?code=" + e.code
      //   ));
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.http = t.Query = t.isString = void 0);
    var r = (function () {
      return function (e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e))
          return (function (e, t) {
            var n = [],
              r = !0,
              o = !1,
              i = void 0;
            try {
              for (
                var u, a = e[Symbol.iterator]();
                !(r = (u = a.next()).done) &&
                (n.push(u.value), !t || n.length !== t);
                r = !0
              );
            } catch (e) {
              (o = !0), (i = e);
            } finally {
              try {
                !r && a.return && a.return();
              } finally {
                if (o) throw i;
              }
            }
            return n;
          })(e, t);
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      };
    })();
    t.getTargetContainer = function (e) {
      var t = void 0;
      t =
        e instanceof Element
          ? e
          : i(e)
          ? document.getElementById(e)
          : document.createElement("div");
      return t;
    };
    var o = n(2),
      i = (t.isString = function (e) {
        return "[object String]" === toString.call(e);
      });
    var u = (t.Query = {
      parse: function () {
        var e =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : window.location.search;
        if (!e) return {};
        var t = {};
        return (
          ("?" === e[0] ? e.substring(1) : e).split("&").forEach(function (e) {
            var n = e.split("="),
              o = r(n, 2),
              i = o[0],
              u = o[1];
            i && (t[i] = u);
          }),
          t
        );
      },
      stringify: function (e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : "?",
          n = Object.keys(e)
            .map(function (t) {
              return t + "=" + encodeURIComponent(e[t] || "");
            })
            .join("&");
        return n ? t + n : "";
      },
    });
    function a(e) {
      return function (t) {
        var n =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          r =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : "https://gitee.com/api/v5",
          i = new XMLHttpRequest(),
          a = localStorage.getItem(o.LS_ACCESS_TOKEN_KEY),
          c = "" + r + t,
          s = null;
        ("GET" !== e && "DELETE" !== e) || (c += u.stringify(n));
        var l = new Promise(function (e, t) {
          i.addEventListener("load", function () {
            var n = i.getResponseHeader("content-type"),
              r = i.responseText;
            if (/json/.test(n)) {
              var o = i.responseText ? JSON.parse(r) : {};
              o.message ? t(new Error(o.message)) : e(o);
            } else e(r);
          }),
            i.addEventListener("error", function (e) {
              return t(e);
            });
        });
        return (
          i.open(e, c, !0),
          i.setRequestHeader("Accept", "application/json, text/plain"),
          a && i.setRequestHeader("Authorization", "token " + a),
          "GET" !== e &&
            "DELETE" !== e &&
            ((s = JSON.stringify(n)),
            i.setRequestHeader("Content-Type", "application/json")),
          i.send(s),
          l
        );
      };
    }
    t.http = {
      get: a("GET"),
      post: a("POST"),
      delete: a("DELETE"),
      put: a("PUT"),
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    (t.LS_ACCESS_TOKEN_KEY = "giteement-comments-token"),
      (t.LS_USER_KEY = "giteement-user-info"),
      (t.NOT_INITIALIZED_ERROR = new Error("Comments Not Initialized"));
  },
]);
//# sourceMappingURL=oauthcallback.browser.js.map
