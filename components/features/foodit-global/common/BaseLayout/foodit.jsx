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
            <main className="container mb-72" style={{ minHeight: '100vh' }}>
                {children}
            </main>
            <button data-id="sklere" data-modal="open-modal">
                BOOTOOOOON
            </button>
            <NavigationBar />
            <Footer />
            <Modal />
        </div>
    );
};

export default BaseLayout;
