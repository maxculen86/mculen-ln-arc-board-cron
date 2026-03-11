import React from 'react';

import Text from '../text';
import ComLink from '../com-link';

import '../../../../resources/dist/css/ln/modules/currency-data.css';

function CurrencyData({
    classCondition = '',
    title = '',
    purchaseValue = '',
    saleValue = '',
    link = ''
}) {
    return (
        <div className={`${classCondition} currency-data`}>
            <ComLink
                type="text/css"
                title={title}
                classCondition="link-container-currency-data"
                link={link}
            >
                <Text
                    tag="h2"
                    size="--fourxs"
                    extraClass="dolar-title"
                    text={title}
                />
            </ComLink>
            <p className="com-text --sixxs">
                {purchaseValue && purchaseValue !== '-' && (
                    <>
                        <span>Compra</span>
                        <strong className="--fourxs">${purchaseValue}</strong>
                    </>
                )}
                {saleValue && saleValue !== '-' && (
                    <>
                        <span>Venta</span>
                        <strong className="--fourxs">${saleValue}</strong>
                    </>
                )}
            </p>
        </div>
    );
}

export default CurrencyData;
