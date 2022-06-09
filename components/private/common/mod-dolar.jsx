import React from 'react';
import PropTypes from 'fusion:prop-types';

// import CurrencyData from './currencyData/CurrencyData';

import '../../../resources/dist/css/ln/modules/mod-dolar.css';
import ModCripto from './mod-cripto';

const ModDolar = ({ imageUrl, data = [] }) => <ModCripto />;

ModDolar.propTypes = {
    data: PropTypes.shape({
        sourceName: PropTypes.string,
        title: PropTypes.string,
        compra: PropTypes.string,
        venta: PropTypes.string
    }).isRequired,
    imageUrl: PropTypes.string.isRequired
};

export default ModDolar;
