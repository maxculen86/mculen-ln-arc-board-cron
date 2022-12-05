import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
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

const fetch = query => {
    const { statusCode } = query;
    const { path, typeFilter } = resolve(query);
    const opt = {
        uri: `${CONTENT_BASE}${path}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }
    if (typeFilter === 'nota_id') {
        return {
            redirectNotaAsp: true
        };
    }
    return request(opt)
        .then(response => {
            eventByFilter[typeFilter]
                ? eventByFilter[typeFilter]({ response, statusCode })
                : is404('No contiene redirect');
        })
        .catch(error => {
            throw error;
        });
};

const resolve = (query = {}) => {
    const website = `website=${query.website || query['arc-site']}`;
    const published = `&published=${query.published || 'true'}`;

    if (query.uri === '/nota.asp') {
        return {
            typeFilter: 'nota_id'
        };
    }
    if (query.hasOwnProperty('website_url')) {
        return {
            path: `/content/v4/?website_url=${query.website_url}&${website}&${published}`,
            typeFilter: 'website_url'
        };
    }
    if (query.hasOwnProperty('source_id')) {
        return {
            path: `/content/v3/search/published?${website}&${published}&q=source.source_id=${query.id}&single=true`,
            typeFilter: 'source_id'
        };
    }
    if (query.hasOwnProperty('canonical_url')) {
        return {
            path: `/content/v3/?canonical_url=${query.canonical_url}`,
            typeFilter: 'canonical_url'
        };
    }

    throw new Error(
        'website and source id, or canonical url, or website url is required'
    );
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
