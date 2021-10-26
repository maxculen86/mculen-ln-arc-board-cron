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

const resolveUri = key => {
    const { website, hierarchy } = key;
    const finalWebsite = website || key['arc-site'];
    return `${CONTENT_BASE}/site/v3/navigation/${finalWebsite}/?hierarchy=${hierarchy}`;
};

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

const getMenuItems = async query => {
    const { url = '' } = query;
    const arcSite = query['arc-site'];
    const opt = {
        auth,
        json: true
    };

    const menuData = sourceMenu.map(({ hierarchy, initialClass }) => {
        opt.uri = resolveUri({
            ...query,
            hierarchy
        });

        return request(opt)
            .then(response => {
                return transform(response, initialClass);
            })
            .catch(error => {
                logger.push(error, { source: 'content/source', url }, arcSite);
            });
    });

    return Promise.all(menuData);
};

const fetch = async (query, { cacheCall }) => {
    //Extraer quien consume
    //Agregarlo al query para la funcion getMenuItems
    //Agregar nombre de cache segun quien consuma
    return cacheCall('navigation-test-schema', getMenuItems(query), {
        ttl: 3000
    });
};

export default {
    fetch,
    schemaName: 'navigation-test-schema',
    // filter,
    params: {
        website: 'text'
    }
};
