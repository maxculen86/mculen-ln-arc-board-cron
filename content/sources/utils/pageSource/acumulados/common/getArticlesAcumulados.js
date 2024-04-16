import get from '../../../../../../components/private/common/utils/get';
import acuArticlesSource from '../../../../acuArticlesSource';

const getParamsAcus = query => {
    const sectionId =
        (get(query, 'sectionId') || '').length > 0
            ? get(query, 'sectionId', '')
            : null;
    const size = get(query, 'size', '30');
    const restriction = get(query, 'restriction', null);
    const sections = get(query, 'sections', null);
    const page = get(query, 'page', '1');
    const website = get(query, 'website', '');
    const tagId = get(query, 'tagId', null);
    const authorId = get(query, 'authorId', null);

    const resp = {
        page,
        imageConfig: 'm',
        api: true
    };

    if (sections && sections.length && sections.length > 0) {
        const sectionsFormated = sections.filter(x => x && x.trim() !== '');
        return {
            ...resp,
            sectionsIds: JSON.stringify(sectionsFormated)
                .replace(/,/g, '+OR+')
                .replace('[', '(')
                .replace(']', ')'),
            sourceOrigin: 'composer',
            size,
            website
        };
    }

    let excludeSourceOrigin = '';
    if (restriction && restriction === 'false') {
        excludeSourceOrigin = 'ArcImporter-LnData';
    }

    return {
        ...resp,
        sectionId,
        size,
        excludeSourceOrigin,
        'arc-site': website,
        tagId,
        authorId
    };
};

const getArticlesAcumulados = async (params, { cachedCall } = {}) => {
    try {
        const queryParams = getParamsAcus(params);
        return await acuArticlesSource.fetch(queryParams, { cachedCall });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error getArticlesAcumulados :  params: ${JSON.stringify(
                params
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default getArticlesAcumulados;
