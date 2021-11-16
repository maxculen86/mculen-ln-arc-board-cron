import React from 'react';
import PropTypes from 'prop-types';

import ComTitle from '../com-title';
import ComLink from '../com-link';
import ComImage from '../com-image';

import '../../../../src/statics/LN/css/modules/_currency-data.scss';
import { default as BymaLogo } from '../../../../src/statics/LN/img/byma_logo.svg';

const propTypes = {
    classCondition: PropTypes.string,
    title: PropTypes.string,
    purchaseValue: PropTypes.string,
    saleValue: PropTypes.string,
    textBrand: PropTypes.string,
    informationAlt: PropTypes.string,
    providedAlt: PropTypes.string
};

const defaultProps = {
    informationAlt: 'byma-logo',
    providedAlt: 'invertir-online'
};

const CurrencyData = ({
    classCondition,
    title,
    purchaseValue,
    saleValue,
    sourceName,
    urlBrand,
    textBrand,
    informationAlt,
    providedAlt,
    ...r
}) => {
    return (
        <>
            {!urlBrand ? (
                <div className={`${classCondition} currency-data`}>
                    <ComTitle
                        tag="h2"
                        size="--xs"
                        classCondition="dolar-title"
                        content={title}
                    />
                    <p className="com-text --sixxs">
                        <span>COMPRA </span>
                        <strong>${purchaseValue}</strong>
                        {saleValue && (
                            <>
                                <span>VENTA </span>
                                <strong>${saleValue}</strong>
                            </>
                        )}
                    </p>
                </div>
            ) : (
                <ComLink
                    link={urlBrand}
                    classCondition="provider-data"
                    type="text/css"
                >
                    <div>
                        <div>
                            <span className="--sixxs">Información de</span>
                            <img
                                className="logo byma-logo"
                                src={BymaLogo}
                                alt={informationAlt}
                                target="_blank"
                            />
                        </div>
                        <div>
                            <span className="--sixxs">provista por</span>
                            <ComImage
                                classCondition="logo invertir-online"
                                alt={providedAlt}
                                target="_blank"
                            />
                        </div>
                    </div>
                </ComLink>
            )}
        </>
    );
};

CurrencyData.propTypes = propTypes;
CurrencyData.defaultProps = defaultProps;

export default CurrencyData;
