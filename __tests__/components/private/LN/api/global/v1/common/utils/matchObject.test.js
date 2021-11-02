import matchObject from '../../../../../../../../../components/private/LN/api/common/utils/matchObject';
import article1 from '../../../../../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import article2 from '../../../../../../../../../__mocks__/data/articles/3SHTRO3NKBCN7L3JITCDQYSJLM.json';
import article3 from '../../../../../../../../../__mocks__/data/articles/EBMQCONMLVB6ZBFFGTBLIWMYFQ.json';
import article4 from '../../../../../../../../../__mocks__/data/articles/CTTZRKCCPBE6LNUCEK4TT46DFU.json';
import get from '../../../../../../../../../components/private/common/utils/get';

jest.mock(
    '../../../../../../../../components/layouts/config/LN-Notas.config.json',
    () => ({
        Externas: [
            {
                type: 'contains',
                params: [
                    {
                        credits: {
                            by: [
                                {
                                    _id: 'max-fisher-41892'
                                }
                            ]
                        }
                    },
                    {
                        taxonomy: {
                            sections: [
                                {
                                    name: 'Fútbol',
                                    parent_id: '/deportes',
                                    path: '/deportes/futbol'
                                }
                            ]
                        }
                    },
                    {
                        description: { basic: '' },
                        credits: {
                            by: []
                        }
                    },
                    {
                        label: {
                            edicion: {
                                display: true,
                                text: 'Impresa'
                            },
                            volanta: {
                                display: true,
                                text: 'De viaje.'
                            }
                        }
                    },
                    {
                        label: {
                            recomendar: {
                                text: 'Si'
                            }
                        }
                    }
                ]
            },
            {
                type: 'regex',
                params: [
                    {
                        website_url: '/economia/'
                    }
                ]
            }
        ]
    }),
    { virtual: true }
);

import Config from '../../../../../../../../../components/layouts/config/LN-Notas.config.json';

describe('components - private - LN - api - v1 - common - utils - matchObject.js', () => {
    it('Testeo articulo sin Match', () => {
        const enviarApp = matchObject(article1, 'contains');
        expect(enviarApp).toBe(true);
    });

    it('Testeo articulo con 1 Match objeto label de la posicion 4 del Mock Config', () => {
        const enviarApp = matchObject(article2, 'contains');
        expect(enviarApp).toBe(false);
    });

    it('Testeo articulo con 1 Match Caso con Array al objeto taxonomy de la posicion 2 del Mock Config', () => {
        const enviarApp = matchObject(article3, 'contains');
        expect(enviarApp).toBe(false);
    });

    it('Testeo articulo con 1 Match con parte del objeto de la posicion 5 del Mock Config', () => {
        const enviarApp = matchObject(article4, 'contains');
        expect(enviarApp).toBe(false);
    });
});
