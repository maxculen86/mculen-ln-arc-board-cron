/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Header } from '@ln/contenidos-ui-header';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import Desplegable from '../desplegable';
import NavbarMobile from '../navbar';
import { setUserType, onScrollHandler } from './_helper';
import HeaderAMP from '../../LN/common/header/headerAMP';
import debounce from '../../common/utils/debounce';

import SubHeader from '../subHeader';
import MainHeader from '../mainHeader';

import '../../../../resources/packages/css/@ln/contenidos-ui-header/index.css';
import '../../../../resources/packages/css/@ln/common-ui-button/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-button/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-text/index.css';
import '../../../../resources/packages/css/@ln/common-ui-icon/index.css';

import { isLoggedIn, isSubscribed } from '../../LN/common/utils/contextHelper';

const HeaderLN = props => {
    const {
        outputType,
        siteProperties: { layoutsName = {} },
        layout,
        arcSite
    } = props;

    const [dropdown, setDropdown] = useState(false);

    const toggleDesplegable = () => setDropdown(prev => !prev);

    useEffect(() => {
        const header = document.getElementById('header');
        const userMenu = document.getElementById('user-menu');
        const fusionApp = document.getElementById('fusion-app');
        const wrapper = fusionApp && fusionApp.querySelector('#wrapper');

        if (header) {
            const headerHeigth = header.clientHeight || header.offsetHeight;
            window.addEventListener(
                'scroll',
                debounce(() => {
                    onScrollHandler(
                        header,
                        headerHeigth,
                        userMenu,
                        wrapper,
                        layout,
                        layoutsName
                    );
                })
            );
        }
    }, [layout, layoutsName]);

    const isUserLoggedIn = isLoggedIn();
    const isUserSubscribed = isSubscribed();

    const userType = setUserType(isUserLoggedIn, isUserSubscribed);

    if (outputType === 'amp')
        return <HeaderAMP toggleDesplegable={toggleDesplegable} />;

    return (
        <>
            <Header userType={userType}>
                <MainHeader
                    userType={userType}
                    toggleDesplegable={toggleDesplegable}
                />
                <SubHeader />
            </Header>
            <NavbarMobile
                isHome={layoutsName.HomeLN10 === layout}
                toggleDesplegable={toggleDesplegable}
            />
            <Desplegable
                isActive={dropdown}
                toggleDesplegable={toggleDesplegable}
                isHome={layoutsName.HomeLN10 === layout}
                arcSite={arcSite}
            />
        </>
    );
};

Header.propTypes = {
    outputType: PropTypes.string,
    siteProperties: PropTypes.shape({
        host: PropTypes.string,
        layoutsName: PropTypes.shape({
            Home: PropTypes.string
        })
    }),
    layout: PropTypes.string,
    globalContent: PropTypes.shape({
        type: PropTypes.string,
        node_type: PropTypes.string
    })
};

export default Consumer(HeaderLN);
