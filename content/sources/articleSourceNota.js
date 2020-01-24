import request from 'request-promise-native';
import { CONTENT_BASE, RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import get from 'lodash.get';
import getProperties from 'fusion:properties';

import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import filter from '../filters/LN/nota/article';
import gallerySource from './gallerySource';

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
    return request({
        uri: `${CONTENT_BASE}${resolve(query)}`,
        json: true
    }).then(response => {
        return transform(response, query);
    });
};

const transform = (data, siteProps) => {
    const arcSite = siteProps['arc-site'];
    const properties = getProperties(arcSite);

    let presets = get(
        properties,
        `imageConfig.resize.nota.bySubtype[${data.subtype}]`,
        null
    );

    if (!presets) {
        presets = get(
            properties,
            'imageConfig.resize.nota.bySubtype[default]',
            null
        );
    }

    let resp = data;
    if (presets) {
        resp = addResizedUrls(data, {
            resizerSecret: RESIZER_KEY,
            resizerUrl: RESIZER_URL,
            presets
        });
    }

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

    resp.content_elements.forEach((e, i) => {
        if (e.type === 'gallery') {
            promiseArr.push(
                addGalleryData(e, arcSite).then(g => {
                    resp.content_elements[i] = g;
                })
            );
        }
    });

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

export default {
    fetch,
    params: {
        url: 'text',
        id: 'text',
        published: 'text'
    },
    filter
};
