import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';

const ComDolar = props => {
    const {
        precioCompraBna,
        precioVentaBna,
        precioCompraBlue,
        precioVentaBlue,
        size
    } = props;
    return (
        <ul className="com-dolar">
            <li>
                <ComLink
                    classCondition="--dolar"
                    dataEvent="LinkClick"
                    dataSection="MenuLN"
                    link="https://www.lanacion.com.ar/dolar-hoy/"
                    title="Dólar hoy"
                >
                    Dólar hoy:
                </ComLink>
                <span id="precioCompraBna" className="precioDolar">
                    {precioCompraBna ? `$${precioCompraBna}` : '$00,00'}
                </span>
                <i>/</i>
                <span id="precioVentaBna" className="precioDolar">
                    {precioVentaBna ? `$${precioVentaBna}` : '$00,00'}
                </span>
            </li>
            <li>
                <ComLink
                    classCondition="--blue"
                    dataEvent="LinkClick"
                    dataSection="MenuLN"
                    link="https://www.lanacion.com.ar/tema/dolar-blue-tid67294/"
                    title="Dólar blue"
                >
                    Dólar blue:
                </ComLink>
                <span id="precioCompraBlue" className="precioDolar">
                    {precioCompraBlue ? `$${precioCompraBlue}` : '$00,00'}
                </span>
                <i>/</i>
                <span id="precioVentaBlue" className="precioDolar">
                    {precioVentaBlue ? `$${precioVentaBlue}` : '$00,00'}
                </span>
            </li>
        </ul>
    );
};

ComDolar.propTypes = {
    precioCompraBna: PropTypes.string,
    precioVentaBna: PropTypes.string,
    precioCompraBlue: PropTypes.string,
    precioVentaBlue: PropTypes.string,
    size: PropTypes.string
};

export default ComDolar;
