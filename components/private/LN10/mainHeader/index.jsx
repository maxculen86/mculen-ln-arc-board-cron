/* eslint-disable react/prop-types */
import React from 'react';
import { MainHeader } from '@ln/contenidos-ui-header';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';
import { Link } from '@ln/contenidos-ui-link';
import { Icon } from '@ln/contenidos-ui-icon';

import '../../../../resources/packages/css/@ln/contenidos-ui-header/index.css';
import '../../../../resources/packages/css/@ln/common-ui-button/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-button/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-text/index.css';
import '../../../../resources/packages/css/@ln/common-ui-icon/index.css';

import { getLoginData } from '../../LN/common/utils/contextHelper';
import { RightOptions, setDesplegableData, logoCallback } from './_helper';

const MainHeaderLN = ({ userType = '' }) => {
    const { userName = '', loading } = getLoginData() || {};
    const desplegableData = setDesplegableData() || [];

    return (
        <MainHeader>
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
                    onClick={logoCallback}
                    onAuxClick={logoCallback}
                >
                    <MainHeader.Logo />
                </Link>
            </MainHeader.Center>
            <MainHeader.Right>
                {!loading && (
                    <RightOptions
                        userType={userType}
                        userName={userName}
                        desplegableData={desplegableData}
                    />
                )}
            </MainHeader.Right>
        </MainHeader>
    );
};

export default MainHeaderLN;
