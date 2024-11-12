import React from 'react';
import { Logo } from '@ln/foodit-ui-logo';
import { useDrawer } from '@ln/common-ui-drawer';
import { Button } from '@ln/common-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Header, MainHeader } from '@ln/common-ui-header';
import { useContent } from 'fusion:content';
import { DRAWER } from '../DrawerContainer/constants';
import { SubHeader } from './components/subHeader/SubHeader';
import { Search } from './components/Search';
import { TopNavigationBar } from './components/TopNavigationBar';
import { Promotions } from './components/promotions/Promotions';
import LoginSubscribeButtons from './components/LoginSubscribeButtons';
import RenderUserOptions from './components/rightOptions/RenderUserOptions';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import DrawerMenu from '../DrawerMenu/foodit';
import transformMenuData from './_helpers';
import filterMenuSections from '../../../../../content/filters/foodit/filterMenuSections';
import { BellButton } from './components/rightOptions/bellButton';
import { useLayoutHeader } from './hooks/useLayoutHeader';

function HeaderFoodit() {
    const { toggleDrawer } = useDrawer({ id: DRAWER.MENU });

    const {
        classNameHeaderContainer,
        showSubheaderInLayout,
        showSubheaderInSheet
    } = useLayoutHeader();

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
                    <MainHeader.Content containerClassName="bg-positive py-16 border border-bottom border-thin border-light-100">
                        <MainHeader.Content.Left className="flex jc-start ai-center lg-none">
                            <Button
                                title="Menu"
                                className="text-light-800"
                                data-test-id="button-menu-foodit"
                                onClick={() => toggleDrawer()}
                            >
                                <Icon size={24} color="dark">
                                    <IconSprite name="menu" critical />
                                </Icon>
                            </Button>
                        </MainHeader.Content.Left>
                        <MainHeader.Content.Center className="jc-center ai-center">
                            <MainHeader.Brand
                                data-test-id="header-link-inicio"
                                href="/"
                                title="Ir a Foodit"
                                className="flex"
                            >
                                <h1 className="flex relative">
                                    <span className="visibility-hidden absolute">
                                        Foodit
                                    </span>
                                    <Logo
                                        variant="row"
                                        classNameSvgAnimated="h-32 h-44_md h-52_lg"
                                        classNameSvgText="h-20 h-24_md h-28_lg"
                                        enabledAnimation
                                    />
                                </h1>
                            </MainHeader.Brand>
                        </MainHeader.Content.Center>
                        <MainHeader.Content.Right className="flex jc-end ai-center gap-16 gap-24_md">
                            <LoginSubscribeButtons classNameButtons="lg-only" />
                            <BellButton />
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
                {(showSubheaderInLayout || showSubheaderInSheet) && (
                    <SubHeader>
                        <Promotions />
                    </SubHeader>
                )}
            </Header>
            <DrawerMenu categories={categories} />
        </>
    );
}

export default HeaderFoodit;
