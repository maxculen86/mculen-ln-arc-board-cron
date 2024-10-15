import { ARC_STATIC } from 'fusion:environment';
import addRelatedImage from '../../LN/common/utils/addRelatedImage';
import getDomain from './getDomain';
import { getSectionOfRequestUri } from './outputTypeHelper';
import get from './get';
import transformISODate from './transformISODate';
import { isEmptyObject } from './isEmptyObject';
import { isEmptyString } from './dataValidation';
import { adjustImageDimensions } from '../../LN/common/utils/adjustImageDimensions';
import getImageAltText from '../../../features/foodit-global/common/utils/getImageAltText';

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

        if (newValue) {
            params.set(paramName, newValue);
        }

        parsedUrl.search = params.toString();
        return parsedUrl.toString();
    } catch (error) {
        return url;
    }
};

export const getImageProps = (
    acuOgImg,
    promoItemsBasic,
    placeholder,
    section
) => {
    const DEFAULTS = {
        height: '630',
        width: '1200',
        mimeType: 'image/png',
        alt: 'Placeholder de LA NACION'
    };

    if (acuOgImg?.url) {
        const {
            url,
            height = '',
            width = '',
            additional_properties: { mime_type: mimeType = '' } = {}
        } = acuOgImg;

        return {
            url,
            height,
            width,
            type: mimeType,
            alt: `Placeholder de ${section?.slice(1)} en LA NACION`
        };
    }

    if (!isEmptyObject(promoItemsBasic)) {
        const {
            type,
            url,
            originalSizes: {
                height = promoItemsBasic.height,
                width = promoItemsBasic.width
            } = {},
            embed = {},
            additional_properties: { mime_type: mimeType = '' } = {}
        } = promoItemsBasic;

        const { newHeight } = adjustImageDimensions(
            width,
            height,
            DEFAULTS.width
        );

        if (type === 'image' && isEmptyObject(embed)) {
            let newUrl;
            newUrl = modifyUrlParam(url, 'width', DEFAULTS.width);
            newUrl = modifyUrlParam(newUrl, 'height', newHeight);
            return {
                url: newUrl,
                height: String(newHeight),
                width: DEFAULTS.width,
                type: mimeType,
                alt: getImageAltText(promoItemsBasic)
            };
        }

        if (!isEmptyObject(embed)) {
            const jwPosterDefaultWidth = '1280';
            const jwPosterDefaultMimeType = 'image/jpeg';
            const newUrl = modifyUrlParam(url, 'width', jwPosterDefaultWidth);

            return {
                url: newUrl,
                height: undefined,
                width: jwPosterDefaultWidth,
                type: jwPosterDefaultMimeType,
                alt: getImageAltText(embed?.config?.videoJw)
            };
        }
    }

    return {
        url: placeholder,
        height: DEFAULTS.height,
        width: DEFAULTS.width,
        type: DEFAULTS.mimeType,
        alt: DEFAULTS.alt
    };
};

export const getData = ({
    siteProperties,
    metaValue,
    globalContent,
    globalContentConfig,
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

    const response = {
        type: isArticle ? 'article' : 'website',
        title: isArticle
            ? headlinesBasic || titleDefault
            : metaValue('title') ||
              validateTitle(section, longTitle, titleDefault),
        description,
        image: getImageProps(
            acuOgImg,
            promoItemsBasic,
            PLACEHOLDER,
            globalContentConfig?.query?.id
        ),
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

    return response;
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
                    5: () =>
                        !isEmptyString(data.description)
                            ? data.description
                            : `Video de ${data.title} - ${transformISODate(
                                  data.displayDate
                              )}`,
                    7: () =>
                        !isEmptyString(data.description)
                            ? `${
                                  data.description.split('.', 1)[0]
                              }. Encontrá acá la receta de ${data.title}`
                            : `Encontrá acá la receta de ${data.title}`,
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
