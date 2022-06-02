import dynamicallyLoadScript from './dynamicallyLoadScript';
import config from '../../../../../properties/sites/la-nacion-ar';
import get from '../../../common/utils/get';

export function popUpCompartirNotaTW(notaId, dominio, titulo) {
    if (notaId.length > 0) {
        popUpRedSocial(
            `//twitter.com/share?text=${titulo}&url=${dominio}${notaId}&via=LANACION`
        ); // $("#hs-twitter").val());
    } else {
        window.open('//twitter.lanacion.com.ar/', '_blank');
    }
}

function popUpRedSocial(url) {
    open(url, '', 'top=300,left=550,width=800,height=380');
}

// COMPARTIR EN NOTA
export function popUpCompartirNotaFB(notaId, dominio, titulo) {
    if (notaId.length > 0) {
        dynamicallyLoadScript('//connect.facebook.net/en_US/sdk.js', 'head')
            .then(() => {
                const appID = get(config, 'shareConfig.facebook.appID');
                const initScript = document.createElement('script');
                initScript.innerHTML = `
                    window.fbAsyncInit = function () {
                        FB.init({
                            appId: ${appID},
                            autoLogAppEvents: true,
                            xfbml: true,
                            version: 'v2.11'
                        });
                        FB.AppEvents.logPageView();
                    };
                `;
                document.body.appendChild(initScript);
                callFacebookUI(notaId, dominio);
            })
            .catch(() => {
                callFacebookUI(notaId, dominio);
            });
    } else {
        window.open('https://www.facebook.com/lanacion', '_blank');
    }
}

const callFacebookUI = (notaId, dominio) => {
    if (typeof FB !== 'undefined') {
        FB.ui(
            {
                method: 'share',
                mobile_iframe: true,
                href: `${dominio}${notaId}`
            },
            response => {}
        );
    }
};

export function popUpCompartirNotaGoogle(notaId, dominio, titulo) {
    if (notaId.length > 0) {
        popUpRedSocial(`//plus.google.com/share?url=${dominio}${notaId}`); // $("#hs-twitter").val());
    } else {
        window.open('https://plus.google.com/+lanacion', '_blank');
    }
}

export function popUpCompartirMailTo(notaId, dominio) {
    if (notaId.length > 0) {
        popUpRedSocial(
            `mailto:?subject=Te recomiendo esta nota de LA NACION&body=Lee esta nota de LA NACION ${dominio}${notaId}`
        );
    }
}

export function popUpCompartirNotaRss() {
    window.open(
        'http://servicios.lanacion.com.ar/herramientas/rss/ayuda',
        '_blank'
    );
}

export const shareWhatsAppDesktop = (notaId, dominio) => {
    const wsShare = `https://api.whatsapp.com/send?text=${dominio}${notaId}`;
    window.open(wsShare, '_blank');
};

export const shareWhatsAppMobile = (notaId, dominio, title, content) => {
    try {
        const texto = `${title} : ...`;
        const whatsappUrl = `whatsapp://send?text=${texto} - ${dominio}${notaId}`;
        window.location.href = whatsappUrl;
    } catch (e) {
        console.warn && console.warn('Initialize: ', e);
    }
};

export const scrollToComments = () => {
    window.scrollTo(0, document.body.scrollHeight);
};

export const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
};
