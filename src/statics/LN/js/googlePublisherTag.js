const serializedCreateHash = document.getElementById(
    'googlePublisherTag-metadata'
).dataset.createHash;
const serializedGetCookie = document.getElementById(
    'googlePublisherTag-metadata'
).dataset.getCookie;
const newTags = JSON.parse(
    document.getElementById('googlePublisherTag-metadata').dataset.newTags
);

const createHash = eval(`(${serializedCreateHash})`);
const googleTagGetCookie = eval(`(${serializedGetCookie})`);
const googleTagUserCookie = googleTagGetCookie('ProductoPremiumId') || [];
const googleTagEmailCookie = googleTagGetCookie('usuarioemail') || '';
const googleTagSuscriptionType = googleTagUserCookie.includes('2')
    ? 'suscriptor'
    : 'no suscriptor';

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

window.googletag = window.googletag || { cmd: [] };
googletag.cmd.push(() => {
    // initialize
    googletag.pubads().enableSingleRequest();
    googletag.pubads().enableAsyncRendering();
    googletag.pubads().disableInitialLoad();

    if (googleTagEmailCookie) {
        createHash(googleTagEmailCookie).then(hash => {
            googletag.pubads().setPublisherProvidedId(hash);
        });
    }

    googletag.pubads().set('page_url', newTags[3]);
    googletag.enableServices();
    console.log('🚀 ::: setTargeting ON ::: 🚀');
    googletag.pubads().setTargeting('tags_nuevos', newTags);
    googletag.pubads().setTargeting('usuario_tipo', googleTagSuscriptionType);
});
