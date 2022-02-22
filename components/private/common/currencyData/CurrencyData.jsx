import React from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import getAssetsPath from '../utils/getAssetsPath';

import Text from '../text';
import ComLink from '../com-link';
import ComImage from '../com-image';

import '../../../../resources/dist/css/ln/modules/currency-data.css';

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
    informationAlt,
    providedAlt,
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
        <>
            {!urlBrand ? (
                <div className={`${classCondition} currency-data`}>
                    <ComLink
                        type="text/css"
                        title={titleData(sourceName)}
                        classCondition="link-container-currency-data"
                        link={navigationData(sourceName)}
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

CurrencyData.propTypes = {
    outputType: PropTypes.string,
    siteProperties: PropTypes.shape({
        host: PropTypes.string
    }).isRequired,
    contextPath: PropTypes.string.isRequired,
    deployment: PropTypes.func.isRequired,
    classCondition: PropTypes.string,
    title: PropTypes.string,
    purchaseValue: PropTypes.string,
    saleValue: PropTypes.string,
    sourceName: PropTypes.string,
    urlBrand: PropTypes.string,
    informationAlt: PropTypes.string,
    providedAlt: PropTypes.string
};
CurrencyData.defaultProps = {
    outputType: 'default',
    classCondition: '',
    title: '',
    purchaseValue: '',
    saleValue: '',
    sourceName: '',
    urlBrand: '',
    informationAlt: 'BYMA',
    providedAlt: 'InvertirOnline'
};

export default Consumer(CurrencyData);
