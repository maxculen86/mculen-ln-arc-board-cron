/* global FB */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { cx } from '@ln/ds-cva';
import dynamicallyLoadScript from './dynamicallyLoadScript';
import config from '../../../../../properties/sites/la-nacion-ar';
import get from '../../../common/utils/get';
import toggleBookmark, {
    getStatusMessage
} from '../../../common/utils/bookmarkHelper';
import renderToast from '../../../../features/private-global/common/utils/renderToast';
import {
    VIDEO,
    VIDEO_VERTICAL
} from '../../../common/utils/subtypes/subtypeHelper';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

const noPaddingSmNone = 'p-0 sm-none';

function popUpRedSocial(url) {
    window.open(url, '', 'top=300,left=550,width=800,height=380');
}

export function popUpCompartirNotaTW(notaId, dominio, titulo) {
    if (notaId?.length > 0) {
        const encodedTitulo = encodeURIComponent(titulo);
        popUpRedSocial(
            `https://x.com/intent/tweet?text=${encodedTitulo}&url=${dominio}${notaId}&via=LANACION/`
        );
    } else {
        window.open('https://x.com/LANACION/', '_blank');
    }
}

/* El uso de `FB` se debe a la integración con el SDK de Facebook. 
Actualmente, `FB` es un objeto global proporcionado por el script del SDK de Facebook, 
cargado dinámicamente en el navegador. */
const callFacebookUI = (notaId, dominio) => {
    if (typeof FB !== 'undefined' && typeof FB.ui === 'function') {
        FB.ui(
            {
                method: 'share',
                mobile_iframe: true,
                href: `${dominio}${notaId}`
            },
            () => {
                // NOSONAR - This is intentional
            }
        );
    }
};

// COMPARTIR EN NOTA
export function popUpCompartirNotaFB(notaId, dominio) {
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

export function popUpCompartirNotaGoogle(notaId, dominio) {
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

export function openGoogleDiscoverFollow() {
    const googleFollowUrl = 'https://profile.google.com/cp/CgkvbS8wNm5xYno';
    window.open(googleFollowUrl, '_blank', 'noopener,noreferrer');
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

export const shareWhatsAppMobile = (notaId, dominio, title) => {
    try {
        const texto = `${title} : ...`;
        const whatsappUrl = `https://wa.me/?text=${texto} - ${dominio}${notaId}`;
        window.location.href = whatsappUrl;
    } catch (e) {
        if (console.warn) {
            console.warn('Initialize: ', e);
        }
    }
};

export const scrollToComments = () => {
    window.scrollTo(0, document.body.scrollHeight);
};

export const copyToClipboard = (domain, url) => {
    const link = domain && url ? `${domain}${url}` : window.location.href;
    navigator.clipboard.writeText(link);
};

export const getClassCondition = subtype =>
    subtype === VIDEO || subtype === VIDEO_VERTICAL ? ' --video' : '';

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

export const getFirstGroupClassNames = ({ isCustomLayout }) => ({
    firstGroupClasses: cx(
        'first-buttons-group',
        'flex gap-16',
        !isCustomLayout && 'flex-column_l'
    ),
    commentsClasses: cx(
        'comment-btn',
        'flex w-fit-content p-8 gap-4',
        isCustomLayout
            ? 'h-40'
            : 'h-40_max1023 h-fit-content_min1024 w-40_min1024 flex-column_l'
    )
});

export const onButtonClicked = (
    suscription,
    globalContent,
    bookmark,
    setBookmark,
    openBarrier
) => {
    if (suscription) {
        toggleBookmark({
            isDelete: bookmark,
            setBookmark,
            _globalContent: globalContent
        }).then(({ status, bookmarkContent }) => {
            const toastConfig = getStatusMessage(status, bookmarkContent);
            renderToast(toastConfig);
        });
    } else {
        openBarrier();
    }
};

export function BtnContainer({ children, withContainer, id }) {
    if (withContainer) {
        return (
            <div className="btn-container sm-none flex relative" id={id}>
                {children}
            </div>
        );
    }

    return children;
}

BtnContainer.propTypes = {
    children: PropTypes.node.isRequired,
    withContainer: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
};

const googleButtonBase = {
    dataEvent: 'LinkClick',
    dataSection: 'CompartirNotaLN',
    icon: <IconSprite name="googleColor" color />,
    title: 'Seguir a LA NACION en Google',
    id: 'btnGoogle',
    handleClick: () => {
        openGoogleDiscoverFollow();
    },
    labelDataLayer: 'seguir_google',
    iconOnly: false,
    customDataLayerEvent: {
        event: 'e_linkclick',
        action: 'toolbard',
        category: 'nota_ln9',
        label: 'seguir_google'
    }
};

const googleButtonVariants = {
    mobile: {
        className: 'l-none p-12 px-8 h-40',
        label: '+ Seguir',
        variant: 'secondary',
        iconSize: 18
    },
    desktop: {
        className: 'l-only flex-column-reverse_l',
        label: 'Seguir',
        variant: 'custom',
        iconSize: 24
    }
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
        className: noPaddingSmNone,
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
        className: noPaddingSmNone,
        labelDataLayer: 'copiar_link'
    },
    {
        dataEvent: 'LinkClick',
        dataSection: 'CompartirNotaLN',
        icon: <IconSprite name="facebook" />,
        title: 'Compartir la nota en Facebook',
        id: 'btnfacebook',
        handleClick: ({ requestUri, host }) => {
            popUpCompartirNotaFB(requestUri, host);
        },
        className: noPaddingSmNone,
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
        className: noPaddingSmNone,
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

export const googleButtons = [
    { ...googleButtonBase, ...googleButtonVariants.mobile },
    { ...googleButtonBase, ...googleButtonVariants.desktop }
];

export function isLN10IAHidden(renderables, glossary, summary) {
    const filteredItems = renderables.filter(
        item => item.collection === 'features' && item.type === 'LN-10/IA'
    );

    if (filteredItems.length === 0) {
        return true;
    }

    return filteredItems.some(item => {
        const { hideGlossary, hideSummary } = item.props.customFields;
        return (
            (!glossary && hideSummary) ||
            (!summary && hideGlossary) ||
            (hideSummary && hideGlossary)
        );
    });
}
