import { SITE_LANACION } from 'fusion:environment';
import getAssetsPath from '../utils/getAssetsPath';

const isNote = globalContent =>
    !!(globalContent && globalContent.type === 'story');

const getData = ({
    siteProperties,
    metaValue,
    globalContent,
    contextPath,
    deployment
}) => {
    const isArticle = isNote(globalContent);
    const PLACEHOLDER = getAssetsPath(contextPath)(deployment)(
        'placeholderLN.jpg'
    );
    const {
        headlines = {},
        subheadlines = {},
        promo_items: promoItems = {},
        canonical_url: canonicalUrl
    } = globalContent || {};
    const { basic: headlinesBasic } = headlines;
    const { basic: subheadlinesBasic } = subheadlines;
    const { basic: promoItemsBasic = {} } = promoItems;
    const { type: typeBasicPI, url: urlBasicPI } = promoItemsBasic;

    const DEFAULT = {
        TITLE: 'LA NACION',
        DESCRIPTION: '',
        IMAGE: PLACEHOLDER,
        URL: SITE_LANACION,
        FB_APP_ID: ''
    };

    return {
        type: isArticle ? 'article' : 'website',
        title: isArticle
            ? headlinesBasic || DEFAULT.TITLE
            : metaValue('title') || siteProperties.title || DEFAULT.TITLE,
        description: isArticle
            ? subheadlinesBasic || DEFAULT.DESCRIPTION
            : metaValue('description') || DEFAULT.DESCRIPTION,
        image:
            typeBasicPI === 'image' && urlBasicPI
                ? `${SITE_LANACION}${urlBasicPI}`
                : DEFAULT.IMAGE,
        url:
            (canonicalUrl && `${SITE_LANACION}${canonicalUrl}`) ||
            DEFAULT.SITE_LANACION
        // TODO: considerar agregar el fbAppId para evitar los warning del depurador de FB
        // fbAppId:
        //     (siteProperties && siteProperties.shareConfig.facebook.appID) ||
        //     DEFAULT.FB_APP_ID;
    };
};

const getMetasOG = props => {
    const data = getData(props);

    const metas = [
        {
            property: 'og:type',
            content: data.type
        },
        {
            property: 'og:title',
            content: data.title
        },
        {
            property: 'og:description',
            content: data.description
        },
        {
            property: 'og:image',
            content: data.image
        },
        {
            property: 'og:url',
            content: data.url
        }
        // TODO: considerar agregar el fbAppId para evitar los warning del depurador de FB
        //     name: 'fb:app_id',
        //     content: data.fbAppId
    ];
    return metas;
};

export default getMetasOG;
