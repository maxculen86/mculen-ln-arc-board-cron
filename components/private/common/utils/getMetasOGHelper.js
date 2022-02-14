import { ARC_STATIC } from 'fusion:environment';
import addRelatedImage from '../../LN/common/utils/addRelatedImage';
import getDomain from './getDomain';
import { RECETA } from './subtypes/subtypeHelper';

export const getAppId = siteProperties =>
    siteProperties &&
    siteProperties.shareConfig &&
    siteProperties.shareConfig.facebook &&
    siteProperties.shareConfig.facebook.appID
        ? siteProperties.shareConfig.facebook.appID
        : undefined;

export const getDescription = ({
    isArticle,
    subheadlinesBasic,
    section,
    descriptionDefault,
    metaDescription
}) => {
    if (section === 'home') return descriptionDefault;

    if (isArticle) return subheadlinesBasic || '';

    return metaDescription;
};

export const getUrl = (url, domain) => {
    const slash = url && url.slice(-1) !== '/' ? '/' : '';
    return (url && `${domain}${url}${slash}`) || domain;
};

export const validateTitle = (section, longTitle, titleDefault) =>
    section === 'home' ? longTitle : titleDefault;

export const getData = ({
    siteProperties,
    metaValue,
    globalContent,
    contextPath,
    deployment,
    section,
    metaDescription
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
        subheadlinesBasic,
        section,
        descriptionDefault,
        metaDescription
    });

    return {
        type: isArticle ? 'article' : 'website',
        title: isArticle
            ? headlinesBasic || titleDefault
            : metaValue('title') ||
              validateTitle(section, longTitle, titleDefault),
        description,
        image: typeBasicPI === 'image' && urlBasicPI ? pathImagen : PLACEHOLDER,
        url: getUrl(url, domain),
        fbAppId: getAppId(siteProperties) || '',
        isArticle,
        ...(isArticle && { publishDate }),
        ...(isArticle && { tier: 'metered' }),
        subtype
    };
};

export const setMetaDescription = (data, section) => {
    if (section === 'nota') {
        if (data.subtype === RECETA && data.description !== '') {
            return `${
                data.description.split('.', 1)[0]
            }. Encontrá acá la receta de ${data.title}`;
        }
        if (data.subtype === RECETA && data.description === '') {
            return `Encontrá acá la receta de ${data.title}`;
        }
        if (data.subtype !== RECETA && data.description !== '') {
            return `${data.description}`;
        }
        if (data.subtype !== RECETA && data.description === '') {
            return `${data.title}`;
        }
    }
    return data.description;
};
