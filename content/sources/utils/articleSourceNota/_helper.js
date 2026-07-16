import getProperties from 'fusion:properties';
import { CLL_HTMLFREE_DOMAIN } from 'fusion:environment';
import get from '../../../../components/private/common/utils/get';
import Redirect from '../redirect';
import validateExclusiveAccess from '../validateExclusiveAccess';
import isNotShowcase from '../isNotShowcase';
import paywallUtils from '../paywall';
import {
    configPromoItems,
    configCallbackContentElements,
    configCallbacksRelatedContent
} from './_configs';
import { getAllImagesAuth } from '../signingServiceSource/getImagesAuth';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer/addResizerUrls';
import validateSponsoredLink from '../validateSponsoredLink';
import isNoteListenable from '../audioNews/helper';
import { normalizeNumericRatingElements } from '../common/normalizeNumericRating';
import {
    CARDS,
    FOTOAL100,
    HTMLLIBRECLL,
    isFotoAl100orStorytelling,
    LIVEBLOG_EDITORIAL,
    RECETA,
    STORYTELLING,
    translateStringFromSubitypeToID,
    VIDEOAL100
} from '../../../../components/private/common/utils/subtypes/subtypeHelper';
import addParallaxData from '../addParallaxData';
import { recipePowerUps } from '../powerUp';
import firmaDistributorValidation from '../firmaDistributorValidator';
import { processVolanta } from '../common/volantaHelper';

// Tener en cuenta que foodit usa estos helpers

export const getUrlQuery = key => {
    const { url, id, published } = key || {};
    const arcSite = key ? key['arc-site'] : 'la-nacion-ar';

    let basePath = `/content/v4/stories/?website=${arcSite}`;
    const sourceInclude = get(key, 'sourceInclude', '');

    if (published) basePath = `${basePath}&published=${published}`;

    if (sourceInclude) {
        const uriParams = [`&included_fields=${sourceInclude}`].join('');
        basePath = `${basePath}${uriParams}`;
    }

    if (id) return `${basePath}&_id=${id}`;

    if (url) {
        let urlClear = url;
        const regexUrl =
            /^\/api\/(?:mobile\/)?v([1-2]+)\/notas\/(byUrl(\/.+\/$)|byId\/(.+)\/$)/;
        const groups = regexUrl.exec(url);
        // eslint-disable-next-line prefer-destructuring
        if (groups) urlClear = groups[3];
        return `${basePath}&website_url=${urlClear}`;
    }

    throw new Error('Debe definir url o id para obtener la nota');
};
const getUriAndUrl = query => {
    const uri = get(query, 'uri', '');
    const url = get(query, 'url', '');
    return { url, uri };
};

export const checkIfExternalRedirect = (typeResponse, redirectUrl, query) => {
    const { uri } = getUriAndUrl(query);
    return (
        typeResponse === 'redirect' &&
        redirectUrl &&
        uri?.startsWith('/api/mobile') &&
        redirectUrl?.startsWith('http')
    );
};

