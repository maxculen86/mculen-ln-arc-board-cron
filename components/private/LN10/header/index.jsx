import React from 'react';
import { Header, MainHeader, SubHeader } from '@ln/contenidos-ui-header';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';
import { Link } from '@ln/contenidos-ui-link';
import { Icon } from '@ln/contenidos-ui-icon';
import { userType, mainHeaderData, subHeaderData } from './mock';
import '../../../../resources/packages/css/@ln/contenidos-ui-header/index.css';
import '../../../../resources/packages/css/@ln/common-ui-button/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-button/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-text/index.css';
import '../../../../resources/packages/css/@ln/common-ui-icon/index.css';

const HeaderDesktop = () => {
    return (
        <Header userType={userType}>
            <MainHeader userType={userType}>
                <MainHeader.Left>
                    <Button
                        title="Secciones"
                        typeButton="secondary"
                        className="--border-gray --mr-md --d-flex --ai-center --jc-center"
                    >
                        <Icon icon="menu" size="s" className="--menu" />
                        <Text className="--desktop-only" size="2xs">
                            SECCIONES
                        </Text>
                    </Button>
                    <Button
                        title="Buscar"
                        typeButton="secondary"
                        className="--border-gray"
                    >
                        <Icon icon="search" size="s" className="--mr-0" />
                    </Button>
                </MainHeader.Left>
                <MainHeader.Center>
                    <Link
                        href="/"
                        title="Ir a la página principal"
                        className="logo-header --d-flex"
                    >
                        <MainHeader.Logo />
                    </Link>
                </MainHeader.Center>
                <MainHeader.Right>
                    <MainHeader.MenuUser
                        userType={userType}
                        email={mainHeaderData.email}
                        initials={mainHeaderData.initials}
                        desplegableData={mainHeaderData.desplegable}
                    />
                    {/* <Button
                        title="Iniciar sesión"
                        typeButton="secondary"
                        className="--border-gray --mr-md --mobile-none"
                    >
                        <Text size="2xs">INICIAR SESIÓN</Text>
                    </Button> */}
                    {/* <Button
                        title="Suscribirse"
                        typeButton="secondary"
                        className="suscribe --border-gray --d-flex --ai-center"
                    >
                        <Icon icon="suscriptorExclusivo" className="--mr-2xs" />
                        SUSCRIBITE
                    </Button> */}
                </MainHeader.Right>
            </MainHeader>
            <SubHeader>
                <SubHeader.Dollar data={subHeaderData.dollar} />
                <SubHeader.Access data={subHeaderData.access} />
            </SubHeader>
        </Header>
    );
};

export default HeaderDesktop;
