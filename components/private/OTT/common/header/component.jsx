import React, { useId } from 'react';
import PropTypes from 'prop-types';
import Context from 'fusion:context';
import { Text } from '@ln/common-ui-text';
import { Link } from '@ln/common-ui-link';
import HeaderItem from './headerItem';
import HamburgerButton from '../../../common/hamburgerButton';
import hrefHelper from '../../../common/utils/hrefHelper';
import { addForwardSlash } from '../../../LN/common/utils/addForwardSlash';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../common/auth/helper/loginHelper';
import AuthInitializer from '../../../common/auth/AuthInitializer';

function HeaderComponent(props) {
    const { arcSite, contextPath, items, data } = props;
    const subscribed = isSubscribed(SUBSCRIBED_HELPER.LN);

    return (
        <AuthInitializer website="ott">
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
                        <HamburgerButton className="header__hamburguer">
                            ☰
                        </HamburgerButton>
                        {subscribed && (
                            <nav className="header__nav">
                                {items.map(item => (
                                    <HeaderItem
                                        description={item.description}
                                        href={addForwardSlash(item.href)}
                                        data={data}
                                        alt={item.alt}
                                        key={useId()}
                                    />
                                ))}
                                <Link
                                    className="header__my-account"
                                    title="Ir a mi cuenta"
                                    href="https://myaccount.lanacion.com.ar/"
                                >
                                    <Text>Mi cuenta</Text>
                                </Link>
                            </nav>
                        )}
                    </div>
                </header>
            </div>
        </AuthInitializer>
    );
}

HeaderComponent.propTypes = {
    arcSite: PropTypes.string.isRequired,
    contextPath: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired
        })
    ).isRequired,
    data: PropTypes.shape({
        'data-event': PropTypes.string,
        'data-section': PropTypes.string
    }).isRequired
};

export default Context(HeaderComponent);