export const handleRedirectMobile = (typeResponse, redirectUrl, query) => {
    const { url, uri } = getUriAndUrl(query);

    if (
        typeResponse !== 'redirect' ||
        !redirectUrl ||
        !url ||
        !uri.startsWith('/api/mobile')
    )
        return;

    const prefixMobile = uri.slice(0, uri.indexOf(url));
    const newRedirection = `${prefixMobile}${redirectUrl}`;
    throw new Redirect(newRedirection, 301);
};
export const setRedirect = ({ response, query, siteUrl, paywallUrl }) => {
    const typeResponse = get(response, 'type', '');
    const subtype = get(response, 'subtype', '');
    const redirectUrl = get(response, 'redirect_url', '');
    const websiteUrl = get(response, 'website_url');
    const paywallEnabled = get(query, 'paywallEnabled', '');
    const isApi = get(query, 'isApi', false);
    const isExternalApiRedirect = checkIfExternalRedirect(
        typeResponse,
        redirectUrl,
        query
    );

    if (subtype === HTMLLIBRECLL && websiteUrl && !isApi) {
        throw new Redirect(`${CLL_HTMLFREE_DOMAIN}${websiteUrl}`, 301);
    }
    if (isExternalApiRedirect) return redirectUrl;

    handleRedirectMobile(typeResponse, redirectUrl, query);

    if (typeResponse === 'redirect' && redirectUrl) {
        throw new Redirect(redirectUrl, 301);
    }

    const forwardUrl = get(
        response,
        'related_content.redirect[0].redirect_url'
    );

    const regExp =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

    if (forwardUrl && regExp.test(forwardUrl)) {
        throw new Redirect(forwardUrl, 301);
    }

    if (
        (paywallEnabled === '1' || paywallEnabled === 'true') &&
        get(query, 'checkExclusiveAccess', true)
    ) {
        validateExclusiveAccess({
            contentCode: get(response, 'content_restrictions.content_code', ''),
            meteringVariant: get(query, 'meteringVariant', ''),
            host: siteUrl,
            path: query.uri,
            paywallUrl
        });
    }

    if (isNotShowcase(response)) {
        paywallUtils.checkPaywall({
            queryData: query,
            urlBase: siteUrl,
            responseData: response
        });
    }
    return {};
};

export const isValidSectionIA = sections => {
    const section = get(sections, '[0].path', '');

    const invalidSections = ['/opinion', '/politica', '/recetas'];

    if (section) {
        return !invalidSections.some(invalidSection =>
            section.startsWith(invalidSection)
        );
    }

    return false;
};

export const transformPromoItems = async ({
    cachedCall,
    arcSite,
    configCallbacks,
    promoItemObject = {},
    sections
}) => {
    const isValidSectionForIA = isValidSectionIA(sections);
    const promoItemObjectCopy = { ...promoItemObject };

    if (!isValidSectionForIA) {
        delete promoItemObjectCopy.summary;
    }

    const promiseArr = [];

    Object.keys(promoItemObjectCopy).forEach(property => {
        const callabckSelected =
            configCallbacks[get(promoItemObjectCopy, `${property}.type`, '')];

        if (callabckSelected) {
            promiseArr.push(
                callabckSelected({
                    element: promoItemObjectCopy[property],
                    cachedCall,
                    arcSite
                }).then(newValue => ({ [property]: newValue }))
            );
        }
    });

    const results = await Promise.all(promiseArr);

    return Object.assign({ ...promoItemObjectCopy }, ...results);
};

export const filterSections = (response = {}) => {
    const taxonomy = get(response, 'taxonomy', {});
    return {
        ...taxonomy,
        sections: get(taxonomy, 'sections', []).filter(
            section => get(section, 'type', '') === 'section'
        )
    };
};

export const transformAuthors = (authorList = []) =>
    authorList.map(author => ({
        ...author,
        additional_properties: {
            ...get(author, 'additional_properties', {}),
            original: {
                ...get(author, 'additional_properties.original', {}),
                image: get(author, 'image.resized_urls[0].resizedUrl', '')
            }
        }
    }));

export const transformElementsBasedOnType = ({
    arrayElements = [],
    configCallbacks = {},
    searchPropertyOnElem = 'type',
    aditionalProps = {}
}) => {
    if (Array.isArray(arrayElements)) {
        return arrayElements.reduce((acc, element) => {
            try {
                if (element) {
                    const selectedCallback =
                        configCallbacks &&
                        configCallbacks[get(element, searchPropertyOnElem, '')];

                    const newElement = selectedCallback
                        ? selectedCallback({ ...aditionalProps, element })
                        : element;

                    if (newElement) acc.push(newElement);
                }
            } catch (err) {
                console.error('Ocurrio un error en el elemento', err, element);
            }

            return acc;
        }, []);
    }

    return [];
};

