import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';
import ComText from './text';

const ComDolar = props => {
    const {
        precioCompraBna,
        precioVentaBna,
        precioCompraBlue,
        precioVentaBlue,
        size
    } = props;
    return (
        <div className="com-dolar">
            <ComLink
                classCondition="--dolar"
                dataEvent="LinkClick"
                dataSection="MenuLN"
                link="https://www.lanacion.com.ar/dolar-hoy"
                size={size}
                title="Ir a notas de Dólar Hoy y Cotización"
            >
                Dólar:
            </ComLink>
            <ComText size={size}>BNA:</ComText>
            <span id="precioCompraBna" className={`precioDolar ${size}`}>
                {precioCompraBna ? `$${precioCompraBna}` : '$00,00'}
            </span>
            <i>/</i>
            <span id="precioVentaBna" className={`precioDolar ${size}`}>
                {precioVentaBna ? `$${precioVentaBna}` : '$00,00'}
            </span>
            <ComLink
                classCondition="--blue"
                dataEvent="LinkClick"
                dataSection="MenuLN"
                link="https://www.lanacion.com.ar/dolar-hoy"
                size={size}
                title="Ir a notas de Dólar blue"
            >
                Blue:
            </ComLink>
            <span id="precioCompraBlue" className={`precioDolar ${size}`}>
                {precioCompraBlue ? `$${precioCompraBlue}` : '$00,00'}
            </span>
            <i>/</i>
            <span id="precioVentaBlue" className={`precioDolar ${size}`}>
                {precioVentaBlue ? `$${precioVentaBlue}` : '$00,00'}
            </span>
        </div>
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
