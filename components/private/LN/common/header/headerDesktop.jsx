import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import { API_ENV } from 'fusion:environment';
import Header from './headerBase';
import Hamburguer from './hamburger';

import '../../../../../resources/dist/css/ln/modules/header-desktop.css';
import '../../../../../resources/dist/css/ln/components/usuario.css';
import '../../../../../resources/dist/css/ln/components/button.css';

const { SitioSeguroRegistracion } = API_ENV || {
    SitioSeguroRegistracion: 'https://ingresar.lanacion.com.ar'
};

const HeaderDesktop = ({ logueado, loginData, goToLogout }) => {
    const { goToLoginUrl } = loginData;
    const [active, setActive] = useState('');

    const toggleMenu = () =>
        active === '' ? setActive(' --active') : setActive('');

    return (
        <Header id="header" className="header">
            <div className="col-4 header__left">
                <Hamburguer />
            </div>
            <div className="col-4 header__middle">
                <a href="/" className="header__middle__logo">
                    <i className="logo-la-nacion" />
                </a>
            </div>
            <div className="col-4 header__right">
                <div className={`com-usuario${active}`}>
                    {!loginData.subscription && (
                        <a
                            className="--btn --highlight hlp-marginRight-35"
                            href={
                                `${SitioSeguroRegistracion}/suscribirme` || '/'
                            }
                        >
                            Suscribite
                        </a>
                    )}
                    {logueado && (
                        <div onClick={toggleMenu} role="button">
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
                                <li>
                                    <a href="https://micuenta.lanacion.com.ar/mis-datos">
                                        Mi cuenta
                                    </a>
                                </li>
                                <li>
                                    <a href="https://micuenta.lanacion.com.ar/ayuda">
                                        Mis datos
                                    </a>
                                </li>
                                <li>
                                    <a href="https://micuenta.lanacion.com.ar/mis-suscripciones">
                                        Mis suscripciones
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="javascript:void(0);"
                                        onClick={() => goToLogout()}
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
        userName: PropTypes.string
    }),
    goToLogout: PropTypes.func.isRequired
};

HeaderDesktop.defaultProps = {
    loginData: PropTypes.shape({
        subscription: false,
        userName: ''
    })
};

export default HeaderDesktop;
