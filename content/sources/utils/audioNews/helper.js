import get from '../../../../components/private/common/utils/get';
import config from './config';

const { disableSubtypes } = config;

const getCommonProperties = data => {
    const sourceOrigin = get(data, 'source.system', '');
    const subtype = get(data, 'subtype', '');
    const labelAudioNews = get(data, 'label.republicar_audio', null);
    const textAudioNews = get(data, 'label.republicar_audio.text', '');
    const date = get(data, 'first_publish_date', '');
    const displayDate = get(data, 'display_date', '');
    const contentElements = get(data, 'content_elements', []);
    const primarySectionId = get(data, 'taxonomy.primary_section._id', '');
    const audioStatus = get(
        data,
        'promo_items.audio_nota.embed.config.audio_status',
        null
    );

    return {
        sourceOrigin,
        subtype,
        labelAudioNews,
        textAudioNews,
        date,
        contentElements,
        primarySectionId,
        displayDate,
        audioStatus
    };
};

export const isValidDate = (date = '', releaseDate = 20231123) => {
    const formatDate = date.replace(/-|[a-z][^/]+/gi, '');
    return Number(formatDate) >= releaseDate;
};

const hasParagraphs = contentElements =>
    contentElements.some(({ type = '' } = {}) => type === 'text');

const isSectionNoListenable = primarySectionId => {
    const regex = /^\/(juegos|newsletters)/i;
    return regex.test(primarySectionId);
};

const isSectionEstadosUnidosListenable = (primarySectionId, date = '') => {
    const regex = /^\/(estados-unidos)/i;
    const formatDate = date.replace(/-|[a-z][^/]+/gi, '');
    const releaseDateSection = 20250217;

    if (regex.test(primarySectionId)) {
        return Number(formatDate) >= releaseDateSection;
    }
    return true;
};

const AUDIO_STATUS = {
    CREATED_AUDIO: 6,
    UPDATED_AUDIO: 7
};

const RELEASE_DATE_FOR_AUDIO_STATUS = 20250325;

export const isAudioGenerated = (audioStatus = null) =>
    audioStatus === AUDIO_STATUS.CREATED_AUDIO ||
    audioStatus === AUDIO_STATUS.UPDATED_AUDIO;

const isListenable = (data, validHasParagraphs = true) => {
    const {
        sourceOrigin,
        subtype,
        labelAudioNews,
        textAudioNews,
        date,
        contentElements,
        primarySectionId,
        displayDate,
        audioStatus
    } = getCommonProperties(data);

    if (audioStatus !== null) {
        const shouldShowAudio = isAudioGenerated(audioStatus);
        const isAudioAllowedByLabel = textAudioNews !== 'No mostrar audio';

        return shouldShowAudio && isAudioAllowedByLabel;
    }

    const publishedDate = date || displayDate;
    if (
        audioStatus === null &&
        isValidDate(publishedDate, RELEASE_DATE_FOR_AUDIO_STATUS)
    ) {
        return false;
    }

    return (
        (sourceOrigin === 'composer' || sourceOrigin === '') &&
        (labelAudioNews ? textAudioNews !== 'No mostrar audio' : true) &&
        !isSectionNoListenable(primarySectionId) &&
        isSectionEstadosUnidosListenable(
            primarySectionId,
            date || displayDate
        ) &&
        !disableSubtypes.includes(subtype) &&
        (isValidDate(date) || isValidDate(displayDate)) &&
        (validHasParagraphs ? hasParagraphs(contentElements) : true)
    );
};

const isNoteListenable = data => isListenable(data);

export const isNoteListenableHome = data => isListenable(data, false);

export const isCustomVoice = data =>
    data?.voice !== undefined && data?.voice != null;

export default isNoteListenable;
