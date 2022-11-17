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
    oddOrEven
}) => {
    const mockData = [
        {
            fuente: 'InvertirOnline',
            compra: '159,50',
            venta: '167,50',
            variacion: ' 0,0',
            fecha: '2022-11-15T09:56:00',
            sourceName: 'dbna',
            source:
                'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacion/DBNA',
            title: 'Dólar hoy 1',
            titleMobile: 'Dólar hoy 1'
        },
        {
            fuente: 'InvertirOnline',
            compra: '290,00',
            venta: '294,00',
            variacion: '0,34',
            fecha: '2022-11-14T16:07:00',
            sourceName: 'dblue',
            source:
                'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacionblue/DBLUE',
            title: 'Dólar blue',
            titleMobile: 'Dólar blue'
        },
        {
            fuente: 'InvertirOnline',
            compra: '159,50',
            venta: '167,50',
            variacion: ' 0,0',
            fecha: '2022-11-15T09:56:00',
            sourceName: 'dbna',
            source:
                'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacion/DBNA',
            title: 'Dólar hoy 2',
            titleMobile: 'Dólar hoy 2'
        },
        {
            fuente: 'InvertirOnline',
            compra: '310,45',
            venta: '310,45',
            variacion: '0,10',
            fecha: '2022-11-14T17:55:00',
            sourceName: 'dccl',
            source:
                'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacionblue/DCCL',
            title: 'Dólar CCL',
            titleMobile: 'Dólar CCL'
        },
        {
            fuente: 'InvertirOnline',
            compra: '159,50',
            venta: '167,50',
            variacion: ' 0,0',
            fecha: '2022-11-15T09:56:00',
            sourceName: 'dbna',
            source:
                'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacion/DBNA',
            title: 'Dólar hoy 3',
            titleMobile: 'Dólar hoy 3'
        },
        {
            fuente: 'InvertirOnline',
            compra: '290,00',
            venta: '294,00',
            variacion: '0,34',
            fecha: '2022-11-14T16:07:00',
            sourceName: 'dblue',
            source:
                'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacionblue/DBLUE',
            title: 'Dólar blue 4',
            titleMobile: 'Dólar blue 4'
        },
        {
            fuente: 'InvertirOnline',
            compra: '290,00',
            venta: '294,00',
            variacion: '0,34',
            fecha: '2022-11-14T16:07:00',
            sourceName: 'dblue',
            source:
                'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacionblue/DBLUE',
            title: 'Dólar blue 5',
            titleMobile: 'Dólar blue 5'
        }
        // {
        //     fuente: 'InvertirOnline',
        //     compra: '290,00',
        //     venta: '294,00',
        //     variacion: '0,34',
        //     fecha: '2022-11-14T16:07:00',
        //     sourceName: 'dblue',
        //     source:
        //         'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacionblue/DBLUE',
        //     title: 'Dólar blue 6',
        //     titleMobile: 'Dólar blue 6'
        // },
        // {
        //     fuente: 'InvertirOnline',
        //     compra: '290,00',
        //     venta: '294,00',
        //     variacion: '0,34',
        //     fecha: '2022-11-14T16:07:00',
        //     sourceName: 'dblue',
        //     source:
        //         'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacionblue/DBLUE',
        //     title: 'Dólar blue 7',
        //     titleMobile: 'Dólar blue 7'
        // }
        // {
        //     fuente: 'InvertirOnline',
        //     compra: '290,00',
        //     venta: '294,00',
        //     variacion: '0,34',
        //     fecha: '2022-11-14T16:07:00',
        //     sourceName: 'dblue',
        //     source:
        //         'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacionblue/DBLUE',
        //     title: 'Dólar blue 4',
        //     titleMobile: 'Dólar blue 4'
        // },
        // {
        //     fuente: 'InvertirOnline',
        //     compra: '290,00',
        //     venta: '294,00',
        //     variacion: '0,34',
        //     fecha: '2022-11-14T16:07:00',
        //     sourceName: 'dblue',
        //     source:
        //         'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacionblue/DBLUE',
        //     title: 'Dólar blue 5',
        //     titleMobile: 'Dólar blue 5'
        // },
        // {
        //     fuente: 'InvertirOnline',
        //     compra: '290,00',
        //     venta: '294,00',
        //     variacion: '0,34',
        //     fecha: '2022-11-14T16:07:00',
        //     sourceName: 'dblue',
        //     source:
        //         'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacionblue/DBLUE',
        //     title: 'Dólar blue 6',
        //     titleMobile: 'Dólar blue 6'
        // },
        // {
        //     fuente: 'InvertirOnline',
        //     compra: '290,00',
        //     venta: '294,00',
        //     variacion: '0,34',
        //     fecha: '2022-11-14T16:07:00',
        //     sourceName: 'dblue',
        //     source:
        //         'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacionblue/DBLUE',
        //     title: 'Dólar blue 7',
        //     titleMobile: 'Dólar blue 7'
        // }
    ];

    oddOrEven = mockData.length % 2 ? '--odd' : '--even';

    let fillClass;
    const extraClass = ['', '--minusThree', '--minusTwo', '--minusOne'];

    if (mockData.length < 4) {
        fillClass = '--fewElem';
    } else {
        fillClass = extraClass[mockData.length % 4];
    }

    return (
        (mockData.length && (
            <>
                <div className="dolar">
                    <ul className={`dolar-subgroup ${oddOrEven} ${fillClass}`}>
                        {mockData.map(item => {
                            const { sourceName, title, compra, venta } = item;
                            return (
                                <li key={item.sourceName}>
                                    <CurrencyData
                                        sourceName={sourceName}
                                        title={title}
                                        purchaseValue={compra}
                                        saleValue={
                                            sourceName !== 'dccl' && venta
                                        }
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <ComLink
                    link="https://www.invertironline.com/"
                    classCondition="provider-data"
                    type="text/css"
                >
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
