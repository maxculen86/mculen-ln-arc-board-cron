import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import get from 'lodash.get';
import sourceSetting from './utils/sourceSetting';
// import filter from '../filters/LN/nota/article';
import logger from '../../components/private/common/utils/logger';

const getRawIdAndNoteId = url => {
    const params = url ? url.split('/') : '';
    if (params.length < 7) return '';
    const noteId = params[params.length - 2];
    const idRawHtml = params[params.length - 3];
    return { noteId, idRawHtml };
};

const resolve = (key, a) => {
    const { url } = key;
    const { noteId } = getRawIdAndNoteId(url);

    const arcSite = key['arc-site'];
    const basePath = `/content/v4/stories/?website=${arcSite}`;

    if (noteId)
        return `${basePath}&_id=${noteId}&included_fields=content_elements`;

    throw new Error('Debe definir url o id para obtener la nota');
};

const fetch = query => {
    const { url = '' } = query;
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
            return transform(response, url);
        })
        .catch(error => {
            logger.push(error, { source: 'content/source', url }, arcSite);
            throw error;
        });
};

const transform = (data, url) => {
    const { idRawHtml } = getRawIdAndNoteId(url);
    console.log("transform -> data", data)
    const contentElements = get(data, 'content_elements', []);
    const resp = {
        content_elements: contentElements.find(
            elem => elem.type === 'raw_html' && elem._id === idRawHtml
        )
    };

    console.log("transform -> resp", resp)
    return resp;
};

export default {
    fetch,
    params: {
        url: 'text',
        id: 'text',
        idRawHtml: 'text'
    },
    ttl: sourceSetting.articleSourceNota.ttl
};
