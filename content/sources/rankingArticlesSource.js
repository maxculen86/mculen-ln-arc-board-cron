import request from 'request-promise-native';
import { API_ENV, API_KEY_ARC_SERVICES_PROD } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import get from '../../components/private/common/utils/get';
import { isNotRecommend } from './utils/collectionsHelper';
import filter from '../filters/LN/nota/articleRanking';
import {
    getCanonicalUrls,
    getQuery,
    transformData,
    resolveUri,
    sortData,
    MINIMUM_ITEMS
} from './utils/rankingArticlesSource/_helper';

const fetch = (query, { cachedCall } = {}) => {
    const { sectionId, arcSite, layout } = query;
    const newQuery = { ...query, ...getQuery(sectionId, layout) };
    const { endpoint, size } = newQuery;
    const uriArcServicesAPI = `https://arcservices.lanacion.com.ar/api/v1/analytics${endpoint}`;
    const source = 'content/sources/rankingArticlesSource';
    return request({
        uri: uriArcServicesAPI,
        json: true,
        headers: {
            Referer: API_ENV,
            'api-key': API_KEY_ARC_SERVICES_PROD
        }
    })
        .then(storiesUrls => {
            const stories = getCanonicalUrls(storiesUrls);
            const uri = resolveUri({
                ...newQuery,
                stories
            });
            return get(stories, 'length', 0) >= MINIMUM_ITEMS
                ? request({
                      uri,
                      json: true
                  })
                      .then(articles =>
                          transform(
                              sortData(
                                  get(articles, 'content_elements', []).filter(
                                      art => !isNotRecommend(art)
                                  ),
                                  stories,
                                  size
                              ),
                              query,
                              cachedCall
                          )
                      )
                      .catch(error => {
                          logger.push(error, { source, uri }, arcSite);
                      })
                : new Promise(resolve => resolve([]));
        })
        .catch(error => {
            logger.push(error, { source, uri: uriArcServicesAPI }, arcSite);
        });
};

const transform = async (data, query, cachedCall) => {
    const { sectionId = '', layout } = query;
    const { size, name } = getQuery(sectionId, layout);

    return data.length === size
        ? { articles: await transformData(data, query, cachedCall), size, name }
        : {};
};

export default {
    fetch,
    params: {
        endpoint: 'text',
        days: 'number',
        size: 'number',
        imageConfig: 'text',
        website: 'text'
    },
    filter,
    ttl: 300
};
