import React, { useState, useEffect } from 'react';
import { SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import PropTypes from 'fusion:prop-types';
import Header from './headerBase';
import Hamburguer from './hamburger';

import '../../../../../resources/dist/css/ln/modules/header-desktop.css';
import '../../../../../resources/dist/css/ln/components/usuario.css';
import '../../../../../resources/dist/css/ln/components/button.css';

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

const HeaderDesktop = ({ logueado, loginData, goToLogout, host }) => {
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
        const menuUser = document.getElementById('menuUser');

        if (menuUser) menuUser.addEventListener('blur', e => setActive(''));

        window.addEventListener('scroll', e => setActive(''));
    }, [loading]);

    return (
        <Header id="header" className="header">
            <div className="col-4 header__left">
                <Hamburguer />
            </div>
            <div className="col-4 header__middle">
                <a href={host || '/'} className="header__middle__logo">
                    <i className="logo-la-nacion" />
                </a>
            </div>
            <div className="col-4 header__right">
                <div
                    id="user-menu"
                    className={`com-usuario${active}${loadingUserData}`}
                >
                    {!loginData.subscription && (
                        <a
                            className="--btn --highlight hlp-marginRight-35"
                            href={
                                `${SITIO_SEGURO_REGISTRACION}/suscribirme` ||
                                '/'
                            }
                        >
                            Suscribite
                        </a>
                    )}
                    {logueado && (
                        <div
                            onMouseUp={toggleMenu}
                            tabIndex="0"
                            role="button"
                            id="menuUser"
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
                                    <ItemAnchor url={url} text={text} />
                                ))}
                                <li>
                                    <a
                                        href="javascript:void(0);"
                                        onMouseDown={() => goToLogout()}
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
                            className="--btn --secondary"
                            onClick={() => goToLoginUrl()}
                        >
                            Ingresar
                        </button>
                    )}
                </div>
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
    host: PropTypes.string.isRequired
};

export default HeaderDesktop;
