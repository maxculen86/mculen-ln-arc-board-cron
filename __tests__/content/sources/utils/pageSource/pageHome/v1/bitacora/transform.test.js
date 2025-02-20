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

jest.mock('../../../../../../../../content/sources/rankingArticlesSource', () => {
    return {
        fetch: jest.fn().mockResolvedValue({
            articles: [],
            size: 0,
        })
    };
});

beforeEach(() => {
    homePage = JSON.parse(JSON.stringify(firstTransformation))
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
        expect(result.cajas.length).toBe(29);
        expect(result.cajas[4]).toEqual({
            id_caja: '04',
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
        expect(result.cajas.length).toBe(29);
        expect(result.cajas[4]).toEqual({
            id_caja: '04',
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

    it('transforms carousel', async () => {
        const page = {
            information: {
                layoutPage: 'LN10-Home_Main'
            },
            content_elements: [{
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
                        posterUrl: 'https://cdn.jwplayer.com/v2/media/kkWdaX2X/poster.jpg?width=320',
                        previewVideoUrl: 'https://assets-jpcust.jwpsrv.com/thumbnails/96e67bif-320.mp4',
                        fullVideoUrl: 'https://cdn.jwplayer.com/manifests/kkWdaX2X.m3u8',
                        fullVideoDuration: 9056,
                        badge: 'CHAPITA',
                        badgeStyle: 'default',
                        jwVideoId: 'kkWdaX2X',
                    },
                    {
                        _id: '77c706ae79a5c674ed24ec2a08d85a2c9429156b318c0131f5f04d81ed0de819',
                        title: 'ITEM 2 CARRUSEL',
                        posterUrl: 'https://cdn.jwplayer.com/v2/media/sfEt1cNK/poster.jpg?width=320',
                        previewVideoUrl: 'https://assets-jpcust.jwpsrv.com/thumbnails/s8qk6z3z-320.mp4',
                        fullVideoUrl: 'https://cdn.jwplayer.com/manifests/sfEt1cNK.m3u8',
                        fullVideoDuration: 110,
                        badge: 'Chapita cap',
                        badgeStyle: 'default',
                        jwVideoId: 'sfEt1cNK',
                    }
                ],
                configurations: {
                    arcSite: 'la-nacion-ar'
                },
                sectionWeb: 'Breaking_1'
            }]
        };
        const {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate,
        } = queryParams.information;
        const expected = {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate,
            cajas: [{
                id_caja: '01',
                visible: true,
                feature: 'carrusel',
                diagramacion_caja: 'carrusel',
                item_category: 'CAJA CARRUSEL',
                videos: [
                    {
                        id_video: 'kkWdaX2X',
                        url_video: 'https://cdn.jwplayer.com/manifests/kkWdaX2X.m3u8',
                        posicion: '01',
                    },
                    {
                        id_video: 'sfEt1cNK',
                        url_video: 'https://cdn.jwplayer.com/manifests/sfEt1cNK.m3u8',
                        posicion: '02',
                    }
                ]
            }]
        };

        const result = await transform(page, queryParams);

        expect(result).toEqual(expected);
    });

    it('renames diagramation left-focal-without-timeline', async () => {
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
                        { _id: 'ZUU7XJDSV5HQ5N6HESKDJXHFNA', website_url: '/sociedad/1' },
                        { _id: 'WXIBUED5GBEZNCZ347Q4VFKWRY', website_url: '/sociedad/2' },
                    ],
                    configurations: {
                        arcSite: 'la-nacion-ar'
                    },
                    sectionWeb: 'Apertura'
                }]
        };
        const {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate,
        } = queryParams.information;
        const expected = {
            apiPageHomeSourceFetchDate,
            homeFetchDate,
            keyCachedCall,
            layoutDate,
            cajas: [{
                id_caja: '01',
                visible: true,
                feature: 'apertura',
                diagramacion_caja: 'apertura_left-focal-without-timeline',
                item_category: 'N/A',
                notas: [
                    {
                        id_nota: 'ZUU7XJDSV5HQ5N6HESKDJXHFNA',
                        url_nota: '/sociedad/1',
                        posicion: '01',
                    },
                    {
                        id_nota: 'WXIBUED5GBEZNCZ347Q4VFKWRY',
                        url_nota: '/sociedad/2',
                        posicion: '02',
                    },
                ]
            }]
        };

        const result = await transform(page, queryParams);

        expect(result).toEqual(expected);
    });
});
