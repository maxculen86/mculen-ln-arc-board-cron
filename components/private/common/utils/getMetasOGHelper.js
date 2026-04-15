import { ARC_STATIC, SITE_LANACION } from 'fusion:environment';
import addRelatedImage from '../../LN/common/utils/addRelatedImage';
import replaceUrlResizerToWWW from '../../../../content/sources/utils/replaceUrlResizerToWWW';
import { getSectionOfRequestUri } from './outputTypeHelper';
import get from './get';
import transformISODate from './transformISODate';
import { isEmptyObject } from './isEmptyObject';
import { isEmptyString } from './dataValidation';
import getImageAltText from '../../../features/foodit-global/common/utils/getImageAltText';
import { addForwardSlash } from '../../LN/common/utils/addForwardSlash';
import {
    getModifiedDate,
    getPublishDate
} from './schema/liveBlog/generatePostObject';
import removeExtraSpaces from './removeExtraSpaces';
import { getEconomicIndicesMetaData } from '../../../../content/sources/utils/servicesSource/economicIndices/_helpers';

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
    metaDescription,
    isEconomicIndices,
    metaDescriptionIndices,
    requestUri
}) => {
    if (isEconomicIndices && metaDescriptionIndices)
        return metaDescriptionIndices;

    if (requestUri?.startsWith('/economia/indices'))
        return getEconomicIndicesMetaData('default').description;

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
        ogHeight: '675',
        quality: '85',
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
        const acuOgImgWithWWW = replaceUrlResizerToWWW({
            type: 'image',
            url,
            resized_urls: []
        });
        const acuOgImgUrl = get(acuOgImgWithWWW, 'url', url);

        return {
            url: acuOgImgUrl,
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
            embed = {},
            additional_properties: { mime_type: mimeType = '' } = {}
        } = promoItemsBasic;

        if (type === 'image' && isEmptyObject(embed)) {
            const promoItemsBasicWithWWW =
                replaceUrlResizerToWWW(promoItemsBasic);

            const resizedEntry = (
                promoItemsBasicWithWWW.resized_urls || []
            ).find(({ option: { width: w } = {} }) => Number(w) === 1200);

            if (resizedEntry?.resizedUrl) {
                const realHeight =
                    resizedEntry.resizedUrl.match(/height=(\d+)/)?.[1];

                return {
                    url: resizedEntry.resizedUrl,
                    height:
                        realHeight ||
                        String(
                            resizedEntry.option?.height || DEFAULTS.ogHeight
                        ),
                    width: String(resizedEntry.option?.width || DEFAULTS.width),
                    type: mimeType,
                    alt: getImageAltText(promoItemsBasic)
                };
            }

            const promoItemsBasicUrl = get(promoItemsBasicWithWWW, 'url', url);
            let newUrl;
            newUrl = modifyUrlParam(
                promoItemsBasicUrl,
                'width',
                DEFAULTS.width
            );
            newUrl = modifyUrlParam(newUrl, 'height', DEFAULTS.ogHeight);
            newUrl = modifyUrlParam(newUrl, 'quality', DEFAULTS.quality);
            newUrl = modifyUrlParam(newUrl, 'smart', true);

            return {
                url: newUrl,
                height: DEFAULTS.ogHeight,
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

export const ensureAtSymbol = username =>
    username && !username.startsWith('@') ? `@${username}` : username;

export const getTwitterLink = author => {
    if (!author || isEmptyObject(author)) return null;

    return author?.social_links?.find(
        link => link?.site === 'twitter' && link?.url
    )?.url;
};

export const getData = ({
    siteProperties,
    metaValue,
    globalContent = {},
    globalContentConfig,
    contextPath,
    deployment,
    section,
    metaDescription,
    layout,
    requestUri
}) => {
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

    const contentUrl = canonicalUrl || _id;

    const isEconomicIndicesPage =
        get(globalContent, 'serviceType', '') === 'detalle-indices' ||
        requestUri?.startsWith('/economia/indices');

    const isDistributor = get(globalContent, 'node_type') === 'distributor';

    const getPageUrl = () => {
        if (layout === 'LN-mapa-del-sitio') return '/mapa-del-sitio';
        if (isEconomicIndicesPage || isDistributor)
            return requestUri?.split('?')[0];
        return contentUrl;
    };

    const url = getPageUrl();

    const description = getDescription({
        isArticle,
        subheadlinesBasic,
        section,
        descriptionDefault,
        metaDescription,
        isEconomicIndices:
            get(globalContent, 'serviceType', '') === 'detalle-indices',
        metaDescriptionIndices: get(
            globalContent,
            'metaData.description',
            descriptionDefault
        ),
        requestUri
    });

    const authors = get(globalContent, 'credits.by', []);

    const twitterAccount = ensureAtSymbol(
        getTwitterLink(authors[0]) ?? '@LANACION'
    );

    return {
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
        url: getUrl(url, SITE_LANACION),
        fbAppId: getAppId(siteProperties) || '',
        isArticle,
        ...(isArticle && {
            publishDate,
            displayDate,
            firstPublishDate,
            lastUpdatedDate,
            tier: 'metered',
            authors,
            tags: get(globalContent, 'taxonomy.tags', []),
            primarySection: get(
                globalContent,
                'taxonomy.primary_section.name',
                ''
            )
        }),
        subtype,
        twitterAccount
    };
};

export const setMetaDescription = ({
    data,
    section,
    arcSite = 'la-nacion-ar',
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
        }
    };

    return options[arcSite]();
};

export const setMetaTitle = ({
    arcSite = 'la-nacion-ar',
    pageBuilderTitle
}) => {
    const options = {
        'la-nacion-ar': () => removeExtraSpaces(pageBuilderTitle)
    };

    return options[arcSite]();
};

export const getDataForProfileType = (
    globalContent = {},
    globalContentConfig = {}
) => {
    const {
        isWiki,
        firstName,
        lastName,
        middleName = '',
        wikiSourceData: {
            schemas_info: {
                family_name: familyName = '',
                given_name: givenName = '',
                additional_name: additionalName = ''
            } = {}
        } = {}
    } = globalContent;

    const { query: { slug = '', _id: slugAuthor = '' } = {} } =
        globalContentConfig;

    if (isWiki) {
        const additionalNameWithSpace = additionalName
            ? ` ${additionalName}`
            : '';
        return {
            profileName: `${givenName}${additionalNameWithSpace}`,
            profileLastName: familyName,
            profileUsername: decodeURIComponent(slug)
        };
    }

    const middleNameWithSpace = middleName ? ` ${middleName}` : '';
    return {
        profileName: `${firstName}${middleNameWithSpace}`,
        profileLastName: lastName,
        profileUsername: decodeURIComponent(slugAuthor)
    };
};

export const buildOgMetas = params => {
    const {
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
        globalContent = {},
        globalContentConfig = {}
    } = params;
    const WIKI_PERSON = 1;
    const ogProfileType =
        (globalContent?.isWiki &&
            globalContent?.wikiSourceData?.type === WIKI_PERSON) ||
        globalContent?.node_type === 'author';
    let profileTagsInfo = {};
    if (ogProfileType) {
        profileTagsInfo = getDataForProfileType(
            globalContent,
            globalContentConfig
        );
    }
    return [
        { property: 'og:type', content: ogProfileType ? 'profile' : type },
        {
            property: 'og:title',
            content: setMetaTitle({
                arcSite,
                pageBuilderTitle
            })
        },
        {
            property: 'og:description',
            content: setMetaDescription({
                data,
                section,
                arcSite,
                requestUri,
                metaValue
            })
        },
        { property: 'og:locale', content: 'es_AR' },
        { property: 'og:image', content: image.url },
        { property: 'og:image:type', content: image.type },
        ...(image.alt
            ? [{ property: 'og:image:alt', content: image.alt }]
            : []),
        { property: 'og:image:width', content: image.width },
        ...(image.height
            ? [{ property: 'og:image:height', content: image.height }]
            : []),
        { property: 'og:url', content: addForwardSlash(url) },
        ...(['home', 'nota', 'acumulado', 'videoJw'].includes(section)
            ? [{ property: 'og:site_name', content: siteProperties.title }]
            : []),
        ...(ogProfileType
            ? [
                  {
                      property: 'profile:first_name',
                      content: profileTagsInfo.profileName
                  },
                  {
                      property: 'profile:last_name',
                      content: profileTagsInfo.profileLastName
                  },
                  {
                      property: 'profile:username',
                      content: profileTagsInfo.profileUsername
                  }
              ]
            : [])
    ];
};

export const buildArticleMetas = (isArticle, params) => {
    if (!isArticle) return [];

    const {
        firstPublishDate,
        displayDate,
        lastUpdatedDate,
        primarySection,
        authors,
        tags
    } = params;

    return [
        {
            property: 'article:published_time',
            content: getPublishDate(firstPublishDate, displayDate)
        },
        {
            property: 'article:modified_time',
            content: getModifiedDate(lastUpdatedDate, displayDate)
        },
        { property: 'article:section', content: primarySection },
        ...(authors.length
            ? authors.map(author => ({
                  property: 'article:author',
                  content: author.name
              }))
            : []),
        ...(tags.length
            ? tags.map(tag => ({ property: 'article:tag', content: tag.text }))
            : [])
    ];
};

export const buildFbMetas = fbAppId => [
    { property: 'fb:app_id', content: fbAppId }
];

export const buildTwitterMetas = ({
    image,
    arcSite,
    pageBuilderTitle,
    section,
    data,
    requestUri,
    metaValue,
    url,
    twitterAccount
}) => [
    { name: 'twitter:image', content: image.url },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
        name: 'twitter:title',
        content: setMetaTitle({
            arcSite,
            pageBuilderTitle
        })
    },
    {
        name: 'twitter:description',
        content: setMetaDescription({
            data,
            section,
            arcSite,
            requestUri,
            metaValue
        })
    },
    { name: 'twitter:site', content: '@LANACION' },
    { name: 'twitter:creator', content: twitterAccount },
    { name: 'twitter:domain', content: 'lanacion.com.ar' },
    { name: 'twitter:url', content: addForwardSlash(url) }
];
