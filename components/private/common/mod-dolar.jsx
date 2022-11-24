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
    deployment
}) => {
    const mockData = [
        {
            link: 'https://www.lanacion.com.ar/dolar-hoy/',
            compra: '163,25',
            venta: '171,25',
            sourceName: 'dbna',
            titleMobile: 'Dólar hoy'
        },
        {
            link: 'https://www.lanacion.com.ar/tema/dolar-blue-tid67294/',
            compra: '308,00',
            venta: '312,00',
            sourceName: 'dblue',
            titleMobile: 'Dólar blue'
        },
        {
            venta: '311,81',
            sourceName: 'dmep',
            titleMobile: 'Dólar MEP'
        },
        {
            link: 'https://www.lanacion.com.ar/tema/dolar-ccl/',
            venta: '325,72',
            sourceName: 'dccl',
            titleMobile: 'Dólar CCL'
        },
        {
            link: 'https://www.lanacion.com.ar/tema/dolar-tarjeta-tid50462/',
            venta: '299,69',
            sourceName: 'dtarjeta',
            titleMobile: 'Dólar Tarjeta'
        },
        {
            link: 'https://www.lanacion.com.ar/tema/dolar-turista-tid67475/',
            venta: '342,5',
            sourceName: 'dturista',
            titleMobile: 'Dólar Turista'
        },
        {
            venta: '164,52',
            sourceName: 'dmayorista',
            titleMobile: 'Dólar Mayorista'
        },
        {
            link: 'https://www.lanacion.com.ar/tema/euro-hoy-tid66142/',
            compra: '167,86',
            venta: '176,69',
            sourceName: 'euro',
            titleMobile: 'Euro'
        }
    ];
    // [
    //     {
    //         compra: '163,25',
    //         link: 'https://www.lanacion.com.ar/dolar-hoy/',
    //         sourceName: 'dbna',
    //         title: 'Dólar hoy',
    //         venta: '171,25'
    //     },
    //     {
    //         compra: '308,00',
    //         link: 'https://www.lanacion.com.ar/tema/dolar-blue-tid67294/',
    //         sourceName: 'dblue',
    //         title: 'Dólar blue',
    //         venta: '312,00'
    //     },
    //     { sourceName: 'dmep', title: 'Dólar MEP', venta: '311,81' },
    //     {
    //         link: 'https://www.lanacion.com.ar/tema/dolar-ccl/',
    //         sourceName: 'dccl',
    //         title: 'Dólar CCL',
    //         venta: '325,72'
    //     },
    //     {
    //         link: 'https://www.lanacion.com.ar/tema/dolar-tarjeta-tid50462/',
    //         sourceName: 'dtarjeta',
    //         title: 'Dólar Tarjeta',
    //         venta: '299,69'
    //     },
    //     {
    //         link: 'https://www.lanacion.com.ar/tema/dolar-turista-tid67475/',
    //         sourceName: 'dturista',
    //         title: 'Dólar Turista',
    //         venta: '342,5'
    //     },
    //     {
    //         sourceName: 'dmayorista',
    //         title: 'Dólar Mayorista',
    //         venta: '164,52'
    //     },
    //     {
    //         compra: '167,86',
    //         link: 'https://www.lanacion.com.ar/tema/euro-hoy-tid66142/',
    //         sourceName: 'euro',
    //         title: 'Euro',
    //         venta: '176,69'
    //     }
    // ];

    const oddOrEven = mockData && (mockData.length % 2 ? '--odd' : '--even');

    let fillClass = '';
    const extraClass = ['', '--minusThree', '--minusTwo', '--minusOne'];

    mockData &&
        (mockData.length < 4
            ? (fillClass = '--fewElem')
            : (fillClass = mockData && extraClass[mockData.length % 4]));

    return (
        (mockData.length && (
            <>
                <div className="dolar">
                    <ul className={`dolar-subgroup ${oddOrEven} ${fillClass}`}>
                        {mockData.map(item => {
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
        )) ||
        null
    );
};

ModDolar.propTypes = {
    data: PropTypes.shape({
        sourceName: PropTypes.string,
        title: PropTypes.string,
        compra: PropTypes.string,
        venta: PropTypes.string
    }).isRequired
};

ModDolar.defaultProps = {
    outputType: 'default',
    informationAlt: 'BYMA',
    providedAlt: 'InvertirOnline'
};

export default ModDolar;
