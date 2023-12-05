import get from '../../../../components/private/common/utils/get';
import config from './config';

const isValidDate = (publishDate = '') => {
    const formatDate = publishDate.replace(/-|[a-z][^\/]+/gi, '');
    const releaseDateInAllSections = 20231123;

    return Number(formatDate) >= releaseDateInAllSections;
};

const hasParagraphs = contentElements =>
    contentElements.some(({ type = '' } = {}) => type === 'text');

const isNoteListenable = data => {
    const sourceOrigin = get(data, 'source.system', '');
    const subtype = get(data, 'subtype', '');
    const labelAudioNews = get(data, 'label.republicar_audio', null);
    const textAudioNews = get(data, 'label.republicar_audio.text', null);
    const contentElements = get(data, 'content_elements', []);

    if (
        sourceOrigin === 'composer' &&
        labelAudioNews &&
        textAudioNews !== 'No mostrar audio' &&
        hasParagraphs(contentElements)
    ) {
        const date = get(data, 'last_updated_date', '');
        const { disableSubtypes } = config;

        return !disableSubtypes.includes(subtype) && isValidDate(date);
    }

    return false;
};

export const isNoteListenableHome = data => {
    const sourceOrigin = get(data, 'source.system', '');
    const subtype = get(data, 'subtype', '');
    const labelAudioNews = get(data, 'label.republicar_audio', null);
    const textAudioNews = get(data, 'label.republicar_audio.text', null);

    if (
        (sourceOrigin === 'composer' || sourceOrigin === '') &&
        labelAudioNews &&
        textAudioNews !== 'No mostrar audio'
    ) {
        const date = get(
            data,
            'last_updated_date',
            get(data, 'display_date', '')
        );

        const { disableSubtypes } = config;

        return !disableSubtypes.includes(subtype) && isValidDate(date);
    }

    return false;
};

export default isNoteListenable;
