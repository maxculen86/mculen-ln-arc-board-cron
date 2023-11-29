import React from 'react';
import { useAppContext } from 'fusion:context';
import DrawerMenu from '../DrawerMenu/foodit';
import Header from '../Header/foodit';
import Footer from '../Footer/foodit';
import Modal from '../Modals/SaveRecipe/foodit';
import DrawerMyAccount from '../DrawerMyAccount/foodit';
import classNames from 'classnames';

const BaseLayout = ({ children }) => {
    const { layout, siteProperties } = useAppContext();
    const { layoutsName = {} } = siteProperties || {};

    const classNameHeaderContainer = classNames({
        'mb-16': layout === layoutsName.FooditHome
    });
    return (
        <div className="wrapper overflox-x-clip roboto">
            <Header classNameContainer={classNameHeaderContainer} />
            <div className="header-sentinel" />
            <DrawerMenu />
            <DrawerMyAccount />
            <main className="container flex flex-column pb-64 gap-40 min-vh-100">
                {children}
            </main>
            <Footer />
            <Modal />
        </div>
    );
};

export default BaseLayout;
