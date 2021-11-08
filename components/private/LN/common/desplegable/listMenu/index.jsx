/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import ListMenu from './listMenu';
import MenuContext from './store/menuContext';

const ListMenuComponent = props => {
    const { arcSite } = props;
    const [onResizeDeskTop, setOnResizeDesktop] = useState();
    const menuData = useContent({
        source: 'menuSource',
        query: {
            website: arcSite
        }
    });

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
