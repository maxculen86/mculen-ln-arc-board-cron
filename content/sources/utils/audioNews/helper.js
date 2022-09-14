import get from '../../../../components/private/common/utils/get';
import config from './config';

const isNoteListenable = data => {
    const sourceOrigin = get(data, 'source.system', '');
    const sectionId = get(data, 'taxonomy.primary_section._id', '');
    const subtype = get(data, 'subtype', '');

    if (sourceOrigin === 'composer') {
        const { enableSubtypes, enableSections } = config;
        const isEnableSubtype = enableSubtypes.includes(subtype);
        const isEnabledSection = enableSections.some(section =>
            sectionId.includes(section)
        );

        return isEnabledSection && isEnableSubtype;
    }

    return false;
};

export default isNoteListenable;
