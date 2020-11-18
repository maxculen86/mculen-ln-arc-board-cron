// import { transform } from "@babel/core";
import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import getProperties from 'fusion:properties';
import collectionsSource from './collectionsSource';
import navigationTreeSource from './navigationTreeSource';
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

const fetch = query => {
    const { url = '' } = query;
    // console.log("query", query)
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
            return transform(response, query);
        })
        .catch(error => {
            logger.push(error, { source: 'content/source', url }, arcSite);
            throw error;
        });
};

const transform = (data, siteProps) => {
    const { _id: idData } = data;
    const { id: idQuery } = siteProps;
    const arcSite = siteProps['arc-site'];
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

    return transformContent(data, siteProps, arcSite);
};

const transformContent = (data, siteProps, arcSite) => {
    const promiseArr = [];
    const resp = { ...data, articlesInCollection: [] };
    const idCollection = get(
        resp,
        'acumuladoGeneral.id_collection_promo_items'
    );
    const newSiteProps = {
        ...siteProps,
        id: idCollection,
        size: 2,
        webSite: arcSite,
        imageConfig: 'l'
    };

    promiseArr.push(
        getNavigationSiteProperties(arcSite).then(result => {
            resp.siteService = {
                banners: result.banners,
                adserver: result.adserver,
                termicas: result.termicas
            };
            return resp;
        })
    );

    if (idCollection) {
        promiseArr.push(
            collectionsSource.fetch(newSiteProps).then(response => {
                console.log("RESPONDIO")
                if (response && response.content_elements) {
                    resp.articlesInCollection = response.content_elements;
                }
            })
        );
        /*
        promiseArr.push(
            getCollections(idCollection, arcSite, siteProps).then(response => {
                // console.log("transform -> response", response)
                if (response && response.content_elements) {
                    resp.articlesInCollection = response.content_elements;
                }
            })
        );
        */
    }

    // Si no tiene uri viene de una page y no funciona retornando Promise
    /*if (!siteProps.uri) {
        console.log("transformContent -> resp", resp)
        return resp;
    }*/

    return Promise.all(promiseArr).then(() => {
        console.log("transformContent -> resp", resp)
        return resp;
    });
};
/*
const getCollections = (idCollection, arcSite, siteProps) => {
    const query = collectionsSource.resolve({
        id: idCollection,
        size: 2,
        website: arcSite
    });

    const properties = { ...siteProps, imageConfig: 'l' };

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
*/
const getNavigationSiteProperties = arcSite => {
    const urlNavigationTreeSource = navigationTreeSource.resolve({
        website: arcSite
    });
    const opt = {
        uri: `${CONTENT_BASE}${urlNavigationTreeSource}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }
    return request(opt)
        .then(fetchedRelated => {
            const { site } = fetchedRelated || {};
            const { bannerConfig } = fetchedRelated || { bannerConfig: {} };
            const { Termicas: termicasConfig } = fetchedRelated || {
                Termicas: {}
            };
            const { sitio_adserver: sitioAdserver } = site;
            // Banner dimensions
            const banners = [];
            Object.keys(bannerConfig).forEach(key => {
                banners.push({
                    adunit: key,
                    dimensions: bannerConfig[key]
                });
            });
            // Termicas
            const termicas = [];
            Object.keys(termicasConfig).forEach(key => {
                termicas.push({
                    key,
                    value: termicasConfig[key]
                });
            });
            // Banner segments
            const adserver = [];
            Object.keys(sitioAdserver).forEach(key => {
                adserver.push({
                    key,
                    value: sitioAdserver[key]
                });
            });
            const resp = {
                banners,
                adserver,
                termicas
            };
            return resp;
        })
        .catch(e => {
            // console.log('Error article source: getNavigationSiteProperties -> e', e);
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
    fetch,
    schemaName: 'section-schema',
    params: {
        id: 'text',
        website: 'text'
    },
    transform
};
