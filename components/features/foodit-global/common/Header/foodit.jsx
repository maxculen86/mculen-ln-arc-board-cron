import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Logo } from '@ln/foodit-ui-logo';
import { useDrawer } from '@ln/common-ui-drawer';
import { Button } from '@ln/common-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Header, MainHeader } from '@ln/common-ui-header';
import { DRAWER } from '../DrawerContainer/constants';
import { SubHeader } from './components/subHeader/SubHeader';
import { Search } from './components/Search';
import { TopNavigationBar } from './components/TopNavigationBar';
import { Promotions } from './components/promotions/Promotions';
import RenderUserOptions from './components/rightOptions/RenderUserOptions';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import DrawerMenu from '../DrawerMenu/foodit';
import { BellButton } from './components/rightOptions/bellButton';
import { useLayoutHeader } from './hooks/useLayoutHeader';
import { useNavigationData } from './hooks/useNavigationData';
import LoginSubscribeButtons from '../SubscribeLoginButton/foodit';
import { BackButton } from './components/backButton';

function HeaderFoodit({ layout, layoutsName }) {
    const { toggleDrawer } = useDrawer({ id: DRAWER.MENU });

    const isHome = layout === layoutsName.FooditHome;
    const HeaderTag = isHome ? 'h1' : 'div';

    const {
        classNameHeaderContainer,
        showSubheaderInLayout,
        showSubheaderInSheet
    } = useLayoutHeader();

    const { categories, termicasData } = useNavigationData();

    return (
        <>
            <Header classNameContainer={classNameHeaderContainer}>
                <MainHeader className="z-1">
                    <MainHeader.Content containerClassName="bg-positive py-16 border border-bottom border-thin border-light-100">
                        <MainHeader.Content.Left className="flex jc-start ai-center lg-none">
                            <BackButton variant="link" iconOnly={false} />
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
                            <BackButton iconOnly variant="secondary" />
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
                                        classNameSvgAnimated="h-32 h-40_md h-56_lg"
                                        classNameSvgText="h-20 h-24_md h-28_lg"
                                        enabledAnimation
                                    />
                                </HeaderTag>
                            </MainHeader.Brand>
                        </MainHeader.Content.Center>
                        <MainHeader.Content.Right className="flex jc-end ai-center gap-16 gap-24_md">
                            <LoginSubscribeButtons
                                comesFrom="HeaderFoodit"
                                loginClassName="roboto roboto-regular"
                                classNameButtons="lg-only"
                                termicasData={termicasData}
                            />
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
HeaderFoodit.propTypes = {
    layout: PropTypes.string.isRequired,
    layoutsName: PropTypes.object.isRequired
};
export default HeaderFoodit;
