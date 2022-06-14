import {
    CONTENT_BASE,
    ARC_ACCESS_TOKEN,
    LANACION_SERVICES_URL
} from 'fusion:environment';
import request from 'request-promise-native';
import filter from '../filters/LN/acumulado/tag';
import force404AMP from './utils/force404AMP';
import logger from '../../components/private/common/utils/logger';
import NotFoundError from './utils/notFoundError';
import getRequest from './utils/getRequest';
import transformWikiTagData from './utils/transformWikiTagData';

const resolve = key => {
    const { slug, outputType } = key;

    if (!slug) throw new Error('Debe definir un slug para obtener el tag');
    force404AMP({ outputType });

    return `/tags/v2/search?prefix=${slug}`;
};

const fetch = async (query, { cachedCall }) => {
    const { slug, website = 'la-nacion-ar' } = query || {};

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
        query: `${CONTENT_BASE}/site/v3/navigation/${website}/`
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

            return transform(resp, query, tagConfigData, cachedCall);
        })
        .catch(error => {
            logger.push(
                error,
                { source: 'content/source/tagSource', url: `/tema/${slug}/` },
                query['arc-site']
            );
        });
};

const transform = async (data, query, tagConfigData, cachedCall) => {
    const { meteringVariant, slug } = query || {};

    const { tagConfigGroup } = tagConfigData || {};

    const {
        anexosuperiortag: anexoSuperiorTag = '',
        anexoinferiortag: anexoInferiorTag = '',
        collectiontag: collectionTag = '',
        wikilist: wikiList = {}
    } = tagConfigGroup || {};

    const acumuladoGeneral = {
        anexosuperior: getDataForTag(anexoSuperiorTag, slug),
        anexoinferior: getDataForTag(anexoInferiorTag, slug),
        collectionForTag: getDataForTag(collectionTag, slug)
    };
    const isWiki = typeof wikiList[slug] !== 'undefined';

    const wikiTagData = isWiki
        ? await cachedCall('wikiTagSource', getRequest, {
              query: `${LANACION_SERVICES_URL}/api/v1/tags/${slug}`
          })
        : {};

    const siteProps = {
        imageConfig: 'wikiTag',
        arcSite: 'la-nacion-ar'
    };

    const wikiDataTransformed =
        transformWikiTagData(wikiTagData, siteProps) || {};

    return {
        ...data,
        node_type: 'tags',
        name: data.Payload.items[0].name,
        canonical_url: `/tema/${slug}/`,
        subscription: meteringVariant,
        acumuladoGeneral,
        isWiki,
        ...(isWiki && { wikiSourceData: wikiDataTransformed })
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
