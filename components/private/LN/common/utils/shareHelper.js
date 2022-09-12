/* eslint-disable no-restricted-globals */
import React from 'react';
import { useContent } from 'fusion:content';
import dynamicallyLoadScript from './dynamicallyLoadScript';
import config from '../../../../../properties/sites/la-nacion-ar';
import get from '../../../common/utils/get';
import Toast from '../../../common/toast/Toast';
import toggleBookmark from '../../../common/utils/bookmarkHelper';
import { conditionallyCallViafoura } from '../../../common/utils/commentsHelper';
import { isSubscribed } from './contextHelper';
import { VIDEO } from '../../../common/utils/subtypes/subtypeHelper';

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

export const getClassCondition = subtype =>
    subtype === VIDEO ? ' --video' : '';

export const isSuscription = token => (token ? isSubscribed() : false);
export const GetNumberOfComments = (firstPublishDate, arcSite, id) => {
    return (
        useContent({
            source: conditionallyCallViafoura(firstPublishDate),
            query: { arcSite, id, firstPublishDate }
        }) || {}
    );
};

export const getTwitterTitle = (mobileTitle, title) =>
    !mobileTitle ? title : mobileTitle;

export const onButtonClicked = (
    token,
    suscription,
    // toast,
    globalContent,
    bookmark,
    setBookmark,
    // setToast,
    dispatch,
    state
) => {
    addEventToDataLayer('Guardar Nota');
    const { open } = get(state, 'showModal', {});
    if (token && suscription && !open) {
        toggleBookmark(
            token,
            bookmark,
            setBookmark,
            // setToast,
            dispatch,
            globalContent
        );
    }

    // !toast &&
    !suscription &&
        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                open: true,
                origin: 'bookmark',
                typeAlert: 'exclusive-ln',
                typeModal: 'barrier'
            }
        });
};

// export const showToast = (termicaBookmark, toast, setToast) => {
//     return toast.status ? (
//         <Toast data={toast} handleTimeout={() => setToast(false)} />
//     return termicaBookmark && toast && toast.status ? (
//         <Toast data={toast} handleTimeout={() => setToast(null)} />
//     ) : (
//         <></>
//     );
// };

export const BtnContainer = ({ children, withContainer, id }) => {
    if (withContainer) {
        return (
            <div className="btn-container" id={id}>
                {children}
            </div>
        );
    }

    return children;
};

export const addEventToDataLayer = clickText => {
    window.dataLayer.push({
        event: 'gtm.linkClick',
        clickText
    });
};

export const buttonsList = [
    {
        dataEvent: 'LinkClick',
        dataSection: 'CompartirNotaLN',
        iconName: 'whatsapp',
        title: 'Compartir la nota en WhatsApp',
        id: 'whatsAppShareDesktop',
        handleClick: ({ requestUri, host }) => {
            shareWhatsAppDesktop(requestUri, host);
        }
    },
    {
        dataEvent: 'LinkClick',
        dataSection: 'CompartirNotaLN',
        iconName: 'copy',
        title: 'Copiar link de la nota',
        id: 'copyLinkNote',
        handleClick: ({ setCopy }) => {
            copyToClipboard();
            setCopy(true);
        },
        withContainer: true
    },
    {
        dataEvent: 'LinkClick',
        dataSection: 'CompartirNotaLN',
        iconName: 'facebook',
        title: 'Compartir la nota en Facebook',
        id: 'btnfacebook',
        handleClick: ({ requestUri, host, title }) => {
            popUpCompartirNotaFB(requestUri, host, title);
        }
    },
    {
        dataEvent: 'LinkClick',
        dataSection: 'CompartirNotaLN',
        iconName: 'twitter',
        title: 'Compartir la nota en Twitter',
        id: 'btntwitter',
        handleClick: ({ requestUri, host, basic: title, mobileTitle }) => {
            const twitterTitle = getTwitterTitle(mobileTitle, title);
            popUpCompartirNotaTW(requestUri, host, twitterTitle);
        }
    },
    {
        dataEvent: 'LinkClick',
        dataSection: 'CompartirNotaLN',
        iconName: 'email',
        title: 'Compartir la nota por E-mail',
        id: 'btnemail',
        handleClick: ({ requestUri, host, title }) => {
            popUpCompartirMailTo(requestUri, host, title);
        },
        className: 'email'
    }
];

export const scrollAddClass = (shareContainer, share) => {
    if (shareContainer && share) {
        if (share.scrollWidth + 16 > window.innerWidth) {
            shareContainer.classList.add('--scroll');
        }
    }
};

export const scrollShare = (shareContainer, share) => {
    const leftArrow = document.querySelector('.icon-arrow-left') || {};
    const rightArrow = document.querySelector('.icon-arrow-right') || {};

    if (shareContainer && share) {
        if (shareContainer.scrollLeft >= 20) {
            leftArrow.classList.remove('--idle');
            leftArrow.classList.add('--active');
        } else if (leftArrow.classList.contains('--active')) {
            leftArrow.classList.remove('--active');
            leftArrow.classList.add('--idle');
        }

        if (
            shareContainer.scrollLeft + window.innerWidth >
            shareContainer.scrollWidth
        ) {
            rightArrow.classList.add('--idle');
            rightArrow.classList.remove('--active');
        } else {
            rightArrow.classList.add('--active');
            rightArrow.classList.remove('--idle');
        }
    }
};
