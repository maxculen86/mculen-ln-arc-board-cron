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
import FooditEventsHelper from '../dataLayer/FooditEventsHelper';
import DynamicStylesheetLoader from '../../../../output-types/criticalCss/dynamicStylesheetLoader';
import DataLayerInteractions from '../../../../private/common/scriptManager/DataLayerInteracions';
import AuthInitializer from '../../../../../auth/AuthInitializer';

const BaseLayout = ({ children }) => {
    const { layout, contextPath, deployment, arcSite } = useAppContext();
    const { toggleDrawer } = useDrawer({ id: DRAWER.RECETARIO });

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
                <main className="container flex flex-column pb-64 gap-40">
                    {children}
                </main>
                <Static id="footer-static">
                    <Footer />
                </Static>
                <FooditEventsHelper />
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
