import React from 'react';
import PropTypes from 'fusion:prop-types';
import DrawerContainer from '../DrawerContainer/foodit';
import MenuCategories from '../MenuCategories/foodit';
import removeAccents from '../../../../private/common/utils/removeAccents';
import { DRAWER } from '../DrawerContainer/constants';
import { Search } from '../Header/components/Search';
import { DrawerItems } from './drawerItems';

function DrawerMenu({ categories = [] }) {
    if (!categories.length) return null;

    // TODO: Manejar filtro de principalMenu y secondaryMenu a traves de una propiedad especifica desde sites, para evitar validar por titles.
    const TITLES_TO_EXCLUDE = [
        'Conocenos',
        'Guías de cocina',
        'Masterclass de chefs'
    ];

    const principalMenu = categories.filter(
        item => !TITLES_TO_EXCLUDE.includes(item.title)
    );
    const secondaryMenu = categories.filter(item =>
        TITLES_TO_EXCLUDE.includes(item.title)
    );
    return (
        <DrawerContainer
            drawerId={DRAWER.MENU}
            position="left"
            bodyClassName="pr-16"
        >
            <Search />
            {principalMenu.map(({ title = '', data, href }) => {
                const dynamicLabel = removeAccents(title)
                    .replace(/ /g, '_')
                    .toLowerCase();
                return (
                    <div key={title}>
                        <DrawerItems
                            title={title}
                            href={href}
                            dynamicLabel={dynamicLabel}
                        />
                        <MenuCategories data={data} fullWidth />
                    </div>
                );
            })}
            <div className="mt-auto sticky bottom-0 bg-light-1 z-15 border border-top border-thin border-light-100">
                {secondaryMenu.map(({ title = '', href }) => {
                    const dynamicLabel = removeAccents(title)
                        .replace(/ /g, '_')
                        .toLowerCase();
                    return (
                        <div key={title}>
                            <DrawerItems
                                title={title}
                                href={href}
                                dynamicLabel={dynamicLabel}
                            />
                        </div>
                    );
                })}
            </div>
        </DrawerContainer>
    );
}

DrawerMenu.propTypes = {
    categories: PropTypes.array
};

DrawerMenu.defaultProps = {
    categories: []
};

export default DrawerMenu;
