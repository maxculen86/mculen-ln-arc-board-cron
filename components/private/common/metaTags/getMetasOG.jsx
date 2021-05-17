import { SITE_LANACION, ARC_STATIC } from 'fusion:environment';
import getDomain from '../utils/getDomain';
import addRelatedImage from '../../LN/common/utils/addRelatedImage';
import addForwardSlash from '../../LN/common/utils/addForwardSlash';

const getAppId = siteProperties =>
    siteProperties &&
    siteProperties.shareConfig &&
    siteProperties.shareConfig.facebook &&
    siteProperties.shareConfig.facebook.appID
        ? siteProperties.shareConfig.facebook.appID
        : undefined;

const getDescription = ({
    isArticle,
    metaValue,
    subheadlinesBasic,
    section,
    DEFAULT_DEPORTES,
    DEFAULT_DESCRIPTION,
    DEFAULT_ULTIMAS_NOTICIAS,
    title
}) => {
    let description = '';

    if (isArticle) {
        description = subheadlinesBasic || DEFAULT_DESCRIPTION;
    } else {
        const setDescription = (title, metaTitle) => {
            if (metaTitle) return `Últimas Noticias de ${metaTitle}`;
            else {
                return title === DEFAULT_DEPORTES
                    ? DEFAULT_DEPORTES
                    : DEFAULT_DESCRIPTION;
            }
        };

        description =
            title === DEFAULT_ULTIMAS_NOTICIAS
                ? 'Últimas Noticias del día de hoy en Argentina'
                : setDescription(title, metaValue('title'));
    }

    return description;
};

const getUrl = (isArticle, url, domain) => {
    const slash = url && url.slice(-1) !== '/' ? '/' : '';
    return (url && `${domain}${url}${slash}`) || domain;
};

const getData = ({
    siteProperties,
    metaValue,
    globalContent,
    contextPath,
    deployment,
    section,
    title
}) => {
    const domain = getDomain(globalContent);
    const isArticle = !!(globalContent && globalContent.type === 'story');
    const PLACEHOLDER = `${ARC_STATIC}${deployment(
        `${contextPath}/resources/images/placeholderLN.jpg`
    )}`;

    const {
        longTitle: DEFAULT_TITLE,
        deportesTitle: DEFAULT_DEPORTES,
        description: DEFAULT_DESCRIPTION,
        ultimasNoticiasTitle: DEFAULT_ULTIMAS_NOTICIAS
    } = siteProperties;

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

    const pathImagen = urlBasicPI;
    const url = canonicalUrl || _id;
    const description = getDescription({
        isArticle,
        metaValue,
        subheadlinesBasic,
        section,
        DEFAULT_DEPORTES,
        DEFAULT_DESCRIPTION,
        DEFAULT_ULTIMAS_NOTICIAS,
        title
    });

    return {
        type: isArticle ? 'article' : 'website',
        title: isArticle
            ? headlinesBasic || DEFAULT_TITLE
            : metaValue('title') || title,
        description,
        image: typeBasicPI === 'image' && urlBasicPI ? pathImagen : PLACEHOLDER,
        url: getUrl(isArticle, url, domain),
        fbAppId: getAppId(siteProperties),
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
            content: addForwardSlash(data.url)
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
