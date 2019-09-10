import React from 'react';
import Header from './headerBase';

import '../../../../../resources/dist/css/ln/modules/header-mobile.css';

export default function HeaderMobile() {
    return (
        <Header id="header-mobile" className="header-mobile">
            <div className="col-6">
                <a href="/" className="header-mobile__logo">
                    <i className="logo-la-nacion" />
                </a>
            </div>
            <div className="col-6 hlp-text-right">
                <a>Suscribite</a>
            </div>
        </Header>
    );
}
