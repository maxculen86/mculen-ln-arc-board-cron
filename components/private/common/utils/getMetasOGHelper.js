import { ARC_STATIC } from 'fusion:environment';
import addRelatedImage from '../../LN/common/utils/addRelatedImage';
import getDomain from './getDomain';
import { getSectionOfRequestUri } from './outputTypeHelper';
import get from './get';
import transformISODate from './transformISODate';
import { isEmptyObject } from './isEmptyObject';
import { isEmptyString } from './dataValidation';
import { adjustImageDimensions } from '../../LN/common/utils/adjustImageDimensions';

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

export const modifyUrlParam = (url, paramName, newValue) => {
    try {
        const parsedUrl = new URL(url);
        const params = new URLSearchParams(parsedUrl.search);

        params.set(paramName, newValue);
        parsedUrl.search = params.toString();

        return parsedUrl.toString();
    } catch (error) {
        return url;
    }
};

export const getImageProps = (acuOgImg, promoItemsBasic, placeholder) => {
    const defaultHeight = '630';
    const defaultWidth = '1200';

    if (acuOgImg?.url) {
        const { url, height = '', width = '' } = acuOgImg;
        return { url, height, width };
    }

    if (!isEmptyObject(promoItemsBasic)) {
        const {
            type,
            url,
            originalSizes: { width, height }
        } = promoItemsBasic;
        const { newHeight } = adjustImageDimensions(
            width,
            height,
            defaultWidth
        );

        if (type === 'image') {
            let newUrl;
            newUrl = modifyUrlParam(url, 'width', defaultWidth);
            newUrl = modifyUrlParam(newUrl, 'height', newHeight);

            return {
                url: newUrl,
                height: String(newHeight),
                width: defaultWidth
            };
        }
    }

    return { url: placeholder, height: defaultHeight, width: defaultWidth };
};

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
    const imagePath = `${contextPath}/resources/images/placeholderLN-1200x630.png`;
    const PLACEHOLDER = `${ARC_STATIC}${deployment(imagePath)}`;
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
        subtype,
        acuOgImg = {},
        display_date: displayDate = '',
        first_publish_date: firstPublishDate = '',
        last_updated_date: lastUpdatedDate = ''
    } = addRelatedImage(globalContent) || {};

    const { basic: headlinesBasic } = headlines;
    const { basic: subheadlinesBasic } = subheadlines;
    const { basic: promoItemsBasic = {} } = promoItems;

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
        image: getImageProps(acuOgImg, promoItemsBasic, PLACEHOLDER),
        url: getUrl(url, domain),
        fbAppId: getAppId(siteProperties) || '',
        isArticle,
        ...(isArticle && {
            publishDate,
            displayDate,
            firstPublishDate,
            lastUpdatedDate,
            tier: 'metered'
        }),
        subtype
    };
};

export const setMetaDescription = ({
    data,
    section,
    arcSite = 'la-nacion-ar',
    ottMetaDescription,
    requestUri,
    metaValue
}) => {
    const options = {
        'la-nacion-ar': () => {
            const defaultDescription = !isEmptyString(data.description)
                ? `${data.description}`
                : `${data.title}`;

            if (section === 'nota') {
                const optionsNote = {
                    '5': () => {
                        return !isEmptyString(data.description)
                            ? data.description
                            : `Video de ${data.title} - ${transformISODate(
                                  data.displayDate
                              )}`;
                    },
                    '7': () => {
                        return !isEmptyString(data.description)
                            ? `${
                                  data.description.split('.', 1)[0]
                              }. Encontrá acá la receta de ${data.title}`
                            : `Encontrá acá la receta de ${data.title}`;
                    },
                    default: () => defaultDescription
                };

                return get(optionsNote, data.subtype, optionsNote.default)();
            }

            if (getSectionOfRequestUri(requestUri) === 'mis-notas') {
                return (
                    (metaValue && metaValue('description')) ||
                    defaultDescription
                );
            }

            return data.description;
        },
        ott: () => ottMetaDescription
    };

    return options[arcSite]();
};

export const setMetaTitle = ({
    arcSite = 'la-nacion-ar',
    pageBuilderTitle,
    ottMetaTitle
}) => {
    const options = {
        'la-nacion-ar': () => pageBuilderTitle,
        ott: () => ottMetaTitle
    };

    return options[arcSite]();
};
