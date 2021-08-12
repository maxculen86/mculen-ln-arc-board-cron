/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import PropTypes from 'prop-types';
import Header from './headerBase';
import Hamburguer from './hamburger';
// import ComLink from '../../../common/com-link';
// import ComLogo from '../../../common/com-logo';
import ComIcon from '../../../common/com-icon';
import Logo from '../../../common/com-logo';

import '../../../../../resources/dist/css/ln/modules/header-desktop.css';
import '../../../../../resources/dist/css/ln/components/usuario.css';
import '../../../../../resources/dist/css/ln/components/button.css';
import dynamicallyLoadScript from '../utils/dynamicallyLoadScript';
// import ModsubHeather from './subHeader';

const ItemAnchor = ({ url, text, alt }) => {
    const callURL = address => {
        // eslint-disable-next-line no-restricted-globals
        location.href = address;
    };

    return (
        <li key={text}>
            <a
                onMouseDown={() => callURL(url)}
                href="javascript:void(0)"
                data-event="LinkClick"
                data-section="MenuLN"
                title={alt}
            >
                {text}
            </a>
        </li>
    );
};

ItemAnchor.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
};

const enlaces = [
    {
        url: 'https://myaccount.lanacion.com.ar/mi-usuario',
        text: 'Mi cuenta',
        alt: 'Ir a mi cuenta'
    },
    {
        url: 'https://myaccount.lanacion.com.ar/datos-personales',
        text: 'Mis datos',
        alt: 'Ir a mis datos'
    },
    {
        url: 'https://micuenta.lanacion.com.ar/mis-suscripciones',
        text: 'Mis suscripciones',
        alt: 'Ir a mis suscripciones'
    }
];

const HeaderDesktop = ({
    logueado,
    loginData,
    goToLogout,
    host,
    isHome,
    // headerDark,
    toglleDesplegable
}) => {
    const { loading } = loginData;
    const { goToLoginUrl } = loginData;
    const [active, setActive] = useState('');
    const [loadingUserData, setLoadingUserData] = useState(
        loading ? ' hlp-none' : ''
    );

    const toggleMenu = () =>
        active === '' ? setActive(' --active') : setActive('');

    useEffect(() => {
        setLoadingUserData(loading ? ' hlp-none' : '');
    }, [loading]);

    const handleClickBuscar = () => {
        dynamicallyLoadScript('//www.queryly.com/js/queryly.v4.js', 'body')
            .then(() => {
                const initScript = document.createElement('script');
                initScript.innerHTML = `queryly.init('8075c0c1c4c44847', document.querySelectorAll('#fusion-app'));`;
                document.body.appendChild(initScript);
                document.getElementById('querylyButton').click();
            })
            .catch(() => {
                // console.error('Script loading failed! Handle this error', error);
            });
    };

    return (
        <Header id="header" className="header">
            <div className="col-4 header__left">
                <Hamburguer _onMouseDown={toglleDesplegable} />
                <label
                    onClick={handleClickBuscar}
                    id="querylyButton"
                    htmlFor="queryly_toggle"
                    title="Ir al buscador"
                >
                    <i className="com-button --tertiary --icon queryly_searchicon">
                        <ComIcon iconName="search" />
                        BUSCAR
                    </i>
                    {/* <i style={{float:'right', color:'#0074c4',position:'absolute', top: '5px', cursor: 'pointer'}} className="icon-search queryly_searchicon"></i> */}
                </label>
            </div>
            <div className="col-7 col-desksm-4 header__middle">
                <Logo
                    logoName="la-nacion"
                    classCondition="nacion-home"
                    color
                    // size="--md"
                    href={isHome ? '#' : `${host}/`}
                    target="_top"
                    title="Ir a la página principal"
                />
            </div>
            <div className="col-4 header__right">
                <div
                    id="user-menu"
                    className={`com-usuario${active}${loadingUserData}`}
                >
                    {!loginData.subscription && (
                        // <button
                        //     className="com-button --special"
                        //     id="btnsuscribite"
                        //     type="button"
                        //     title="Suscribite"
                        //     onClick={() => {
                        //         location.href =
                        //             `${SITIO_SEGURO_REGISTRACION}/suscribirme?callback=${window.btoa(
                        //                 location.href
                        //             )}` || '/';
                        //     }}
                        // >
                        //     SUSCRIBITE
                        // </button>

                        <a
                            className="com-button --special"
                            id="btnsuscribite"
                            title="Suscribite a LA NACION"
                            href={`${SITIO_SEGURO_REGISTRACION}/suscribirme?callback=${window.btoa(
                                location.href
                            )}`}
                        >
                            SUSCRIBITE
                        </a>
                    )}
                    {logueado && (
                        <div
                            onMouseUp={toggleMenu}
                            tabIndex="0"
                            role="button"
                            id="menuUser"
                            onBlur={() => setActive('')}
                            onScroll={() => setActive('')}
                        >
                            <p
                                className="com-usuario__name"
                                title="Ir al menú de suscriptor o suscriptora digital"
                            >
                                {loginData.userName}
                            </p>
                            {loginData.subscription ? (
                                <p className="com-usuario__valueSuscrib">
                                    Suscriptor digital
                                </p>
                            ) : (
                                <p className="com-usuario__valueSuscrib">
                                    Sin suscripción digital
                                </p>
                            )}
                            <ul className="com-desplegable">
                                {enlaces.map(({ url, text }) => (
                                    <ItemAnchor
                                        key={text}
                                        url={url}
                                        text={text}
                                    />
                                ))}
                                <li>
                                    <a
                                        data-event="LinkClick"
                                        data-section="MenuLN"
                                        href="javascript:void(0);"
                                        title="Desloguearse"
                                        onMouseDown={() => {
                                            goToLogout();
                                        }}
                                    >
                                        Salir
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                    {!logueado && (
                        <button
                            className="com-button --secondary"
                            id="btningresar"
                            onClick={() => goToLoginUrl()}
                            type="button"
                            title="Ingresar"
                        >
                            INGRESAR
                        </button>
                    )}
                </div>
            </div>
            <div className="col-1 header__search">
                <label onClick={handleClickBuscar} htmlFor="queryly_toggle">
                    <i className="com-icon icon-search queryly_searchicon" />
                </label>
            </div>
        </Header>
    );
};

HeaderDesktop.propTypes = {
    logueado: PropTypes.bool.isRequired,
    loginData: PropTypes.shape({
        subscription: PropTypes.bool,
        userName: PropTypes.string,
        goToLoginUrl: PropTypes.func,
        loading: PropTypes.bool
    }).isRequired,
    goToLogout: PropTypes.func.isRequired,
    host: PropTypes.string.isRequired,
    isHome: PropTypes.bool.isRequired,
    // headerDark: PropTypes.string,
    toglleDesplegable: PropTypes.func.isRequired
};

// HeaderDesktop.defaultProps = {
//     headerDark: ''
// };

export default HeaderDesktop;
