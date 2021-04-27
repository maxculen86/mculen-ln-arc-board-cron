import { SITE_LANACION, ARC_STATIC } from 'fusion:environment';
import getDomain from '../utils/getDomain';
import addRelatedImage from '../../LN/common/utils/addRelatedImage';

const getAppId = siteProperties =>
    siteProperties &&
    siteProperties.shareConfig &&
    siteProperties.shareConfig.facebook &&
    siteProperties.shareConfig.facebook.appID
        ? siteProperties.shareConfig.facebook.appID
        : undefined;

const getDescription = (
    isArticle,
    metaValue,
    subheadlinesBasic,
    descriptionDefault,
    url = ''
) => {
    let description = '';
    if (isArticle) {
        description = subheadlinesBasic || descriptionDefault;
    }
    if (!isArticle && !url.includes('recetas')) {
        const customTitle =
            metaValue('title') === 'Últimas noticias - LA NACION'
                ? 'del día de hoy en Argentina'
                : `de ${metaValue('title')}`;
        description = `Últimas Noticias ${customTitle}` || descriptionDefault;
    }
    return description;
};

const getUrl = (isArticle, url, domain) => {
    const slash = url && url.slice(-1) !== '/' ? '/' : '';
    if (isArticle) return (url && `${domain}${url}${slash}`) || domain;
    return (
        (url && !url.includes('recetas') && `${domain}${url}${slash}`) || domain
    );
};

const getData = ({
    siteProperties,
    metaValue,
    globalContent,
    contextPath,
    deployment,
    arcSite
}) => {
    const domain = getDomain(globalContent);
    const isArticle = !!(globalContent && globalContent.type === 'story');
    const PLACEHOLDER = `${ARC_STATIC}${deployment(
        `${contextPath}/resources/images/placeholderLN.jpg`
    )}`;
    const { title } = siteProperties;

    const {
        headlines = {},
        subheadlines = {},
        promo_items: promoItems = {},
        canonical_url: canonicalUrl,
        _id,
        publish_date: publishDate
    } = addRelatedImage(globalContent) || {};

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

    const pathImagen = urlBasicPI;
    const url = canonicalUrl || _id;
    const description = getDescription(
        isArticle,
        metaValue,
        subheadlinesBasic,
        DEFAULT.DESCRIPTION,
        url
    );

    return {
        type: isArticle ? 'article' : 'website',
        title: isArticle
            ? headlinesBasic || DEFAULT.TITLE
            : metaValue('title') || title || DEFAULT.TITLE,
        description,
        image:
            typeBasicPI === 'image' && urlBasicPI ? pathImagen : DEFAULT.IMAGE,
        url: getUrl(isArticle, url, domain),
        fbAppId: getAppId(siteProperties) || DEFAULT.FB_APP_ID,
        isArticle,
        ...(isArticle && { publishDate }),
        ...(isArticle && { tier: 'metered' })
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
    if (data.isArticle) {
        metas.push({
            property: 'article:published_time',
            content: data.publishDate
        });
    }
    return metas;
};

export default getMetasOG;
