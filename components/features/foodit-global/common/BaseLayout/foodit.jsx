import React from 'react';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import { getConfigByLayout } from '../floatingGroupButton/helpers';

import Header from '../Header/foodit';
import Footer from '../Footer/foodit';
import Modal from '../Modals/SaveRecipe/foodit';
import DrawerMyAccount from '../DrawerMyAccount/foodit';
import FloatingGroupButton from '../floatingGroupButton/foodit';
import Toasts from '../toasts/foodit';
import AuthProvider from '../context/authContext/foodit';
import FooditEventsHelper from '../dataLayer/FooditEventsHelper';
import DataLayerInteractions from '../../../../private/common/scriptManager/DataLayerInteracions';

const BaseLayout = ({ children }) => {
    const { layout } = useAppContext();

    return (
        <AuthProvider>
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
                <FloatingGroupButton {...getConfigByLayout(layout)} />
            </div>
        </AuthProvider>
    );
};

export default BaseLayout;
