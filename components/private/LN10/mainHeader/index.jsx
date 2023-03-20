/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { MainHeader } from '@ln/contenidos-ui-header';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';
import { Link } from '@ln/contenidos-ui-link';
import { Icon } from '@ln/common-ui-icon';
import { Menu, Search } from '@ln/assets-ui-icons';

import { getLoginData, isLoggedIn } from '../../LN/common/utils/contextHelper';
import {
    RightOptions,
    setDesplegableData,
    sectionsCallback,
    logoCallback,
    setInitials
} from './_helper';
import { handleClickBuscar } from '../navbar/_helper';
import { GlobalContext } from '../../common/context/globalContext';
import { goToLogout } from '../../LN/common/utils/loginHelper';

import '../../../../resources/packages/css/@ln/contenidos-ui-header/index.css';
import '../../../../resources/packages/css/@ln/common-ui-button/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-button/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-text/index.css';
import '../../../../resources/packages/css/@ln/common-ui-icon/index.css';

const MainHeaderLN = ({ userType = '', toggleDesplegable }) => {
    const {
        userName = '',
        loading,
        goToLoginUrl,
        userFirstName,
        userLastName
    } = getLoginData() || {};
    const loggedIn = isLoggedIn();
    const { dispatch } = useContext(GlobalContext);
    const logout = () => goToLogout(dispatch);

    const desplegableData = setDesplegableData(logout) || [];
    const initials = setInitials(userFirstName, userLastName, userName);

    return (
        <MainHeader>
            <MainHeader.Left>
                <Button
                    title="Secciones"
                    typeButton="secondary"
                    className="--border-gray --d-flex --ai-center --jc-center secciones"
                    onClick={e => sectionsCallback(e, toggleDesplegable)}
                    onAuxClick={e => sectionsCallback(e, toggleDesplegable)}
                >
                    <Icon icon="menu" size={16} className="--menu">
                        <Menu />
                    </Icon>
                    <Text className="--desktop-only" size="2xs">
                        SECCIONES
                    </Text>
                </Button>
                <label
                    onClick={handleClickBuscar}
                    id="querylyButton"
                    htmlFor="queryly_toggle"
                    title="Ir al buscador"
                    className="button ln-button --secondary --prl-xs --border-gray --d-flex --ai-center --jc-center"
                >
                    <Icon size={16} className="--mr-0">
                        <Search />
                    </Icon>
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
                        initials={initials}
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
