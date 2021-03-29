/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import PropTypes from 'fusion:prop-types';
import Header from './headerBase';
import Hamburguer from './hamburger';
import ComLink from '../../../common/com-link';
import ComLogo from '../../../common/com-logo';
import ComIcon from '../../../common/com-icon';

import '../../../../../resources/dist/css/ln/modules/header-desktop.css';
import '../../../../../resources/dist/css/ln/components/usuario.css';
import '../../../../../resources/dist/css/ln/components/button.css';
import dynamicallyLoadScript from '../utils/dynamicallyLoadScript';
// import ModsubHeather from './subHeather';

const ItemAnchor = ({ url, text }) => {
    const callURL = address => {
        // eslint-disable-next-line no-restricted-globals
        location.href = address;
    };

    return (
        <li key={text}>
            <a onMouseDown={() => callURL(url)} href="javascript:void(0)">
                {text}
            </a>
        </li>
    );
};

ItemAnchor.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.text.isRequired
};

const enlaces = [
    {
        url: 'https://micuenta.lanacion.com.ar/mis-datos',
        text: 'Mi cuenta'
    },
    {
        url: 'https://micuenta.lanacion.com.ar/ayuda',
        text: 'Mis datos'
    },
    {
        url: 'https://micuenta.lanacion.com.ar/mis-suscripciones',
        text: 'Mis suscripciones'
    }
];

const HeaderDesktop = ({
    logueado,
    loginData,
    goToLogout,
    host,
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
                >
                    <i className="com-button --tertiary --icon queryly_searchicon">
                        <ComIcon iconName="search" />
                        BUSCAR
                    </i>
                    {/* <i style={{float:'right', color:'#0074c4',position:'absolute', top: '5px', cursor: 'pointer'}} className="icon-search queryly_searchicon"></i> */}
                </label>
            </div>
            <div className="col-7 col-desksm-4 header__middle">
                <ComLink
                    link={host || '/'}
                    classCondition="header__middle__logo"
                >
                    <ComLogo logoName="la-nacion" />
                </ComLink>
            </div>
            <div className="col-4 header__right">
                <div
                    id="user-menu"
                    className={`com-usuario${active}${loadingUserData}`}
                >
                    {!loginData.subscription && (
                        <button
                            className="com-button --special"
                            type="button"
                            onClick={() => {
                                location.href =
                                    `${SITIO_SEGURO_REGISTRACION}/suscribirme?callback=${window.btoa(
                                        location.href
                                    )}` || '/';
                            }}
                        >
                            SUSCRIBITE
                        </button>
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
                            <p className="com-usuario__name">
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
                                        href="javascript:void(0);"
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
                            type="button"
                            className="com-button --secondary"
                            onClick={() => goToLoginUrl()}
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
    //headerDark: PropTypes.string,
    toglleDesplegable: PropTypes.func.isRequired
};

// HeaderDesktop.defaultProps = {
//     headerDark: ''
// };

export default HeaderDesktop;
