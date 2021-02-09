import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import navigationTreeSource from './navigationTreeSource';
import collectionsSource from './collectionsSource';
import logger from '../../components/private/common/utils/logger';
import get from '../../components/private/common/utils/get';

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
    const resp = { ...data, articlesInCollection: [], collectionsInPage: [] };
    const idCollectionApertura = get(
        resp,
        'acumuladoGeneral.id_collection_promo_items'
    );
    const idCollectionsInPage = get(resp, 'acumuladoGeneral.colecciones', []);
    const newSiteProps = {
        ...siteProps,
        id: idCollectionApertura,
        size: 2,
        webSite: arcSite,
        imageConfig: 'l'
    };

    if (idCollectionApertura) {
        promiseArr.push(
            collectionsSource
                .fetch(newSiteProps)
                .then(response => {
                    if (response && response.content_elements) {
                        resp.articlesInCollection = response.content_elements;
                    }
                })
                .catch(error => {
                    logger.push(
                        error,
                        { source: 'content/source', idCollectionApertura },
                        arcSite
                    );
                })
        );
    }
    /*
    idCollectionsInPage.forEach(id => {
        const collectionsProps = {
            ...siteProps,
            id,
            size: 20,
            webSite: arcSite,
            imageConfig: 'l'
        };
        promiseArr.push(
            collectionsSource
                .fetch(collectionsProps)
                .then(response => {
                    if (response && response.content_elements) {
                        resp.collectionsInPage.push({
                            idCollection: id,
                            articles: response.content_elements
                        });
                    }
                })
                .catch(error => {
                    logger.push(
                        error,
                        { source: 'content/source', id },
                        arcSite
                    );
                })
        );
    });

    
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
    */
    return Promise.all(promiseArr).then(() => {
        return resp;
    });
};
/*
const getNavigationSiteProperties = arcSite =>
    navigationTreeSource
        .fetch({ website: arcSite })
        .then(fetchedRelated => {
            const { site } = fetchedRelated || {};
            const { bannerConfig = {} } = fetchedRelated || {};
            const { sitio_adserver: sitioAdserver = {} } = site || {};
            const { Termicas: termicasConfig = {} } = fetchedRelated || {};

            return {
                banners: Object.keys(bannerConfig).map(key => ({
                    adunit: key,
                    dimensions: bannerConfig[key]
                })),
                adserver: Object.keys(sitioAdserver).map(key => ({
                    key,
                    value: sitioAdserver[key]
                })),
                termicas: Object.keys(termicasConfig).forEach(key => ({
                    key,
                    value: termicasConfig[key]
                }))
            };
        })
        .catch(e => {
            throw e;
        });
*/
export default {
    fetch,
    schemaName: 'section-schema',
    params: {
        id: 'text',
        website: 'text'
    },
    ttl: 300
};
