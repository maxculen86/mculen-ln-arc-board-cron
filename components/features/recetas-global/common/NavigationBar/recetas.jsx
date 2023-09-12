import React from 'react';
import { Link } from '@ln/foodit-ui-link';
import { Icon } from '@ln/common-ui-icon';
import { itemsNavigationBar } from './items';
import { toggleDrawer } from '@ln/common-ui-drawer';

const NavigationBar = () => {
    return (
        <nav className="rc-navigation-bar px-16 w-100 fixed bottom-0 shadow-navigation-bar rounded-top-left-24 rounded-top-right-24 lg-none bg-light-1 z-1">
            <ul className="grid grid-cols-5 text-12">
                {itemsNavigationBar.map(({ href, icon, onClick, text }) => {
                    return (
                        <li className="flex jc-center pt-8 pb-12" key={text}>
                            {text === 'Categorías' ? (
                                <button
                                    className="flex flex-column jc-center ai-center flex-row_md gap-4 gap-8_md text-12"
                                    onClick={() =>
                                        toggleDrawer({
                                            id: 'drawer-menu',
                                            show: true
                                        })
                                    }
                                    title={text}
                                >
                                    <Icon size={24}>{icon}</Icon>
                                    {text}
                                </button>
                            ) : (
                                <Link
                                    href={href}
                                    className="flex flex-column flex-row_md ai-center jc-center gap-4 gap-8_md text-12"
                                    onClick={onClick}
                                    title={text}
                                >
                                    <Icon size={24}>{icon}</Icon>
                                    {text}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavigationBar;
