'use strict';
(() => {
  var t,
    e,
    r = 'fs-attributes',
    s = 'autovideo',
    i = 'cmsattribute',
    n = async (...t) => {
      var e;
      let r = [];
      for (let s of t) {
        let i = await (null == (e = window.fsAttributes[s]) ? void 0 : e.loading);
        r.push(i);
      }
      return r;
    },
    l = () => {};
  function u(t, e, r, s) {
    return t ? (t.addEventListener(e, r, s), () => t.removeEventListener(e, r, s)) : l;
  }
  function o(t, e, r) {
    var s;
    let i = window.fsAttributes[t];
    return (i.destroy = r || l), null == (s = i.resolve) || s.call(i, e), e;
  }
  var a = `${r}-support`,
    c = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-support@1/support.js',
    d = async () => {
      let { fsAttributes: t, location: e } = window,
        { host: r, searchParams: s } = new URL(e.href);
      t.support || (t.support = {});
      let { support: i } = t;
      if (!r.includes('webflow.io') || !s.has(a)) return !1;
      if (i.import) return i.import;
      try {
        i.import = new Promise((t, e) => {
          let r = document.createElement('script');
          (r.src = c), (r.onload = () => t(!0)), (r.onerror = e), document.head.append(r);
        });
      } catch (n) {
        return !1;
      }
      return i.import;
    },
    f = (t) => {
      let e = (e, r, s) => {
        let { key: i, values: n } = t[e],
          l;
        if (!r) return `[${i}]`;
        let u = null == n ? void 0 : n[r];
        l = 'string' == typeof u ? u : u(s && 'instanceIndex' in s ? s.instanceIndex : void 0);
        let o = s && 'caseInsensitive' in s && s.caseInsensitive ? 'i' : '';
        if (!(null != s && s.operator)) return `[${i}="${l}"${o}]`;
        switch (s.operator) {
          case 'prefixed':
            return `[${i}^="${l}"${o}]`;
          case 'suffixed':
            return `[${i}$="${l}"${o}]`;
          case 'contains':
            return `[${i}*="${l}"${o}]`;
        }
      };
      function r(t, r) {
        let s = e('element', t, r),
          i = (null == r ? void 0 : r.scope) || document;
        return null != r && r.all ? [...i.querySelectorAll(s)] : i.querySelector(s);
      }
      return [e, r];
    },
    v = {
      preventLoad: { key: `${r}-preventload` },
      debugMode: { key: `${r}-debug` },
      src: { key: 'src', values: { finsweet: '@finsweet/attributes' } },
      dev: { key: `${r}-dev` },
    };
  [t, e] = f(v);
  var p,
    b,
    y,
    h = (t) => {
      let { currentScript: e } = document,
        r = {};
      if (!e) return { attributes: r, preventsLoad: !1 };
      let s = { preventsLoad: 'string' == typeof e.getAttribute(v.preventLoad.key), attributes: r };
      for (let i in t) {
        let n = e.getAttribute(t[i]);
        s.attributes[i] = n;
      }
      return s;
    },
    A = () => {
      let t = w();
      if (window.fsAttributes && !Array.isArray(window.fsAttributes)) {
        g(window.fsAttributes, t);
        return;
      }
      let e = {
        cms: {},
        push(...t) {
          var e, r;
          for (let [s, i] of t)
            null == (r = null == (e = this[s]) ? void 0 : e.loading) || r.then(i);
        },
        destroy() {
          var e, r;
          for (let s of t)
            null == (r = null == (e = window.fsAttributes[s]) ? void 0 : e.destroy) || r.call(e);
        },
      };
      g(e, t), m(e), (window.fsAttributes = e), (window.FsAttributes = window.fsAttributes), d();
    },
    w = () => {
      let e = t('src', 'finsweet', { operator: 'contains' }),
        r = t('dev');
      return [...document.querySelectorAll(`script${e}, script${r}`)].reduce((t, e) => {
        var r;
        let s =
          e.getAttribute(v.dev.key) ||
          (null == (r = e.src.match(/[\w-. ]+(?=(\.js)$)/)) ? void 0 : r[0]);
        return s && !t.includes(s) && t.push(s), t;
      }, []);
    },
    g = (t, e) => {
      for (let r of e) {
        if (t[r]) continue;
        t[r] = {};
        let s = t[r];
        s.loading = new Promise((t) => {
          s.resolve = (e) => {
            t(e), delete s.resolve;
          };
        });
      }
    },
    m = (t) => {
      let e = Array.isArray(window.fsAttributes) ? window.fsAttributes : [];
      t.push(...e);
    };
  (({ scriptAttributes: t, attributeKey: e, version: r, init: s }) => {
    var i;
    A(), (i = window.fsAttributes)[e] || (i[e] = {});
    let { preventsLoad: n, attributes: l } = h(t),
      u = window.fsAttributes[e];
    (u.version = r),
      (u.init = s),
      n || (window.Webflow || (window.Webflow = []), window.Webflow.push(() => s(l)));
  })({
    async init() {
      await n(i);
      let t = document.querySelectorAll('video');
      if (!t.length) return;
      let e = new Map(),
        r = new IntersectionObserver(
          (t) => {
            for (let { target: r, isIntersecting: s } of t)
              r instanceof HTMLVideoElement &&
                !r.hasAttribute('data-exclude-autovideo') &&
                !r.closest('[data-exclude-autovideo]') &&
                (s ? r.play().catch(() => {}) : r.pause(), e.set(r, s));
          },
          { threshold: 0.1 }
        );
      for (let l of t)
        l.hasAttribute('data-exclude-autovideo') ||
          l.closest('[data-exclude-autovideo]') ||
          ((l.autoplay = !1), (l.playsInline = !0), e.set(l, null), r.observe(l));
      let a = u(document, 'visibilitychange', () => {
        for (let [t, r] of e)
          t.hasAttribute('data-exclude-autovideo') ||
            t.closest('[data-exclude-autovideo]') ||
            (document.hidden || !r ? t.pause() : t.play().catch(() => {}));
      });
      return o(s, e, () => {
        r.disconnect(), a();
      });
    },
    version: '1.5.0',
    attributeKey: s,
  });
})();
