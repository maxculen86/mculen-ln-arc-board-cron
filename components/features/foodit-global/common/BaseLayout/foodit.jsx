import React from 'react';
import DrawerMenu from '../DrawerMenu/foodit';
import HeaderRecetas from '../Header/foodit';
import FooterRecetas from '../Footer/foodit';
import NavigationBar from '../NavigationBar/foodit';

const BaseLayout = ({ children, ...r }) => {
    return (
        <div className="wrapper overflox-x-clip roboto">
            <HeaderRecetas />
            <div className="header-sentinel" />
            <DrawerMenu />
            <main className="container mb-72" style={{ minHeight: '100vh' }}>
                {children}
            </main>
            <NavigationBar />
            <FooterRecetas />
        </div>
    );
};

export default BaseLayout;
