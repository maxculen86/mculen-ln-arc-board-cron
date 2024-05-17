import {
    setDollarData,
    setAccessData
} from '../../../../../../components/features/LN-10-global/header/subHeader/_helper';
import { createDynamicLabel } from '../../../../../../components/private/common/utils/eventsHelper';

jest.mock('../../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

describe('component - features - LN-10-global - SubHeader - helper =>', () => {
    const mock = {
        dollar: [
            {
                compra: '177,75',
                link: 'https://www.lanacion.com.ar/dolar-hoy/',
                sourceName: 'dbna',
                titleMobile: 'Dólar oficial',
                venta: '185,75'
            },
            {
                compra: '350,00',
                link: 'https://www.lanacion.com.ar/tema/dolar-blue-tid67294/',
                sourceName: 'dblue',
                titleMobile: 'Dólar blue',
                venta: '354,00'
            },
            {
                compra: '-',
                link:
                    'https://www.lanacion.com.ar/tema/dolar-tarjeta-tid50462/',
                sourceName: 'dtarjeta',
                titleMobile: 'Dólar tarjeta',
                venta: '325,06'
            },
            {
                compra: '-',
                link:
                    'https://www.lanacion.com.ar/tema/dolar-turista-tid67475/',
                sourceName: 'dturista',
                titleMobile: 'Dólar turista',
                venta: '371,5'
            },
            {
                compra: '-',
                link: 'https://www.lanacion.com.ar/tema/dolar-mep/',
                sourceName: 'dmep',
                titleMobile: 'Dólar MEP',
                venta: '334,93'
            },
            {
                compra: '-',
                link: 'https://www.lanacion.com.ar/tema/dolar-ccl/',
                sourceName: 'dccl',
                titleMobile: 'Dólar CCL',
                venta: '339,48'
            },
            {
                compra: '-',
                sourceName: 'dmayorista',
                titleMobile: 'Dólar mayorista',
                venta: '178,43'
            },
            {
                compra: '186,72',
                link: 'https://www.lanacion.com.ar/tema/euro-hoy-tid66142/',
                sourceName: 'euro',
                titleMobile: 'Euro',
                venta: '196,11'
            }
        ]
    };

    describe('Helper - setDollarData', () => {
        it('should returns a collection with specific data', () => {
            const { dollar } = mock;
            const dollarData = setDollarData(dollar);

            expect(Object.keys(dollarData[0])).toEqual([
                'text',
                'title',
                'venta',
                'link'
            ]);

            expect(dollarData).toHaveLength(5);

            dollarData.forEach(currentDollar => {
                const mockDollar = dollar.find(
                    mockItem => mockItem.titleMobile === currentDollar.title
                );

                expect(
                    [
                        'Dólar oficial',
                        'Dólar blue',
                        'Dólar turista',
                        'Dólar CCL',
                        'Dólar MEP'
                    ].includes(currentDollar.title)
                ).toBeTruthy();

                expect(currentDollar.text).toEqual(mockDollar.titleMobile);
                expect(currentDollar.title).toEqual(mockDollar.titleMobile);
                expect(currentDollar.venta).toEqual(mockDollar.venta);
                expect(currentDollar.link).toEqual(mockDollar.link);
            });
        });

        it('should return sorted dollar data in the correct order', () => {
            const { dollar } = mock;
            const dollarData = setDollarData(dollar);

            const expectedOrder = [
                'Dólar oficial',
                'Dólar blue',
                'Dólar turista',
                'Dólar CCL',
                'Dólar MEP'
            ];

            dollarData.forEach((dollar, index) => {
                expect(dollar.title).toEqual(expectedOrder[index]);
            });
        });

        it('should returns null when dollarValue is undefined', () => {
            const dollarData = setDollarData();
            expect(dollarData).toBeNull();
        });
    });

    describe('Helper - createDynamicLabel', () => {
        const cases = [
            ['Dólar oficial', 'dolar_oficial'],
            ['Dólar blue', 'dolar_blue'],
            ['Dólar turista', 'dolar_turista'],
            ['Dólar CCL', 'dolar_ccl'],
            ['Dólar MEP', 'dolar_mep'],
            ['', ''],
            [undefined, '']
        ];

        it.each(cases)(
            'given %p as a argument, returns %p',
            (argument, expectedResult) => {
                const result = createDynamicLabel(argument);
                expect(result).toEqual(expectedResult);
            }
        );
    });

    describe('Helper - setAccessData', () => {
        it('should returns default access', () => {
            const accessData = setAccessData();
            const [firstAccess] = accessData;

            expect(Object.keys(firstAccess)).toEqual(['text', 'href']);

            expect(accessData).toHaveLength(3);
        });
    });
});
