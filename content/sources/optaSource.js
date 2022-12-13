/* eslint-disable no-underscore-dangle */
import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger';

const getRawIdAndNoteId = url => {
    const params = url ? url.split('/') : [];
    if (params.length < 5) return {};
    const noteId = params[params.length - 2];
    const idRawHtml = params[params.length - 3];
    return { noteId, idRawHtml };
};

const resolve = (key, a) => {
    const { uri } = key;
    const { noteId } = getRawIdAndNoteId(uri);

    const arcSite = key['arc-site'];
    const basePath = `/content/v4/stories/?website=${arcSite}`;

    if (noteId)
        return `${basePath}&_id=${noteId}&included_fields=content_elements,promo_items.apertura_multimedia`;

    throw new Error('Debe definir url o id para obtener la nota');
};

const fetch = query => {
    const { uri = '' } = query;
    const arcSite = query['arc-site'];
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
            return transform(response, uri);
        })
        .catch(error => {
            logger.push(
                error,
                { source: 'content/source/optaSource', uri },
                arcSite
            );
        });
};

const transform = (data, url) => {
    const { idRawHtml } = getRawIdAndNoteId(url);
    const contentElements = get(data, 'content_elements', []);
    const aperturaMultimedia = get(data, 'promo_items.apertura_multimedia', {});
    return {
        content_elements:
            contentElements.find(
                elem => elem.type === 'raw_html' && elem._id === idRawHtml
            ) ||
            (aperturaMultimedia._id === idRawHtml && aperturaMultimedia)
    };
};

export default {
    fetch,
    ttl: 300
};
