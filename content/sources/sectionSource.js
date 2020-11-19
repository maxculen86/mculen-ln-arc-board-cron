import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import navigationTreeSource from './navigationTreeSource';
import logger from '../../components/private/common/utils/logger';
import getTTLValue from './utils/sourceSetting';

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
    const resp = { ...data, articlesInCollection: [] };

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

    return Promise.all(promiseArr).then(() => {
        return resp;
    });
};

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
            throw e;
        });
};

export default {
    fetch,
    schemaName: 'section-schema',
    params: {
        id: 'text',
        website: 'text'
    },
    ttl: getTTLValue('sectionSource')
};
