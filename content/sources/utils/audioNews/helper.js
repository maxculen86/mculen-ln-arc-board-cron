import get from '../../../../components/private/common/utils/get';
import config from './config';

const isValidDate = (publishDate = '', sectionId = '') => {
    const formatDate = publishDate.replace(/-|[a-z][^\/]+/gi, '');
    const releaseDateInAllSections = 20221013;

    if (sectionId.includes('espectaculos')) {
        const releaseDateInEspectaculos = 20220920;
        return Number(formatDate) >= releaseDateInEspectaculos;
    }

    return Number(formatDate) >= releaseDateInAllSections;
};

const hasParagraphs = contentElements =>
    contentElements.some(({ type = '' } = {}) => type === 'text');

const isNoteListenable = data => {
    const sourceOrigin = get(data, 'source.system', '');
    const subtype = get(data, 'subtype', '');
    const labelAudioNews = get(data, 'label.republicar_audio', null);
    const contentElements = get(data, 'content_elements', []);

    if (
        sourceOrigin === 'composer' &&
        labelAudioNews &&
        hasParagraphs(contentElements)
    ) {
        const date = get(data, 'last_updated_date', '');
        const sectionId = get(data, 'taxonomy.primary_section._id', '');
        const { disableSubtypes } = config;

        return (
            !disableSubtypes.includes(subtype) && isValidDate(date, sectionId)
        );
    }

    return false;
};

export default isNoteListenable;
