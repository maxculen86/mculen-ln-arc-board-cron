import removeInvalidUrlTagA from '../../../../../components/private/common/utils/removeInvalidUrlTagA';
import { powerUpFirst } from '../../../../../content/sources/articleSourceNota';

describe('Common - utils - removeInvalidUrlTagA.js', () => {
    describe('Content Element with url valid in <a> tag', () => {
        const contentElementValid = [
            {
                type: 'text',
                content: `texto texto <b>prueba</b>, texto texto.`
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="www.test.com">prueba</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="http://www.test.com">prueba</a> texto <a href="http://www.other.com"> texto.'
            },
            {
                type: 'text',
                content: 'texto texto <a href="test.com">algo</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="http://test.com/asdasd/dasd">algo</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="http://test.com/?q=dasdsad">algo</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="www.4354test.com">algo</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="/test/hola/bye/">algo</a> texto texto.'
            }
        ];

        test('Should return content_element without modifications', () => {
            const wrapper = removeInvalidUrlTagA(contentElementValid);
            expect(wrapper).toStrictEqual(contentElementValid);
        });
    });

    describe('Should return with <!-- URL INVALIDA REMOVIDA --> ', () => {
        test('When url has space', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="http://en www.sushiclub.com.ar/nuestros_espacios">texto dentro del tag a</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto texto dentro del tag a, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url begin with number', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="435345www.test.com">texto dentro del tag a</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto texto dentro del tag a, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url with http and begin with number', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="http://435345www.dsad.com">texto dentro del tag a</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto texto dentro del tag a, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url is just a word', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="hello">texto dentro del tag a</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto texto dentro del tag a, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url has space', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="https://cas as.com">texto dentro del tag a</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto texto dentro del tag a, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url begin with hyphen', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="-casas.com">texto dentro del tag a</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto texto dentro del tag a, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When is 2 url and one is invalid', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="casas.com">algo</a>, texto texto <a href="casas s.com">texto dentro del tag a</a>.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="casas.com">algo</a>, texto texto texto dentro del tag a.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });
    });
});

