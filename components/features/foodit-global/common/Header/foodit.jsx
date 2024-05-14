import React from 'react';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import { toggleDrawer } from '@ln/common-ui-drawer';
import { Button } from '@ln/common-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Header, MainHeader } from '@ln/common-ui-header';
import { SubHeader } from './components/subHeader/SubHeader';
import { Search } from './components/Search';
import { TopNavigationBar } from './components/TopNavigationBar';
import { Promotions } from './components/promotions/Promotions';
import getAssetsPath from '../../../../private/common/utils/getAssetsPath';
import LoginSubscribeButtons from './components/LoginSubscribeButtons';
import RenderUserOptions from './components/rightOptions/RenderUserOptions';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import classNames from 'classnames';
import DrawerMenu from '../DrawerMenu/foodit';
import transformMenuData from './_helpers';
import { useContent } from 'fusion:content';
import filterMenuSections from '../../../../../content/filters/foodit/filterMenuSections';

const HeaderFoodit = () => {
    const { deployment, contextPath, siteProperties, layout } = useAppContext();

    const { layoutsName = {} } = siteProperties || {};

    const isHome = layout === layoutsName.FooditHome;

    const marginByLayouts = {
        [layoutsName.FooditHome]: 'mb-12 mb-40_lg',
        [layoutsName.FooditFichaReceta]: 'mb-12 mb-40_lg',
        [layoutsName.FooditFichaNota]: 'mb-0',
        default: 'mb-40'
    };

    const classNameHeaderContainer = classNames(
        'z-10 w-100 sticky top-0',
        marginByLayouts[layout] || marginByLayouts.default
    );

    const categories = useContent({
        source: 'navigationSource',
        query: {
            hierarchy: 'header_menu_foodit',
            website: 'foodit'
        },
        transform: transformMenuData,
        filter: filterMenuSections
    });

    return (
        <>
            <Header classNameContainer={classNameHeaderContainer}>
                <MainHeader className="z-1">
                    <MainHeader.Content containerClassName="bg-positive py-16">
                        <MainHeader.Content.Left className="flex jc-start ai-center lg-none">
                            <Button
                                title="Menu"
                                className="text-light-800"
                                onClick={() =>
                                    toggleDrawer({
                                        id: 'drawer-menu',
                                        show: true
                                    })
                                }
                            >
                                <Icon size={24} color="dark">
                                    <IconSprite name="menu" critical />
                                </Icon>
                            </Button>
                        </MainHeader.Content.Left>
                        <Static htmlOnly persistent id="foodit-logo">
                            <MainHeader.Content.Center className="jc-center ai-center">
                                <MainHeader.Brand
                                    href="/"
                                    title="Ir a inicio"
                                    className="flex"
                                >
                                    <img
                                        className="h-32 h-44_md h-52_lg"
                                        src={getAssetsPath(contextPath)(
                                            deployment
                                        )('logo-foodit.webp')}
                                        alt="Foodit"
                                    />
                                </MainHeader.Brand>
                            </MainHeader.Content.Center>
                        </Static>
                        <MainHeader.Content.Right className="flex jc-end ai-center gap-16 gap-24_md">
                            <LoginSubscribeButtons classNameButtons="lg-only" />
                            <RenderUserOptions />
                        </MainHeader.Content.Right>
                        <MainHeader.Content.Search>
                            <Search />
                        </MainHeader.Content.Search>
                    </MainHeader.Content>
                    <MainHeader.Bottom className="flex ai-center border border-bottom border-thin border-light-100 bg-light-1 lg-only h-44">
                        <TopNavigationBar categories={categories} />
                    </MainHeader.Bottom>
                </MainHeader>
                {isHome && (
                    <SubHeader>
                        <Promotions />
                    </SubHeader>
                )}
            </Header>
            <DrawerMenu categories={categories} />
        </>
    );
};

export default HeaderFoodit;
