import 'regenerator-runtime/runtime';
import transform from '../../../../../../../../content/sources/utils/pageSource/pageHome/v1/bitacora/transform';
import firstTransformation from '../../../../../../../../__mocks__/data/bitacora/firstTransformationHome.json';

const queryParams = {
    information: {
        layoutPage: 'LN10-Home_Main',
        apiPageHomeSourceFetchDate: '2024-05-08T18:17:18.298Z',
        layoutDate: '2024-05-08T18:16:33.533Z',
        homeFetchDate: '2024-05-08T18:17:18.401Z',
        keyCachedCall: 'ApiPageHomehome_08'
    }
};
let homePage;

jest.mock(
    '../../../../../../../../content/sources/rankingArticlesSource',
    () => {
        return {
            fetch: jest.fn().mockResolvedValue({
                articles: [],
                size: 0
            })
        };
    }
);

beforeEach(() => {
    homePage = JSON.parse(JSON.stringify(firstTransformation));
});

describe('Transform bitacora v1 test', () => {
    test('Test transformacion bitacora', async () => {
        const result = await transform(
            {
                information: {
                    layoutPage: ''
                },
                content_elements: []
            },
            queryParams
            // 'http://172.17.0.1/api/mobile/v1/bitacora/10/?_website=la-nacion-ar&outputType=json'
        );
        expect(result).not.toBeNull();
    });

    test('Bitacora should return right data', async () => {
        const result = await transform(homePage, queryParams);
        expect(result.cajas.length).toBe(30);
        expect(result.cajas[5]).toEqual({
            id_caja: '05',
            visible: true,
            feature: 'tema',
            diagramacion_caja: 'bnGrilla4',
            item_category: 'N/A',
            notas: [
                {
                    id_nota: 'WFGEMMXEAREILHY5QNXSETVSBQ',
                    url_nota:
                        '/economia/campo/capitalismo-de-amigos-el-secretario-de-agricultura-cuestiono-con-dureza-un-polemico-fondo-del-nid11012024/',
                    posicion: '01'
                },
                {
                    id_nota: 'JT6P2AG72RESJNZYPDJNDSYU44',
                    url_nota:
                        '/economia/detras-de-los-precios-argentinos-ni-un-peso-para-el-asado-pero-la-casta-gasta-euros-en-europa-nid11012024/',
                    posicion: '02'
                },
                {
                    id_nota: 'VRPEDCCXJFCKPJCHQAQ52363WQ',
                    url_nota:
                        '/politica/grabois-cruzo-al-hermano-de-bertie-benegas-lynch-por-criticar-a-la-diputada-zaracho-nid11012024/',
                    posicion: '03'
                },
                {
                    id_nota: 'BM47UOYPF5BAVF3ZVP5LZG47HA',
                    url_nota:
                        '/politica/senado-la-neuquina-lucila-crexell-se-alinea-con-gobernador-rolando-figueroa-y-complica-los-planes-de-nid11012024/',
                    posicion: '04'
                }
            ]
        });
    });

    test('Bitacora should not return status 500 if a box has no articles', async () => {
        const result = await transform(homePage, queryParams);
        expect(result.cajas.length).toBe(30);
        expect(result.cajas[5]).toEqual({
            id_caja: '05',
            visible: true,
            feature: 'tema',
            diagramacion_caja: 'bnGrilla4',
            item_category: 'N/A',
            notas: [
                {
                    id_nota: 'WFGEMMXEAREILHY5QNXSETVSBQ',
                    url_nota:
                        '/economia/campo/capitalismo-de-amigos-el-secretario-de-agricultura-cuestiono-con-dureza-un-polemico-fondo-del-nid11012024/',
                    posicion: '01'
                },
                {
                    id_nota: 'JT6P2AG72RESJNZYPDJNDSYU44',
                    url_nota:
                        '/economia/detras-de-los-precios-argentinos-ni-un-peso-para-el-asado-pero-la-casta-gasta-euros-en-europa-nid11012024/',
                    posicion: '02'
                },
                {
                    id_nota: 'VRPEDCCXJFCKPJCHQAQ52363WQ',
                    url_nota:
                        '/politica/grabois-cruzo-al-hermano-de-bertie-benegas-lynch-por-criticar-a-la-diputada-zaracho-nid11012024/',
                    posicion: '03'
                },
                {
                    id_nota: 'BM47UOYPF5BAVF3ZVP5LZG47HA',
                    url_nota:
                        '/politica/senado-la-neuquina-lucila-crexell-se-alinea-con-gobernador-rolando-figueroa-y-complica-los-planes-de-nid11012024/',
                    posicion: '04'
                }
            ]
        });
    });

    test('transforms carousel', async () => {
        const page = {
            information: {
                layoutPage: 'LN10-Home_Main'
            },
            content_elements: [
                {
                    type: 10,
                    sectionAliasMobile: 'ln10_caja_carrusel',
                    information: {
                        title: 'CAJA CARRUSEL',
                        link: 'https://www.lanacion.com.ar/lifestyle/',
                        nameChain: 'LN10_Caja_Carrusel',
                        idRender: 'c0ft4SpFfd1g5VC'
                    },
                    videos: [
                        {
                            _id: '4c2089568f39a4311692c2231c39ab5d537a341aa2e2e83f3771db93855b3a82',
                            title: 'ITEM 1 CARRUSEL',
                            posterUrl:
                                'https://cdn.jwplayer.com/v2/media/kkWdaX2X/poster.jpg?width=320',
                            previewVideoUrl:
                                'https://assets-jpcust.jwpsrv.com/thumbnails/96e67bif-320.mp4',
                            fullVideoUrl:
                                'https://cdn.jwplayer.com/manifests/kkWdaX2X.m3u8',
                            fullVideoDuration: 9056,
                            badge: 'CHAPITA',
                            badgeStyle: 'default',
                            jwVideoId: 'kkWdaX2X'
                        },
                        {
                            _id: '77c706ae79a5c674ed24ec2a08d85a2c9429156b318c0131f5f04d81ed0de819',
                            title: 'ITEM 2 CARRUSEL',
                            posterUrl:
                                'https://cdn.jwplayer.com/v2/media/sfEt1cNK/poster.jpg?width=320',
                            previewVideoUrl:
                                'https://assets-jpcust.jwpsrv.com/thumbnails/s8qk6z3z-320.mp4',
                            fullVideoUrl:
                                'https://cdn.jwplayer.com/manifests/sfEt1cNK.m3u8',
                            fullVideoDuration: 110,
                            badge: 'Chapita cap',
                            badgeStyle: 'default',
                            jwVideoId: 'sfEt1cNK'
                        }
                    ],
                    configurations: {
                        arcSite: 'la-nacion-ar'
                    },
                    sectionWeb: 'Breaking_1'
                }
            ]
        };
        const {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate
        } = queryParams.information;
        const expected = {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate,
            cajas: [
                {
                    id_caja: '01',
                    visible: true,
                    feature: 'carrusel',
                    diagramacion_caja: 'carrusel',
                    item_category: 'CAJA CARRUSEL',
                    videos: [
                        {
                            id_video: 'kkWdaX2X',
                            url_video:
                                'https://cdn.jwplayer.com/manifests/kkWdaX2X.m3u8',
                            posicion: '01'
                        },
                        {
                            id_video: 'sfEt1cNK',
                            url_video:
                                'https://cdn.jwplayer.com/manifests/sfEt1cNK.m3u8',
                            posicion: '02'
                        }
                    ]
                }
            ]
        };

        const result = await transform(page, queryParams);

        expect(result).toEqual(expected);
    });

    test('renames diagramation left-focal-without-timeline', async () => {
        const page = {
            information: {
                layoutPage: 'LN10-Home_Main'
            },
            content_elements: [
                {
                    type: 0,
                    sectionAliasMobile: 'apertura',
                    information: {
                        layout: 'left-focal-without-timeline',
                        hideCaja: false,
                        typeChain: 'apertura',
                        nameChain: 'LN10_Caja_Apertura',
                        idRender: 'c0fuD8YggDBz7YJ'
                    },
                    articles: [
                        {
                            _id: 'ZUU7XJDSV5HQ5N6HESKDJXHFNA',
                            website_url: '/sociedad/1'
                        },
                        {
                            _id: 'WXIBUED5GBEZNCZ347Q4VFKWRY',
                            website_url: '/sociedad/2'
                        }
                    ],
                    configurations: {
                        arcSite: 'la-nacion-ar'
                    },
                    sectionWeb: 'Apertura'
                }
            ]
        };
        const {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate
        } = queryParams.information;
        const expected = {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate,
            cajas: [
                {
                    id_caja: '01',
                    visible: true,
                    feature: 'apertura',
                    diagramacion_caja: 'apertura_left-focal-without-timeline',
                    item_category: 'N/A',
                    notas: [
                        {
                            id_nota: 'ZUU7XJDSV5HQ5N6HESKDJXHFNA',
                            url_nota: '/sociedad/1',
                            posicion: '01'
                        },
                        {
                            id_nota: 'WXIBUED5GBEZNCZ347Q4VFKWRY',
                            url_nota: '/sociedad/2',
                            posicion: '02'
                        }
                    ]
                }
            ]
        };

        const result = await transform(page, queryParams);

        expect(result).toEqual(expected);
    });

    test('transforms bn_player_3_grid', async () => {
        const page = {
            information: {
                layoutPage: 'LN10-Home_Main'
            },
            content_elements: [
                {
                    type: 0,
                    sectionAliasMobile: 'bnplayer',
                    information: {
                        idCollection: '',
                        layout: 'bn_player_3_grid',
                        initialPosition: 1,
                        chainStyle: '',
                        title: 'caja bn_player_3_grid',
                        link: '',
                        logoId: '',
                        hideTitle: false,
                        navigator: '',
                        buttonLogo: '',
                        buttonText: '',
                        linkButton: '',
                        buttonStyle: 'generic',
                        hideCaja: false,
                        typeChain: 'bnPlayer',
                        viewabilityRoof: 'caja bn_player_3_grid',
                        nameChain: 'LN10_Caja_Manual',
                        idRender: 'c0fLEMY8RmQeMP'
                    },
                    articles: [
                        {
                            _id: 'AIWKATG3ABF6NATFOSAAUBTLZE',
                            website_url:
                                '/sociedad/medicos-jovenes-muchos-estan-barajando-la-posibilidad-de-cambiar-de-profesion-nid14092023/'
                        },
                        {
                            _id: '3AGPROGDXNFHFMEX5PE2N7VSHU',
                            website_url:
                                '/el-mundo/el-mundo-en-alerta-ante-incremento-de-emergencias-y-catastrofes-naturales-nid14092023/'
                        },
                        {
                            _id: '3AGPROGDXNFHFMEX5PE2N7VSHU',
                            website_url:
                                '/el-mundo/el-mundo-en-alerta-ante-incremento-de-emergencias-y-catastrofes-naturales-nid14092023/'
                        }
                    ],
                    video: {
                        id: '9SP9fXDX',
                        posterUrl:
                            'https://cdn.jwplayer.com/v2/media/9SP9fXDX/poster.jpg?width=320',
                        previewVideoUrl:
                            'https://assets-jpcust.jwpsrv.com/thumbnails/sh0dhtyg-320.mp4',
                        fullVideoUrl:
                            'https://cdn.jwplayer.com/manifests/9SP9fXDX.m3u8',
                        fullVideoDuration: 10,
                        badgeStyle: 'default'
                    },
                    configurations: {
                        arcSite: 'la-nacion-ar'
                    },
                    sectionWeb: 'Apertura'
                }
            ]
        };
        const {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate
        } = queryParams.information;
        const expected = {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate,
            cajas: [
                {
                    id_caja: '01',
                    visible: true,
                    feature: 'tema',
                    diagramacion_caja: 'bn_player_3_grid',
                    item_category: 'caja bn_player_3_grid',
                    notas: [
                        {
                            id_nota: 'AIWKATG3ABF6NATFOSAAUBTLZE',
                            url_nota:
                                '/sociedad/medicos-jovenes-muchos-estan-barajando-la-posibilidad-de-cambiar-de-profesion-nid14092023/',
                            posicion: '02'
                        },
                        {
                            id_nota: '3AGPROGDXNFHFMEX5PE2N7VSHU',
                            url_nota:
                                '/el-mundo/el-mundo-en-alerta-ante-incremento-de-emergencias-y-catastrofes-naturales-nid14092023/',
                            posicion: '03'
                        },
                        {
                            id_nota: '3AGPROGDXNFHFMEX5PE2N7VSHU',
                            url_nota:
                                '/el-mundo/el-mundo-en-alerta-ante-incremento-de-emergencias-y-catastrofes-naturales-nid14092023/',
                            posicion: '04'
                        }
                    ],
                    videos: [
                        {
                            id_video: '9SP9fXDX',
                            url_video:
                                'https://cdn.jwplayer.com/manifests/9SP9fXDX.m3u8',
                            posicion: '01'
                        }
                    ]
                }
            ]
        };

        const result = await transform(page, queryParams);

        expect(result).toEqual(expected);
    });

    test('transforms bn_player_4_grid', async () => {
        const page = {
            information: {
                layoutPage: 'LN10-Home_Main'
            },
            content_elements: [
                {
                    type: 0,
                    sectionAliasMobile: 'bnplayer',
                    information: {
                        idCollection: '',
                        layout: 'bn_player_4_grid',
                        initialPosition: 1,
                        chainStyle: '',
                        title: 'caja bn_player_4_grid',
                        link: '',
                        logoId: '',
                        hideTitle: false,
                        navigator: '',
                        buttonLogo: '',
                        buttonText: '',
                        linkButton: '',
                        buttonStyle: 'generic',
                        hideCaja: false,
                        typeChain: 'bnPlayer',
                        viewabilityRoof: 'caja bn_player_4_grid',
                        nameChain: 'LN10_Caja_Manual',
                        idRender: 'c0fLEMY8RmQeMP'
                    },
                    articles: [
                        {
                            _id: 'AIWKATG3ABF6NATFOSAAUBTLZE',
                            website_url:
                                '/sociedad/medicos-jovenes-muchos-estan-barajando-la-posibilidad-de-cambiar-de-profesion-nid14092023/'
                        },
                        {
                            _id: '3AGPROGDXNFHFMEX5PE2N7VSHU',
                            website_url:
                                '/el-mundo/el-mundo-en-alerta-ante-incremento-de-emergencias-y-catastrofes-naturales-nid14092023/'
                        },
                        {
                            _id: '3AGPROGDXNFHFMEX5PE2N7VSHU',
                            website_url:
                                '/el-mundo/el-mundo-en-alerta-ante-incremento-de-emergencias-y-catastrofes-naturales-nid14092023/'
                        },
                        {
                            _id: '3AGPROGDXNFHFMEX5PE2N7VSHU',
                            website_url:
                                '/el-mundo/el-mundo-en-alerta-ante-incremento-de-emergencias-y-catastrofes-naturales-nid14092023/'
                        }
                    ],
                    video: {
                        id: '9SP9fXDX',
                        posterUrl:
                            'https://cdn.jwplayer.com/v2/media/9SP9fXDX/poster.jpg?width=320',
                        previewVideoUrl:
                            'https://assets-jpcust.jwpsrv.com/thumbnails/sh0dhtyg-320.mp4',
                        fullVideoUrl:
                            'https://cdn.jwplayer.com/manifests/9SP9fXDX.m3u8',
                        fullVideoDuration: 10,
                        badgeStyle: 'default'
                    },
                    configurations: {
                        arcSite: 'la-nacion-ar'
                    },
                    sectionWeb: 'Apertura'
                }
            ]
        };
        const {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate
        } = queryParams.information;
        const expected = {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate,
            cajas: [
                {
                    id_caja: '01',
                    visible: true,
                    feature: 'tema',
                    diagramacion_caja: 'bn_player_4_grid',
                    item_category: 'caja bn_player_4_grid',
                    notas: [
                        {
                            id_nota: 'AIWKATG3ABF6NATFOSAAUBTLZE',
                            url_nota:
                                '/sociedad/medicos-jovenes-muchos-estan-barajando-la-posibilidad-de-cambiar-de-profesion-nid14092023/',
                            posicion: '02'
                        },
                        {
                            id_nota: '3AGPROGDXNFHFMEX5PE2N7VSHU',
                            url_nota:
                                '/el-mundo/el-mundo-en-alerta-ante-incremento-de-emergencias-y-catastrofes-naturales-nid14092023/',
                            posicion: '03'
                        },
                        {
                            id_nota: '3AGPROGDXNFHFMEX5PE2N7VSHU',
                            url_nota:
                                '/el-mundo/el-mundo-en-alerta-ante-incremento-de-emergencias-y-catastrofes-naturales-nid14092023/',
                            posicion: '04'
                        },
                        {
                            id_nota: '3AGPROGDXNFHFMEX5PE2N7VSHU',
                            url_nota:
                                '/el-mundo/el-mundo-en-alerta-ante-incremento-de-emergencias-y-catastrofes-naturales-nid14092023/',
                            posicion: '05'
                        }
                    ],
                    videos: [
                        {
                            id_video: '9SP9fXDX',
                            url_video:
                                'https://cdn.jwplayer.com/manifests/9SP9fXDX.m3u8',
                            posicion: '01'
                        }
                    ]
                }
            ]
        };

        const result = await transform(page, queryParams);

        expect(result).toEqual(expected);
    });

    test('transforms bn_player_horizontal', async () => {
        const page = {
            information: {
                layoutPage: 'LN10-Home_Main'
            },
            content_elements: [
                {
                    type: 0,
                    sectionAliasMobile: 'ln10_caja_manual',
                    information: {
                        idCollection: '',
                        layout: 'bn_player_horizontal',
                        initialPosition: 1,
                        chainStyle: '',
                        title: 'caja bn_player_horizontal',
                        link: '',
                        logoId: '',
                        hideTitle: false,
                        navigator: '',
                        buttonLogo: '',
                        buttonText: '',
                        linkButton: '',
                        buttonStyle: 'generic',
                        hideCaja: false,
                        typeChain: 'LN10_Caja_Manual',
                        viewabilityRoof: 'caja bn_player_horizontal',
                        nameChain: 'LN10_Caja_Manual',
                        idRender: 'c0fLEMY8RmQeMP'
                    },
                    articles: [
                        {
                            _id: 'AIWKATG3ABF6NATFOSAAUBTLZE',
                            website_url:
                                '/sociedad/medicos-jovenes-muchos-estan-barajando-la-posibilidad-de-cambiar-de-profesion-nid14092023/',
                            videoData: {
                                id: '9SP9fXDX',
                                posterUrl:
                                    'https://cdn.jwplayer.com/v2/media/9SP9fXDX/poster.jpg?width=320',
                                previewVideoUrl:
                                    'https://assets-jpcust.jwpsrv.com/thumbnails/sh0dhtyg-320.mp4',
                                fullVideoUrl:
                                    'https://cdn.jwplayer.com/manifests/9SP9fXDX.m3u8',
                                fullVideoDuration: 10,
                                badgeStyle: 'default'
                            }
                        }
                    ],
                    configurations: {
                        arcSite: 'la-nacion-ar'
                    },
                    sectionWeb: 'Apertura'
                }
            ]
        };
        const {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate
        } = queryParams.information;
        const expected = {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate,
            cajas: [
                {
                    id_caja: '01',
                    visible: true,
                    feature: 'tema',
                    diagramacion_caja: 'bn_player_horizontal',
                    item_category: 'caja bn_player_horizontal',
                    notas: [
                        {
                            id_nota: 'AIWKATG3ABF6NATFOSAAUBTLZE',
                            url_nota:
                                '/sociedad/medicos-jovenes-muchos-estan-barajando-la-posibilidad-de-cambiar-de-profesion-nid14092023/',
                            posicion: '01'
                        }
                    ]
                }
            ]
        };

        const result = await transform(page, queryParams);

        expect(result).toEqual(expected);
    });

    test('transforms LN10_Caja_Segmentada', async () => {
        const page = {
            information: {
                layoutPage: 'LN10-Home_Main'
            },
            content_elements: [
                {
                    type: 12,
                    sectionAliasMobile: 'ln10_caja_segmentada',
                    information: {
                        idCollection: 'RNZ32HBHMRBGHJGFC4PNMCZUF4',
                        layout: 'bn_3_grid',
                        initialPosition: 1,
                        title: 'BN CAJA SEGMENTADA',
                        link: 'https://www.lanacion.com.ar/',
                        logoId: 'S56VIXO3KZHK5EVKODOIX3CO2Y',
                        hideTitle: false,
                        buttonText: 'texto',
                        linkButton: '',
                        hideCaja: false,
                        buttonLogo: 'S56VIXO3KZHK5EVKODOIX3CO2Y',
                        segmentName: '1',
                        enabledDays: [
                            'lunes',
                            'martes',
                            'jueves',
                            'miercoles',
                            'viernes'
                        ],
                        segment: 1,
                        noteCount: 3,
                        viewabilityRoof: 'BN CAJA SEGMENTADA',
                        nameChain: 'LN10_Caja_Segmentada',
                        idRender: 'c0fTWxcnMLl75Sf'
                    },
                    articles: [
                        {
                            _id: 'WCOTZQDWQZCBXJXB2JL4RFQGOA',
                            website_url:
                                '/economia/prueba-liveblog-editorial-video-inframe-nid20052025/',
                            additionalProperties: {
                                originPosition: 'T1',
                                nameFeature: null,
                                idRender: null
                            }
                        },
                        {
                            _id: 'B77EOPD2MRFHBNMMUDG6GYUCMA',
                            website_url:
                                '/revista-hola/probando-composer-20-nid23012025/',
                            additionalProperties: {
                                originPosition: 'T2',
                                nameFeature: null,
                                idRender: null
                            }
                        },
                        {
                            _id: 'RRAHEKIZW5AETKOBOTI3QNAC6A',
                            website_url:
                                '/revista-brando/la-casa-rosada-vuelve-a-la-carga-contra-villarruel-por-la-sesion-por-kueider-en-este-gobierno-no-se-nid13122024/',
                            additionalProperties: {
                                originPosition: 'T3',
                                nameFeature: null,
                                idRender: null
                            }
                        }
                    ],
                    configurations: {
                        arcSite: 'la-nacion-ar'
                    },
                    sectionWeb: 'Breaking_1'
                }
            ]
        };
        const {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate
        } = queryParams.information;
        const expected = {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate,
            cajas: [
                {
                    id_caja: '01',
                    visible: true,
                    feature: 'segmento',
                    diagramacion_caja: 'bn_3_grid',
                    item_category: 'BN CAJA SEGMENTADA',
                    notas: [
                        {
                            id_nota: 'WCOTZQDWQZCBXJXB2JL4RFQGOA',
                            url_nota:
                                '/economia/prueba-liveblog-editorial-video-inframe-nid20052025/',
                            posicion: '01'
                        },
                        {
                            id_nota: 'B77EOPD2MRFHBNMMUDG6GYUCMA',
                            url_nota:
                                '/revista-hola/probando-composer-20-nid23012025/',
                            posicion: '02'
                        },
                        {
                            id_nota: 'RRAHEKIZW5AETKOBOTI3QNAC6A',
                            url_nota:
                                '/revista-brando/la-casa-rosada-vuelve-a-la-carga-contra-villarruel-por-la-sesion-por-kueider-en-este-gobierno-no-se-nid13122024/',
                            posicion: '03'
                        }
                    ]
                }
            ]
        };

        const result = await transform(page, queryParams);

        expect(result).toEqual(expected);
    });

    test('transforms left-focal-video-vertical', async () => {
        const page = {
            information: { layoutPage: 'LN10-Home_Main' },
            content_elements: [
                {
                    type: 0,
                    sectionAliasMobile: 'apertura',
                    information: {
                        layout: 'left-focal-video-vertical',
                        initialPosition: 1,
                        hideTitle: false,
                        hideCaja: false,
                        title: '',
                        url: '',
                        pbInternal_cloneId: 'c0faaS86p5aj3t8',
                        typeChain: 'apertura',
                        nameChain: 'LN10_Caja_Apertura',
                        idRender: 'c0fsRI3Shaz0clH'
                    },
                    articles: [
                        { _id: 'A1', website_url: '/nota/1' },
                        { _id: 'A2', website_url: '/nota/2' },
                        { _id: 'A3', website_url: '/nota/3' },
                        { _id: 'A4', website_url: '/nota/4' },
                        { _id: 'A5', website_url: '/nota/5' }
                    ],
                    video: {
                        id: "9WOZs2Z7",
                        posterUrl: "https://cdn.jwplayer.com/v2/media/9WOZs2Z7/poster.jpg?width=320",
                        previewVideoUrl: "https://assets-jpcust.jwpsrv.com/thumbnails/32p01tsy-320.mp4",
                        fullVideoUrl: "https://cdn.jwplayer.com/manifests/9WOZs2Z7.m3u8",
                        fullVideoDuration: 124,
                        badgeStyle: "default",
                        type: "LN-10/videoPlayer"
                    },
                    configurations: { arcSite: 'la-nacion-ar' },
                    sectionWeb: 'Apertura'
                }
            ]
        };

        const result = await transform(page, queryParams);

        expect(result.cajas[0]).toEqual({
            id_caja: '01',
            visible: true,
            feature: 'apertura',
            diagramacion_caja: 'apertura_left-focal-with-video',
            item_category: 'N/A',
            notas: [
                { id_nota: 'A1', url_nota: '/nota/1', posicion: '01' },
                { id_nota: 'A2', url_nota: '/nota/2', posicion: '02' },
                { id_nota: 'A3', url_nota: '/nota/3', posicion: '03' },
                { id_nota: 'A4', url_nota: '/nota/4', posicion: '04' },
                { id_nota: 'A5', url_nota: '/nota/5', posicion: '05' }
            ],
            videos: [
                { id_video: '9WOZs2Z7', url_video: "https://cdn.jwplayer.com/manifests/9WOZs2Z7.m3u8", posicion: '06' }
            ]
        });
    });

});
