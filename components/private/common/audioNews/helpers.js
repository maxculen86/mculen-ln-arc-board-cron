/* eslint-disable no-param-reassign */
/* eslint-disable */
import { DOMINIO_COOKIE } from 'fusion:environment';

export const handleClickAudioNews = (
    token,
    suscription,
    onOpenAudioPlayer,
    dispatch
) => {
    if (token && suscription) onOpenAudioPlayer();
    (!suscription || !token) &&
        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                open: true,
                origin: 'audioNews',
                typeAlert: 'exclusive-ln',
                typeModal: 'barrier'
            }
        });
};

export const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie =
        name +
        '=' +
        encodeURIComponent(value) +
        '; expires=' +
        expires +
        '; domain=' +
        DOMINIO_COOKIE +
        '; path=/';
};

export const getCookie = name => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
};

export const getTextAndIconColor = variant =>
    variant === 'ia'
        ? { text: 'Escuchando al autor', iconColor: '#27D2BE' }
        : { text: 'Escuchando', iconColor: '#808080' };

export const getAuthorsNameAndLink = authors => {
    const author =
        authors.length === 1
            ? authors.reduce((acc, val) => ({ name: val.name, link: val.link }))
            : authors.map(author => author.name);
    return { author };
};

export const IA_AUDIO_AUTHOR_TRACKING = {
    key: 'iaAudioAuthorTracking',
    value: 'wasClicked'
};

export function getTextDisclaimer({
    contentVariant = '',
    showVariantIa = false
}) {
    const textDisclaimer = {
        article: 'Voz realizada con IA',
        summary: 'Resumen realizado con IA',
        author: 'Voz de autor realizada con IA'
    };
    if (contentVariant === 'summary') {
        return textDisclaimer.summary;
    }
    if (showVariantIa) {
        return textDisclaimer.author;
    }
    return textDisclaimer.article;
}