describe('Content - sources - powerUpFirst (recipes w/ ingredients and preparation)', () => {
    describe('Original Content Element', () => {
        const originalContentElement = [
            {
                _id: 'YS4YBYLHRRCPRMGGTJT67ONS7E',
                content:
                    'Entrada o plato. Los cakes de couscous pueden ir como entrada con un rico hummus o algún topping, o también como plato principal.',
                type: 'text'
            },
            {
                _id: '256RFM63BBANFNJ4QZJEYZV3UE',
                embed: {
                    config: {
                        items: [
                            'Azafrán, 1 cdita.',
                            'Cous cous, 275 gr.',
                            'Yogur natural, 140 gr.',
                            'Huevos, 2.',
                            'Ciboulette o cebolla de verdeo, 20 gr.',
                            'Queso provolone o muzzarella, 100 gr.',
                            'Manteca, 60 gr.',
                            'Sal y pimienta, a gusto.'
                        ],
                        titleList: 'Ingredientes',
                        typeList: 'ingredientes'
                    }
                },
                subtype: 'custom-ingrediente',
                type: 'custom_embed'
            },
            {
                _id: '6VKDX76U55BRRIBZ2M5MVCQVAY',
                embed: {
                    config: {
                        items: [
                            'Colocar el azafrán en un bowl con 500ml. de agua hirviendo. Dejar infusionar por 2 minutos y luego agregar el cous cous. Revolver con un tenedor, cubrir con papel film y dejar descansar por 15 minutos.',
                            'Separar el cous cous con un tenedor y luego agrega el yogur, los huevos, las cebollas, el queso, 1 cucharadita de sal y un poco de pimienta negra. Mezclar bien y luego con las manos dar al cous cous forma de cakes redondos y firmes de aproximadamente 1,5 cm de grosor y de 55 g de peso cada una. Presionar y compactar bien para que no se desintegre durante la cocción.',
                            'Poner 2 cucharadas de manteca en una sartén a fuego medio-alto. Bajar el fuego a medio y freie los cakes en tandas, agregando más manteca si es necesario. Cocinar cada una durante 5 minutos, dándolas vueltas, hasta que esté crujiente y dorado.'
                        ],
                        titleList: 'Preparación',
                        typeList: 'preparacion'
                    }
                },
                subtype: 'custom-preparacion',
                type: 'custom_embed'
            },
            {
                _id: 'HWBUA2ZRMJGJBHYB7BYKJGLAYQ',
                content: 'Tips para para adaptar el cake de couscous',
                level: 1,
                type: 'header'
            },
            {
                _id: 'RB34P53HMBD2ZDSVQ3RL4CGQSA',
                items: [
                    {
                        _id: 'AQOUTGCALVDG5N7JUQBSLMQAUA',
                        content:
                            'El cake de cuscous se puede hacer en forma de croquetitas, y pueden servirse en una ensalada o en un plato de pasta',
                        type: 'text'
                    },
                    {
                        _id: 'FNI5ETM4XNGQFOQOUUHL7D5AQI',
                        content:
                            'Una opción del cake de cous cous es usarlo como pan para quienes no comen gluten. Puede ser para una hamburguesa o para armarse algún sandwich saludable.',
                        type: 'text'
                    }
                ],
                list_type: 'unordered',
                type: 'list'
            }
        ];

        test('Should return content_element with correct format and array for recipes PowerUps be first on top.', () => {
            const expectedResult = [
                {
                    powerUp: [
                        {
                            _id: '256RFM63BBANFNJ4QZJEYZV3UE',
                            embed: {
                                config: {
                                    items: [
                                        'Azafrán, 1 cdita.',
                                        'Cous cous, 275 gr.',
                                        'Yogur natural, 140 gr.',
                                        'Huevos, 2.',
                                        'Ciboulette o cebolla de verdeo, 20 gr.',
                                        'Queso provolone o muzzarella, 100 gr.',
                                        'Manteca, 60 gr.',
                                        'Sal y pimienta, a gusto.'
                                    ],
                                    titleList: 'Ingredientes',
                                    typeList: 'ingredientes'
                                }
                            },
                            subtype: 'custom-ingrediente',
                            type: 'custom_embed'
                        },
                        {
                            _id: '6VKDX76U55BRRIBZ2M5MVCQVAY',
                            embed: {
                                config: {
                                    items: [
                                        'Colocar el azafrán en un bowl con 500ml. de agua hirviendo. Dejar infusionar por 2 minutos y luego agregar el cous cous. Revolver con un tenedor, cubrir con papel film y dejar descansar por 15 minutos.',
                                        'Separar el cous cous con un tenedor y luego agrega el yogur, los huevos, las cebollas, el queso, 1 cucharadita de sal y un poco de pimienta negra. Mezclar bien y luego con las manos dar al cous cous forma de cakes redondos y firmes de aproximadamente 1,5 cm de grosor y de 55 g de peso cada una. Presionar y compactar bien para que no se desintegre durante la cocción.',
                                        'Poner 2 cucharadas de manteca en una sartén a fuego medio-alto. Bajar el fuego a medio y freie los cakes en tandas, agregando más manteca si es necesario. Cocinar cada una durante 5 minutos, dándolas vueltas, hasta que esté crujiente y dorado.'
                                    ],
                                    titleList: 'Preparación',
                                    typeList: 'preparacion'
                                }
                            },
                            subtype: 'custom-preparacion',
                            type: 'custom_embed'
                        }
                    ],
                    subtype: 'power-up-receta',
                    type: 'custom_embed'
                },
                {
                    _id: 'YS4YBYLHRRCPRMGGTJT67ONS7E',
                    content:
                        'Entrada o plato. Los cakes de couscous pueden ir como entrada con un rico hummus o algún topping, o también como plato principal.',
                    type: 'text'
                },
                {
                    _id: 'HWBUA2ZRMJGJBHYB7BYKJGLAYQ',
                    content: 'Tips para para adaptar el cake de couscous',
                    level: 1,
                    type: 'header'
                },
                {
                    _id: 'RB34P53HMBD2ZDSVQ3RL4CGQSA',
                    items: [
                        {
                            _id: 'AQOUTGCALVDG5N7JUQBSLMQAUA',
                            content:
                                'El cake de cuscous se puede hacer en forma de croquetitas, y pueden servirse en una ensalada o en un plato de pasta',
                            type: 'text'
                        },
                        {
                            _id: 'FNI5ETM4XNGQFOQOUUHL7D5AQI',
                            content:
                                'Una opción del cake de cous cous es usarlo como pan para quienes no comen gluten. Puede ser para una hamburguesa o para armarse algún sandwich saludable.',
                            type: 'text'
                        }
                    ],
                    list_type: 'unordered',
                    type: 'list'
                }
            ];
            const wrapper = powerUpFirst(originalContentElement);
            expect(wrapper).toStrictEqual(expectedResult);
        });
    });
    describe('Should return correct content_element format', () => {
        test('When content_element is empty array, returns empty array', () => {
            const contentElementEmpty = [];

            const expectedResult = [];

            const wrapper = powerUpFirst(contentElementEmpty);
            expect(wrapper).toStrictEqual(expectedResult);
        });
        test('When content_element does not have power ups, returns content_element unmodified', () => {
            const contentElementNoPowerUps = [
                {
                    _id: 'YS4YBYLHRRCPRMGGTJT67ONS7E',
                    content:
                        'Entrada o plato. Los cakes de couscous pueden ir como entrada con un rico hummus o algún topping, o también como plato principal.',
                    type: 'text'
                },
                {
                    _id: 'HWBUA2ZRMJGJBHYB7BYKJGLAYQ',
                    content: 'Tips para para adaptar el cake de couscous',
                    level: 1,
                    type: 'header'
                },
                {
                    _id: 'RB34P53HMBD2ZDSVQ3RL4CGQSA',
                    items: [
                        {
                            _id: 'AQOUTGCALVDG5N7JUQBSLMQAUA',
                            content:
                                'El cake de cuscous se puede hacer en forma de croquetitas, y pueden servirse en una ensalada o en un plato de pasta',
                            type: 'text'
                        },
                        {
                            _id: 'FNI5ETM4XNGQFOQOUUHL7D5AQI',
                            content:
                                'Una opción del cake de cous cous es usarlo como pan para quienes no comen gluten.',
                            type: 'text'
                        }
                    ],
                    list_type: 'unordered',
                    type: 'list'
                }
            ];

            const expectedResult = contentElementNoPowerUps;

            const wrapper = powerUpFirst(contentElementNoPowerUps);
            expect(wrapper).toStrictEqual(expectedResult);
        });
    });
});
