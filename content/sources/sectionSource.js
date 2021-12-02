import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import { getTodayDateForAcuDolar } from '../../components/private/common/utils/dateAndTimeUtil';
import force404AMP from './utils/force404AMP';
import NotFoundError from './utils/notFoundError';

const resolve = key => {
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

const fetch = query => {
    const { id = '', outputType } = query;
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

    force404AMP({ outputType });

    return request(opt)
        .then(response => {
            /**
             * Se valida que la sección consultada tenga
             * consistencia con la data respondida en la data
             * de origen
             */
            const { _id: idData } = response;
            const { id: idQuery } = query;
            if (!idData || !idQuery || idData !== idQuery) {
                throw new NotFoundError(
                    `La sección '${idQuery}' que intenta consultar no existe`
                );
            }
            return transform(response, query);
        })
        .catch(error => {
            logger.push(
                error,
                { source: 'content/source/sectionSource', url: id },
                arcSite
            );
        });
};
const transform = (data, { meteringVariant }) => {
    const newData = {
        ...data,
        date: getTodayDateForAcuDolar(),
        subscription: meteringVariant
    };
    return newData;
};

export default {
    fetch,
    schemaName: 'section-schema',
    params: {
        id: 'text',
        website: 'text',
        outputType: 'text',
        redirectUrl: 'text',
        meteringVariant: 'text'
    },
    ttl: 300
};
