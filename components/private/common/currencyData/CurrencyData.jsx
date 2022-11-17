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
    sourceName,
    ...r
}) => {
    const navigationData = sourceNombre => {
        if (sourceNombre === 'dbna') {
            return 'https://www.lanacion.com.ar/dolar-hoy/';
        }
        if (sourceNombre === 'dblue') {
            return 'https://www.lanacion.com.ar/tema/dolar-blue-tid67294/';
        }
        return '';
    };
    const titleData = sourceNombre => {
        if (sourceNombre === 'dbna') {
            return 'Dólar hoy';
        }
        if (sourceNombre === 'dblue') {
            return 'Dólar blue';
        }
        return '';
    };

    return (
        <div className={`${classCondition} currency-data`}>
            <ComLink
                type="text/css"
                title={titleData(sourceName)}
                classCondition="link-container-currency-data"
                link={navigationData(sourceName)}
            >
                <Text
                    tag="h2"
                    size="--fourxs"
                    // weight="bold"
                    extraClass="dolar-title"
                    text={title}
                />
            </ComLink>
            <p className="com-text --sixxs">
                <span>Compra</span>
                <strong className="--font-bold">${purchaseValue}</strong>
                {saleValue && (
                    <>
                        <span>Venta</span>
                        <strong className="--font-bold">${saleValue}</strong>
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
    sourceName: PropTypes.string
};
CurrencyData.defaultProps = {
    classCondition: '',
    title: '',
    purchaseValue: '',
    saleValue: '',
    sourceName: ''
};

export default CurrencyData;
