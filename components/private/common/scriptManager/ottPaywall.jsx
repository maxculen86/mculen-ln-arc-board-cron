import React from 'react';
import PropTypes from 'prop-types';

export const scriptLog = `function getCookie(nameCookie) {
        if (!nameCookie) return undefined;
        var value = "; ".concat(typeof document !== 'undefined' ? document.cookie : '');
        var parts = value.split("; ".concat(nameCookie, "="));
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

function OTTPaywall({ arcSite }) {
    return (
        arcSite === 'ott' && (
            <script
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: scriptLog }}
            />
        )
    );
}

OTTPaywall.propTypes = {
    arcSite: PropTypes.string.isRequired
};

export default OTTPaywall;
