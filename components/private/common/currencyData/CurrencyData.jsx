import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import getAssetsPath from '../../common/utils/getAssetsPath';

import Text from '../text';
import ComLink from '../com-link';
import ComImage from '../com-image';

import '../../../../resources/dist/css/ln/modules/currency-data.css';

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
    informationAlt: 'BYMA',
    providedAlt: 'InvertirOnline'
};

const CurrencyData = ({
    outputType,
    contextPath,
    deployment,
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
    const navigationData =
        sourceName === 'dbna'
            ? 'https://www.lanacion.com.ar/dolar-hoy/'
            : '' || sourceName === 'dblue'
            ? 'https://www.lanacion.com.ar/tema/dolar-blue-tid67294/'
            : '';

    const titleData =
        sourceName === 'dbna'
            ? 'Dólar hoy'
            : '' || sourceName === 'dblue'
            ? 'Dólar blue'
            : '';

    return (
        <>
            {!urlBrand ? (
                <div className={`${classCondition} currency-data`}>
                    <ComLink
                        type="text/css"
                        title={titleData}
                        classCondition="link-container-currency-data"
                        link={navigationData}
                    >
                        <Text
                            tag="h2"
                            size="--twoxs"
                            weight="bold"
                            extraClass="dolar-title"
                            text={title}
                        />
                    </ComLink>
                    <p className="com-text --sixxs">
                        <span>COMPRA</span>
                        <strong className="--fourxs">${purchaseValue}</strong>
                        {saleValue && (
                            <>
                                <span>VENTA</span>
                                <strong className="--fourxs">
                                    ${saleValue}
                                </strong>
                            </>
                        )}
                    </p>
                </div>
            ) : (
                <ComLink
                    link="https://www.invertironline.com/"
                    classCondition="provider-data"
                    type="text/css"
                >
                    <div className="container-logo">
                        <span className="--sixxs">Información de</span>
                        <ComImage
                            classCondition="logo byma"
                            alt={informationAlt}
                            amp={outputType === 'amp'}
                            src={getAssetsPath(contextPath)(deployment)(
                                'logo-byma.svg'
                            )}
                        />
                    </div>
                    <div className="container-logo">
                        <span className="--sixxs">provista por</span>
                        <ComImage
                            classCondition="logo iol"
                            alt={providedAlt}
                            amp={outputType === 'amp'}
                            src={getAssetsPath(contextPath)(deployment)(
                                'logo-iol.svg'
                            )}
                        />
                    </div>
                </ComLink>
            )}
        </>
    );
};

CurrencyData.propTypes = propTypes;
CurrencyData.defaultProps = defaultProps;

export default Consumer(CurrencyData);
