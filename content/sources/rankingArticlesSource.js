import { API_ENV, API_KEY_ARC_SERVICES_PROD } from 'fusion:environment';
import request from 'request-promise-native';
import { getSectionParentId } from '../../components/features/LN-common/ranking/_helper';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger';
import filter from '../filters/LN/nota/articleRanking';
import { isNotRecommend } from './utils/collectionsHelper';
import {
    MINIMUM_ITEMS,
    getCanonicalUrls,
    getQueryData,
    getServicesRequest,
    sortData,
    transformData
} from './utils/rankingArticlesSource/_helper';

const source = 'content/sources/rankingArticlesSource';
const transform = async (data, query, cachedCall) => {
    const { isApiFetch, size, name } = getQueryData(query);

    if (isApiFetch && data.length !== size) {
        return { articles: [], size, name };
    }

    if (data.length === size)
        return {
            articles: await transformData(data, query, cachedCall),
            size,
            name
        };

    return {};
};

const getAsyncRankingStories = async (query, { cachedCall } = {}) => {
    try {
        const { newQuery, uriArcServicesAPI, size } = getQueryData(query);

        const storiesUrls = await request({
            uri: uriArcServicesAPI,
            json: true,
            headers: {
                Referer: API_ENV,
                'api-key': API_KEY_ARC_SERVICES_PROD
            }
        });

        const stories = getCanonicalUrls(storiesUrls);

        if (get(stories, 'length', 0) < MINIMUM_ITEMS)
            return transform([], query, cachedCall);

        const { servicesRequest } = getServicesRequest(newQuery, stories);

        const articles = await request(servicesRequest);

        const filterArticles = get(articles, 'content_elements', []).filter(
            art => !isNotRecommend(art)
        );

        if (filterArticles.length === 0)
            return transform([], query, cachedCall);

        const response = await transform(
            sortData(filterArticles, stories, size),
            query,
            cachedCall
        );

        return response;
    } catch (error) {
        logger.error(`Error in getRankingStories: ${error.message}`, error);
        return [];
    }
};

const getApiRanking = async (query, { cachedCall } = {}) => {
    const { sectionId } = query;
    const parentSectionId = getSectionParentId(sectionId);

    const [rankingSection, rankingSectionParent] = await Promise.all([
        getAsyncRankingStories(query, cachedCall),
        getAsyncRankingStories(
            { ...query, sectionId: parentSectionId },
            cachedCall
        )
    ]);

    if (get(rankingSection?.articles, 'length', 0) > 0) {
        return rankingSection;
    }

    return rankingSectionParent;
};

const fetch = async (query, { cachedCall } = {}) => {
    const { newQuery, uriArcServicesAPI, size, arcSite, isApiFetch } =
        getQueryData(query);

    if (isApiFetch) {
        const ranking = await getApiRanking(query, cachedCall);
        return ranking;
    }

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
            const { servicesRequest, uri } = getServicesRequest(
                newQuery,
                stories
            );

            return get(stories, 'length', 0) >= MINIMUM_ITEMS
                ? request(servicesRequest)
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
                : new Promise(resolve => {
                      resolve([]);
                  });
        })
        .catch(error => {
            logger.push(error, { source, uri: uriArcServicesAPI }, arcSite);
        });
};

export default {
    fetch,
    params: {
        endpoint: 'text',
        days: 'number',
        size: 'number',
        imageConfig: 'text',
        website: 'text',
        layout: 'text',
        sectionId: 'text',
        section: 'text',
        api: 'bool'
    },
    filter,
    ttl: 300
};
