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

describe('Transform bitacora v1 test', () => {
    test('Test transformacion bitacora', async () => {
        let result = await transform(
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
        let result = await transform(firstTransformation, queryParams);
        expect(result.cajas.length).toBe(28);
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
        let result = await transform(firstTransformation, queryParams);
        expect(result.cajas.length).toBe(28);
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
});
