import request from 'request-promise-native';
import {
    CONTENT_BASE,
    RESIZER_KEY,
    RESIZER_URL,
    ARC_ACCESS_TOKEN,
    SITE_LANACION
} from 'fusion:environment';
import get from 'lodash.get';
import getProperties from 'fusion:properties';
import addAspectRatio from './utils/getRatio';
import sourceSetting from './utils/sourceSetting';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import filter from '../filters/LN/nota/article';
import gallerySource from './gallerySource';
import relatedSource from './relatedSource';
import Redirect from './utils/redirect';
import replaceTagInTextListRaw from './utils/replaceTagInTextListRaw';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import logger from '../../components/private/common/utils/logger';
import getImageResized from '../../components/private/common/utils/getImageResized';

// TODO: Pasar esto a properties
const optionsImgResized = {
    width: 80,
    height: 80,
    media: '(min-width: 320px)',
    class: '',
    type: 'image'
};

const resolve = (key, a) => {
    const { url, id, published } = key;
    const arcSite = key['arc-site'];
    let basePath = `/content/v4/stories/?website=${arcSite}`;

    if (published) basePath = `${basePath}&published=${published}`;

    if (id) return `${basePath}&_id=${id}`;
    if (url) return `${basePath}&website_url=${url}`;

    throw new Error('Debe definir url o id para obtener la nota');
};

const checkPaywall = (
    { paywallEnabled, meteringVariant, paywallUrl, url },
    response
) => {
    if (
        (paywallEnabled === '1' || paywallEnabled === 'true') &&
        meteringVariant === 'D' &&
        paywallUrl &&
        (!response.content_restrictions ||
            response.content_restrictions.content_code !== 'abierta')
    ) {
        const callback = Buffer.from(`${SITE_LANACION}${url}`).toString(
            'base64'
        );
        const finalUrl = paywallUrl.replace('{{callback}}', callback);
        throw new Redirect(finalUrl, 302);
    }
};

const fetch = query => {
    const { url = '' } = query;
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

            checkPaywall(query, response);

            return transform(response, arcSite, properties);
        })
        .catch(error => {
            logger.push(error, { source: 'content/source', url }, arcSite);
            throw error;
        });
};

// Al no poder exportar esta fn para que la utilice Fusion directamente, ya que devuelve una promise y no lo soporta, la llamamos
// directamente nosotros desde el fetch
const transform = (data, arcSite, properties) => {
    const presetsDefault = get(properties, `imageConfig.resize.default`, null);
    const presetsZoom = get(
        properties,
        `imageConfig.resize.zoom`,
        presetsDefault
    );
    const presetsXL = get(properties, `imageConfig.resize.xl`, null);
    const presetsL = get(properties, `imageConfig.resize.l`, null);

    // Si el subType es recetas o noticias applico el ratio
    const notesWithRatio = ['1', '7'];
    const promoItemsRatio =
        notesWithRatio.indexOf(data.subtype) === 0
            ? { sizes: addAspectRatio(presetsXL.promo_items.sizes) }
            : presetsXL.promo_items || presetsDefault;

    let presetsFotoAl100 = {};
    if (data.subtype === FOTOAL100 || data.subtype === STORYTELLING) {
        presetsFotoAl100 = get(properties, `imageConfig.resize.fotoAl100`, {});
    }

    const resp = addResizedUrls(data, {
        resizerSecret: RESIZER_KEY,
        resizerUrl: RESIZER_URL,
        presets: {
            promoItems: promoItemsRatio,
            contentElements:
                presetsFotoAl100.content_elements ||
                presetsL.content_elements ||
                presetsDefault,
            presetsDefault,
            zoomSizes: presetsZoom.promo_items.sizes
        }
    });
    return transformContent(resp, arcSite);
};

const transformContent = (jsonArticle, arcSite) => {
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
                resolver(
                    getImageResized(
                        get(elem, 'additional_properties.original.image'),
                        optionsImgResized
                    )
                )
            ).then(url => {
                if (url)
                    resp.credits.by[
                        i
                    ].additional_properties.original.image = url;
            })
        );
    });

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
    ttl: sourceSetting.articleSourceNota.ttl
};
