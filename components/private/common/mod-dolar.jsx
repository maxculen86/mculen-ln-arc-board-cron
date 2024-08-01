import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';

import CurrencyData from './currencyData/CurrencyData';
import ComLink from './com-link';
import ComImage from './com-image';

import '../../../resources/dist/css/ln/modules/mod-dolar.css';
import setClassName from './utils/setClassName';

const ModDolar = ({
    data = [],
    informationAlt,
    providedAlt,
    oddOrEven,
    fillClass,
    logoByma,
    logoIol,
    _id
}) => {
    const pageDolarOficialHistorico =
        _id !== '/economia/dolar-oficial-historico';
    const containerLogoClass = setClassName({
        baseClass: 'container-logo',
        withHistoricalDollar:
            !pageDolarOficialHistorico && '--withHistoricalDollar'
    });
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

            <div className={containerLogoClass}>
                {pageDolarOficialHistorico && (
                    <ComLink
                        link={`${SITE_LANACION}/dolar-oficial-historico/`}
                        classCondition="mb-4 --fivexs"
                        title="Ir a dólar oficial histórico"
                    >
                        Ver dólar oficial histórico
                    </ComLink>
                )}
                <div className="flex">
                    <span className="--fivexs">Información de</span>
                    <ComImage
                        classCondition="logo byma"
                        alt={informationAlt}
                        src={logoByma}
                    />
                    <span className="--fivexs">provista por</span>
                    <ComLink
                        link="https://www.invertironline.com/"
                        classCondition="provider-data"
                        title="Ir a Invertir Online"
                        target="_blank"
                    >
                        <ComImage
                            classCondition="logo iol"
                            alt={providedAlt}
                            src={logoIol}
                        />
                    </ComLink>
                </div>
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
        venta: PropTypes.string,
        link: PropTypes.string
    }).isRequired,
    informationAlt: PropTypes.string,
    providedAlt: PropTypes.string,
    oddOrEven: PropTypes.string,
    fillClass: PropTypes.string,
    logoByma: PropTypes.string,
    logoIol: PropTypes.string,
    _id: PropTypes.string
};

ModDolar.defaultProps = {
    informationAlt: 'BYMA',
    providedAlt: 'InvertirOnline',
    oddOrEven: '',
    fillClass: '',
    logoByma: '',
    logoIol: '',
    _id: ''
};

export default ModDolar;
