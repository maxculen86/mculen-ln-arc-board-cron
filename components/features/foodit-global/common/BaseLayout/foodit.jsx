import React from 'react';
import { useAppContext } from 'fusion:context';
import DrawerMenu from '../DrawerMenu/foodit';
import Header from '../Header/foodit';
import Footer from '../Footer/foodit';
import Modal from '../Modals/SaveRecipe/foodit';
import DrawerMyAccount from '../DrawerMyAccount/foodit';
import classNames from 'classnames';
import FloatingGroupButton from '../floatingGroupButton/foodit';
import Toasts from '../toasts/foodit';
import AuthProvider from '../context/authContext/foodit';

const BaseLayout = ({ children }) => {
    const { layout, siteProperties } = useAppContext();
    const { layoutsName = {} } = siteProperties || {};

    const classNameHeaderContainer = classNames({
        'mb-16 mb-40_lg':
            layout === layoutsName.FooditHome ||
            layout === layoutsName.FooditFichaReceta,
        'mb-40':
            layout === layoutsName.FooditRecetario ||
            layout === layoutsName.FooditAcumulado
    });

    return (
        <AuthProvider>
            <div className="wrapper overflow-x-clip roboto">
                <Header classNameContainer={classNameHeaderContainer} />
                <div className="header-sentinel" />
                <DrawerMenu />
                <DrawerMyAccount />
                <main className="container flex flex-column pb-64 gap-40">
                    {children}
                </main>
                <Footer />
                <Modal />
                <Toasts />
                <FloatingGroupButton layout={layout} />
            </div>
        </AuthProvider>
    );
};

export default BaseLayout;
