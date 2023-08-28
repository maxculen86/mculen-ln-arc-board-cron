import React from 'react';
import DrawerMenu from '../DrawerMenu/recetas';
import HeaderRecetas from '../Header/recetas';
import FooterRecetas from '../Footer/recetas';
import NavigationBar from '../NavigationBar/recetas';

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
