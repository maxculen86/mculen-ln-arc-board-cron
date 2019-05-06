import React from 'react';
import HeaderItem from './headerItem';
import HamburgerButton from '../../../common/hamburgerButton';
import Nav from '../../../common/nav';
import Consumer from 'fusion:consumer';

export default Consumer(function HeaderComponent(props) {
    const headerItems = props.items.map((item, index) => {
        return (
            <HeaderItem
                description={item.description}
                href={item.href}
                data={props.data}
                alt={item.description}
                key={index}
            />
        );
    });
    return (
        <header className="header">
            <a
                className={'header__logo'}
                href={'/'}
                alt={'lnmas.com.ar'}
                title={'lnmas.com.ar'}
            >
                <img
                    className={'a'}
                    src={`${
                        props.contextPath
                    }/resources/OTT/styles-grid/img/logo-lnmas.png`}
                />
            </a>
            <HamburgerButton className={'header__hamburguer'}>
                ☰
            </HamburgerButton>
            <Nav className="header__nav">{headerItems}</Nav>
        </header>
    );
});
