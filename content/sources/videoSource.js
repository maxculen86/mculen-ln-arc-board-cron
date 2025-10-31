import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';
import {
    resizeVideoImagesV2,
    updateVideoUrl
} from './utils/videoSource/_helper';
import getPresets from './utils/presets';

// TODO: Unificar transform y resizer de imagenes de videos para home y nota

const resolve = key => {
    const { id, url, website } = key;
    const basePath = `/content/v4/videos?website=${website}`;
    if (id) return `${basePath}&_id=${id}`;
    if (url) return `${basePath}&website_url=${url}`;
    throw new Error('Debe definir url o id para obtener el video');
};

const fetch = (query, { cachedCall } = {}) => {
    const { id = '' } = query;

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
        .then(resp => transform(resp, query, cachedCall))
        .catch(err => {
            logger.push(
                err,
                {
                    source: 'content/sources/videoSource',
                    id
                },
                arcSite
            );
        });
};

const transform = async (data, siteProps, cachedCall) => {
    const { presets, presetsDefault } = getPresets(siteProps);
    const updatedData = updateVideoUrl(data);

    return resizeVideoImagesV2({
        data: updatedData,
        presets,
        siteProps,
        cachedCall,
        presetsDefault
    });
};

export default {
    fetch,
    schemaName: 'video-schema',
    params: {
        id: 'text',
        url: 'text',
        website: 'text'
    },
    ttl: 600
};
