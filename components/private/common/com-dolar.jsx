/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import ComLink from './com-link';
import useVisibility from './hooks/useVisibility';

const ComDolar = props => {
    const {
        precioCompraBna,
        precioVentaBna,
        precioCompraBlue,
        precioVentaBlue
    } = props;

    const visibility = useVisibility(props);

    return (
        <ul className="com-dolar" style={{ visibility }}>
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
                    {`$${precioCompraBna}`}
                </span>
                <i>/</i>
                <span id="precioVentaBna" className="precioDolar">
                    {`$${precioVentaBna}`}
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
                    {`$${precioCompraBlue}`}
                </span>
                <i>/</i>
                <span id="precioVentaBlue" className="precioDolar">
                    {`$${precioVentaBlue}`}
                </span>
            </li>
        </ul>
    );
};

ComDolar.propTypes = {
    precioCompraBna: PropTypes.string,
    precioVentaBna: PropTypes.string,
    precioCompraBlue: PropTypes.string,
    precioVentaBlue: PropTypes.string
};

export default ComDolar;
