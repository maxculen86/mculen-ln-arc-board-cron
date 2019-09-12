import React from 'react';
import PropTypes from 'fusion:prop-types';
import Header from './headerBase';
import Hamburguer from './hamburger';

import '../../../../../resources/dist/css/ln/modules/header-desktop.css';
import '../../../../../resources/dist/css/ln/components/usuario.css';

const HeaderDesktop = ({ logueado, loginData }) => {
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
                <div className="com-usuario">
                    {!loginData.subscription && (
                        <button
                            type="button"
                            className="--btn --highlight hlp-marginRight-35"
                        >
                            Suscribite
                        </button>
                    )}
                    {logueado && (
                        <button
                            type="button"
                            id="btnSuscriptor"
                            className="menu__item__ingresar --suscriptor "
                        >
                            <span
                                className="item__suscriptor --nombre icon-derecha"
                                id="spanUsuario"
                            >
                                {loginData.userName}
                            </span>
                            {loginData.subscription ? (
                                <span className="item__suscriptor --con__digital">
                                    Suscriptor digital
                                </span>
                            ) : (
                                <span className="item__suscriptor --sin__digital">
                                    Sin suscripción digital
                                </span>
                            )}
                            <ul>
                                <li className="ingresar__suscriptor__item --cuenta">
                                    <a
                                        href="https://micuenta.lanacion.com.ar/mis-datos"
                                        data-event="LinkClick"
                                        data-section="MenuLN"
                                    >
                                        Mi cuenta
                                    </a>
                                </li>
                                <li className="ingresar__suscriptor__item --suscripciones">
                                    <a
                                        href="https://micuenta.lanacion.com.ar/mis-suscripciones"
                                        data-event="LinkClick"
                                        data-section="MenuLN"
                                    >
                                        Mis suscripciones
                                    </a>
                                </li>
                                <li className="ingresar__suscriptor__item --ayuda">
                                    <a
                                        href="https://micuenta.lanacion.com.ar/ayuda"
                                        data-event="LinkClick"
                                        data-section="MenuLN"
                                    >
                                        Ayuda
                                    </a>
                                </li>
                                <li className="ingresar__suscriptor__item --salir">
                                    <a
                                        id="btnSalir"
                                        href="/"
                                        data-event="LinkClick"
                                        data-section="MenuLN"
                                    >
                                        Salir
                                    </a>
                                </li>
                            </ul>
                        </button>
                    )}
                    {!logueado && (
                        <button type="button" className="--btn --secondary">
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
    })
};

HeaderDesktop.defaultProps = {
    loginData: PropTypes.shape({
        subscription: false,
        userName: ''
    })
};

export default HeaderDesktop;
