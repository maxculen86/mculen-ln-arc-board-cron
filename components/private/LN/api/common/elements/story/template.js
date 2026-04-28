import {
    HOWTO,
    LIVEBLOG,
    NOTICIA,
    VIDEO,
    VIDEOAL100
} from '../../../../../common/utils/subtypes/subtypeHelper';

export const getStoryTemplate = templateId => {
    const templateMap = {
        [LIVEBLOG]: NOTICIA,
        [HOWTO]: NOTICIA,
        [VIDEOAL100]: VIDEO
    };

    return templateMap[templateId] || templateId;
};
