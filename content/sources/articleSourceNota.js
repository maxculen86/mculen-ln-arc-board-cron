import request from 'request-promise-native';
import {
    CONTENT_BASE,
    RESIZER_KEY,
    RESIZER_URL,
    ARC_ACCESS_TOKEN
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

const log = error => {
    // TODO: Armar un objeto lo mas dinamico
    // TODO: Armar una clase command para elmah
    console.log('error', error);
    const elmahJson = {
        application: 'ln/arc',
        detail: 'Prueba desde LN/ARC / stack exception string',
        hostname: '-',
        title: 'Test Elmah - Content Source / request.catch',
        titleTemplate: 'titleTemplate',
        source: 'content/source',
        statusCode: 0,
        type: 'error',
        user: 'jquintana',
        severity: 'string',
        url: 'string',
        version: 'string',
        queryString: [{ key: 'string', value: 'string' }]
    };
    console.log('========================');
    console.log('');
    console.log('fetch a elmah');
    console.log('');
    console.log('========================');

    request({
        uri:
            'https://api.elmah.io/v3/messages/00f817a7-48fa-4335-b551-ca953b7342fd',
        qs: {
            api_key: 'e6ce19c37ca046348f6afb5a11bc3fdb'
        },
        method: 'POST',
        headers: {
            accept: 'text/plain',
            'Content-Type': 'application/json-patch+json'
        },
        body: JSON.stringify(elmahJson)
    })
        .then(res => {
            //throw new Error(error);
            console.log('elmah -> res', res);
        })
        .catch(e => {
            console.log('elmah -> error', e);
        });
};

const resolve = (key, a) => {
    const { url, id, published } = key;
    console.log('resolve -> url', url);
    const arcSite = key['arc-site'];
    let basePath = `/content/v4/stories/?website=${arcSite}`;

    if (published) basePath = `${basePath}&published=${published}`;

    if (id) return `${basePath}&_id=${id}`;
    if (
        url ===
        '/turismo/la-carta-del-capitan-a-los-pasajeros-del-crucero-con-61-contagiados-entre-ellos-un-argentino-nid07022020/'
    )
        return `${basePath}&__website_url=${url}`;
    if (url) return `${basePath}&website_url=${url}`;

    throw new Error('Debe definir url o id para obtener la nota');
};

// TODO: process.on

const fetch = query => {
    const opt = {
        uri: `${CONTENT_BASE}${resolve(query)}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }

    console.log('========================');
    console.log('');
    console.log('paso por content/source');
    console.log('');
    console.log('========================');

    process.on('unhandledRejection', (reason, promise) => {
        console.log('Unhandled Rejection at:', promise, 'reason:', reason);
        log({});
    });

    return request(opt).then(response => {
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

        return transform(response, query);
    });
    /*         .catch(error => {
            log(error);
        }); */
};

// Al no poder exportar esta fn para que la utilice Fusion directamente, ya que devuelve una promise y no lo soporta, la llamamos
// directamente nosotros desde el fetch
const transform = (data, siteProps) => {
    const arcSite = siteProps['arc-site'];
    const properties = getProperties(arcSite);

    const presetsDefault = get(properties, `imageConfig.resize.default`, null);
    const presetsZoom = get(
        properties,
        `imageConfig.resize.zoom`,
        presetsDefault
    );
    const presetsXL = get(properties, `imageConfig.resize.xl`, null);
    const presetsL = get(properties, `imageConfig.resize.l`, null);

    const notesWithRatio = ['1', '7'];

    // Si el subType es recetas o noticias applico el ratio

    const promoItemsRatio =
        notesWithRatio.indexOf(data.subtype) === 0
            ? { sizes: addAspectRatio(presetsXL.promo_items.sizes) }
            : presetsXL.promo_items.sizes || presetsDefault;
    const resp = addResizedUrls(data, {
        resizerSecret: RESIZER_KEY,
        resizerUrl: RESIZER_URL,
        presets: {
            promoItems: promoItemsRatio,
            contentElements: presetsL.content_elements || presetsDefault,
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
        });
    }

    if (resp && resp.related_content && resp.related_content.basic) {
        resp.related_content.basic.forEach((e, i) => {
            if (e.type === 'reference') {
                promiseArr.push(
                    addFollowAnotherNoteData(e, arcSite, i).then(g => {
                        resp.related_content.basic[i] = g;
                    })
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
    return relatedSource
        .fetch({
            id: anotherNoteData._id,
            'arc-site': arcSite,
            includedFields: 'headlines,label,website_url'
        })
        .then(fetchedRelated => {
            const { headlines, label, website_url } = fetchedRelated;
            const resp = {
                ...anotherNoteData,
                headlines,
                label,
                website_url
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
        published: 'text'
    },
    filter,
    ttl: sourceSetting.articleSourceNota.ttl
};
