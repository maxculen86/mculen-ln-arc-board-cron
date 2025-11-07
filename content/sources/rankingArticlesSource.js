import { API_ENV, API_KEY_ARC_SERVICES_PROD } from 'fusion:environment';
import { getSectionParentId } from '../../components/features/LN-common/ranking/_helper';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger';
import filter from '../filters/LN/nota/articleRanking';
import { isNotRecommend } from './utils/collectionsHelper';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import {
    MINIMUM_ITEMS,
    getCanonicalUrls,
    getQueryData,
    getServicesRequest,
    sortData,
    transformData
} from './utils/rankingArticlesSource/_helper';

const SOURCE_NAME = 'content/sources/rankingArticlesSource';

const API_TIMEOUT_MS = 5000;

const BASE_HEADERS = {
    'Content-Type': 'application/json',
    'User-Agent': 'arc-xp-client',
    Accept: 'application/json'
};

const EXTERNAL_API_HEADERS = {
    ...BASE_HEADERS,
    Referer: API_ENV,
    'api-key': API_KEY_ARC_SERVICES_PROD
};

const buildAuthHeaders = authToken => {
    const headers = { ...BASE_HEADERS };
    if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
    }
    return headers;
};

const fetchWithTimeout = async (
    url,
    options = {},
    timeoutMs = API_TIMEOUT_MS
) => {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), timeoutMs);

    try {
        const response = await global.fetch(url, {
            ...options,
            signal: abortController.signal
        });

        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error(`Request timeout after ${timeoutMs}ms`);
        }
        throw error;
    }
};

const fetchServiceArticles = async servicesRequest => {
    const headersWithAuth = buildAuthHeaders(servicesRequest.auth?.bearer);

    const articlesResponse = await fetchWithTimeout(servicesRequest.uri, {
        headers: headersWithAuth
    });

    handleHttpError(articlesResponse);
    return articlesResponse.json();
};

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

const fetchAnalyticsRanking = async (query, { cachedCall } = {}) => {
    const { newQuery, uriArcServicesAPI, size, arcSite } = getQueryData(query);
    try {
        const storiesResponse = await fetchWithTimeout(uriArcServicesAPI, {
            headers: EXTERNAL_API_HEADERS
        });

        handleHttpError(storiesResponse);

        const storiesUrls = await storiesResponse.json();

        const stories = getCanonicalUrls(storiesUrls);

        if (get(stories, 'length', 0) < MINIMUM_ITEMS)
            return transform([], query, cachedCall);

        const { servicesRequest } = getServicesRequest(newQuery, stories);

        const articles = await fetchServiceArticles(servicesRequest);

        const filterArticles = get(articles, 'content_elements', []).filter(
            art => !isNotRecommend(art)
        );

        if (filterArticles.length === 0)
            return transform([], query, cachedCall);

        return await transform(
            sortData(filterArticles, stories, size),
            query,
            cachedCall
        );
    } catch (error) {
        logger.push(
            error,
            `Error in getRankingStories: ${error.message}`,
            arcSite
        );
        return [];
    }
};

const fetchRankingWithParentFallback = async (query, { cachedCall } = {}) => {
    const { sectionId } = query;
    const parentSectionId = getSectionParentId(sectionId);

    const [rankingSection, rankingSectionParent] = await Promise.all([
        fetchAnalyticsRanking(query, { cachedCall }),
        fetchAnalyticsRanking(
            { ...query, sectionId: parentSectionId },
            { cachedCall }
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
        return fetchRankingWithParentFallback(query, { cachedCall });
    }

    try {
        const storiesResponse = await fetchWithTimeout(uriArcServicesAPI, {
            headers: EXTERNAL_API_HEADERS
        });

        handleHttpError(storiesResponse);

        const storiesUrls = await storiesResponse.json();

        const stories = getCanonicalUrls(storiesUrls);
        const { servicesRequest, uri } = getServicesRequest(newQuery, stories);

        if (get(stories, 'length', 0) >= MINIMUM_ITEMS) {
            try {
                const articles = await fetchServiceArticles(servicesRequest);

                return await transform(
                    sortData(
                        get(articles, 'content_elements', []).filter(
                            art => !isNotRecommend(art)
                        ),
                        stories,
                        size
                    ),
                    query,
                    cachedCall
                );
            } catch (error) {
                logger.push(error, { source: SOURCE_NAME, uri }, arcSite);
                return [];
            }
        } else {
            return [];
        }
    } catch (error) {
        logger.push(
            error,
            { source: SOURCE_NAME, uri: uriArcServicesAPI },
            arcSite
        );
        return [];
    }
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
