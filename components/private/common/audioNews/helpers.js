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

export const getTextAndIconColor = variant =>
    variant === 'ia'
        ? { text: 'Escuchando al autor', iconColor: '#27D2BE' }
        : { text: 'Escuchando', iconColor: '#808080' };

export const getAuthorsNameAndLink = authors => {
    const author =
        authors.length === 1 &&
        authors.reduce((acc, val) => ({ name: val.name, link: val.link }));
    return { author };
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
