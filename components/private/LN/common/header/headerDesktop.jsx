import React from 'react';
import Header from './headerBase';
import Hamburguer from './hamburger';

import '../../../../../resources/dist/css/ln/modules/header-desktop.css';

export default function HeaderDesktop() {
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
                    <button
                        type="button"
                        className="--btn --highlight hlp-marginRight-35"
                    >
                        Suscribite
                    </button>
                    <button type="button" className="--btn --secondary">
                        Ingresar
                    </button>
                </div>
            </div>
        </Header>
    );
}
