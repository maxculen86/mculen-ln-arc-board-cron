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

window.googletag = window.googletag || { cmd: [] };
googletag.cmd.push(function() {
    // initialize
    googletag.pubads().disableInitialLoad();
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();

    if (googleTagEmailCookie) {
        createHash(googleTagEmailCookie).then(hash => {
            googletag.pubads().setPublisherProvidedId(hash);
        });
    }

    googletag.pubads().setTargeting('tags_nuevos', newTags);
    googletag.pubads().setTargeting('usuario_tipo', googleTagSuscriptionType);
    googletag.pubads().setTargeting('seccion', 'acumulado');
    // googletag.pubads().setTargeting('adstest', testQueryString());
    googletag.pubads().setTargeting('sitio', 'lanacion');
});
