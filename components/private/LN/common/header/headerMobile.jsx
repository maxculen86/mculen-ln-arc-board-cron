import React from 'react';
import PropTypes from 'fusion:prop-types';
import { API_ENV } from 'fusion:environment';
import Header from './headerBase';

import '../../../../../resources/dist/css/ln/modules/header-mobile.css';

const { SitioSeguroRegistracion } = API_ENV || {
    SitioSeguroRegistracion: 'https://ingresar.lanacion.com.ar'
};

const HeaderMobile = ({ loginData }) => {
    return (
        <Header id="header-mobile" className="header-mobile">
            <div className="col-6">
                <a href="/" className="header-mobile__logo">
                    <i className="logo-la-nacion" />
                </a>
            </div>
            {!loginData.subscription && (
                <div className="col-6 hlp-text-right">
                    <a href={`${SitioSeguroRegistracion}/suscribirme` || '/'}>
                        Suscribite
                    </a>
                </div>
            )}
        </Header>
    );
};

HeaderMobile.propTypes = {
    loginData: PropTypes.shape({
        subscription: PropTypes.bool,
        userName: PropTypes.string
    })
};

HeaderMobile.defaultProps = {
    loginData: PropTypes.shape({
        subscription: false,
        userName: ''
    })
};
export default HeaderMobile;
