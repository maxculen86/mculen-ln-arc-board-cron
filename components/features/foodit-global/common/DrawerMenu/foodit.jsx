import React, { useMemo } from 'react';
import DrawerContainer from '../DrawerContainer/foodit';
import MenuCategories from '../MenuCategories/foodit';
import removeAccents from '../../../../private/common/utils/removeAccents';
import { DRAWER } from '../DrawerContainer/constants';
import { Search } from '../Header/components/Search';
import { DrawerItems } from './drawerItems';

function DrawerMenu({ categories = [] }) {
    if (!categories.length) return null;

    const { principalMenu, secondaryMenu } = useMemo(
        () =>
            categories.reduce(
                (acc, item) => {
                    if (item?.menuType === 'secondary') {
                        acc.secondaryMenu.push(item);
                    } else {
                        acc.principalMenu.push(item);
                    }
                    return acc;
                },
                { principalMenu: [], secondaryMenu: [] }
            ),
        [categories]
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
                        <div
                            key={title}
                            data-test-id={`header-menu-${dynamicLabel}`}
                        >
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

export default DrawerMenu;
