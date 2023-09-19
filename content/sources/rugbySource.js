import { CLL_BACK_BASE_URL, CLL_BACK_API_KEY } from 'fusion:environment';
import request from 'request-promise-native';
import {
    getQuery,
    transform,
    reorderFinishedMatches
} from './utils/rugby/rugbySourceHelper';
import logger from '../../components/private/common/utils/logger';

const fetch = ({ 'arc-site': arcSite } = {}) => {
    const graphQLQuery = getQuery();
    const getData = async () => {
        try {
            const response = await request.post({
                uri: CLL_BACK_BASE_URL,
                json: true,
                headers: {
                    'x-api-key': CLL_BACK_API_KEY
                },
                body: {
                    query: graphQLQuery
                }
            });

            const matches = transform(response);

            return {
                data: matches.sort(reorderFinishedMatches)
            };
        } catch (error) {
            return logger.push(
                error,
                {
                    source: 'content/sources/rugbySource'
                },
                arcSite
            );
        }
    };
    return Promise.resolve(getData());
};

export default {
    fetch,
    ttl: 60
};
