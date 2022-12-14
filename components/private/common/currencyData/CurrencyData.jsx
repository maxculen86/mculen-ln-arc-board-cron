import React from 'react';
import PropTypes from 'prop-types';

import Text from '../text';
import ComLink from '../com-link';

import '../../../../resources/dist/css/ln/modules/currency-data.css';

const CurrencyData = ({
    classCondition,
    title,
    purchaseValue,
    saleValue,
    link,
    ...r
}) => {
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
};

CurrencyData.propTypes = {
    siteProperties: PropTypes.shape({
        host: PropTypes.string
    }).isRequired,
    classCondition: PropTypes.string,
    title: PropTypes.string,
    purchaseValue: PropTypes.string,
    saleValue: PropTypes.string,
    link: PropTypes.string
};
CurrencyData.defaultProps = {
    classCondition: '',
    title: '',
    purchaseValue: '',
    saleValue: '',
    link: ''
};

export default CurrencyData;
