// import { transform } from "@babel/core";
import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import getProperties from 'fusion:properties';
import collectionsSource from './collectionsSource';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger';

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

const transform = (data, query) => {
    const { _id: idData } = data;
    const { id: idQuery } = query;
    const arcSite = query['arc-site'];
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

    const promiseArr = [];
    const resp = { ...data };
    const idCollection = get(
        resp,
        'acumuladoGeneral.id_collection_promo_items'
    );

    if (idCollection) {
        promiseArr.push(
            new Promise(resolver =>
                resolver(getCollections(idCollection, arcSite))
            ).then(response => {
                resp.articlesInCollection = response.content_elements;
            })
        );
    }

    // console.log("transform -> resp", resp)
    return Promise.all(promiseArr).then(() => {
        return resp;
    });
};

const getCollections = (idCollection, arcSite) => {
    const query = collectionsSource.resolve({
        id: idCollection,
        size: 2,
        imageConfig: 'l',
        website: arcSite
    });
    const properties = getProperties(arcSite);

    const opt = {
        uri: `${CONTENT_BASE}${query}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }
    return request(opt)
        .then(response => {
            const newResponse = collectionsSource.transform(
                response,
                properties
            );
            return newResponse;
        })
        .catch(error => {
            logger.push(error, { source: 'content/source', query }, arcSite);
            throw error;
        });
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
    resolve,
    schemaName: 'section-schema',
    params: {
        id: 'text',
        website: 'text'
    },
    transform
};
