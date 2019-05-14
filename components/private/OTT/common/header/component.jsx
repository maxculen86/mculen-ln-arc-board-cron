import React, { PureComponent } from 'react';
import HeaderItem from './headerItem';
import HamburgerButton from '../../../common/hamburgerButton';
import Nav from '../../../common/nav';
import Context from 'fusion:context';

class HeaderComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.headerItems = this.getHeaderItems(props);
    }

    getHeaderItems(props) {
        return props.items.map((item, index) => {
            return (
                <HeaderItem
                    description={item.description}
                    href={item.href}
                    data={props.data}
                    alt={item.alt}
                    key={index}
                />
            );
        });
    }

    componentWillUpdate(nextProps, nextState) {
        this.headerItems = this.getHeaderItems(nextProps);
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
                        src={this.props.deployment(
                            `${
                                this.props.contextPath
                            }/resources/OTT/styles-grid/img/logo-lnmas.png`
                        )}
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

export default Context(HeaderComponent);
