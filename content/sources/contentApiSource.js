import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import Redirect from './utils/redirect';

const is404 = message => {
    const err = new Error(message);
    err.statusCode = 404;
    throw err;
};

const eventByFilter = {
    website_url: ({ response, statusCode }) => {
        const { redirect_url: redirectUrl } = response;

        if (redirectUrl) throw new Redirect(redirectUrl, statusCode || 301);
        else return response;
    },
    source_id: () => {},
    canonical_url: () => {}
};

const resolve = (query = {}) => {
    const website = `website=${query.website || query['arc-site']}`;
    const published = `&published=${query.published || 'true'}`;

    if (Object.prototype.hasOwnProperty.call(query, 'website_url')) {
        return {
            path: `/content/v4/?website_url=${query.website_url}&${website}&${published}`,
            typeFilter: 'website_url'
        };
    }
    if (Object.prototype.hasOwnProperty.call(query, 'source_id')) {
        return {
            path: `/content/v3/search/published?${website}&${published}&q=source.source_id=${query.id}&single=true`,
            typeFilter: 'source_id'
        };
    }
    if (Object.prototype.hasOwnProperty.call(query, 'canonical_url')) {
        return {
            path: `/content/v3/?canonical_url=${query.canonical_url}`,
            typeFilter: 'canonical_url'
        };
    }

    throw new Error(
        'website and source id, or canonical url, or website url is required'
    );
};

const fetch = query => {
    const resolveData = async () => {
        const { statusCode } = query;
        const { path, typeFilter } = resolve(query);
        const url = `${CONTENT_BASE}${path}`;

        const headers = {};

        if (ARC_ACCESS_TOKEN) {
            headers.Authorization = `Bearer ${ARC_ACCESS_TOKEN}`;
        }

        const response = await global.fetch(url, { headers });
        handleHttpError(response);
        const data = await response.json();

        if (eventByFilter[typeFilter]) {
            return eventByFilter[typeFilter]({
                response: data,
                statusCode
            });
        }
        return is404('No contiene redirect');
    };

    return resolveData();
};

export default {
    params: {
        canonical_url: 'text',
        published: 'text',
        source_id: 'text',
        website_url: 'text',
        website: 'text',
        statusCode: 'text'
    },
    fetch
};
