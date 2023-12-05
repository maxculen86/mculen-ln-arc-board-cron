import React from 'react';
import { Topnavigationbar } from '@ln/foodit-ui-topnavigationbar';
import { Dropdown } from '@ln/common-ui-dropdown';
import { menuCategories } from '../../utils/menuCategories';
import { MenuCategories } from '../../MenuCategories/foodit';
import { Icon } from '@ln/common-ui-icon';
import { Link } from '@ln/foodit-ui-link';
import { Bookmark, Cart } from '@ln/foodit-ui-assets';

export const TopNavigationBar = () => {
    const Categories = ({ title, href, data }) => {
        if (data) {
            return (
                <Dropdown
                    toggleOn="hover"
                    key={title}
                    className="flex ai-center"
                >
                    <>
                        <Dropdown.Toggle
                            onClick={() => console.log(title)}
                            className="ai-center roboto-bold text-14 uppercase"
                        >
                            {title}
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                            alignment="left"
                            className="bg-light-1 p-24 rounded-4 shadow-center"
                        >
                            <MenuCategories data={data} />
                        </Dropdown.Menu>
                    </>
                </Dropdown>
            );
        }
        return (
            <Link
                href={href}
                className="text-14 roboto-bold uppercase"
                text={title}
            />
        );
    };
    return (
        <div className="flex w-100 jc-between container py-8">
            <Topnavigationbar className="flex jc-center">
                {menuCategories.map((category, i) => (
                    <Categories {...category} key={i} />
                ))}
            </Topnavigationbar>
            <Topnavigationbar className="text-12">
                <Link
                    href="/mis-recetas"
                    title="Ir a mis recetas"
                    className="gap-8"
                >
                    <Icon size={24}>
                        <Bookmark />
                    </Icon>
                    MIS RECETAS
                </Link>
                <Link
                    href="/lista-de-compras"
                    title="Ir a lista de compras"
                    className="gap-8"
                >
                    <Icon size={24}>
                        <Cart />
                    </Icon>
                    LISTA DE COMPRAS
                </Link>
            </Topnavigationbar>
        </div>
    );
};
