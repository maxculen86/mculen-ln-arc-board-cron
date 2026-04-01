import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import '../../../../../resources/dist/css/ln/modules/mod-dolar.css';
import CurrencyData from '../../../../private/common/currencyData/CurrencyData';
import ComLink from '../../../../private/common/com-link';
import ComImage from '../../../../private/common/com-image';
import setClassName from '../../../../private/common/utils/setClassName';

function ModDolar({
    data = [],
    informationAlt = 'BYMA',
    oddOrEven = '',
    fillClass = '',
    logoByma = '',
    _id = ''
}) {
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
                </div>
            </div>
        </>
    ) : null;
}

export default ModDolar;
