import React from 'react';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import { getConfigByLayout } from '../floatingGroupButton/helpers';
import { useDrawer } from '@ln/common-ui-drawer';
import { DRAWER } from '../DrawerContainer/constants';
import Header from '../Header/foodit';
import Footer from '../Footer/foodit';
import Modal from '../Modals/SaveRecipe/foodit';
import DrawerMyAccount from '../DrawerMyAccount/foodit';
import FloatingGroupButton from '../floatingGroupButton/foodit';
import Toasts from '../toasts/foodit';
import DynamicStylesheetLoader from '../../../../output-types/criticalCss/dynamicStylesheetLoader';
import DataLayerInteractions from '../../../../private/common/scriptManager/DataLayerInteracions';
import AuthInitializer from '../../../../../auth/AuthInitializer';
import classNames from 'classnames';

const BaseLayout = ({ children }) => {
    const {
        layout,
        contextPath,
        deployment,
        arcSite,
        siteProperties
    } = useAppContext();
    const { toggleDrawer } = useDrawer({ id: DRAWER.RECETARIO });
    const { layoutsName } = siteProperties || {};

    const classNameMain = classNames('container flex flex-column gap-40', {
        'pb-64': !(layoutsName.FooditRecipePaywall === layout)
    });

    return (
        <AuthInitializer>
            <DynamicStylesheetLoader
                contextPath={contextPath}
                deployment={deployment}
                layout={layout}
                arcSite={arcSite}
            />
            <div className="wrapper overflow-x-clip roboto">
                <Header />
                <div className="header-sentinel" />
                <DrawerMyAccount />
                <main className={classNameMain}>{children}</main>
                <Static id="footer-static">
                    <Footer />
                </Static>
                <DataLayerInteractions />
                <Modal />
                <Toasts />
                <FloatingGroupButton
                    {...getConfigByLayout(layout, [toggleDrawer])}
                />
            </div>
        </AuthInitializer>
    );
};

export default BaseLayout;
