import React from 'react';
import { Logo } from '@ln/foodit-ui-logo';
import { useDrawer } from '@ln/common-ui-drawer';
import { Button } from '@ln/common-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { cx } from '@ln/ds-cva';
import { Header, MainHeader } from '@ln/common-ui-header';
import { DRAWER } from '../DrawerContainer/constants';
import { Search } from './components/Search';
import { TopNavigationBar } from './components/TopNavigationBar';
import RenderUserOptions from './components/rightOptions/RenderUserOptions';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import DrawerMenu from '../DrawerMenu/foodit';
import { BellButton } from './components/rightOptions/bellButton';
import { useLayoutHeader } from './hooks/useLayoutHeader';
import { useNavigationData } from './hooks/useNavigationData';
import LoginSubscribeButtons from '../SubscribeLoginButton/foodit';
import { BackButton } from './components/backButton';
import useGetUserConfig from '../../hooks/useGetUserConfig';

function HeaderFoodit({ layout, layoutsName }) {
    const { toggleDrawer } = useDrawer({ id: DRAWER.MENU });

    const isHome = layout === layoutsName.FooditHome;
    const HeaderTag = isHome ? 'h1' : 'div';

    const { classNameHeaderContainer } = useLayoutHeader();

    const { categories, termicasData } = useNavigationData();
    const { isSubscribed } = useGetUserConfig();

    return (
        <>
            <Header classNameContainer={classNameHeaderContainer}>
                <MainHeader className="z-1">
                    <MainHeader.Content
                        className="column-gap-0 column-gap-32_lg flex ai-center"
                        containerClassName="bg-positive py-16 border border-bottom border-thin border-light-100"
                    >
                        <MainHeader.Content.Left className="flex jc-start ai-center gap-16 gap-24_md">
                            <BackButton variant="link" iconOnly={false} />
                            <Button
                                title="Menu"
                                className="text-light-800 lg-none"
                                data-test-id="button-menu-foodit"
                                onClick={() => toggleDrawer()}
                            >
                                <Icon size={24} color="dark">
                                    <IconSprite name="menu" critical />
                                </Icon>
                            </Button>
                            <MainHeader.Brand
                                data-test-id="header-link-inicio"
                                href="/"
                                title="Ir a Foodit"
                                className="flex"
                            >
                                <HeaderTag className="flex relative">
                                    <span className="visibility-hidden absolute">
                                        Foodit
                                    </span>
                                    <Logo
                                        variant="row"
                                        classNameSvgAnimated="h-bowl_max389 h-bowl_max767 h-40_md h-56_lg"
                                        classNameSvgText="h-text_max389 h-text_max767 h-24_md h-28_lg"
                                        enabledAnimation
                                    />
                                </HeaderTag>
                            </MainHeader.Brand>
                        </MainHeader.Content.Left>
                        <MainHeader.Content.Right className="flex h-32 h-auto_lg jc-end ai-center gap-16 gap-24_md">
                            <LoginSubscribeButtons
                                comesFrom="HeaderFoodit"
                                loginClassName="roboto roboto-regular"
                                termicasData={termicasData}
                            />
                            <BellButton
                                className={cx(
                                    '--no-app',
                                    !isSubscribed && 'lg-only'
                                )}
                            />
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
            </Header>
            <DrawerMenu categories={categories} />
        </>
    );
}

export default HeaderFoodit;
