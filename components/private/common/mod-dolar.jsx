import React from 'react';
import PropTypes from 'fusion:prop-types';
// import { useAppContext } from 'fusion:context';

import CurrencyData from './currencyData/CurrencyData';
import ComLink from './com-link';
import ComImage from './com-image';

import getAssetsPath from './utils/getAssetsPath';

import '../../../resources/dist/css/ln/modules/mod-dolar.css';

const ModDolar = ({
    data = [],
    informationAlt,
    outputType,
    providedAlt,
    contextPath,
    deployment,
    oddOrEven,
    fillClass
}) => {
    return data.length ? (
        <>
            <div className="dolar">
                <ul className={`dolar-subgroup ${oddOrEven} ${fillClass}`}>
                    {data.map(item => {
                        const { titleMobile, compra, venta, link } = item;
                        return (
                            <li key={item.sourceName}>
                                <CurrencyData
                                    title={titleMobile}
                                    purchaseValue={compra}
                                    saleValue={venta}
                                    link={link}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="container-logo">
                <span className="--fivexs">Información de</span>
                <ComImage
                    classCondition="logo byma"
                    alt={informationAlt}
                    amp={outputType === 'amp'}
                    src={getAssetsPath(contextPath)(deployment)(
                        'logo-byma.svg'
                    )}
                />
                <span className="--fivexs">provista por</span>
                <ComLink
                    link="https://www.invertironline.com/"
                    classCondition="provider-data"
                    type="text/css"
                    title="Ir a Invertir Online"
                    target="_blank"
                >
                    <ComImage
                        classCondition="logo iol"
                        alt={providedAlt}
                        amp={outputType === 'amp'}
                        src={getAssetsPath(contextPath)(deployment)(
                            'logo-iol.svg'
                        )}
                    />
                </ComLink>
            </div>
        </>
    ) : (
        <></>
    );
};

ModDolar.propTypes = {
    data: PropTypes.shape({
        sourceName: PropTypes.string,
        title: PropTypes.string,
        compra: PropTypes.string,
        venta: PropTypes.string
    }).isRequired,
    outputType: PropTypes.string,
    informationAlt: PropTypes.string,
    providedAlt: PropTypes.string,
    contextPath: PropTypes.string.isRequired,
    deployment: PropTypes.func.isRequired,
    oddOrEven: PropTypes.string,
    fillClass: PropTypes.string
};

ModDolar.defaultProps = {
    outputType: 'default',
    informationAlt: 'BYMA',
    providedAlt: 'InvertirOnline',
    oddOrEven: '',
    fillClass: ''
};

export default ModDolar;
