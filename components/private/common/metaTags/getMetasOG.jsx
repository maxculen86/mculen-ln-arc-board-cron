import {
    getData,
    buildOgMetas,
    buildArticleMetas,
    buildFbMetas,
    buildTwitterMetas
} from '../utils/getMetasOGHelper';
import { getSectionOfRequestUri } from '../utils/outputTypeHelper';
import { RECETA } from '../utils/subtypes/subtypeHelper';

const getMetasOG = props => {
    const {
        title = '',
        section,
        siteProperties,
        arcSite,
        requestUri,
        metaValue,
        subtype,
        globalContent = {},
        globalContentConfig
    } = props;

    const data = getData(props);
    const {
        displayDate,
        firstPublishDate,
        lastUpdatedDate,
        image,
        fbAppId,
        type,
        url,
        isArticle,
        authors,
        primarySection,
        tags,
        twitterAccount
    } = data;

    const isReceta = subtype === RECETA;
    const isRecetaOrMisNotas =
        getSectionOfRequestUri(requestUri) === 'mis-notas' || isReceta;

    const metaTitleFromPB = isReceta ? title : metaValue('title') || '';

    const pageBuilderTitle = isRecetaOrMisNotas
        ? metaTitleFromPB
        : metaTitleFromPB.replace(' - LA NACION', '');

    const ogMetas = buildOgMetas({
        type,
        arcSite,
        pageBuilderTitle,
        section,
        siteProperties,
        data,
        requestUri,
        metaValue,
        image,
        url,
        globalContent,
        globalContentConfig
    });
    const fbMetas = buildFbMetas(fbAppId);
    const twitterMetas = buildTwitterMetas({
        image,
        arcSite,
        pageBuilderTitle,
        section,
        data,
        requestUri,
        metaValue,
        url,
        twitterAccount
    });
    const articleMetas = buildArticleMetas(isArticle, {
        firstPublishDate,
        displayDate,
        lastUpdatedDate,
        primarySection,
        authors,
        tags
    });

    return [...fbMetas, ...ogMetas, ...articleMetas, ...twitterMetas];
};

export default getMetasOG;