export const getImageConfig = ({ response, siteProperties, imageConfig }) => {
    const presetsDefault = get(
        siteProperties,
        `imageConfig.resize.default`,
        null
    );
    const presetsZoom = get(
        siteProperties,
        'imageConfig.resize.zoom.promo_items.sizes',
        presetsDefault
    );

    const {
        promo_items: presetsPromoItemsCustom,
        content_elements: presetsContentElementsCustom,
        credits: presetsCreditsCustom
    } = get(siteProperties, `imageConfig.resize.${imageConfig}`, {});

    const presetsPromoItemsVideo =
        get(response, 'promo_items.apertura_multimedia.type', '') === 'video' &&
        get(siteProperties, 'imageConfig.resize.videoImage.promo_items', null);

    const presetsPromoItemsFotoAl100 =
        response.subtype === FOTOAL100 &&
        get(siteProperties, 'imageConfig.resize.fotoAl100.promo_items', null);
    const customStorytellingDiagram = get(
        response,
        'promo_items.custom_storytelling_opening.embed.config.diagram',
        null
    );
    const presetsPromoItemStorytelling =
        response.subtype === STORYTELLING &&
        (get(
            siteProperties,
            `imageConfig.resize.${customStorytellingDiagram}.promo_items`,
            null
        ) ||
            get(
                siteProperties,
                'imageConfig.resize.image-50-right-title-left.promo_items',
                null
            ));
    const presetsContentElementsFotoAl100 =
        response.subtype === FOTOAL100 &&
        get(
            siteProperties,
            'imageConfig.resize.fotoAl100.content_elements',
            null
        );
    const presetsContentElementsCards =
        (response.subtype === CARDS || response.subtype === 'custom-card') &&
        get(
            siteProperties,
            'imageConfig.resize.cardsRatio3x2.content_elements',
            null
        );
    const presetsPromoItemLiveblogEditorial =
        response.subtype === LIVEBLOG_EDITORIAL &&
        get(
            siteProperties,
            'imageConfig.resize.liveblogEditorial.promo_items',
            null
        );
    const presetsPromoItemVideoAl100 =
        response.subtype === VIDEOAL100 &&
        get(siteProperties, 'imageConfig.resize.videoAl100.promo_items', null);
    const presetsPromoItems = get(
        siteProperties,
        'imageConfig.resize.l.promo_items',
        null
    );

    const presetsContentElements = get(
        siteProperties,
        'imageConfig.resize.l.content_elements',
        null
    );
    const presetsCredits = get(
        siteProperties,
        'imageConfig.resize.l.credits',
        null
    );

    return {
        presets: {
            promoItems:
                presetsPromoItemsCustom ||
                presetsPromoItemsFotoAl100 ||
                presetsPromoItemStorytelling ||
                presetsPromoItemLiveblogEditorial ||
                presetsPromoItemVideoAl100 ||
                presetsPromoItemsVideo ||
                presetsPromoItems ||
                presetsDefault,
            contentElements:
                presetsContentElementsCustom ||
                presetsContentElementsCards ||
                presetsContentElementsFotoAl100 ||
                presetsContentElements ||
                presetsDefault,
            credits: presetsCreditsCustom || presetsCredits,
            presetsDefault,
            zoomSizes: presetsZoom
        }
    };
};

const transformContentElements = async ({
    result,
    siteProperties,
    cachedCall,
    aditionalProps,
    arcSite
}) => {
    const contentElementTransformed = await Promise.all(
        transformElementsBasedOnType({
            arrayElements: get(result, 'content_elements', []),
            configCallbacks: configCallbackContentElements,
            searchPropertyOnElem: 'type',
            aditionalProps
        })
    );

    if (get(result, 'subtype', '') === FOTOAL100) {
        const presetsPromoItemsFotoAl100 = get(
            siteProperties,
            'imageConfig.resize.fotoAl100.promo_items',
            null
        );
        return addParallaxData(
            contentElementTransformed,
            cachedCall,
            presetsPromoItemsFotoAl100,
            arcSite
        );
    }
    // TODO: Eliminar cuando salga FOODIT!!!
    if (get(result, 'subtype', '') === RECETA) {
        return recipePowerUps(contentElementTransformed);
    }

    return contentElementTransformed;
};

