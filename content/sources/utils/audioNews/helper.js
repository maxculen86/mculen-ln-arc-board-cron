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

    return {
        sourceOrigin,
        subtype,
        labelAudioNews,
        textAudioNews,
        date,
        contentElements,
        primarySectionId,
        displayDate
    };
};

const isValidDate = (date = '') => {
    const formatDate = date.replace(/-|[a-z][^/]+/gi, '');
    const releaseDateInAllSections = 20231123;

    return Number(formatDate) >= releaseDateInAllSections;
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

const isListenable = (data, validHasParagraphs = true) => {
    const {
        sourceOrigin,
        subtype,
        labelAudioNews,
        textAudioNews,
        date,
        contentElements,
        primarySectionId,
        displayDate
    } = getCommonProperties(data);

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
