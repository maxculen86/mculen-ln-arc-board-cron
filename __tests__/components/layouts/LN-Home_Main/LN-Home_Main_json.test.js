7;

import * as fusionConsumer from 'fusion:consumer';
import * as LayoutLNMainHome from '../../../../components/layouts/LN-Home_Main/json';
import home from '.../../../../../../components/private/LN/api/v1/home';
import pageBuilderSections from '../../../../components/layouts/config/LN-PageBuilder.config.json';
import propsAppAnexos from '../../../../__mocks__/data/renderables/dataAppAnexos';
import propsAppAnexo1 from '../../../../__mocks__/data/renderables/dataAppAnexo1';
import propsAppAnexo2 from '../../../../__mocks__/data/renderables/dataAppAnexo2';
import propsAppAnexowithoutApertura from '../../../../__mocks__/data/renderables/dataAppAnexoswithoutApertura';
import propsApertura from '../../../../__mocks__/data/renderables/dataApertura.json';

jest.mock('.../../../../../../components/private/LN/api/global/v1/home', () => {
    return function(component) {
        return component;
    };
});

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

describe('components - layouts - LN-Home_Main - json', () => {
    const props = {};
    props.id = 'LN-Home_Main';
    props.isAdmin = false;
    props.layout = 'LN-Home_Main';
    let children = [
        [], //0 Anticipo',
        [], //1 Anexo',
        [], //2 Bomba',
        [], //3 Apertura',
        [], //4 Apertura',
        [], //5 Multimedia',
        [], //6 Anexo
        [], //7 Tema1',
        [], //8 Tema2',
        [], //9 Tema3',
        [], //10 Anexo',
        [], //11 Opinion',
        [], //12 Tema4',
        [], //13 Tema5',
        [], //14 Tema6',
        [], //15 Comercial',
        [], //16 Tema7',
        [], //17 Comercial',
        [], //18 Tema8',
        [], //19 Tema9',
        [], //20 Tema10',
        [], //21 Tema11',
        [], //22 Tema12',
        [], //23 Tema13',
        [], //24 App_Anexo_1',
        [] //25 App_Anexo_2'
    ];

    props.renderables = [];
    props.arcSite = 'la-nacion-ar';

    describe('Test Section Anticipo', () => {
        test('OK', () => {
            const childrenTmp = children;
            childrenTmp[0] = [
                {
                    information: {
                        hideCaja: false,
                        title: 'abc',
                        url:
                            'https://www.cotodigital3.com.ar/sitios/cdigi/?utm_source=lanacion&utm_medium=display&utm_campaign=ofertas'
                    }
                }
            ];
            props.children = childrenTmp;
            props.renderables = [
                {
                    collection: 'sections',
                    props: {
                        collection: 'sections',
                        id: 0
                    },
                    children: [
                        {
                            collection: 'features',
                            type: 'LN-common/cajaAnticipo',
                            props: {}
                        }
                    ]
                },
                {}
            ];
            const homeSections = LayoutLNMainHome.default(props);
            expect(Object.keys(homeSections[0]).sort()).toEqual(
                [
                    'configurations',
                    'feature',
                    'information',
                    'type',
                    'nameFeature'
                ].sort()
            );
            expect(homeSections[0].feature).toBe('Anticipo');
        });
    });

    describe('Test Section Bomba', () => {
        test('OK', () => {
            const childrenTmp = children;
            childrenTmp[2] = [
                {
                    information: {
                        hideCaja: undefined,
                        layout: 'grilla1'
                    },
                    articles: []
                }
            ];
            props.children = childrenTmp;
            props.renderables = [
                {
                    collection: 'sections',
                    props: {
                        collection: 'sections',
                        id: 2
                    },
                    children: [
                        {
                            collection: 'features',
                            type: 'LN-common/bomba',
                            props: {}
                        }
                    ]
                },
                {}
            ];
            const homeSections = LayoutLNMainHome.default(props);
            expect(Object.keys(homeSections[0]).sort()).toEqual(
                [
                    'articles',
                    'configurations',
                    'feature',
                    'information',
                    'type',
                    'nameFeature'
                ].sort()
            );
            expect(homeSections[0].feature).toBe('Bomba');
        });
    });

    describe('Test Section Apertura', () => {
        test('Ok', () => {
            const homeSections = LayoutLNMainHome.default(propsApertura);
            expect(Object.keys(homeSections[0]).sort()).toEqual(
                [
                    'articles',
                    'configurations',
                    'feature',
                    'information',
                    'type',
                    'nameFeature'
                ].sort()
            );
            expect(homeSections[0].feature).toBe('Apertura');
        });
    });

    describe('Test Section Apertura_2', () => {
        test('Ok', () => {
            const childrenTmp = children;
            childrenTmp[4] = [
                {
                    information: {
                        layout: 'focalLeft3',
                        backgroundColor: 'default',
                        initialPosition: 1,
                        hideTitle: false,
                        idCollection: 'QJ3BOEZVQNEYZEVBXHF4C7KAWY',
                        title: 'Apertura',
                        pbInternal_cloneId: 'c0ffOCwkYqcA22',
                        image: undefined
                    },
                    articles: []
                }
            ];
            props.children = childrenTmp;
            props.renderables = [
                {
                    collection: 'sections',
                    props: {
                        collection: 'sections',
                        id: 4
                    },
                    children: [
                        {
                            collection: 'chains',
                            type: 'Ln_Caja_Collection',
                            props: {},
                            children: []
                        }
                    ]
                },
                {}
            ];
            const homeSections = LayoutLNMainHome.default(props);
            expect(homeSections[1].feature).toBe('Apertura');
        });
    });

    describe('Test Section Multimedia', () => {
        test('Ok', () => {
            const childrenTmp = children;
            childrenTmp[5] = [
                {
                    information: {
                        layout: 'grilla1',
                        initialPosition: 1,
                        hideTitle: false,
                        title: 'Multimedia',
                        containerImage: undefined
                    },
                    articles: []
                }
            ];
            props.children = childrenTmp;
            props.renderables = [
                {
                    collection: 'sections',
                    props: {
                        collection: 'sections',
                        id: 5
                    },
                    children: [
                        {
                            collection: 'chains',
                            type: 'Ln_Caja_Manual',
                            props: {},
                            children: []
                        }
                    ]
                },
                {}
            ];
            const homeSections = LayoutLNMainHome.default(props);
            console.log(homeSections);

            expect(homeSections[2].feature).toBe('Multimedia');
            expect(homeSections[2].information.layout).toBe('grilla1');
        });
    });

    describe('Test Section Opinion', () => {
        test('Ok', () => {
            const childrenTmp = children;
            childrenTmp[11] = [
                {
                    id: 406,
                    type: 1,
                    feature: 'Banner',
                    position: 'start'
                },
                {
                    information: {
                        layout: 'editoriales2',
                        initialPosition: 1,
                        hideTitle: false,
                        idCollection: 'IZK32Y5I6BF4PNU6E3R2IBMZZI',
                        title: 'Editorial1'
                    },
                    articles: []
                },
                {
                    information: {
                        layout: 'opinion4',
                        initialPosition: 1,
                        hideTitle: false,
                        idCollection: '2K3PXKFYZZEIVB22ZJJVX6RWG4',
                        title: 'Opinion1'
                    },
                    articles: []
                }
            ];
            props.children = childrenTmp;
            props.renderables = [
                {
                    collection: 'sections',
                    props: {
                        collection: 'sections',
                        id: 9
                    },
                    children: []
                },
                {
                    collection: 'sections',
                    props: {
                        collection: 'sections',
                        id: 11
                    },
                    children: [
                        {
                            collection: 'features',
                            type: 'LN-common/editoriales',
                            props: {}
                        },
                        {
                            collection: 'features',
                            type: 'LN-common/opinion',
                            props: {}
                        }
                    ]
                },
                {}
            ];

            const homeSections = LayoutLNMainHome.default(props);
            expect(Object.keys(homeSections[7]).sort()).toEqual(
                [
                    'articles',
                    'configurations',
                    'feature',
                    'information',
                    'type',
                    'nameFeature'
                ].sort()
            );
            expect(homeSections[7].feature).toBe('Opinion');
            expect(Object.keys(homeSections[7]).sort()).toEqual(
                [
                    'articles',
                    'configurations',
                    'feature',
                    'information',
                    'type',
                    'nameFeature'
                ].sort()
            );
            expect(homeSections[7].feature).toBe('Opinion');
        });

        test('When not exists editorial', () => {
            const childrenTmp = children;
            childrenTmp[10] = [
                {
                    id: 406,
                    type: 1,
                    feature: 'Banner',
                    position: 'start'
                },
                {
                    information: {
                        layout: 'opinion4',
                        initialPosition: 1,
                        hideTitle: false,
                        idCollection: '2K3PXKFYZZEIVB22ZJJVX6RWG4',
                        title: 'Opinion1'
                    },
                    articles: []
                }
            ];
            props.children = childrenTmp;
            props.renderables = [
                {
                    collection: 'sections',
                    props: {
                        collection: 'sections',
                        id: 9
                    },
                    children: []
                },
                {
                    collection: 'sections',
                    props: {
                        collection: 'sections',
                        id: 10
                    },
                    children: [
                        {
                            collection: 'features',
                            type: 'LN-common/opinion',
                            props: {}
                        }
                    ]
                },
                {}
            ];

            const homeSections = LayoutLNMainHome.default(props);
            expect(homeSections.length).toBe(6);
        });
    });

    describe('Test Section Comercial', () => {
        test('OK', () => {
            const childrenTmp = children;
            childrenTmp[15] = [
                {
                    information: {
                        layout: 'grilla3',
                        backgroundColor: 'default',
                        initialPosition: 1,
                        hideTitle: false,
                        idCollection: 'QJ3BOEZVQNEYZEVBXHF4C7KAWY',
                        title: 'Comercial 1',
                        image: undefined
                    },
                    articles: []
                }
            ];
            props.children = childrenTmp;
            props.renderables = [
                {
                    collection: 'sections',
                    props: {
                        collection: 'sections',
                        id: 15
                    },
                    children: [
                        {
                            collection: 'chains',
                            type: 'Ln_Caja_Collection',
                            props: {},
                            children: []
                        }
                    ]
                },
                {}
            ];
            const homeSections = LayoutLNMainHome.default(props);
            expect(Object.keys(homeSections[6]).sort()).toEqual(
                [
                    'articles',
                    'configurations',
                    'feature',
                    'information',
                    'type',
                    'nameFeature'
                ].sort()
            );
            expect(homeSections[6].feature).toBe('Comercial');
        });
    });

    describe('Test Section Tema', () => {
        test('Ok', () => {
            const childrenTmp = children;
            childrenTmp[7] = [
                {
                    information: {
                        layout: 'focalLeft3',
                        initialPosition: 1,
                        hideTitle: false,
                        title: 'Mi techo abc',
                        containerImage: undefined
                    },
                    articles: []
                }
            ];
            props.children = childrenTmp;
            props.renderables = [
                {
                    collection: 'sections',
                    props: {
                        collection: 'sections',
                        id: 7
                    },
                    children: [
                        {
                            collection: 'chains',
                            type: 'Ln_Caja_Manual',
                            props: {},
                            children: []
                        }
                    ]
                }
            ];
            const homeSections = LayoutLNMainHome.default(props);
            expect(Object.keys(homeSections[3]).sort()).toEqual(
                [
                    'articles',
                    'configurations',
                    'feature',
                    'information',
                    'type',
                    'nameFeature'
                ].sort()
            );
            expect(homeSections[3].feature).toBe('Tema1');
        });
        test('When props is null', () => {
            try {
                const homeSections = LayoutLNMainHome.default(null);
                expect(homeSections).toBe(null);
            } catch (err) {
                expect(err.message).toBe(
                    `Cannot read property 'children' of null`
                );
            }
        });
    });

    describe('Test Section App_Anexo_1 y App_Anexo_2', () => {
        test('Ok', () => {
            const homeSections = LayoutLNMainHome.default(propsAppAnexos);
            expect(homeSections[0]).toEqual(
                expect.objectContaining({ feature: 'AnexoMobile' })
            );
            expect(homeSections[1]).toEqual(
                expect.objectContaining({ feature: 'Apertura' })
            );
            expect(homeSections[2]).toEqual(
                expect.objectContaining({ feature: 'AnexoMobile' })
            );
        });

        test('Ok only App_Anexo_1', () => {
            const homeSections = LayoutLNMainHome.default(propsAppAnexo1);
            expect(homeSections[0]).toEqual(
                expect.objectContaining({ feature: 'AnexoMobile' })
            );
            expect(homeSections[1]).toEqual(
                expect.objectContaining({ feature: 'Apertura' })
            );
            expect(homeSections[2]).toEqual(
                expect.objectContaining({ feature: 'Banner' })
            );
        });

        test('Ok only App_Anexo_2', () => {
            const homeSections = LayoutLNMainHome.default(propsAppAnexo2);

            expect(homeSections[0]).toEqual(
                expect.objectContaining({ feature: 'Apertura' })
            );
            expect(homeSections[1]).toEqual(
                expect.objectContaining({ feature: 'AnexoMobile' })
            );
        });

        test('Error No exists Apertura1', () => {
            const homeSections = LayoutLNMainHome.default(
                propsAppAnexowithoutApertura
            );

            expect(homeSections[0]).toEqual(
                expect.objectContaining({ feature: 'Banner' })
            );
            expect(homeSections[1]).toEqual(
                expect.objectContaining({ feature: 'Apertura' })
            );
            expect(homeSections[2]).toEqual(
                expect.objectContaining({ feature: 'Dolar' })
            );
        });
    });
});
