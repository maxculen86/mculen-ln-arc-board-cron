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
import { isLoggedIn, isSubscribed } from '../../LN/common/utils/contextHelper';

import '../../../../resources/packages/css/@ln/contenidos-ui-header/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-dropdown/index.css';
import '../../../../resources/packages/css/@ln/common-ui-icon/index.css';
import '../../../../resources/packages/css/@ln/common-ui-button/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-sass/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-tooltip/index.css';
import classNames from 'classnames';

const HeaderLN = props => {
    const {
        outputType,
        siteProperties: { layoutsName = {} },
        layout,
        arcSite,
        globalContent: { _id: sectionId = '' } = {}
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
    const isHome = layout === layoutsName.HomeLN10;

    const userType = setUserType(isUserLoggedIn, isUserSubscribed);

    if (outputType === 'amp')
        return <HeaderAMP toggleDesplegable={toggleDesplegable} />;

    const headerContainerClassName = classNames('header-container', {
        '--no-app': !isHome
    });
    return (
        <>
            <div className={headerContainerClassName}>
                <Header userType={userType}>
                    <MainHeader
                        layout={layout}
                        userType={userType}
                        toggleDesplegable={toggleDesplegable}
                        layoutsName={layoutsName}
                        section={sectionId}
                        isHome={isHome}
                    />
                    {isHome && <SubHeader />}
                </Header>
                <NavbarMobile
                    isHome={isHome}
                    toggleDesplegable={toggleDesplegable}
                />
                <Desplegable
                    isActive={dropdown}
                    toggleDesplegable={toggleDesplegable}
                    arcSite={arcSite}
                />
            </div>
            <div className="header-sentinel" />
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
