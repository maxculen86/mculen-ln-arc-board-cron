import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import NotFoundError from './utils/notFoundError';

const resolve = key => {
    const { website, slug } = key;

    if (!slug)
        throw new Error('Debe definir un slug para obtener el distributor');
    if (!website)
        throw new Error(
            'Debe definir un website para obtener el arbol de navigation'
        );

    return `/site/v3/navigation/${website}/`;
};

const transform = (data, query) => {
    const { uri, slug, meteringVariant } = query || {};
    const name = data[slug];

    return {
        distributorId: name,
        name,
        byline: name,
        node_type: 'distributor',
        canonical_url: uri,
        subscription: meteringVariant,
        slug: `/${slug}`
    };
};
const fetch = async query => {
    const { uri = '', slug = '' } = query;
    const arcSite = query['arc-site'];
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const requestInit = {
        signal: controller.signal,
        ...(ARC_ACCESS_TOKEN && {
            headers: { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` }
        })
    };

    try {
        const response = await global.fetch(
            `${CONTENT_BASE}${resolve(query)}`,
            requestInit
        );

        handleHttpError(response);

        const distributor =
            (await response.json())?.site?.distributor_name || {};

        if (!distributor[slug])
            throw new NotFoundError(
                `El slug ${slug} no corresponde a un distribuidor definido en Site Service.`
            );

        return transform(distributor, query);
    } catch (error) {
        const isAbortError = error?.name === 'AbortError';

        logger.push(
            isAbortError ? { ...error, statusCode: 504 } : error,
            { source: 'content/source/distributorSource', uri },
            arcSite
        );

        return null;
    } finally {
        clearTimeout(timeoutId);
    }
};

export default {
    fetch,
    schemaName: 'distributor-schema',
    params: {
        slug: 'text',
        website: 'text',
        meteringVariant: 'text'
    },
    ttl: 120
};
