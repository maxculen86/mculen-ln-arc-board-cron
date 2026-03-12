import React from 'react';
import Consumer from 'fusion:consumer';
import { Header } from '@ln/common-ui-header';
import { cx } from '@ln/ds-cva';
import { HeaderProvider } from './context';
import { Desplegable } from '../desplegable/default';
import { NavBar } from './navBar/default';
import PreHeader from './preHeader/default';
import SubHeader from './subHeader/default';
import MainHeader from './mainHeader/default';

import '../../../../resources/packages/css/@ln/contenidos-ui-dropdown/index.css';
import '../../../../resources/packages/css/@ln/common-ui-icon/index.css';
import '../../../../resources/packages/css/@ln/common-ui-button/index.css';
import '../../../../resources/packages/css/@ln/common-ui-header/index.css';
import '../../../../resources/packages/css/@ln/common-ui-drawer/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-sass/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-tooltip/index.css';

function HeaderLN(props) {
    const {
        siteProperties: { layoutsName = {} },
        layout,
        globalContent: { _id: sectionId = '' } = {}
    } = props;

    const isHome = layout === layoutsName.HomeLN10;

    const headerWrapperClassName = cx('header-container', {
        '--no-app': !isHome
    });
    const headerClassName = cx({
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
                {isHome && <PreHeader />}
                <Header classNameContainer={headerClassName}>
                    <MainHeader />
                    <SubHeader />
                </Header>
                <NavBar />
                <Desplegable />
            </div>
            <div className="header-sentinel" />
        </HeaderProvider>
    );
}

export default Consumer(HeaderLN);
