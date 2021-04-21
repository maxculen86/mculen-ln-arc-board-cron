import dynamicallyLoadScript from './dynamicallyLoadScript';
import config from '../../../../../properties/sites/la-nacion-ar';
import get from '../../../common/utils/get';

export function popUpCompartirNotaTW(notaId, dominio, titulo) {
    if (notaId.length > 0) {
        const result =
            '//twitter.com/share?text=' +
            titulo +
            '&url=' +
            dominio +
            notaId +
            '&via=LANACION';
        popUpRedSocial(
            '//twitter.com/share?text=' +
                titulo +
                '&url=' +
                dominio +
                notaId +
                '&via=LANACION'
        ); //$("#hs-twitter").val());
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
                // console.error('Script loading failed! Handle this error', error);
            });

        // popUpRedSocial(`//www.facebook.com/sharer.php?m2w&s=100&p[url]=${dominio}${notaId}`);
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

        /* Whatsapp */
        if (
            /Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            // $(".wapp").css("display", "inline-block");
            // $("body").addClass("touch");
        }
    } catch (e) {
        console.warn && console.warn('Initialize: ', e);
    }
};

export const scrollToComments = () => {
    window.scrollTo(0, document.body.scrollHeight);
    // const element = document.querySelector('footer');
    // element.scrollIntoView({ behavior: 'smooth', block: 'end' });
};
