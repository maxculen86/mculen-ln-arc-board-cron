// import { transform } from "@babel/core";

import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import getProperties from 'fusion:properties';
import navigationTreeSource from './navigationTreeSource';

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
            transform(response, query, arcSite);
        })
        .catch(error => {
            //logger.push(error, { source: 'content/source', url }, arcSite);
            throw error;
        });
};

const transform = (data, query, website) => {
    const { _id: idData } = data;
    const { id: idQuery } = query;

    /**
     * Se valida que la sección consultada tenga
     * consistencia con la data respondida en la data
     * de origen
     */
    if (!idData || !idQuery || idData !== idQuery) {
        const err = new Error(
            `La sección '${idQuery}' que intenta consultar no existe`
        );
        err.statusCode = 404;
        throw err;
    }

    const response = data;

    /* navigationTreeSource.fetch({ website }).then(res => {
        response.banner = res.bannerConfig;
        return response;
    }); */

    return response;
};

const ttlValue = () => {
    const properties = getProperties('la-nacion-ar');
    const value = properties.ttlConfig.sectionSource.ttl;
    return value;
};

/**
 * TODO: Revisar ttl para este contentSource
 */

export default {
    fetch,
    schemaName: 'section-schema',
    params: {
        id: 'text',
        website: 'text'
    }
};
