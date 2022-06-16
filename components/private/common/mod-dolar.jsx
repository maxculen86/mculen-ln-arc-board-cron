import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';

import CurrencyData from './currencyData/CurrencyData';

import '../../../resources/dist/css/ln/modules/mod-dolar.css';
import ComLink from './com-link';
import Text from './text';

const ModDolar = ({ imageUrl, data = [] }) =>
    (data.length && (
        <>
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
            <div className="widget-carrousel-coins">
                <ComLink
                    link={`${SITE_LANACION}/tema/criptomonedas-tid63718/`}
                    title="Ir a criptomonedas"
                    type="text/css"
                >
                    <Text
                        tag="h2"
                        size="--twoxs"
                        weight="bold"
                        extraClass="cripto-title"
                        text="Criptomonedas"
                    />
                </ComLink>
                <div
                    className="livecoinwatch-widget-5"
                    lcw-base="USD"
                    lcw-color-tx="#000000"
                    lcw-marquee-1="coins"
                    lcw-marquee-2="none"
                    lcw-marquee-items="20"
                />
            </div>
        </>
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
