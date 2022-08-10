/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useCallback } from 'react';
import { SITIO_SEGURO_REGISTRACION, BOOKMARK_URL } from 'fusion:environment';
import PropTypes from 'prop-types';
import Header from './headerBase';
import Hamburger from './hamburger';
import ComIcon from '../../../common/icon';

import '../../../../../resources/dist/css/ln/components/usuario.css';
import '../../../../../resources/dist/css/ln/components/button.css';
import dynamicallyLoadScript from '../utils/dynamicallyLoadScript';
import BannerLogoHeader from '../../../common/banners/BannerLogoHeader';
import handleCookie from '../utils/handleCookie';
import LnLogoHeader from '../../../common/logos/LnLogoHeader';
import useTermica from '../../../common/hooks/useTermica';

const ItemAnchor = ({ url, text, title, className }) => {
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
                title={title}
                className={className}
            >
                {text}
            </a>
        </li>
    );
};

ItemAnchor.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string
};
ItemAnchor.defaultProps = {
    className: ''
};
const enlaces = [
    {
        url: 'https://myaccount.lanacion.com.ar/mi-usuario/',
        text: 'Mi cuenta',
        title: 'Ir a mi cuenta'
    },
    {
        url: 'https://myaccount.lanacion.com.ar/datos-personales/',
        text: 'Mis datos',
        title: 'Ir a mis datos'
    },
    {
        url: 'https://micuenta.lanacion.com.ar/mis-suscripciones/',
        text: 'Mis suscripciones',
        title: 'Ir a mis suscripciones'
    }
];

const HeaderDesktop = ({
    logueado,
    loginData,
    goToLogout,
    section,
    toglleDesplegable,
    isAdmin
}) => {
    const { loading, goToLoginUrl } = loginData;
    const { getCookie } = handleCookie();
    const getCookieCallback = useCallback(getCookie, []);
    const bookmarkWeb = useTermica('bookmark_web');

    const [token, setToken] = useState(getCookie('token'));
    const [active, setActive] = useState('');
    const [loadingUserData, setLoadingUserData] = useState(
        loading ? ' hlp-none' : ''
    );

    const toggleMenu = () =>
        active === '' ? setActive(' --active') : setActive('');

    useEffect(() => {
        setLoadingUserData(loading ? ' hlp-none' : '');
        setToken(getCookieCallback('token'));
    }, [loading, logueado, getCookieCallback]);

    const handleClickBuscar = () => {
        dynamicallyLoadScript(
            '//www.queryly.com/js/queryly.v4.js',
            'body'
        ).then(() => {
            const initScript = document.createElement('script');
            initScript.innerHTML = `queryly.init('8075c0c1c4c44847', document.querySelectorAll('#fusion-app'));`;
            document.body.appendChild(initScript);
            document.getElementById('querylyButton').click();
        });
    };

    return (
        <>
            <a href="#content" className="reader-only">
                Ir al contenido
            </a>
            <Header id="header" className="header">
                <div className="col-4 header__left">
                    <Hamburger _onMouseDown={toglleDesplegable} />
                    <label
                        onClick={handleClickBuscar}
                        id="querylyButton"
                        htmlFor="queryly_toggle"
                        title="Ir al buscador"
                    >
                        <i className="com-button --tertiary --icon queryly_searchicon">
                            <ComIcon name="search" />
                            BUSCAR
                        </i>
                        {/* <i style={{float:'right', color:'#0074c4',position:'absolute', top: '5px', cursor: 'pointer'}} className="icon-search queryly_searchicon"></i> */}
                    </label>
                </div>
                <div className="col-7 col-desksm-4 header__middle">
                    <BannerLogoHeader section={section} isAdmin={isAdmin} />
                    <LnLogoHeader />
                </div>
                <div className="col-4 header__right">
                    <div
                        id="user-menu"
                        className={`com-usuario${active} ${!token &&
                            loadingUserData}`}
                    >
                        {!loginData.subscription &&
                            typeof window !== 'undefined' && (
                                <a
                                    className={`com-button --special${loadingUserData}`}
                                    id="btnsuscribite"
                                    title="Suscribite a LA NACION"
                                    href={`${SITIO_SEGURO_REGISTRACION}/suscribirme?callback=${window.btoa(
                                        location.href
                                    )}`}
                                    rel="nofollow"
                                >
                                    SUSCRIBITE
                                </a>
                            )}
                        {(logueado || token) && (
                            <>
                                {/* Botón oculto para Experimentos ADQUISICION */}
                                <a
                                    className={`com-button --special${loadingUserData}`}
                                    id="btnupselling"
                                    title="¡Mejorá tu plan!"
                                    href="#"
                                    rel="nofollow"
                                >
                                    ¡MEJORÁ TU PLAN!
                                </a>
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
                                        {bookmarkWeb && loginData.subscription && (
                                            <>
                                                <ItemAnchor
                                                    url={BOOKMARK_URL}
                                                    text="Mis notas"
                                                    title="Ir a mis notas"
                                                    className="mis-notas"
                                                />
                                                <span className="new-feature --fivexs --font-bold">
                                                    NUEVO
                                                </span>
                                            </>
                                        )}
                                        {enlaces.map(({ url, text, title }) => (
                                            <ItemAnchor
                                                key={text}
                                                url={url}
                                                text={text}
                                                title={title}
                                            />
                                        ))}
                                        <li>
                                            <a
                                                data-event="LinkClick"
                                                data-section="MenuLN"
                                                href="javascript:void(0);"
                                                title="Cerrar sesión"
                                                onMouseDown={() => {
                                                    goToLogout();
                                                }}
                                            >
                                                Cerrar sesión
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                        {!token && (
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
                        <ComIcon
                            name="search"
                            extraClass="queryly_searchicon"
                        />
                    </label>
                </div>
            </Header>
        </>
    );
};

HeaderDesktop.propTypes = {
    logueado: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    loginData: PropTypes.shape({
        subscription: PropTypes.bool,
        userName: PropTypes.string,
        goToLoginUrl: PropTypes.func,
        loading: PropTypes.bool
    }).isRequired,
    goToLogout: PropTypes.func.isRequired,
    toglleDesplegable: PropTypes.func.isRequired,
    section: PropTypes.string.isRequired
};

export default HeaderDesktop;
