import { articlesCollections } from './data/articlesCollections';
import { homeSections as homeDataSections } from './data/homeSections';
import index from '../../../../../../../../components/private/LN/api/v1/mobile/home/index';
import attachBanners from '../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/config/configHandler';

jest.mock(
    '../../../../../../../../components/private/common/utils/logger',
    () => {
        const push = jest.fn();
        return { push };
    }
);
jest.mock(
    '../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/config/configHandler'
);
attachBanners.mockImplementation((box, sectionAlias, allBanners) => {
    // Check if the sectionAlias is 'sub-exclusive'
    if (sectionAlias !== 'sub-exclusive') {
        // Return an empty object for 'box without a banner'
        return box;
    }

    // For other cases, return the default mock implementation
    return {
        ...box,
        banner: {
            id_adserver: {
                android:
                    '/133919216/lanacion_app_android/home/cajasuscriptores_app',
                ios: '/133919216/lanacion_app_ios/home/cajasuscriptores_app'
            },
            size: { height: 250, width: 300 },
            position: 'Bottom'
        }
    };
});

const paramsPage = { information: { layoutPage: 'LN-Home_Main' } };

describe('components - private - LN - api - v1 - home - index.js', () => {
    it('Total test boxes expected', () => {
        const homeSections = homeDataSections;
        const home = index(homeSections, paramsPage) || [];
        expect(home[0]).toHaveLength(37);
    });

    it('Test Caja Anticipo', () => {
        const homeSections = homeDataSections;
        const home = index(homeSections, paramsPage) || [];
        expect(home[0][0].tipoSeccion).toBe('anticipo');
    });

    it('Test Caja Anexo', () => {
        const homeSections = homeDataSections;
        const home = index(homeSections, paramsPage) || [];
        expect(home[0][1].tipoSeccion).toBe('anexoMobile');
    });

    it('Test Imagen Caja No Tipo Video', () => {
        const homeSections = homeDataSections;
        const home = index(homeSections, paramsPage) || [];
        expect(home[0][5].imagen).toBeUndefined();
    });

    it('Test Imagen Caja Null', () => {
        const homeSections = homeDataSections;
        const home = index(homeSections, paramsPage) || [];
        expect(home[0][10].imagen).toBeUndefined();
    });

    it('Test Imagen Techo', () => {
        const homeSections = homeDataSections;
        const home = index(homeSections, paramsPage) || [];
        expect(home[0][21].imagen.id).toBe('ZZEXVFIL2ZFHBIQVL7GN632OXU');
    });

    it('Testeo Secciones Cajas Apertura', () => {
        const homeSections = homeDataSections;
        const home = index(homeSections, paramsPage) || [];
        expect(home[0][2].tipoSeccion).toBe('apertura');
    });

    it('Testeo Secciones Seccion Apertura sin information', () => {
        const Seccion = [
            {
                type: 0,
                sectionAliasMobile: 'apertura',
                articles: articlesCollections,
                configurations: {
                    arcSite: 'la-nacion-ar'
                },
                sectionMobile: 'Apertura',
                sectionWeb: 'Apertura_1'
            }
        ];
        try {
            const home = index(Seccion, paramsPage) || [];
            expect(home.length).toBe(null);
        } catch (err) {
            expect(err.message).toBe(
                "Cannot read properties of undefined (reading 'layout')"
            );
        }
    });

    it('Total expected boxes test when two themes come without articles', () => {
        const homeSectionsboxes = homeDataSections;
        homeSectionsboxes[2].articles = [];
        homeSectionsboxes[8].articles = [];
        const home = index(homeSectionsboxes, paramsPage) || [];
        expect(home[0]).toHaveLength(35);
    });
    it('Testeo Seccion Array vacio', () => {
        const Seccion = [];
        const home = index(Seccion, paramsPage) || [];
        expect(home).toEqual(expect.arrayContaining([]));
        expect(home.length).toBe(1);
        expect(home).toHaveLength(1);
    });

    it('Testeo Seccion null', () => {
        const Seccion = null;
        try {
            const home = index(Seccion, paramsPage) || [];
            expect(home.length).toBe(null);
        } catch (err) {
            expect(err.message).toBe(
                "Cannot read properties of null (reading 'reduce')"
            );
        }
    });
    it('Testeo Seccion Apertura', () => {
        const Seccion = [
            {
                type: 0,
                sectionAliasMobile: 'apertura',
                information: {
                    layout: 'focalLeft3',
                    backgroundColor: 'default',
                    initialPosition: 1,
                    hideTitle: false,
                    idCollection: 'QJ3BOEZVQNEYZEVBXHF4C7KAWY',
                    title: 'Apertura',
                    pbInternal_cloneId: 'c0ffOCwkYqcA22',
                    image: undefined,
                    nameChain: 'Ln_Caja_Manual'
                },
                articles: articlesCollections,
                configurations: {
                    arcSite: 'la-nacion-ar'
                },
                sectionMobile: 'Apertura',
                sectionWeb: 'Apertura_1'
            }
        ];
        const home = index(Seccion, paramsPage) || [];
        expect(home[0][0]).toEqual(
            expect.objectContaining({
                diagramacion: 'focalLeft3',
                idSeccion: 200,
                tipoSeccion: 'apertura'
            })
        );
    });

    it('Testeo Seccion Banner', () => {
        const Seccion = [
            {
                id: 402,
                type: 1,
                sectionAliasMobile: 'Banner',
                position: 'bottom'
            },
            {
                id: 403,
                type: 1,
                sectionAliasMobile: 'Banner',
                position: 'start'
            }
        ];
        const home = index(Seccion, paramsPage) || [];

        expect(home[0][0]).toEqual(
            expect.objectContaining({
                tipoSeccion: 'banner',
                idSeccion: 402
            })
        );
        expect(home[0][1]).toEqual(
            expect.objectContaining({
                tipoSeccion: 'banner',
                idSeccion: 403
            })
        );
    });

    it('Testeo Tema Caso Caja Manual', () => {
        const Seccion = [
            {
                type: 0,
                sectionAliasMobile: 'Breaking_1',
                information: {
                    layout: 'focalLeft3',
                    initialPosition: 1,
                    hideTitle: false,
                    containerImage: undefined,
                    title: 'Mi techo abc'
                },
                articles: articlesCollections,
                configurations: {
                    arcSite: 'la-nacion-ar'
                },
                sectionWeb: 'Breaking_1'
            }
        ];

        const home = index(Seccion, paramsPage) || [];

        expect(home[0][0]).toEqual(
            expect.objectContaining({
                tipoSeccion: 'tema',
                idSeccion: 305,
                diagramacion: 'focalLeft3',
                tituloCaja: 'Mi techo abc'
            })
        );
    });

    it('Testeo Tema Caso Caja Multimedia', () => {
        const Seccion = [
            {
                type: 0,
                sectionAliasMobile: 'Multimedia',
                information: {
                    layout: 'focalLeft3',
                    initialPosition: 1,
                    hideTitle: false,
                    containerImage: undefined,
                    title: 'Multimedia'
                },
                articles: articlesCollections,
                configurations: {
                    arcSite: 'la-nacion-ar'
                },
                sectionWeb: 'Multimedia'
            }
        ];

        const home = index(Seccion, paramsPage) || [];

        expect(home[0][0]).toEqual(
            expect.objectContaining({
                tipoSeccion: 'tema',
                idSeccion: 305,
                diagramacion: 'focalLeft3',
                tituloCaja: 'Multimedia'
            })
        );
    });

    it('Testeo Tema Caja Comercial', () => {
        const Seccion = [
            {
                type: 0,
                sectionAliasMobile: 'comercial',
                information: {
                    layout: 'grilla3',
                    backgroundColor: 'default',
                    initialPosition: 1,
                    hideTitle: false,
                    idCollection: 'WM5DMXURZJBZZASUK356FPQNUI',
                    title: 'Comercial 2',
                    image: undefined,
                    nameChain: 'Ln_Caja_Manual'
                },
                articles: articlesCollections,
                configurations: {
                    arcSite: 'la-nacion-ar'
                },
                sectionMobile: 'Comercial',
                sectionWeb: 'Comercial_1'
            }
        ];

        const home = index(Seccion, paramsPage) || [];

        expect(home[0][0]).toMatchObject({
            tipoSeccion: 'comercial',
            idSeccion: 1101,
            diagramacion: 'grilla3',
            tituloCaja: 'Comercial 2'
        });
    });
    it('Testeo Seccion Dolar', () => {
        const Seccion = [
            {
                id: 2000,
                type: 1,
                sectionAliasMobile: 'Dolar',
                position: 'bottom'
            }
        ];
        const home = index(Seccion, paramsPage) || [];

        expect(home[0][0]).toEqual(
            expect.objectContaining({
                tipoSeccion: 'dolar',
                idSeccion: 2000
            })
        );
    });

    it('Testeo cambio de orden de notas en API mobile para Focal derecho', () => {
        const SeccionFocalRight = [
            {
                type: 0,
                sectionAliasMobile: 'TemaPrueba1',
                information: {
                    layout: 'focalRight2',
                    initialPosition: 1,
                    hideTitle: false,
                    containerImage: undefined,
                    title: 'Mi test prueba'
                },
                articles: articlesCollections,
                configurations: {
                    arcSite: 'la-nacion-ar'
                }
            }
        ];
        const SeccionFocalLeft = [
            {
                type: 0,
                sectionAliasMobile: 'TemaPrueba2',
                information: {
                    layout: 'focalLeft3',
                    initialPosition: 1,
                    hideTitle: false,
                    containerImage: undefined,
                    title: 'Mi test prueba'
                },
                articles: articlesCollections,
                configurations: {
                    arcSite: 'la-nacion-ar'
                }
            }
        ];
        const homeFocalRight = index(SeccionFocalRight, paramsPage) || [];
        expect(homeFocalRight[0][0].notas[0].id).toBe(
            'CCWIARQOVJFIXEG2HDB2RYZJWE'
        );
        expect(homeFocalRight[0][0].notas[1].id).toBe(
            'ZTYQMEK7ZBBORNEKA6IQDMYQOM'
        );
        expect(homeFocalRight[0][0].notas.length).toBe(2);

        const homeFocalLeft = index(SeccionFocalLeft, paramsPage) || [];

        expect(homeFocalLeft[0][0].notas[0].id).toBe(
            'ZTYQMEK7ZBBORNEKA6IQDMYQOM'
        );
        expect(homeFocalLeft[0][0].notas[1].id).toBe(
            'CCWIARQOVJFIXEG2HDB2RYZJWE'
        );
        expect(homeFocalLeft[0][0].notas.length).toBe(3);
    });
    describe('banner tests', () => {
        it('box sub-exclusive can have a banner', () => {
            const home = index(
                [
                    {
                        type: 0,
                        sectionAliasMobile: 'sub-exclusive',
                        information: {
                            idCollection: 'CBKYAAJUL5BYFHN5JR2B44YK7E',
                            layout: 'bn_2_1_2_grid',
                            initialPosition: 1,
                            chainStyle: 'sub-exclusive',
                            title: 'Exclusivo Suscriptores',
                            link: '',
                            logoId: '',
                            hideTitle: false,
                            navigator: '',
                            buttonText: '',
                            linkButton: '',
                            buttonStyle: 'generic',
                            typeChain: 'sub-exclusive',
                            nameChain: 'LN10_Caja_Collection',
                            idRender: 'c0f1g3GIInOR630'
                        },
                        articles: articlesCollections,
                        configurations: { arcSite: 'la-nacion-ar' },
                        sectionWeb: 'Breaking_1'
                    }
                ],
                {
                    information: { layoutPage: 'LN10-Home_Main' }
                }
            );
            expect(home[0][0].tipoSeccion).toBe('suscriptor');
            expect(home[0][0].banner).not.toBeNull();
            expect(home[0][0].banner.id_adserver).toStrictEqual({
                android:
                    '/133919216/lanacion_app_android/home/cajasuscriptores_app',
                ios: '/133919216/lanacion_app_ios/home/cajasuscriptores_app'
            });
        });
        it('box tema without a banner', () => {
            const home = index(
                [
                    {
                        type: 4,
                        sectionAliasMobile: 'Title',
                        parameterToClone: {
                            keyFind: 'sectionAliasMobile',
                            value: 'ln-common/ln10_opinion',
                            fieldToClone: 'information'
                        },
                        position: 'start',
                        information: {
                            idCollectionOpinion: 'QJ3BOEZVQNEYZEVBXHF4C7KAWY',
                            idCollectionEditorial: 'TEJH5MZQUFELVGMQF5AXN6X4EQ',
                            idCollection: '',
                            layout: 'opinion8',
                            initialPosition: 1,
                            url: '',
                            imageId: '',
                            title: 'Opinion',
                            hideTitle: false,
                            navigator: '',
                            nameFeature: 'LN-common/LN10_opinion',
                            idRender: 'f0fzBOQXu9uz1io'
                        }
                    }
                ],
                {
                    information: { layoutPage: 'LN10-Home_Main' }
                }
            );
            expect(home[0][0].tipoSeccion).toBe('title');
            expect(home[0][0].banner).not.toBeNull();
        });
    });
});
