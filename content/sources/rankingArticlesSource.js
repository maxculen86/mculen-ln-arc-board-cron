import request from 'request-promise-native';
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

const fetch = query => {
    const { sectionId, arcSite } = query;
    const newQuery = { ...query, ...getQuery(sectionId) };
    const { endpoint, size } = newQuery;
    const uriArcServicesAPI = `https://arcservices.lanacion.com.ar/api/v1/analytics${endpoint}`;
    const source = 'content/sources/rankingArticlesSource';
    return request({
        uri: uriArcServicesAPI,
        json: true
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
                          sortData(
                              get(articles, 'content_elements', []).filter(
                                  art => !isNotRecommend(art)
                              ),
                              stories,
                              size
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

const transform = (data, query) => {
    const sectionId = get(query, 'sectionId', '');
    const { size, name } = getQuery(sectionId);
    return data.length === size
        ? { articles: transformData(data, query), size, name }
        : {};
};

export default {
    fetch,
    transform,
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
