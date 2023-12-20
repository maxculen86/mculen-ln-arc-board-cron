!(function(s, e, n, c, r) {
    if (
        ((r = s._ns_bbcws = s._ns_bbcws || r),
        s[r] ||
            ((s[r + '_d'] = s[r + '_d'] || []),
            (s[r] = function() {
                s[r + '_d'].push(arguments);
            }),
            (s[r].sources = [])),
        c && 0 > s[r].sources.indexOf(c))
    ) {
        var t = e.createElement(n);
        (t.async = 1), (t.src = c);
        var a = e.getElementsByTagName(n)[0];
        a.parentNode.insertBefore(t, a), s[r].sources.push(c);
    }
})(
    window,
    document,
    'script',
    'https://news.files.bbci.co.uk/ws/partner-analytics/js/pageTracker.min.js',
    's_bbcws'
);
s_bbcws('partner', 'lanacion.com');
s_bbcws('language', 'mundo');
s_bbcws('track', 'pageView');
