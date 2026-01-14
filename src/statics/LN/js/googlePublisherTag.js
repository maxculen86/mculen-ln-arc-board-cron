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
const isSuscriptor = googleTagUserCookie.includes('2');
const googleTagSuscriptionType = isSuscriptor ? 'suscriptor' : 'no suscriptor';
const googleTagProductPremiumId = isSuscriptor ? googleTagUserCookie : '0';

window.googletag = window.googletag || { cmd: [] };
googletag.cmd.push(() => {
    googletag.pubads().disableInitialLoad();
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();

    if (googleTagEmailCookie) {
        createHash(googleTagEmailCookie).then(hash => {
            googletag.pubads().setPublisherProvidedId(hash);
        });
    }

    googletag.enableServices();
    console.log('🚀 ::: setTargeting ON ::: 🚀');
    googletag.pubads().setTargeting('tags_nuevos', newTags);
    googletag.pubads().setTargeting('usuario_tipo', googleTagSuscriptionType);
    googletag
        .pubads()
        .setTargeting('ProductoPremiumId', googleTagProductPremiumId);
});
