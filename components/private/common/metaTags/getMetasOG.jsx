import { SITE_LANACION, IS_DEV, IS_SANDBOX } from 'fusion:environment';
import getDomain from '../utils/getDomain';

const getData = ({
    siteProperties,
    metaValue,
    globalContent,
    contextPath,
    deployment,
    arcSite
}) => {
    const domain = getDomain(arcSite, globalContent);
    const isArticle = !!(globalContent && globalContent.type === 'story');
    const PLACEHOLDER = `${SITE_LANACION}${deployment(
        `${contextPath}/resources/images/placeholderLN.jpg`
    )}`;

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

    let pathImagen = urlBasicPI;
    if (IS_DEV !== 'true' && IS_SANDBOX !== 'true') {
        pathImagen = `${SITE_LANACION}${urlBasicPI}`;
    }

    return {
        type: isArticle ? 'article' : 'website',
        title: isArticle
            ? headlinesBasic || DEFAULT.TITLE
            : metaValue('title') || siteProperties.title || DEFAULT.TITLE,
        description: isArticle
            ? subheadlinesBasic || DEFAULT.DESCRIPTION
            : metaValue('description') || DEFAULT.DESCRIPTION,
        image:
            typeBasicPI === 'image' && urlBasicPI ? pathImagen : DEFAULT.IMAGE,
        url: (canonicalUrl && `${domain}${canonicalUrl}`) || domain,
        fbAppId:
            (siteProperties && siteProperties.shareConfig.facebook.appID) ||
            DEFAULT.FB_APP_ID
    };
};

const getMetasOG = props => {
    const data = getData(props);

    const metas = [
        {
            property: 'fb_app_id',
            content: data.fbAppId
        },
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
    ];
    return metas;
};

export default getMetasOG;
