import React from 'react';
import PropTypes from 'fusion:prop-types';

import CurrencyData from './currencyData/CurrencyData';

import '../../../resources/dist/css/ln/modules/mod-dolar.css';

const ModDolar = ({ imageUrl, data }) =>
    (data && (
        <ul className="mod-dolar">
            {data.map((item, index) => {
                const { sourceName, title, compra, venta } = item;
                return (
                    <li key={index}>
                        <CurrencyData
                            sourceName={sourceName}
                            title={title}
                            purchaseValue={compra}
                            saleValue={sourceName !== 'dccl' && venta}
                        />
                    </li>
                );
            })}
            {imageUrl && (
                <li>
                    <CurrencyData urlBrand={imageUrl} />
                </li>
            )}
        </ul>
    )) ||
    null;

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
