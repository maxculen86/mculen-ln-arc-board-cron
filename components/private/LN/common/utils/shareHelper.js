/* eslint-disable no-restricted-globals */
import React from 'react';
import classNames from 'classnames';
import dynamicallyLoadScript from './dynamicallyLoadScript';
import config from '../../../../../properties/sites/la-nacion-ar';
import get from '../../../common/utils/get';
import toggleBookmark from '../../../common/utils/bookmarkHelper';
import { isSubscribed } from './contextHelper';
import { VIDEO } from '../../../common/utils/subtypes/subtypeHelper';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import addEventToDataLayer from './addEventToDataLayer';

export function popUpCompartirNotaTW(notaId, dominio, titulo) {
    if (notaId.length > 0) {
        popUpRedSocial(
            `https://www.twitter.com/intent/tweet?text=${titulo}&url=${dominio}${notaId}&via=LANACION`
        ); // $("#hs-twitter").val());
    } else {
        window.open('https://twitter.com/LANACION', '_blank');
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
        FB.ui &&
            FB.ui(
                {
                    method: 'share',
                    mobile_iframe: true,
                    href: `${dominio}${notaId}`
                },
                response => {
                    // NOSONAR - This is intentional
                }
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
    const wsShare = `https://wa.me/?text=${dominio}${notaId}`;
    window.open(wsShare, '_blank');
};

export const shareWhatsAppMobile = (notaId, dominio, title, content) => {
    try {
        const texto = `${title} : ...`;
        const whatsappUrl = `https://wa.me/?text=${texto} - ${dominio}${notaId}`;
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

export const getTwitterTitle = (mobileTitle, title) =>
    !mobileTitle ? title : mobileTitle;

export const getClassAndIconByBookmark = bookmark =>
    bookmark
        ? {
              bookmarkClass: '--is-saved',
              bookmarkIcon: <IconSprite name="bookmarkFilled" critical />
          }
        : {
              bookmarkIcon: <IconSprite name="bookmark" critical />
          };

export const getFirstGroupClassNames = ({ subtypeVideo }) => {
    return {
        firstGroupClasses: classNames(
            'first-buttons-group',
            'flex gap-16',
            subtypeVideo ? 'pr-8' : 'pr-8_max1023 pb-16_l flex-column_l'
        ),
        displayClasses: classNames(subtypeVideo ? 'none' : 'l-none'),

        commentsClasses: classNames(
            'comment-btn',
            'flex w-fit-content p-8 gap-4',
            subtypeVideo
                ? 'h-40'
                : 'h-40_max1023 h-fit-content_min1024 w-40_min1024 flex-column_l'
        )
    };
};

export const onButtonClicked = (
    token,
    suscription,
    globalContent,
    bookmark,
    setBookmark,
    dispatch,
    state,
    accessToken,
    isValidSectionForMVP2Auth0
) => {
    addEventToDataLayer({
        event: 'e_linkclick',
        action: 'toolbard',
        category: 'nota_ln9',
        label: 'guardar_nota'
    });
    const { open } = get(state, 'showModal', {});
    if (suscription && !open) {
        toggleBookmark({
            accessToken,
            token,
            isDelete: bookmark,
            setBookmark,
            dispatch,
            _globalContent: globalContent,
            isValidSectionForMVP2Auth0
        });
    }

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

export const BtnContainer = ({ children, withContainer, id }) => {
    if (withContainer) {
        return (
            <div className="btn-container sm-none flex relative" id={id}>
                {children}
            </div>
        );
    }

    return children;
};

export const buttonsList = [
    {
        dataEvent: 'LinkClick',
        dataSection: 'CompartirNotaLN',
        icon: <IconSprite name="whatsapp" />,
        title: 'Compartir la nota en WhatsApp',
        id: 'whatsAppShareDesktop',
        handleClick: ({ requestUri, host }) => {
            shareWhatsAppDesktop(requestUri, host);
        },
        className: 'p-0 sm-none',
        labelDataLayer: 'compartir_whatsapp'
    },
    {
        dataEvent: 'LinkClick',
        dataSection: 'CompartirNotaLN',
        icon: <IconSprite name="fileCopy" />,
        title: 'Copiar link de la nota',
        id: 'copyLinkNote',
        handleClick: ({ setCopy }) => {
            copyToClipboard();
            setCopy(true);
        },
        withContainer: true,
        className: 'p-0 sm-none',
        labelDataLayer: 'copiar_link'
    },
    {
        dataEvent: 'LinkClick',
        dataSection: 'CompartirNotaLN',
        icon: <IconSprite name="facebook" />,
        title: 'Compartir la nota en Facebook',
        id: 'btnfacebook',
        handleClick: ({ requestUri, host, title }) => {
            popUpCompartirNotaFB(requestUri, host, title);
        },
        className: 'p-0 sm-none',
        labelDataLayer: 'compartir_facebook'
    },
    {
        dataEvent: 'LinkClick',
        dataSection: 'CompartirNotaLN',
        icon: <IconSprite name="twitter" />,
        title: 'Compartir la nota en X',
        id: 'btntwitter',
        handleClick: ({ requestUri, host, basic: title, mobileTitle }) => {
            const twitterTitle = getTwitterTitle(mobileTitle, title);
            popUpCompartirNotaTW(requestUri, host, twitterTitle);
        },
        className: 'p-0 sm-none',
        labelDataLayer: 'compartir_x'
    },
    {
        dataEvent: 'LinkClick',
        dataSection: 'CompartirNotaLN',
        icon: <IconSprite name="mail" />,
        title: 'Compartir la nota por E-mail',
        id: 'btnemail',
        handleClick: ({ requestUri, host }) => {
            popUpCompartirMailTo(requestUri, host);
        },
        className: 'email p-0 sm-none',
        labelDataLayer: 'enviar_mail'
    }
];
