import {
    getData,
    buildOgMetas,
    buildArticleMetas,
    buildFbMetas,
    buildTwitterMetas
} from '../utils/getMetasOGHelper';
import { getSectionOfRequestUri } from '../utils/outputTypeHelper';
import { RECETA } from '../utils/subtypes/subtypeHelper';
import config from '../../../../properties/sites/la-nacion-ar';

const getMetasOG = props => {
    const {
        title = '',
        section,
        siteProperties,
        arcSite,
        ottMetaTitle,
        ottMetaDescription,
        requestUri,
        metaValue,
        subtype,
        layout,
        globalContent = {},
        globalContentConfig
    } = props;

    const { layoutsName = {} } = config || {};
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
        ottMetaTitle,
        data,
        ottMetaDescription,
        requestUri,
        metaValue,
        image,
        url,
        layout,
        layoutsName,
        globalContent,
        globalContentConfig
    });
    const fbMetas = buildFbMetas(fbAppId);
    const twitterMetas = buildTwitterMetas({
        image,
        arcSite,
        pageBuilderTitle,
        section,
        siteProperties,
        ottMetaTitle,
        data,
        ottMetaDescription,
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
