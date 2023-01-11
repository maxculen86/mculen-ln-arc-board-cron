/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { MainHeader } from '@ln/contenidos-ui-header';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';
import { Link } from '@ln/contenidos-ui-link';
import { Icon } from '@ln/contenidos-ui-icon';

import { getLoginData, isLoggedIn } from '../../LN/common/utils/contextHelper';
import {
    RightOptions,
    setDesplegableData,
    sectionsCallback,
    logoCallback
} from './_helper';
import { handleClickBuscar } from '../navbar/_helper';

import '../../../../resources/packages/css/@ln/contenidos-ui-header/index.css';
import '../../../../resources/packages/css/@ln/common-ui-button/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-button/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-text/index.css';
import '../../../../resources/packages/css/@ln/common-ui-icon/index.css';

const MainHeaderLN = ({ userType = '', toggleDesplegable }) => {
    const { userName = '', loading, goToLoginUrl } = getLoginData() || {};
    const loggedIn = isLoggedIn();
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
                    <Text
                        className="--desktop-only"
                        size="2xs"
                        onClick={e => sectionsCallback(e, toggleDesplegable)}
                        onAuxClick={e => sectionsCallback(e, toggleDesplegable)}
                    >
                        SECCIONES
                    </Text>
                </Button>
                <label
                    onClick={handleClickBuscar}
                    id="querylyButton"
                    htmlFor="queryly_toggle"
                    title="Ir al buscador"
                    className="--prl-xs --border-gray --mr-md --d-flex --ai-center --jc-center"
                >
                    <Icon icon="search" size="s" className="--mr-0" />
                </label>
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
                        goToLoginUrl={goToLoginUrl}
                        loggedIn={loggedIn}
                    />
                )}
            </MainHeader.Right>
        </MainHeader>
    );
};

export default MainHeaderLN;
