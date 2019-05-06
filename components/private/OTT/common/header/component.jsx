import React, { PureComponent } from 'react';
import HeaderItem from './headerItem';
import HamburgerButton from '../../../common/hamburgerButton';
import Nav from '../../../common/nav';
import Consumer from 'fusion:consumer';

class HeaderComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.headerItems = props.items.map((item, index) => {
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
    }
    render() {
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
                            this.props.contextPath
                        }/resources/OTT/styles-grid/img/logo-lnmas.png`}
                    />
                </a>
                <HamburgerButton className={'header__hamburguer'}>
                    ☰
                </HamburgerButton>
                <Nav className="header__nav">{this.headerItems}</Nav>
            </header>
        );
    }
}

export default Consumer(HeaderComponent);
