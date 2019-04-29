import React from 'react';
import HeaderItem from '../containers/headerItem';
import HamburgerButton from '../../../common/containers/hamburgerButton';
import Nav from '../../../common/containers/nav';

export default function HeaderComponent({ items, data }) {
    const headerItems = items.map((item, index) => {
        return (
            <HeaderItem
                description={item.description}
                href={item.href}
                data={data}
                alt={item.description}
                key={index}
            />
        );
    });
    return (
        <header className="header">
            <a
                className="header__logo"
                href="/"
                alt="lnmas.com.ar"
                title="lnmas.com.ar"
            >
                <img className={'a'} src={'logo'} />
            </a>
            <HamburgerButton className={'header__hamburguer'}>
                ☰
            </HamburgerButton>
            <Nav className="header__nav">{headerItems}</Nav>
        </header>
    );
}
