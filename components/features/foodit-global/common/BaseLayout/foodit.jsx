import React from 'react';
import DrawerMenu from '../DrawerMenu/foodit';
import Header from '../Header/foodit';
import Footer from '../Footer/foodit';
import NavigationBar from '../NavigationBar/foodit';
import Modal from '../Modals/SaveRecipe/foodit';

const BaseLayout = ({ children, ...r }) => {
    return (
        <div className="wrapper overflox-x-clip roboto">
            <Header />
            <div className="header-sentinel" />
            <DrawerMenu />
            <main className="container flex flex-column mb-72 gap-72 min-vh-100">
                {children}
            </main>
            <NavigationBar />
            <Footer />
            <Modal />
        </div>
    );
};

export default BaseLayout;
