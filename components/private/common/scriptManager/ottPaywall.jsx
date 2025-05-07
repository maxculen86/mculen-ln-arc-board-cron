import React from 'react';
import PropTypes from 'prop-types';

export const scriptLog = `function getCookie(nameCookie) {
        if (!nameCookie) return undefined;
        const value = "; ".concat(typeof document !== 'undefined' ? document.cookie : '');
        const parts = value.split("; ".concat(nameCookie, "="));
        return parts.length === 2 ? parts.pop().split(';').shift() : undefined;
      }
    function getHrefHashed() {
      if (typeof window !== 'undefined') {
        return window.btoa(window.location.href);
      }
      return '';
    }
    const productPremium = getCookie('ProductoPremiumId')
    if(!productPremium) {
    window.location.href = 'https://suscripciones.lanacion.com.ar/suscripcion/E/2/?callback=' + getHrefHashed()
    }`;

function OTTPaywall({ arcSite, isAdmin }) {
    return (
        arcSite === 'ott' &&
        !isAdmin && (
            <script
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: scriptLog }}
            />
        )
    );
}

OTTPaywall.propTypes = {
    arcSite: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default OTTPaywall;
