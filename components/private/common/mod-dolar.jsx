import React from 'react';
import PropTypes from 'fusion:prop-types';

import CurrencyData from './currencyData/CurrencyData';
import ComLink from './com-link';
import ComImage from './com-image';

import '../../../resources/dist/css/ln/modules/mod-dolar.css';

const ModDolar = ({
    data = [],
    informationAlt,
    providedAlt,
    oddOrEven,
    fillClass,
    logoByma,
    logoIol,
    isAmp
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
                    amp={isAmp}
                    src={logoByma}
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
                        amp={isAmp}
                        src={logoIol}
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
    informationAlt: PropTypes.string,
    providedAlt: PropTypes.string,
    oddOrEven: PropTypes.string,
    fillClass: PropTypes.string,
    logoByma: PropTypes.string,
    logoIol: PropTypes.string,
    isAmp: PropTypes.bool
};

ModDolar.defaultProps = {
    informationAlt: 'BYMA',
    providedAlt: 'InvertirOnline',
    oddOrEven: '',
    fillClass: '',
    logoByma: '',
    logoIol: '',
    isAmp: false
};

export default ModDolar;
