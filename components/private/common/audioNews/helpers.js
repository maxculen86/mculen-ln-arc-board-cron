import getAudioEvents from '../../../features/LN-10-global/common/utils/getAudioEvents';
import { scheduleTask } from '../utils/scheduleTask';
import { addEventToDataLayerV2 } from '../../LN/common/utils/addEventToDataLayer';

export const handleClickAudioNews = (
    onOpenAudioPlayer,
    globalContent,
    globalContentConfig,
    isSummary,
    closeTooltipIAAuthor,
    subscription,
    token,
    openBarrier,
    dataAudio
) => {
    if (subscription && token) {
        onOpenAudioPlayer();

        scheduleTask(() => closeTooltipIAAuthor());
    } else {
        openBarrier();
    }

    addEventToDataLayerV2({
        event: 'page_listened',
        rest: getAudioEvents(
            globalContent,
            globalContentConfig,
            isSummary,
            dataAudio
        )
    });
};

export const getTextAndIconColor = (isSummary, variant) => {
    const defaultText = 'Escuchando';

    if (variant === 'ia') {
        const text = !isSummary ? 'Escuchando al autor' : defaultText;
        return { text, iconColor: '#27D2BE' };
    }

    return { text: defaultText, iconColor: '#808080' };
};

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

export const a11yAttrsBarrierSub = {
    'aria-labelledby': 'barrier-audio-dialog-label',
    'aria-describedby': 'barrier-dialog-description'
};
