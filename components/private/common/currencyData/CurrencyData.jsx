import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import getAssetsPath from '../../common/utils/getAssetsPath';

import Text from '../text';
import ComTitle from '../com-title';
import ComLink from '../com-link';
import ComImage from '../com-image';

import '../../../../src/statics/LN/css/modules/_currency-data.scss';
//import { default as BymaLogo } from '../../../../src/statics/LN/img/byma_logo.svg';
// import '../../../../src/statics/LN/css/modules/_currency-data.scss';

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
    informationAlt: 'BYMA Bolsas y Mercados Argentinos',
    providedAlt: 'Invertir Online'
};

const CurrencyData = ({
    outputType,
    siteProperties: { host },
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
    return (
        <>
            {!urlBrand ? (
                <div className={`${classCondition} currency-data`}>
                    <Text
                        tag="h2"
                        size="--twoxs"
                        weight="bold"
                        extraClass="dolar-title"
                        text={title}
                    />
                    <p className="com-text --sixxs">
                        <span>COMPRA </span>
                        <strong className="--fourxs">${purchaseValue}</strong>
                        {saleValue && (
                            <>
                                <span>VENTA </span>
                                <strong className="--fourxs">
                                    ${saleValue}
                                </strong>
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
                            <ComImage
                                classCondition="logo byma"
                                alt={providedAlt}
                                // target="_blank"
                                amp={outputType === 'amp'}
                                src={getAssetsPath(contextPath)(deployment)(
                                    'logo-byma.svg'
                                )}
                            />
                        </div>
                        <div>
                            <span className="--sixxs">provista por</span>
                            <ComImage
                                classCondition="logo iol"
                                alt={providedAlt}
                                // href="https://www.invertironline.com/"
                                // target="_blank"
                                amp={outputType === 'amp'}
                                src={getAssetsPath(contextPath)(deployment)(
                                    'logo-iol.svg'
                                )}
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

export default Consumer(CurrencyData);
