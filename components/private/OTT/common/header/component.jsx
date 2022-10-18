import React, { PureComponent } from 'react';
import Context from 'fusion:context';
import HeaderItem from './headerItem';
import HamburgerButton from '../../../common/hamburgerButton';
import hrefHelper from '../../../common/utils/hrefHelper';
import addForwardSlash from '../../../LN/common/utils/addForwardSlash';

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
                    href={addForwardSlash(item.href)}
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
        const { arcSite, contextPath } = this.props;

        return (
            <div className="header-wrapper">
                <header className="header">
                    <div className="wrapper">
                        <a
                            className="header__logo"
                            href={hrefHelper.createCorrectHref(
                                '/',
                                arcSite,
                                contextPath
                            )}
                            alt="lnmas.com.ar"
                            title="lnmas.com.ar"
                        >
                            LN+
                        </a>
                        <HamburgerButton className={'header__hamburguer'}>
                            ☰
                        </HamburgerButton>
                        <nav className="header__nav">{this.headerItems}</nav>
                    </div>
                </header>
            </div>
        );
    }
}
export default Context(HeaderComponent);
