import nodeFetch from 'node-fetch';
import { ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../../components/private/common/utils/logger';

const getRequest = query => {
    const opt = {
        method: 'GET'
    };

    if (ARC_ACCESS_TOKEN) {
        opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };
    }

    const resolveData = async () => {
        try {
            const response = await nodeFetch(query, opt);

            if (!response.ok) {
                throw new Error(
                    `HTTP error! status: ${response.status}, URL: ${query}`
                );
            }

            const data = await response.json();
            return data;
        } catch (error) {
            logger.push(error, {
                source: 'utils/getRequest',
                query
            });

            return {};
        }
    };

    return resolveData();
};

export default getRequest;
