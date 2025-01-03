const article = JSON.parse(
    document.getElementById('script-permutive').getAttribute('data-article')
);
const layout = document
    .getElementById('script-permutive')
    .getAttribute('data-layout');
const serializedGetCookie =
    document.getElementById('script-permutive').dataset.getCookie;
const permutiveGetCookie = eval(`(${serializedGetCookie})`);

const getTemplateType = layoutName => {
    if (['LN-Home_Main', 'LN10-Home_Main'].includes(layoutName)) return 'home';
    if (layoutName.includes('nota')) return 'article';
    return 'section';
};

const userCookie = permutiveGetCookie('ProductoPremiumId') || [];
const isUserLoggedIn = !!permutiveGetCookie('token');
const isUserSubscribed = userCookie.includes('2');

const user = {
    loggedIn: isUserLoggedIn,
    suscribed: isUserSubscribed,
    ...(userCookie &&
        userCookie.length && { typeOfSuscription: userCookie.split(',') })
};

const type = getTemplateType(layout);

const permutivecustomProperties = {
    page: {
        classifications_watson: {
            categories: '$alchemy_taxonomy',
            concepts: '$alchemy_concepts',
            emotion: '$alchemy_document_emotion',
            entities: '$alchemy_entities',
            keywords: '$alchemy_keywords',
            sentiment: '$alchemy_document_sentiment'
        },
        type,
        user
    }
};

const conditionalArticleData = (customProperties, articleData) => {
    if (Object.keys(article).length) {
        customProperties.page.article = articleData;
    }
};
conditionalArticleData(permutivecustomProperties, article);

!(function (e, o, n, i) {
    if (!e) {
        (e = e || {}), (window.permutive = e), (e.q = []);
        var t = function () {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
                /[018]/g,
                function (e) {
                    return (
                        e ^
                        ((window.crypto || window.msCrypto).getRandomValues(
                            new Uint8Array(1)
                        )[0] &
                            (15 >> (e / 4)))
                    ).toString(16);
                }
            );
        };
        (e.config = i || {}),
            (e.config.apiKey = o),
            (e.config.workspaceId = n),
            (e.config.environment = e.config.environment || 'production'),
            (window.crypto || window.msCrypto) && (e.config.viewId = t());
        for (
            var g = [
                    'addon',
                    'identify',
                    'track',
                    'trigger',
                    'query',
                    'segment',
                    'segments',
                    'ready',
                    'on',
                    'once',
                    'user',
                    'consent'
                ],
                r = 0;
            r < g.length;
            r++
        ) {
            var w = g[r];
            e[w] = (function (o) {
                return function () {
                    var n = Array.prototype.slice.call(arguments, 0);
                    e.q.push({ functionName: o, arguments: n });
                };
            })(w);
        }
    }
})(
    window.permutive,
    '2f46069c-4d57-4535-9aeb-582079606f3b',
    '867f8423-d142-4fd1-ae8d-1a9bbbdf2358',
    { consentRequired: false }
);
(window.googletag = window.googletag || {}),
    (window.googletag.cmd = window.googletag.cmd || []),
    window.googletag.cmd.push(function () {
        if (0 === window.googletag.pubads().getTargeting('permutive').length) {
            var e = window.localStorage.getItem('_pdfps');
            window.googletag
                .pubads()
                .setTargeting('permutive', e ? JSON.parse(e) : []);
            var o = window.localStorage.getItem('permutive-id');
            o &&
                (window.googletag.pubads().setTargeting('puid', o),
                window.googletag
                    .pubads()
                    .setTargeting('ptime', Date.now().toString())),
                window.permutive.config.viewId &&
                    window.googletag
                        .pubads()
                        .setTargeting(
                            'prmtvvid',
                            window.permutive.config.viewId
                        ),
                window.permutive.config.workspaceId &&
                    window.googletag
                        .pubads()
                        .setTargeting(
                            'prmtvwid',
                            window.permutive.config.workspaceId
                        );
        }
    });
permutive.addon('web', permutivecustomProperties);