export const transform = async (response, query, cachedCall) => {
    const {
        meteringVariant,
        paywallEnabled = '',
        checkoutEnabled = '',
        isInApertura = false,
        isAdmin = false,
        imageConfig
    } = query;

    const arcSite = query['arc-site'];
    const siteProperties = getProperties(arcSite);
    const newData = await getAllImagesAuth(response, cachedCall);
    Object.assign(response, newData);

    const subtype = get(response, 'subtype', null);

    // With firma distributor data
    const name = get(response, 'distributor.name', 'LA NACION');
    const sponsored = get(response, 'owner.sponsored', false);
    const sections = get(response, 'taxonomy.sections', []);
    const authors = get(response, 'credits.by', []);
    const layout = 'LN-nota-noticia';

    const avatarWWW =
        isInApertura && (!subtype || !isFotoAl100orStorytelling(subtype));

    const result = {
        ...response,
        ...addResizedUrls(response, {
            ...getImageConfig({ response, siteProperties, imageConfig }),
            subtype,
            isInApertura,
            avatarWWW,
            isAdmin,
            arcSite
        })
    };

    const withSponsoredLink = validateSponsoredLink(result);
    const articlePath = get(response, 'website_url', '');
    const baseOrigin = get(siteProperties, 'host', '');

    const aditionalProps = {
        siteProperties,
        cachedCall,
        subtype,
        arcSite,
        withSponsoredLink,
        articlePath,
        baseOrigin,
        isShowGalleryEmbed: isFotoAl100orStorytelling(subtype)
    };

    const [promoItems, contentElements, relatedContentBasic] =
        await Promise.all([
            transformPromoItems({
                cachedCall,
                arcSite,
                configCallbacks: configPromoItems,
                promoItemObject: get(result, 'promo_items', {}),
                sections
            }),
            transformContentElements({
                result,
                cachedCall,
                siteProperties,
                aditionalProps,
                arcSite
            }),
            Promise.all(
                transformElementsBasedOnType({
                    arrayElements: get(result, 'related_content.basic', []),
                    configCallbacks: configCallbacksRelatedContent,
                    searchPropertyOnElem: 'type',
                    aditionalProps
                })
            )
        ]);

    const labelWithVolanta = processVolanta(result);

    return {
        ...result,
        withSponsoredLink,
        isListenable: isNoteListenable(result),
        withFirmaDistributor: firmaDistributorValidation(
            sections,
            layout,
            name,
            subtype,
            authors,
            sponsored
        ),
        label: labelWithVolanta,
        promo_items: {
            ...promoItems,
            ...(promoItems.basic && {
                basic: {
                    ...promoItems.basic,
                    originalSizes: {
                        height: get(response, 'promo_items.basic.height', 0),

                        width: get(response, 'promo_items.basic.width', 0)
                    }
                }
            })
        },
        content_elements: normalizeNumericRatingElements([...contentElements]),
        related_content: {
            ...get(result, 'related_content', {}),
            basic: relatedContentBasic
        },
        paywallEnabled,
        checkoutEnabled,
        subscription: meteringVariant,
        credits: {
            ...get(result, 'credits', {}),
            by: transformAuthors(get(result, 'credits.by', []))
        },
        taxonomy: filterSections(result),
        category: get(result, 'taxonomy.primary_section.name', '')
    };
};

export const updateUrlIfMatch = url => {
    if (typeof url !== 'string' || !url) {
        return url;
    }

    const regex = /tests-bannerdisabled\//;
    return regex.test(url) ? url.replace('tests-bannerdisabled/', '') : url;
};

export const getIncludedFields = (isLiveblog = false) => {
    const commonFields = [
        'taxonomy',
        'distributor.name',
        'related_content.basic',
        '_id',
        'last_updated_date',
        'headlines',
        'subheadlines',
        'description',
        'label',
        'promo_items',
        'canonical_website',
        'credits',
        'subtype',
        'first_publish_date',
        'publish_date',
        'website',
        'website_url',
        'content_restrictions',
        'owner',
        'source',
        'canonical_url'
    ];

    const fields = isLiveblog
        ? [...commonFields, 'content_elements']
        : commonFields;

    return fields.join(',');
};

export const transformSubtype = (response = {}) => {
    const subtype = get(response, 'subtype');

    if (response) {
        return {
            ...response,
            subtype: translateStringFromSubitypeToID(subtype)
        };
    }

    return response;
};
