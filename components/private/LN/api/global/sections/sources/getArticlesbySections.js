import get from '../../../../../common/utils/get';
import acuArticlesSource from '../../../../../../../content/sources/acuArticlesSource';

const getParams = query => {
    const sectionId = get(query, 'sectionId', '');
    const size = get(query, 'size', '30');
    const restriction = get(query, 'restriction', null);
    const sections = get(query, 'sections', null);
    const page = get(query, 'page', '0');
    const website = get(query, 'website', '');

    const resp = {
        page,
        imageConfig: 'm',
        api: true
    };

    if (sections && sections?.length > 0) {
        const sectionsFormated = sections?.filter(x => x && x?.trim() !== '');
        return {
            ...resp,
            sectionsIds: JSON.stringify(sectionsFormated)
                .replace(/,/g, '+OR+')
                .replace('[', '(')
                .replace(']', ')'),
            sourceOrigin: 'composer',
            size: null,
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
        website
    };
};

const getArticlesbySections = async params => {
    try {
        const queryParams = getParams(params);
        //return { queryParams };
        const respAcumulados = await acuArticlesSource.fetch(queryParams);

        return respAcumulados;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error getArticlesAcumulados - content/apiPageAcumuladosSource :  params: ${JSON.stringify(
                params
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default getArticlesbySections;
