/* import React from 'react';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';

const filter = `
    {
        _id
        _website
        name
        display_name
        node_type
        url
        inactive
        children {
            _id
            _website
            name
            display_name
            node_type
            url
            inactive
            children {
                _id
                _website
                name
                display_name
                node_type
                url
                inactive
            } 
        }
    }
`;

const getChildren = (
    { _id, name, display_name: displayName, url, children },
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

const transform = initialClass => data => {
    const { children } = data || {};

    const dataMenu = !!children && {
        el: 'ul',
        extraClass: initialClass,
        childs: children.map(child => getChildren(child))
    };

    return dataMenu;
};

const withNavigationMenu = WrappedComponent => sourceMenu => {
    return Consumer(props => {
        const { arcSite } = props;
        const menuData = [
            ...sourceMenu.map(({ hierarchy, initialClass }) =>
                useContent({
                    source: 'navigationSource',
                    filter,
                    query: {
                        website: arcSite,
                        hierarchy
                    },
                    transform: transform(initialClass)
                })
            )
        ];

        return <WrappedComponent {...props} menuData={menuData} />;
    });
};

export default withNavigationMenu;
 */
