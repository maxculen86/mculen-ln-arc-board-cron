/* eslint-disable react/no-danger */
import React from 'react';
//import PropTypes from 'fusion:prop-types';

import ComTitle from './com-title';
import ComLink from './com-link';
import ComImage from './com-image';

import '../../../resources/dist/css/ln/modules/mod-dolar.css';

const ModDolar = ({ compra, venta, compraBlue, ventaBlue, compraLiqui }) => {
    return (
        <ul className="mod-dolar row-gap-tablet-4">
            <li className="item">
                <ComTitle tag="h2" size="--xs" content="Dólar Banco Nación" />
                <span>
                    Compra <strong>${compra}</strong> Venta{' '}
                    <strong>${venta}</strong>
                </span>
            </li>
            <li className="item">
                <ComTitle tag="h2" size="--xs" content="Dólar Blue" />
                <span>
                    Compra <strong>${compraBlue}</strong> Venta{' '}
                    <strong>${ventaBlue}</strong>
                </span>
            </li>
            <li className="item">
                <ComTitle
                    tag="h2"
                    size="--xs"
                    content="Dólar Contado con Liqui"
                />
                <span>
                    Compra <strong>${compraLiqui}</strong>
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

// ModDolar.propTypes = {
//     link: PropTypes.string.isRequired,
//     subheadSize: PropTypes.string.isRequired,
//     subheadText: PropTypes.string.isRequired
// };

export default ModDolar;
