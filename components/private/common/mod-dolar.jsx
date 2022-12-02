import React from 'react';
import PropTypes from 'fusion:prop-types';
import CurrencyData from './currencyData/CurrencyData';
import '../../../resources/dist/css/ln/modules/mod-dolar.css';

const ModDolar = ({ imageUrl, data = [] }) =>
    data.length ? (
        <div className="dolar">
            <ul className="mod-dolar">
                {data.map((item, index) => {
                    const {
                        sourceName,
                        titleMobile,
                        compra,
                        venta,
                        link
                    } = item;

                    return (
                        <li key={item.sourceName}>
                            <CurrencyData
                                sourceName={sourceName}
                                title={titleMobile}
                                purchaseValue={compra}
                                saleValue={venta}
                                link={link}
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
    ) : (
        <></>
    );

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
