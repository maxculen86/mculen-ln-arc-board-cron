/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { MainHeader } from '@ln/contenidos-ui-header';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';
import { Link } from '@ln/contenidos-ui-link';
import { Icon } from '@ln/common-ui-icon';
import { Menu, Search } from '@ln/contenidos-ui-assets';
import { createHeaderObserver, isHeaderNegative } from '../header/_helper';

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
import MainHeaderEventsScript from '../../common/scriptManager/MainHeaderEventsScript';
import showSubscribeButton from '../../LN/common/utils/showSubscribeButton';
import bannersHome from '../../common/banners/bannersDivHome';

const MainHeaderLN = ({
    layout = '',
    section = '',
    layoutsName = {},
    toggleDesplegable,
    userType = '',
    isHome
}) => {
    useEffect(() => {
        //TODO: Buscar un mejor metodo para dejar de observar
        createHeaderObserver({ layout, layoutsName, isHome });
        return () =>
            createHeaderObserver({ layout, layoutsName, true: unobserve });
    }, [layout]);

    const loginData = getLoginData() || {};

    const {
        userName = '',
        loading,
        goToLoginUrl,
        userFirstName,
        userLastName
    } = loginData;

    const loggedIn = isLoggedIn();
    const { dispatch } = useContext(GlobalContext);
    const logout = () => goToLogout(dispatch);
    const hasSubscribeButton = showSubscribeButton(loginData);

    const classNameMainHeader = classNames({
        '--negative': isHeaderNegative({ layout, section, layoutsName })
    });

    const desplegableData = setDesplegableData(logout) || [];
    const initials = setInitials(userFirstName, userLastName, userName);

    return (
        <MainHeader className={classNameMainHeader}>
            <MainHeader.Left>
                <Button
                    title="Secciones"
                    typeButton="secondary"
                    className="secciones"
                    onClick={e => sectionsCallback(e, toggleDesplegable)}
                    onAuxClick={e => sectionsCallback(e, toggleDesplegable)}
                >
                    <Icon icon="menu" size={24} className="--menu">
                        <Menu />
                    </Icon>
                    <Text className="--desktop-only" size="xs">
                        SECCIONES
                    </Text>
                </Button>
                <label
                    onClick={handleClickBuscar}
                    id="querylyButton"
                    htmlFor="queryly_toggle"
                    title="Ir al buscador"
                    className="button ln-button --secondary search --md"
                >
                    <Icon size={24}>
                        <Search />
                    </Icon>
                </label>
            </MainHeader.Left>
            <MainHeader.Center>
                <Link
                    href="/"
                    title="Ir a la página principal"
                    className="logo-header flex"
                    onClick={logoCallback}
                    onAuxClick={logoCallback}
                >
                    {bannersHome.logoHeader}
                    <MainHeader.Logo />
                </Link>
            </MainHeader.Center>
            <MainHeader.Right>
                <RightOptions
                    userType={userType}
                    userName={userName}
                    initials={initials}
                    desplegableData={desplegableData}
                    goToLoginUrl={goToLoginUrl}
                    loggedIn={loggedIn}
                    loading={loading}
                    hasSubscribeButton={hasSubscribeButton}
                    isHome={isHome}
                />
            </MainHeader.Right>
            <MainHeaderEventsScript />
        </MainHeader>
    );
};

export default MainHeaderLN;
