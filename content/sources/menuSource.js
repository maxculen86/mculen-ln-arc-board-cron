import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';

let auth;
if (ARC_ACCESS_TOKEN) {
    auth = {
        bearer: ARC_ACCESS_TOKEN
    };
}

const sourceMenu = [
    {
        hierarchy: 'Header-FirstNav',
        initialClass: 'list__nav  first--nav'
    },
    {
        hierarchy: 'Header-SecondaryNav',
        initialClass: 'list__nav  secondary--nav'
    }
];

const getChildren = (
    { _id, name, display_name: displayName, url, children, site },
    isSubNav
) => {
    return {
        _id,
        el: 'li',
        name: name || displayName || '',
        extraClass: !isSubNav
            ? `item--${(name && name.toLowerCase()) ||
                  (displayName && displayName.toLowerCase()) ||
                  ''}`
            : undefined,
        url: url || _id,
        site,
        childs: !isSubNav
            ? !!children && [
                  {
                      el: 'ul',
                      extraClass: 'sublist__nav',
                      childs: [
                          ...children.map(child => getChildren(child, true))
                      ]
                  }
              ]
            : undefined
    };
};

const transform = (data, initialClass) => {
    const { children } = data || {};

    const dataMenu = !!children && {
        el: 'ul',
        extraClass: initialClass,
        childs: children.map(child => getChildren(child))
    };

    return dataMenu;
};

const resolveUri = key => {
    const { website, hierarchy } = key;
    const finalWebsite = website || key['arc-site'];
    return `${CONTENT_BASE}/site/v3/navigation/${finalWebsite}/?hierarchy=${hierarchy}`;
};

const getItem = async query => {
    const { url = '', initialClass } = query;
    const arcSite = query['arc-site'];
    const opt = {
        auth,
        json: true
    };

    opt.uri = resolveUri({
        ...query
    });

    return request(opt)
        .then(response => {
            return transform(response, initialClass);
        })
        .catch(error => {
            logger.push(error, { source: 'content/source', url }, arcSite);
        });
};

const fetch = async (query, { cachedCall }) => {
    const resp = sourceMenu.map(({ hierarchy, initialClass }) => {
        const menu = cachedCall(`navigation-schema-${hierarchy}`, getItem, {
            query: {
                ...query,
                hierarchy,
                initialClass
            },
            ttl: 300
        });
        return menu;
    });

    return Promise.all(resp);
};

export default {
    fetch,
    schemaName: 'navigation-test-schema',
    ttl: 200,
    params: {
        website: 'text'
    }
};
