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
import get from '../../components/private/common/utils/get';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import filter from '../filters/LN/nota/article';
import gallerySource from './gallerySource';
import relatedSource from './relatedSource';
import Redirect from './utils/redirect';
import validateExclusiveAccess from './utils/validateExclusiveAccess';
import replaceTagInTextListRaw from './utils/replaceTagInTextListRaw';
import {
    FOTOAL100,
    RECETA,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import logger from '../../components/private/common/utils/logger';
import paywallUtils from './utils/paywall';
import removeInvalidUrlTagA from '../../components/private/common/utils/removeInvalidUrlTagA';
import isNotShowcase from './utils/isNotShowcase';
import powerUp from './utils/powerUp';
import firmaDistributorValidation from './utils/firmaDistributorValidator';

const resolve = (key, a) => {
    const { url, id, published } = key;
    const arcSite = key['arc-site'];
    let basePath = `/content/v4/stories/?website=${arcSite}`;

    if (published) basePath = `${basePath}&published=${published}`;

    if (id) return `${basePath}&_id=${id}`;
    if (url) return `${basePath}&website_url=${url}`;

    throw new Error('Debe definir url o id para obtener la nota');
};

const fetch = query => {
    const {
        url = '',
        imageConfig,
        meteringVariant,
        paywallEnabled = ''
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
            if (response.type === 'redirect' && response.redirect_url) {
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

            response &&
                validateExclusiveAccess({
                    contentCode:
                        response.content_restrictions &&
                        response.content_restrictions.content_code,
                    meteringVariant: query.meteringVariant,
                    host: SITE_LANACION,
                    path: query.uri
                });

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
                paywallEnabled
            );
        })
        .catch(error => {
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
    paywallEnabled
) => {
    // Data
    const subtype = get(data, `subtype`, null);

    // With firma distributor data
    const name = get(data, 'distributor.name', '');
    const sponsored = get(data, 'owner.sponsored', false);
    const sections = get(data, 'taxonomy.sections', []);
    const layout = 'LN-nota-noticia';

    const withFirmaDistributor = firmaDistributorValidation(
        sections,
        layout,
        name,
        subtype,
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
            subtype
        })
    };
    return transformContent(resp, arcSite, urlQuery);
};

const transformContent = (jsonArticle, arcSite, urlQuery) => {
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
                const referentImage = get(element, 'referent.type', '');

                referentImage === 'image'
                    ? (resp.related_content.basic[i] = element)
                    : promiseArr.push(
                          addFollowAnotherNoteData(element, arcSite, i).then(
                              newContent => {
                                  resp.related_content.basic[i] = newContent;
                              }
                          )
                      );
            }
        });
    }

    if (get(resp, 'promo_items.basic.type') === 'gallery') {
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
            resp.content_elements = powerUp(resp.content_elements);
        }
    }

    return Promise.all(promiseArr).then(() => {
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

const addFollowAnotherNoteData = (anotherNoteData, arcSite, i) => {
    const { _id: id } = anotherNoteData;
    return relatedSource
        .fetch({
            id,
            'arc-site': arcSite,
            includedFields: 'headlines,label,website_url,type'
        })
        .then(fetchedRelated => {
            const {
                headlines,
                label,
                website_url: websiteUrl,
                type
            } = fetchedRelated;
            const resp = {
                ...anotherNoteData,
                headlines,
                label,
                website_url: websiteUrl,
                type
            };

            return resp;
        })
        .catch(e => {
            // console.log('TCL: addFollowAnotherNoteData -> e', e);
        });
};

export default {
    fetch,
    params: {
        url: 'text',
        id: 'text',
        published: 'text',
        meteringVariant: 'text',
        paywallUrl: 'text',
        paywallEnabled: 'text'
    },
    filter,
    ttl: 120
};
