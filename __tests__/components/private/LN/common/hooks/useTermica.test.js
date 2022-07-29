import { useContent } from 'fusion:content';
import { useContext } from 'react';
import useTermica from '../../../../../../components/private/LN/common/hooks/useTermica';
import findTermica from '../../../../../../components/private/common/utils/findTermica';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock('../../../../../../components/private/common/utils/findTermica', () =>
    jest.fn(() => true)
);

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
        dolar: {
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

    useContent.mockImplementation(() => generalMock);

    it('works in weather case', () => {
        const result = useTermica({ name: 'weather' });
        expect(result).toEqual(generalMock.weather);
    });

    it('works in dollar case', () => {
        const result = useTermica({ name: 'dolar' });
        expect(result).toEqual(generalMock.dolar);
    });

    it('returns undefined if not pass name', () => {
        const result = useTermica();
        expect(result).toEqual(undefined);
    });

    it('returns undefined if the switch is setted in false', () => {
        findTermica.mockImplementation(() => false);

        const result = useTermica({ name: 'weather' });
        expect(result).toEqual(undefined);
    });
});
