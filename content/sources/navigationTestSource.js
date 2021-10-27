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

    console.log(query);

    return request(opt)
        .then(response => {
            return transform(response, initialClass);
        })
        .catch(error => {
            logger.push(error, { source: 'content/source', url }, arcSite);
        });

    // const menuData = sourceMenu.map(({ hierarchy, initialClass }) => {
    //     opt.uri = resolveUri({
    //         ...query,
    //         hierarchy
    //     });

    //     return cachedCall('navigation-test-schema',

    // });

    // return Promise.all(menuData);
};

const fetch = async (query, { cachedCall }) => {
    // Extraer quien consume
    // Agregarlo al query para la funcion getMenuItems
    // Agregar nombre de cache segun quien consuma
    // const test = {
    //     ...query,
    //     hierarchy: sourceMenu[0].hierarchy,
    //     initialClass: sourceMenu[0].initialClass
    // };
    // return getItem({
    //     ...query,
    //     hierarchy: sourceMenu[0].hierarchy,
    //     initialClass: sourceMenu[0].initialClass
    // });

    const firstNav = await cachedCall(
        `navigation-schema-${sourceMenu[0].hierarchy}`,
        getItem,
        {
            query: {
                ...query,
                hierarchy: sourceMenu[0].hierarchy,
                initialClass: sourceMenu[0].initialClass
            },
            ttl: 300
        }
    );

    const secondNav = await cachedCall(
        `navigation-schema-${sourceMenu[1].hierarchy}`,
        getItem,
        {
            query: {
                ...query,
                hierarchy: sourceMenu[1].hierarchy,
                initialClass: sourceMenu[1].initialClass
            },
            ttl: 300
        }
    );

    return [firstNav, secondNav];
};

export default {
    fetch,
    schemaName: 'navigation-test-schema',
    ttl: 600,
    params: {
        website: 'text'
    }
};
