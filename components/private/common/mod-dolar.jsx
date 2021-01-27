import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComTitle from './com-title';
import ComLink from './com-link';
import ComImage from './com-image';

import '../../../resources/dist/css/ln/modules/mod-dolar.css';

const ModDolar = ({ buy, sale, buyBlue, saleBlue, buyLiqui }) => {
    return (
        <ul className="mod-dolar row-gap-tablet-4">
            <li className="item">
                <ComTitle tag="h2" size="--xs" content="Dólar Banco Nación" />
                <span>
                    Compra <strong>${buy}</strong> Venta{' '}
                    <strong>${sale}</strong>
                </span>
            </li>
            <li className="item">
                <ComTitle tag="h2" size="--xs" content="Dólar Blue" />
                <span>
                    Compra <strong>${buyBlue}</strong> Venta{' '}
                    <strong>${saleBlue}</strong>
                </span>
            </li>
            <li className="item">
                <ComTitle
                    tag="h2"
                    size="--xs"
                    content="Dólar Contado con Liqui"
                />
                <span>
                    Compra <strong>${buyLiqui}</strong>
                </span>
            </li>
            <li className="item">
                <ComLink link="https://www.invertironline.com/" target="_blank">
                    <ComImage
                        src="https://especiales.lanacion.com.ar/LN/dolar/anexo-dolar/logo-invertir.png"
                        alt="invertirOnline.com"
                    />
                </ComLink>
            </li>
        </ul>
    );
};

ModDolar.propTypes = {
    buy: PropTypes.string.isRequired,
    sale: PropTypes.string.isRequired,
    buyBlue: PropTypes.string.isRequired,
    saleBlue: PropTypes.string.isRequired,
    buyLiqui: PropTypes.string.isRequired
};

export default ModDolar;
