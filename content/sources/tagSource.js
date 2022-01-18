import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import request from 'request-promise-native';
import filter from '../filters/LN/acumulado/tag';
import force404AMP from './utils/force404AMP';
import logger from '../../components/private/common/utils/logger';
import NotFoundError from './utils/notFoundError';

const resolve = key => {
    const { slug, outputType } = key;

    if (!slug) throw new Error('Debe definir un slug para obtener el tag');
    force404AMP({ outputType });

    return `/tags/v2/search?prefix=${slug}`;
};

const getRequest = query => {
    const opt = {
        uri: query,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }
    return request(opt).then(data => data);
};

const fetch = async (query, { cachedCall }) => {
    const { uri, slug, website = 'la-nacion-ar' } = query || {};

    const opt = {
        uri: `${CONTENT_BASE}${resolve(query)}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }

    const tagConfigData = await cachedCall('navigationTreeSource', getRequest, {
        query: `${CONTENT_BASE}/site/v3/navigation/${website}/`,
        ttl: 120
    });

    return request(opt)
        .then(resp => {
            if (resp.Payload && resp.Payload.items && resp.Payload.items[0]) {
                if (resp.Payload.items[0].slug !== slug) {
                    throw new NotFoundError('Tag no encontrado');
                }
            }

            if (!resp.Payload.items.length) {
                throw new NotFoundError('Tag no encontrado');
            }

            return transform(resp, query, tagConfigData);
        })
        .catch(error => {
            logger.push(
                error,
                { source: 'content/source/tagSource', url: uri },
                query['arc-site']
            );
        });
};

const transform = (data, query, tagConfigData) => {
    const { uri, meteringVariant, slug } = query || {};

    const { tagConfigGroup } = tagConfigData;

    const {
        anexosuperiortag: anexoSuperiorTag,
        anexoinferiortag: anexoInferiorTag,
        collectiontag: collectionTag
    } = tagConfigGroup;

    const acumuladoGeneral = {
        anexosuperior: getDataForTag(anexoSuperiorTag, slug),
        anexoinferior: getDataForTag(anexoInferiorTag, slug),
        collectionForTag: getDataForTag(collectionTag, slug)
    };
    return {
        ...data,
        node_type: 'tags',
        name: data.Payload.items[0].name,
        canonical_url: uri,
        subscription: meteringVariant,
        acumuladoGeneral
    };
};

const getDataForTag = (allTagsData, slug) => {
    let config = '';

    Object.keys(allTagsData).forEach(tag => {
        if (tag.replace(/ /g, '') === slug) {
            config = allTagsData[tag];
        }
    });

    return config;
};

export default {
    fetch,
    schemaName: 'tag-schema',
    params: {
        slug: 'text',
        outputType: 'text',
        redirectUrl: 'text',
        meteringVariant: 'text'
    },
    filter,
    ttl: 900
};
