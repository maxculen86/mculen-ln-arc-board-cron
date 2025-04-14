import React, { useId } from 'react';
import PropTypes from 'prop-types';
import Context from 'fusion:context';
import { Button } from '@ln/common-ui-button';
import { Text } from '@ln/common-ui-text';
import { Icon } from '@ln/common-ui-icon';
import HeaderItem from './headerItem';
import HamburgerButton from '../../../common/hamburgerButton';
import hrefHelper from '../../../common/utils/hrefHelper';
import { addForwardSlash } from '../../../LN/common/utils/addForwardSlash';
import {
    isSubscribed,
    logout,
    SUBSCRIBED_HELPER
} from '../../../common/auth/helper/loginHelper';
import AuthInitializer from '../../../common/auth/AuthInitializer';
import { addEventToDataLayerV2 } from '../../../LN/common/utils/addEventToDataLayer';

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
                                <Button
                                    className="header__log-out"
                                    title="Cerrar sesión"
                                    type="button"
                                    onClick={() => {
                                        const hrefCopy = window.btoa(
                                            window.location.href
                                        );
                                        addEventToDataLayerV2({
                                            event: 'e_linkclick',
                                            action: 'menu_usuario',
                                            category: 'lnmas',
                                            label: 'Cerrar sesión'
                                        });
                                        logout();
                                        window.location.href = `https://suscripciones.lanacion.com.ar/suscripcion/E/2/?callback=${hrefCopy}`;
                                    }}
                                >
                                    <Icon size={12}>
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g id="Icon">
                                                <path
                                                    id="Icon_2"
                                                    d="M2.5 11C2.36739 11 2.24021 10.9473 2.14645 10.8536C2.05268 10.7598 2 10.6326 2 10.5V1.5C2 1.36739 2.05268 1.24021 2.14645 1.14645C2.24021 1.05268 2.36739 1 2.5 1H9.5C9.63261 1 9.75979 1.05268 9.85355 1.14645C9.94732 1.24021 10 1.36739 10 1.5V3H9V2H3V10H9V9H10V10.5C10 10.6326 9.94732 10.7598 9.85355 10.8536C9.75979 10.9473 9.63261 11 9.5 11H2.5ZM9 8V6.5H5.5V5.5H9V4L11.5 6L9 8Z"
                                                    fill="#C61B25"
                                                />
                                            </g>
                                        </svg>
                                    </Icon>
                                    <Text>Cerrar sesión</Text>
                                </Button>
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
