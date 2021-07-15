import { ARC_STATIC } from 'fusion:environment';
import getDomain from '../utils/getDomain';
import addRelatedImage from '../../LN/common/utils/addRelatedImage';
import addForwardSlash from '../../LN/common/utils/addForwardSlash';
import { RECETA } from '../utils/subtypes/subtypeHelper';

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
    descriptionDefault
}) => {
    let description = '';

    if (section === 'home') return descriptionDefault;

    if (isArticle) {
        description = subheadlinesBasic || '';
    }

    if (!isArticle) {
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
    return (url && `${domain}${url}${slash}`) || domain;
};

const getData = ({
    siteProperties,
    metaValue,
    globalContent,
    contextPath,
    deployment,
    arcSite,
    section
}) => {
    const domain = getDomain(globalContent);
    const isArticle = !!(globalContent && globalContent.type === 'story');
    const PLACEHOLDER = `${ARC_STATIC}${deployment(
        `${contextPath}/resources/images/placeholderLN.jpg`
    )}`;
    const {
        title: titleDefault,
        description: descriptionDefault,
        longTitle
    } = siteProperties;

    const {
        headlines = {},
        subheadlines = {},
        promo_items: promoItems = {},
        canonical_url: canonicalUrl,
        _id,
        publish_date: publishDate,
        subtype
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
        descriptionDefault
    });

    const validateTitle = () => (section === 'home' ? longTitle : titleDefault);

    return {
        type: isArticle ? 'article' : 'website',
        title: isArticle
            ? headlinesBasic || titleDefault
            : metaValue('title') || validateTitle(),
        description,
        image: typeBasicPI === 'image' && urlBasicPI ? pathImagen : PLACEHOLDER,
        url: getUrl(isArticle, url, domain),
        fbAppId: getAppId(siteProperties) || '',
        isArticle,
        ...(isArticle && { publishDate }),
        ...(isArticle && { tier: 'metered' }),
        subtype
    };
};
const setMetaDescription = (data, section) => {
    if (section === 'nota') {
        if (data.subtype === RECETA && data.description !== '') {
            return `${
                data.description.split('.', 1)[0]
            }. Encontrá acá la receta de ${data.title} - LA NACION`;
        }
        if (data.subtype === RECETA && data.description === '') {
            return `Encontrá acá la receta de ${data.title} - LA NACION`;
        }
        if (data.subtype !== RECETA && data.description !== '') {
            return `${data.description} - LA NACION`;
        }
        if (data.subtype !== RECETA && data.description === '') {
            return `${data.title} - LA NACION`;
        }
    }
    return data.description;
};

const setTitle = (data, section) => {
    if (section === 'nota') {
        return data.subtype === RECETA ? `Receta de ${data.title}` : data.title;
    }
    return data.title;
};

const getMetasOG = props => {
    const data = getData(props);
    const { section, siteProperties } = props;
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
            content: setTitle(data, section)
        },
        {
            property: 'og:description',
            content: setMetaDescription(data, section)
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
    if (['home', 'nota', 'acumulado'].includes(section)) {
        metas.push({
            property: 'og:site_name',
            content: siteProperties.title
        });
    }

    return metas;
};

export default getMetasOG;
