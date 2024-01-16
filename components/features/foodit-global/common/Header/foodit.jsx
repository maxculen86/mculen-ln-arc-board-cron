import React from 'react';
import { useAppContext } from 'fusion:context';
import { toggleDrawer } from '@ln/common-ui-drawer';
import { Button } from '@ln/common-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Menu } from '@ln/foodit-ui-assets';
import { Header, MainHeader, SubHeader } from '@ln/common-ui-header';
import { Search } from './components/Search';
import { TopNavigationBar } from './components/TopNavigationBar';
import { Promotions } from './components/promotions/Promotions';
import getAssetsPath from '../../../../private/common/utils/getAssetsPath';
import LoginSubscribeButtons from './components/LoginSubscribeButtons';
import RenderUserOptions from './components/rightOptions/RenderUserOptions';

const HeaderFoodit = ({ isSticky = false, ...r }) => {
    const { deployment, contextPath } = useAppContext();
    //TODO: validar tipo de usuario  'subscribedPlus';

    // TODO: falta cerrar comportamiento de sticky

    return (
        <Header {...r}>
            <MainHeader>
                <MainHeader.Content>
                    <MainHeader.Content.Left className="flex jc-start ai-center lg-none">
                        <Button
                            title="Menu"
                            onClick={() =>
                                toggleDrawer({ id: 'drawer-menu', show: true })
                            }
                        >
                            <Icon size={24}>
                                <Menu />
                            </Icon>
                        </Button>
                    </MainHeader.Content.Left>
                    <MainHeader.Content.Center className="jc-center ai-center">
                        <MainHeader.Brand href="/" title="Ir a inicio">
                            <img
                                className="w-118 w-160_md w-191_lg"
                                src={getAssetsPath(contextPath)(deployment)(
                                    'logo-foodit.webp'
                                )}
                                alt="Foodit"
                            />
                        </MainHeader.Brand>
                    </MainHeader.Content.Center>
                    <MainHeader.Content.Right className="flex jc-end ai-center gap-16 gap-24_md">
                        <LoginSubscribeButtons />
                        <RenderUserOptions />
                    </MainHeader.Content.Right>
                    <MainHeader.Content.Search>
                        <Search />
                    </MainHeader.Content.Search>
                </MainHeader.Content>
                <MainHeader.Bottom className="flex ai-center border border-bottom border-thin border-light-100 lg-only">
                    <TopNavigationBar />
                </MainHeader.Bottom>
            </MainHeader>
            <SubHeader className="py-8 h-48 flex gap-24 jc-center ai-center jc-start_lg border border-bottom border-thin border-light-100 lg-none">
                <Promotions />
            </SubHeader>
        </Header>
    );
};

export default HeaderFoodit;
