import React from 'react';
import DrawerMenu from '../DrawerMenu/foodit';
import Header from '../Header/foodit';
import Footer from '../Footer/foodit';
import Modal from '../Modals/SaveRecipe/foodit';
import DrawerMyAccount from '../DrawerMyAccount/foodit';
import FloatingGroupButton from '../floatingGroupButton/foodit';
import Toasts from '../toasts/foodit';
import AuthProvider from '../context/authContext/foodit';

const BaseLayout = ({ children }) => {
    return (
        <AuthProvider>
            <div className="wrapper overflow-x-clip roboto">
                <Header />
                <div className="header-sentinel" />
                <DrawerMyAccount />
                <main className="container flex flex-column pb-64 gap-40">
                    {children}
                </main>
                <Footer />
                <Modal />
                <Toasts />
                <FloatingGroupButton />
            </div>
        </AuthProvider>
    );
};

export default BaseLayout;
