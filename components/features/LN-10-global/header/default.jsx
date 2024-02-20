/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import { Header } from '@ln/common-ui-header';
import { HeaderProvider } from './context';
import { Desplegable } from '../desplegable/default';
import { NavBar } from './navBar/default';
import SubHeader from './subHeader/default';
import MainHeader from './mainHeader/default';
import classNames from 'classnames';

import '../../../../resources/packages/css/@ln/contenidos-ui-dropdown/index.css';
import '../../../../resources/packages/css/@ln/common-ui-icon/index.css';
import '../../../../resources/packages/css/@ln/common-ui-button/index.css';
import '../../../../resources/packages/css/@ln/common-ui-header/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-sass/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-tooltip/index.css';

const HeaderLN = props => {
    const {
        siteProperties: { layoutsName = {} },
        layout,
        arcSite,
        globalContent: { _id: sectionId = '' } = {}
    } = props;

    const isHome = layout === layoutsName.HomeLN10;

    const headerWrapperClassName = classNames('header-container', {
        '--no-app': !isHome
    });
    const headerClassName = classNames({
        'mt-50 mt-0_m': isHome
    });
    return (
        <HeaderProvider
            layout={layout}
            layoutsName={layoutsName}
            section={sectionId}
            isHome={isHome}
        >
            <div className={headerWrapperClassName}>
                <Header classNameContainer={headerClassName}>
                    <MainHeader />
                    <SubHeader />
                </Header>
                <NavBar />
                <Desplegable arcSite={arcSite} />
            </div>
            <div className="header-sentinel" />
        </HeaderProvider>
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
