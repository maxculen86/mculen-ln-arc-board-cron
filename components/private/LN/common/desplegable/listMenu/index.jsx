/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import ListMenu from './listMenu';
import MenuContext from './store/menuContext';

const filter = `
    {
        _id
        _website
        name
        display_name
        node_type
        url
        inactive
        site {
            site_url
        }
        children {
            _id
            _website
            name
            display_name
            node_type
            url
            inactive
            site {
                site_url
            }
            children {
                _id
                _website
                name
                display_name
                node_type
                url
                inactive
                site {
                    site_url
                }
            } 
        }
    }
`;

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

const transform = initialClass => data => {
    const { children } = data || {};

    const dataMenu = !!children && {
        el: 'ul',
        extraClass: initialClass,
        childs: children.map(child => getChildren(child))
    };

    return dataMenu;
};

/**
 * TODO: Buscar la forma de pasar lo siguiente
 * por customFields o properties del Site
 * TODO: pasar esto como parametro si a futuro se quiere
 * un menu para mobile o para desktop
 */
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

const ListMenuComponent = props => {
    const { arcSite } = props;
    const [onResizeDeskTop, setOnResizeDesktop] = useState();
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

    useEffect(() => {
        window &&
            window.addEventListener('resize', e => {
                setOnResizeDesktop(window.outerWidth >= 768);
            });
    });

    return (
        <MenuContext>
            {menuData &&
                menuData.map(
                    ({ el, extraClass, name, childs, site }, index) => (
                        <ListMenu
                            el={el}
                            extraClass={extraClass}
                            name={name}
                            childs={childs}
                            onResizeDeskTop={onResizeDeskTop}
                            site={site}
                            key={index}
                        />
                    )
                )}
        </MenuContext>
    );
};

ListMenuComponent.propTypes = {
    arcSite: PropTypes.string
};

ListMenuComponent.defaultProps = {
    arcSite: 'la-nacion-ar'
};

export default Consumer(ListMenuComponent);
