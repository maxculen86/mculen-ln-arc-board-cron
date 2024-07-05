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
import getProperties from 'fusion:properties';
import { getAllImagesAuth } from '../signingServiceSource/getImagesAuth';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer/addResizerUrls';
import validateSponsoredLink from '../../utils/validateSponsoredLink';
import isNoteListenable from '../audioNews/helper';
import {
    FOTOAL100,
    RECETA,
    STORYTELLING
} from '../../../../components/private/common/utils/subtypes/subtypeHelper';
import addParallaxData from '../addParallaxData';
import { recipePowerUps } from '../powerUp';
import firmaDistributorValidation from '../firmaDistributorValidator';

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
        const regexUrl = /^\/api\/(?:mobile\/)?v([1-2]+)\/notas\/(byUrl(\/.+\/$)|byId\/(.+)\/$)/;
        const groups = regexUrl.exec(url);
        if (groups) urlClear = groups[3];
        return `${basePath}&website_url=${urlClear}`;
    }

    throw new Error('Debe definir url o id para obtener la nota');
};

export const setRedirect = ({ response, query, siteUrl, paywallUrl }) => {
    const typeResponse = get(response, 'type', '');
    const redirectUrl = get(response, 'redirect_url', '');
    const paywallEnabled = get(query, 'paywallEnabled', '');

    if (typeResponse === 'redirect' && redirectUrl) {
        throw new Redirect(redirectUrl, 301);
    }

    const forwardUrl = get(
        response,
        'related_content.redirect[0].redirect_url'
    );

    const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

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

    isNotShowcase(response) &&
        paywallUtils.checkPaywall({
            queryData: query,
            urlBase: siteUrl,
            responseData: response
        });
};

export const transformPromoItems = async ({
    cachedCall,
    arcSite,
    configCallbacks,
    promoItemObject = {}
}) => {
    const promiseArr = [];

    for (let property in promoItemObject) {
        const callabckSelected =
            configCallbacks[get(promoItemObject, `${property}.type`, '')];

        if (callabckSelected) {
            promiseArr.push(
                callabckSelected({
                    element: promoItemObject[property],
                    cachedCall,
                    arcSite
                }).then(newValue => ({ [property]: newValue }))
            );
        }
    }

    const results = await Promise.all(promiseArr);

    return Object.assign({ ...promoItemObject }, ...results);
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

export const transformAuthors = (authorList = []) => {
    return authorList.map(author => {
        return {
            ...author,
            additional_properties: {
                ...get(author, 'additional_properties', {}),
                original: {
                    ...get(author, 'additional_properties.original', {}),
                    image: get(author, 'image.resized_urls[0].resizedUrl', '')
                }
            }
        };
    });
};

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

                    newElement && acc.push(newElement);
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
        (response.subtype === FOTOAL100 || response.subtype === STORYTELLING) &&
        get(siteProperties, 'imageConfig.resize.fotoAl100.promo_items', null);
    const presetsContentElementsFotoAl100 =
        response.subtype === FOTOAL100 &&
        get(
            siteProperties,
            'imageConfig.resize.fotoAl100.content_elements',
            null
        );
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
                presetsPromoItemsVideo ||
                presetsPromoItems ||
                presetsDefault,
            contentElements:
                presetsContentElementsCustom ||
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
    aditionalProps
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
            presetsPromoItemsFotoAl100
        );
    }
    //TODO: Eliminar cuando salga FOODIT!!!
    if (get(result, 'subtype', '') === RECETA) {
        return recipePowerUps(contentElementTransformed);
    }

    return contentElementTransformed;
};

export const transform = async (response, query, cachedCall) => {
    const {
        meteringVariant,
        paywallEnabled = '',
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

    const result = {
        ...response,
        ...addResizedUrls(response, {
            ...getImageConfig({ response, siteProperties, imageConfig }),
            subtype,
            isInApertura,
            isAdmin,
            shouldUseV1: false,
            shouldUseV2: true
        })
    };

    const aditionalProps = {
        siteProperties,
        cachedCall,
        subtype,
        arcSite,
        glossary: get(
            response,
            'promo_items.glossary.embed.config.arrayData',
            []
        )
    };

    const [
        promo_items,
        content_elements,
        relatedContentBasic
    ] = await Promise.all([
        transformPromoItems({
            cachedCall,
            arcSite,
            configCallbacks: configPromoItems,
            promoItemObject: get(result, 'promo_items', {})
        }),
        transformContentElements({
            result,
            cachedCall,
            siteProperties,
            aditionalProps
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

    return {
        ...result,
        withSponsoredLink: validateSponsoredLink(result),
        isListenable: isNoteListenable(result),
        withFirmaDistributor: firmaDistributorValidation(
            sections,
            layout,
            name,
            subtype,
            authors,
            sponsored
        ),
        promo_items,
        content_elements,
        related_content: {
            ...get(result, 'related_content', {}),
            basic: relatedContentBasic
        },
        paywallEnabled,
        subscription: meteringVariant,
        credits: {
            ...get(result, 'credits', {}),
            by: transformAuthors(get(result, 'credits.by', []))
        },
        taxonomy: filterSections(result),
        category: get(result, 'taxonomy.primary_section.name', '')
    };
};
