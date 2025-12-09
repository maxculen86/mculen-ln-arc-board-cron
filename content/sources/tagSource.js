import {
    API_ENV,
    API_KEY_ARC_SERVICES,
    ARC_ACCESS_TOKEN,
    CONTENT_BASE,
    LANACION_SERVICES_URL
} from 'fusion:environment';
import { isValidString } from '../../components/private/common/utils/dataValidation';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import filter from '../filters/LN/acumulado/tag';
import getRequest from './utils/getRequest';
import getRequestWithJSON from './utils/getRequestWithJson';
import NotFoundError from './utils/notFoundError';
import { signingServiceCachedCall } from './utils/signingServiceSource/getImagesAuth';
import { extractIdFromImageUrl } from './utils/tagSource/_helper';
import transformWikiTagData from './utils/transformWikiTagData';

const resolve = key => {
    const { slug } = key;

    if (!slug) throw new Error('Debe definir un slug para obtener el tag');

    return `/tags/v2/search?prefix=${slug}`;
};

const getDataForTag = (allTagsData, slug) => {
    let config = '';

    Object.keys(allTagsData).forEach(tag => {
        if (tag?.replace(/ /g, '') === slug) {
            config = allTagsData[tag];
        }
    });

    return config;
};

const transform = async (data, query, tagConfigData, cachedCall) => {
    const { meteringVariant, slug } = query || {};

    const { tagConfigGroup } = tagConfigData || {};

    const {
        anexosuperiortag: anexoSuperiorTag = '',
        anexoinferiortag: anexoInferiorTag = '',
        collectiontag: collectionTagApertura = '',
        wikilist: wikiList = {},
        collections_in_tag_page: collectionsInTagPage = {}
    } = tagConfigGroup || {};

    const colecciones = isValidString(collectionsInTagPage[slug])
        ? collectionsInTagPage[slug].replace(/ /g, '').split('|')
        : [];

    const acumuladoGeneral = {
        anexosuperior: getDataForTag(anexoSuperiorTag, slug),
        anexoinferior: getDataForTag(anexoInferiorTag, slug),
        collectionForTag: getDataForTag(collectionTagApertura, slug),
        ...(colecciones.length && { colecciones })
    };
    const isWiki = typeof wikiList[slug] !== 'undefined';

    const wikiTagData = isWiki
        ? await cachedCall('wikiTagSource', getRequestWithJSON, {
              query: {
                  uri: `${LANACION_SERVICES_URL}/api/v1/tags/${slug}`,
                  headers: {
                      Referer: API_ENV,
                      'api-key': API_KEY_ARC_SERVICES
                  }
              }
          })
        : {};

    const siteProps = {
        imageConfig: 'wikiTag',
        arcSite: 'la-nacion-ar'
    };

    const image = get(wikiTagData, 'image', {});
    const imageUrl = get(image, 'url', '');
    const imageId = extractIdFromImageUrl(imageUrl);
    const signingResponse = await signingServiceCachedCall(imageId, cachedCall);

    const imageProps = {
        auth: { 1: get(signingResponse, 'hash', '') },
        _id: imageId,
        additional_properties: { originalUrl: imageUrl }
    };

    const updatedWikiTagData = {
        ...wikiTagData,
        image: { ...image, ...imageProps }
    };
    const wikiDataTransformed =
        transformWikiTagData(updatedWikiTagData, siteProps) || {};

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

const fetch = async (query, { cachedCall }) => {
    const { slug, website = 'la-nacion-ar' } = query || {};

    const tagConfigData = await cachedCall('navigationTreeSource', getRequest, {
        query: `${CONTENT_BASE}/site/v3/navigation/${website}/`,
        independent: true
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const requestInit = {
        method: 'GET',
        signal: controller.signal,
        ...(ARC_ACCESS_TOKEN && {
            headers: { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` }
        })
    };

    const requestUrl = `${CONTENT_BASE}${resolve(query)}`;

    try {
        const response = await global.fetch(requestUrl, requestInit);
        handleHttpError(response);

        const resp = await response.json();

        if (resp.Payload && resp.Payload.items && resp.Payload.items[0]) {
            if (resp.Payload.items[0].slug !== slug) {
                throw new NotFoundError(`Tag no encontrado: ${slug}`);
            }
        }

        if (!resp.Payload.items.length) {
            throw new NotFoundError(`Tag no encontrado: ${slug}`);
        }

        return transform(resp, query, tagConfigData, cachedCall);
    } catch (error) {
        const isAbortError = error?.name === 'AbortError';

        console.warn(
            `LnWarn:Error in content/sources/tagSource : 
                query parameters: ${JSON.stringify(query)} 
                - errorMsj: ${error.message} - timeout:${isAbortError}`,
            'sourceError'
        );
        logger.push(
            isAbortError ? { ...error, statusCode: 504 } : error,
            { source: 'content/source/tagSource', url: `/tema/${slug}/` },
            query['arc-site']
        );
        return {};
    } finally {
        clearTimeout(timeoutId);
    }
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
