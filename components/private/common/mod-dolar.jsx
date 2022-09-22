import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';

import CurrencyData from './currencyData/CurrencyData';

import '../../../resources/dist/css/ln/modules/mod-dolar.css';
import ComLink from './com-link';
import Text from './text';

const ModDolar = ({ imageUrl, data = [] }) =>
    (data.length && (
        <div className="dolar">
            <ul className="mod-dolar">
                {data.map((item, index) => {
                    const { sourceName, title, compra, venta } = item;
                    return (
                        <li key={item.sourceName}>
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
        </div>
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
