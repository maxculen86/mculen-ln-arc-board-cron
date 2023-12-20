window.addEventListener('DOMContentLoaded', event => {
    const userId = localStorage.getItem('CDUserId');
    if (typeof $igniter_var === 'undefined') {
        !(function n(t, c, o, r, a, i, e, s, f) {
            (f =
                null != t[o] && 'function' == typeof t[o].now
                    ? t[o].now()
                    : null),
                (t.$igniter_var = i),
                (t[i] =
                    t[i] ||
                    function() {
                        (t[i].q = t[i].q || []).push(arguments);
                    }),
                (e = c.getElementsByTagName(r)[0]),
                ((s = c.createElement(r)).async = 1),
                '//cdn' == a
                    ? ((t[i].s = f),
                      (s.onerror = function(e) {
                          (t[i].e = e), n(t, c, o, r, a + '-fallback', i);
                      }))
                    : (t[i].r = f),
                (s.src =
                    a +
                    '.petametrics.com/8561ps8ov66e7mim.js?ts=' +
                    ((new Date() / 36e5) | 0)),
                e.parentNode.insertBefore(s, e);
        })(window, document, 'performance', 'script', '//cdn', '$p');
        $p('init', '8561ps8ov66e7mim');
        $p('setUserId', userId);
        $p('setNoTag', true);
        $p('send', 'pageview');
    }
});
