/* eslint-disable no-underscore-dangle */
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import { getTodayDateForAcuDolar } from '../../components/private/common/utils/dateAndTimeUtil';
import NotFoundError from './utils/notFoundError';

const mapSections = {
    '/dolar-hoy': '/dolar-hoy',
    '/suscriptores': '/suscriptores'
};

export const resolve = key => {
    const { id, website } = key;
    const finalWebsite = website || key['arc-site'];
    if (!id)
        throw new Error(
            'Debe definir un id para realizar la consulta - Section Source'
        );
    if (!finalWebsite)
        throw new Error('Debe indicar el website - Section Source');
    if (!id.startsWith('/'))
        throw new Error(
            'El id de sección debe comenzar con / - Section Source'
        );
    return `/site/v3/navigation/${finalWebsite}/?_id=${id}`;
};

const transform = (data, { meteringVariant }) => ({
    ...data,
    date: getTodayDateForAcuDolar(),
    subscription: meteringVariant
});

const fetch = async query => {
    const { id = '' } = query;
    const arcSite = query['arc-site'];
    const url = `${CONTENT_BASE}${resolve(query)}`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (ARC_ACCESS_TOKEN) {
        options.headers.Authorization = `Bearer ${ARC_ACCESS_TOKEN}`;
    }

    try {
        const response = await global.fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        const { id: idQuery } = query;
        if (query.api === 'true') {
            data._id = mapSections[idQuery] || idQuery;
        }

        const { _id: idData } = data;

        if (!idData || !idQuery || idData !== idQuery) {
            if (!mapSections[idQuery])
                throw new NotFoundError(
                    `La sección '${idQuery}' que intenta consultar no existe`
                );
        }

        return transform(data, query);
    } catch (error) {
        logger.push(
            error,
            {
                source: 'content/sources/sectionSource',
                query,
                url,
                id
            },
            arcSite
        );
        return {};
    }
};

export default {
    fetch,
    schemaName: 'section-schema',
    params: {
        id: 'text',
        website: 'text',
        outputType: 'text',
        redirectUrl: 'text',
        meteringVariant: 'text',
        api: 'text'
    },
    ttl: 300
};
