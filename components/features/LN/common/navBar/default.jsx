import React from 'react';
import { useAppContext } from 'fusion:context';
import { getNavbarItems } from './helpers';
import NavbarItem from './components/NavbarItem';
import useGetUserData from '../../../../private/common/auth/hooks/useGetUserData';
import { SUBSCRIBED_HELPER } from '../../../../private/common/auth/helper/loginHelper';

function Navbar() {
    const { layout, siteProperties } = useAppContext();
    const { layoutsName } = siteProperties || {};
    const { userType } = useGetUserData(SUBSCRIBED_HELPER.LN);

    const isHome = layout === layoutsName.HomeLN10;

    const navbarItems = getNavbarItems({ userType });

    return (
        <div data-tw>
            <nav className="fixed bottom-0 left-0 z-105 px-responsive py-10 w-full flex justify-center xl:hidden border-t border-muted bg-primary-foreground --no-app">
                <ul className="flex justify-between w-full max-w-400">
                    {navbarItems.map(item => {
                        const key = item.href || item.text;
                        const color =
                            isHome && item?.iconName === 'home'
                                ? 'primary'
                                : 'base';
                        return (
                            <li
                                key={key}
                                className="flex min-w-58 justify-center h-40"
                            >
                                <NavbarItem {...item} color={color} />
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
