import request from 'request-promise-native';
import {
    CONTENT_BASE,
    RESIZER_KEY,
    RESIZER_URL,
    ARC_ACCESS_TOKEN,
    SITE_LANACION,
    API_ENV
} from 'fusion:environment';
import getProperties from 'fusion:properties';
import addParallaxData from './utils/addParallaxData';
import get from '../../components/private/common/utils/get';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import filter from '../filters/LN/nota/article';
import gallerySource from './gallerySource';
import relatedSource from './relatedSource';
import Redirect from './utils/redirect';
import validateExclusiveAccess from './utils/validateExclusiveAccess';
import replaceTagInTextListRaw from './utils/replaceTagInTextListRaw';
import removeInvalidRelated from './utils/removeInvalidRelated';
import {
    FOTOAL100,
    RECETA,
    STORYTELLING,
    isSubtypeWithAmp
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import logger from '../../components/private/common/utils/logger';
import paywallUtils from './utils/paywall';
import removeInvalidUrlTagA from '../../components/private/common/utils/removeInvalidUrlTagA';
import isNotShowcase from './utils/isNotShowcase';
import { recipePowerUps, removeParallaxPowerUp } from './utils/powerUp';
import firmaDistributorValidation from './utils/firmaDistributorValidator';
import isNoteListenable from './utils/audioNews/helper';
import force404AMP from './utils/force404AMP';
import validateSponsoredLink from './utils/validateSponsoredLink';

export const resolve = (key, a) => {
    const { url, id, published } = key;

    const arcSite = key['arc-site'];
    let basePath = `/content/v4/stories/?website=${arcSite}`;
    if (published) basePath = `${basePath}&published=${published}`;
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

const fetch = (query, { cachedCall } = {}) => {
    const {
        url = '',
        imageConfig,
        meteringVariant,
        paywallEnabled = '',
        checkExclusiveAccess = true,
        isInApertura = false,
        isAdmin = false,
        outputType = ''
    } = query;

    const arcSite = query['arc-site'];
    const properties = getProperties(arcSite);
    const opt = {
        uri: `${CONTENT_BASE}${resolve(query)}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }

    return request(opt)
        .then(response => {
            if (
                response &&
                response.type === 'redirect' &&
                response.redirect_url
            ) {
                throw new Redirect(response.redirect_url, 301);
            }
            const forwardUrl = get(
                response,
                'related_content.redirect[0].redirect_url'
            );
            const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
            if (forwardUrl && regExp.test(forwardUrl)) {
                throw new Redirect(forwardUrl, 301);
            }

            if (response && checkExclusiveAccess) {
                validateExclusiveAccess({
                    contentCode:
                        response.content_restrictions &&
                        response.content_restrictions.content_code,
                    meteringVariant: query.meteringVariant,
                    host: SITE_LANACION,
                    path: query.uri
                });
            }

            isSubtypeWithAmp(response) && force404AMP({ outputType });

            isNotShowcase(response) &&
                paywallUtils.checkPaywall({
                    queryData: query,
                    urlBase: SITE_LANACION,
                    responseData: response
                });

            return transform(
                response,
                arcSite,
                properties,
                imageConfig,
                url,
                meteringVariant,
                paywallEnabled,
                cachedCall,
                isInApertura,
                isAdmin
            );
        })
        .catch(error => {
            // eslint-disable-next-line no-console
            console.log(
                '🚀 ~ file: articleSourceNota.js ~ line 90 ~ error',
                error
            );
            logger.push(
                error,
                { source: 'content/source/articleSourceNota', url },
                arcSite
            );
        });
};

// Al no poder exportar esta fn para que la utilice Fusion directamente, ya que devuelve una promise y no lo soporta, la llamamos
// directamente nosotros desde el fetch
const transform = (
    data,
    arcSite,
    properties,
    imageConfig,
    urlQuery,
    meteringVariant,
    paywallEnabled,
    cachedCall,
    isInApertura,
    isAdmin
) => {
    // Data
    const subtype = get(data, `subtype`, null);

    // With firma distributor data
    const name = get(data, 'distributor.name', 'LA NACION');
    const sponsored = get(data, 'owner.sponsored', false);
    const sections = get(data, 'taxonomy.sections', []);
    const authors = get(data, 'credits.by', []);
    const layout = 'LN-nota-noticia';

    const withFirmaDistributor = firmaDistributorValidation(
        sections,
        layout,
        name,
        subtype,
        authors,
        sponsored
    );

    // Presets
    const presetsDefault = get(properties, `imageConfig.resize.default`, null);
    const presetsZoom = get(
        properties,
        'imageConfig.resize.zoom.promo_items.sizes',
        presetsDefault
    );

    const {
        promo_items: presetsPromoItemsCustom,
        content_elements: presetsContentElementsCustom,
        credits: presetsCreditsCustom
    } = get(properties, `imageConfig.resize.${imageConfig}`, {});

    const presetsPromoItemsFotoAl100 =
        (data.subtype === FOTOAL100 || data.subtype === STORYTELLING) &&
        get(properties, 'imageConfig.resize.fotoAl100.promo_items', null);
    const presetsContentElementsFotoAl100 =
        data.subtype === FOTOAL100 &&
        get(properties, 'imageConfig.resize.fotoAl100.content_elements', null);
    const presetsPromoItems = get(
        properties,
        'imageConfig.resize.l.promo_items',
        null
    );
    const presetsContentElements = get(
        properties,
        'imageConfig.resize.l.content_elements',
        null
    );
    const presetsCredits = get(
        properties,
        'imageConfig.resize.l.credits',
        null
    );

    // Data con urls Resizeadas
    const resp = {
        paywallEnabled,
        ...data,
        subscription: meteringVariant,
        withFirmaDistributor,
        isListenable: isNoteListenable(data),
        withSponsoredLink: validateSponsoredLink(data),
        ...addResizedUrls(data, {
            resizerSecret: RESIZER_KEY,
            resizerUrl: RESIZER_URL,
            presets: {
                promoItems:
                    presetsPromoItemsCustom ||
                    presetsPromoItemsFotoAl100 ||
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
            },
            subtype,
            isInApertura,
            isAdmin
        })
    };
    return transformContent(
        resp,
        arcSite,
        urlQuery,
        cachedCall,
        presetsPromoItemsFotoAl100
    );
};

const transformContent = async (
    jsonArticle,
    arcSite,
    urlQuery,
    cachedCall,
    presetsPromoItemsFotoAl100
) => {
    const promiseArr = [];
    const sections = get(jsonArticle, 'taxonomy.sections');
    const resp = {
        ...jsonArticle,
        taxonomy: {
            ...jsonArticle.taxonomy,
            sections: sections
                ? sections.filter(s => s.type === 'section')
                : null
        }
    };
    const subtype = get(jsonArticle, `subtype`, null);

    if (resp && resp.content_elements) {
        resp.content_elements.forEach((e, i) => {
            if (e.type === 'gallery') {
                promiseArr.push(
                    addGalleryData(e, arcSite).then(g => {
                        resp.content_elements[i] = g;
                    })
                );
            }

            resp.content_elements[i] = replaceTagInTextListRaw(e, 'TERCERA=""');
        });
    }

    /* TODO: validar si related content debe ir vacio si tiene otros
    items diferentes a reference */
    if (resp && resp.related_content && resp.related_content.basic) {
        resp.related_content.basic.forEach((element, i) => {
            if (element.type === 'reference') {
                const referentType = get(element, 'referent.type', '');

                referentType === 'image' &&
                    (resp.related_content.basic[i] = element);

                referentType === 'story' &&
                    promiseArr.push(
                        addFollowAnotherNoteData(element, arcSite, i).then(
                            newContent => {
                                resp.related_content.basic[i] = newContent;
                            }
                        )
                    );
            }
        });
    }

    if (get(resp, 'promo_items.basic.type', '') === 'gallery') {
        promiseArr.push(
            addGalleryData(resp.promo_items.basic, arcSite).then(g => {
                resp.promo_items.basic = g;
            })
        );
    }

    get(resp, 'credits.by', []).map((elem, i) => {
        promiseArr.push(
            new Promise(resolver =>
                resolver(get(elem, 'image.resized_urls[0].resizedUrl'))
            ).then(url => {
                if (url)
                    resp.credits.by[
                        i
                    ].additional_properties.original.image = url;
            })
        );
    });

    // Url Validator
    if (resp && resp.content_elements) {
        resp.content_elements = removeInvalidUrlTagA(
            resp.content_elements,
            arcSite,
            urlQuery,
            API_ENV
        );
        if (subtype === RECETA) {
            resp.content_elements = recipePowerUps(resp.content_elements);
        }
        if (subtype !== FOTOAL100) {
            resp.content_elements = removeParallaxPowerUp(
                resp.content_elements
            );
        }
        if (subtype === FOTOAL100) {
            resp.content_elements = await addParallaxData(
                resp.content_elements,
                cachedCall,
                presetsPromoItemsFotoAl100
            );
        }
    }

    return Promise.all(promiseArr).then(() => {
        const relatedContent = get(resp, 'related_content.basic', []);
        relatedContent.length &&
            (resp.related_content.basic = removeInvalidRelated(relatedContent));

        return resp;
    });
};

const addGalleryData = (gallery, arcSite) => {
    const { _id: galleryId } = gallery;
    return gallerySource
        .fetch({
            id: galleryId,
            'arc-site': arcSite,
            includedFields: 'content_elements,content_elements.credits'
        })
        .then(fetchedGallery => {
            const resp = {
                ...gallery
            };
            resp.content_elements = gallery.content_elements.map((v, i) => {
                return {
                    ...v,
                    ...fetchedGallery.content_elements[i]
                };
            });

            return resp;
        });
};

const addFollowAnotherNoteData = async (anotherNoteData, arcSite, i) => {
    const { _id: id } = anotherNoteData;

    try {
        const fetchedRelated = await relatedSource.fetch({
            id,
            'arc-site': arcSite,
            includedFields:
                'headlines,label,website_url,type,additional_properties',
            notPublished: true
        });
        const published = get(
            fetchedRelated,
            'additional_properties.has_published_copy',
            false
        );
        if (!published) return null;

        const {
            headlines,
            label,
            website_url: websiteUrl,
            type
        } = fetchedRelated;

        return {
            ...anotherNoteData,
            headlines,
            label,
            website_url: websiteUrl,
            type
        };
    } catch (error) {
        logger.push(
            error,
            {
                source:
                    'content/source/articleSourceNota/addFollowAnotherNoteData',
                url: id
            },
            arcSite,
            true
        );
    }
};

export default {
    fetch,
    params: {
        url: 'text',
        id: 'text',
        published: 'text',
        meteringVariant: 'text',
        paywallUrl: 'text',
        paywallEnabled: 'text',
        outputType: 'text'
    },
    filter,
    ttl: 120
};
