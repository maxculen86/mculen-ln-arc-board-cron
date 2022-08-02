import { useContent } from 'fusion:content';
import React, { useContext } from 'react';
import useTermica from '../../../../../../components/private/common/hooks/useTermica';

jest.mock('react', () => {
    const ActualReact = require.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({})
    };
});

describe('components - private - LN - common - hook - useTermica', () => {
    const generalMock = {
        weather: {
            codigo: 'ARCF0009',
            nombre: 'Capital Federal',
            temperatura: '17.6',
            humedad: ' 35',
            sensacion_termica: 'No se calcula',
            max: '17',
            min: '6',
            icono_id: '0 ',
            icono_descripcion: 'Despejado',
            dias: [
                {
                    nombre: 'SABADO',
                    max: '18',
                    min: '7',
                    icono_id: '3',
                    icono_descripcion: 'Lluvias'
                },
                {
                    nombre: 'DOMINGO',
                    max: '18',
                    min: '10',
                    icono_id: '3',
                    icono_descripcion: 'Lluvias'
                },
                {
                    nombre: 'LUNES',
                    max: '18',
                    min: '10',
                    icono_id: '3',
                    icono_descripcion: 'Lluvias'
                }
            ],
            sigla: '',
            icon_name: 'sun'
        },
        dollar: {
            data: [
                {
                    fuente: 'InvertirOnline',
                    compra: '129,25',
                    venta: '137,25',
                    variacion: ' 0,0',
                    fecha: '2022-07-29T14:46:00',
                    sourceName: 'dbna',
                    source:
                        'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacion/DBNA',
                    title: 'Dólar hoy',
                    titleMobile: 'Dólar hoy'
                },
                {
                    fuente: 'InvertirOnline',
                    compra: '288,00',
                    venta: '298,00',
                    aumento: false,
                    variacion: '-5,10',
                    fecha: '2022-07-29T14:22:00',
                    sourceName: 'dblue',
                    source:
                        'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacionblue/DBLUE',
                    title: 'Dólar blue',
                    titleMobile: 'Dólar blue'
                },
                {
                    fuente: 'InvertirOnline',
                    compra: '292,92',
                    venta: '292,92',
                    aumento: false,
                    variacion: '-9,00',
                    fecha: '2022-07-29T14:40:00',
                    sourceName: 'dccl',
                    source:
                        'https://api-contenidos.lanacion.com.ar/json/V3/economia/cotizacionblue/DCCL',
                    title: 'Dólar CCL',
                    titleMobile: 'Dólar CCL'
                }
            ]
        }
    };

    const createImplementation = (key, value) =>
        jest.spyOn(React, 'useContext').mockImplementation(() => ({
            state: {
                siteService: {
                    termicas: [{ key, value }]
                }
            }
        }));

    it('works in regular case', () => {
        createImplementation('weather', true);

        const result = useTermica('weather');
        expect(result).toEqual(true);
    });

    it('works in bookmark_web case', () => {
        createImplementation('bookmark_web', true);

        const result = useTermica('bookmark_web');
        expect(result).toEqual(true);
    });

    it('works in weather case with value', () => {
        createImplementation('weather', true);

        const result = useTermica('weather', generalMock.weather);
        expect(result).toEqual(generalMock.weather);
    });

    it('works in dollar case with value', () => {
        createImplementation('dolar', true);

        const result = useTermica('dolar', generalMock.dollar);
        expect(result).toEqual(generalMock.dollar);
    });

    it('returns undefined if not pass key', () => {
        createImplementation();

        const result = useTermica();
        expect(result).toEqual(undefined);
    });

    it('returns true if not found a value on termicas', () => {
        createImplementation();

        const result = useTermica('keyNotValid');
        expect(result).toEqual(true);
    });

    it('returns undefined if the switch is setted in false', () => {
        createImplementation('weather', undefined);

        const result = useTermica('weather', generalMock.weather);
        expect(result).toEqual(undefined);
    });
});
