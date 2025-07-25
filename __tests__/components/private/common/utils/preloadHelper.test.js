import {
    excludePreloadAcu,
    getDataPreloadAcu,
    getFirstChainItem
} from '../../../../../components/private/common/utils/preloadHelper';
import acuDeportesRenderables from '../../../../../__mocks__/data/renderables/dataAccumulatedDeportes';

describe('Preload helper', () => {
    describe('getDataPreloadAcu', () => {
        const cases = [
            ['QJ3BOEZVQNEYZEVBXHF4C7KAWY', 'section', '', 'newAperturaAcu'],
            ['', 'section', 'section', 'newBoxArticles'],
            ['', '', '', 'newBoxArticles'],
            ['QJ3BOEZVQNEYZEVBXHF4C7KAWY', '', '', 'newAperturaAcu']
        ];
        test.each(cases)(
            'should return data of preload %p as idCollection and %p as nodeType',
            (idCollection, nodeType, expectNodeType, expectImageConfig) => {
                const dataPreloadAcu = getDataPreloadAcu(
                    idCollection,
                    nodeType
                );
                expect(dataPreloadAcu.collectionId).toEqual(idCollection);
                expect(dataPreloadAcu.imageConfig).toEqual(expectImageConfig);
                expect(dataPreloadAcu.nodeType).toEqual(expectNodeType);
            }
        );
    });

    describe('excludePreloadAcu', () => {
        const cases = [
            [
                'economia',
                true,
                {
                    nodeType: 'section',
                    id: '/economia',
                    hasFeatureAcumuladoApertura: false,
                    idCollectionApertura: '',
                    hasChainBeforeGrid: true
                }
            ],
            [
                'ultimas noticias',
                false,
                {
                    nodeType: 'section',
                    id: '/ultimas-noticias',
                    hasFeatureAcumuladoApertura: false,
                    idCollectionApertura: undefined,
                    hasChainBeforeGrid: true
                }
            ],

            [
                'autos',
                false,
                {
                    nodeType: 'section',
                    id: '/autos',
                    hasFeatureAcumuladoApertura: {},
                    idCollectionApertura: 'RTSJKCDG3RBMXJ25YBX3NYESWE',
                    hasChainBeforeGrid: true
                }
            ],
            [
                'tema without wiki',
                false,
                {
                    nodeType: 'tags',
                    id: '3cf09432d5c3e56daa92236477ad963f485d5c10aeccff6a874f489950050b2c',
                    hasFeatureAcumuladoApertura: {},
                    idCollectionApertura: '',
                    hasChainBeforeGrid: false
                }
            ],
            [
                'lifestyle',
                false,
                {
                    nodeType: 'section',
                    id: '/lifestyle',
                    hasFeatureAcumuladoApertura: {},
                    idCollectionApertura: undefined,
                    hasChainBeforeGrid: false
                }
            ],

            [
                'politica',
                false,
                {
                    nodeType: 'section',
                    id: '/politica',
                    hasFeatureAcumuladoApertura: {},
                    idCollectionApertura: 'QJ3BOEZVQNEYZEVBXHF4C7KAWY',
                    hasChainBeforeGrid: false
                }
            ]
        ];

        test.each(cases)(
            'excludePreload in Acumulado %p should return %p',
            (acu, exclude, data) => {
                expect(excludePreloadAcu(data)).toEqual(exclude);
            }
        );
    });

    describe('getFirstChainItem', () => {
        let hideManual = false;
        let manualLayout = 'grilla3';
        let hideCollection = false;
        let collectionLayout = 'grilla3';
        let expectedItem = {};

        test('should return first articleId from caja manual', () => {
            expectedItem = {
                articleId: 'HSPZIST4PJC2VHU3KCSFV7LHFA',
                imageConfig: 'featuredFocalIzquierdo',
                imageId: ''
            };

            expect(
                getFirstChainItem(
                    acuDeportesRenderables(
                        hideManual,
                        manualLayout,
                        hideCollection,
                        collectionLayout
                    )
                )
            ).toEqual(expectedItem);
        });

        test('should return empty object with "grillaVideo1" article layout', () => {
            manualLayout = 'grillaVideo1';

            expect(
                getFirstChainItem(
                    acuDeportesRenderables(
                        hideManual,
                        manualLayout,
                        hideCollection,
                        collectionLayout
                    )
                )
            ).toEqual({});
        });

        test('should return first caja collection', () => {
            hideManual = true;

            expectedItem = {
                collectionId: 'FPKJS5YHQVFGVD46GOLY7A265U',
                imageConfig: 'm',
                isFocal: false,
                initialPosition: 4
            };

            expect(
                getFirstChainItem(
                    acuDeportesRenderables(
                        hideManual,
                        manualLayout,
                        hideCollection,
                        collectionLayout
                    )
                )
            ).toEqual(expectedItem);
        });

        test('should return first caja collection with isFocal', () => {
            hideManual = true;
            collectionLayout = 'focalLeft';

            expectedItem = {
                collectionId: 'FPKJS5YHQVFGVD46GOLY7A265U',
                imageConfig: 'm',
                isFocal: true,
                initialPosition: 4
            };

            expect(
                getFirstChainItem(
                    acuDeportesRenderables(
                        hideManual,
                        manualLayout,
                        hideCollection,
                        collectionLayout
                    )
                )
            ).toEqual(expectedItem);
        });

        test('should return empty object with both hidden boxes', () => {
            hideManual = true;
            hideCollection = true;

            expect(
                getFirstChainItem(
                    acuDeportesRenderables(
                        hideManual,
                        manualLayout,
                        hideCollection,
                        collectionLayout
                    )
                )
            ).toEqual({});
        });

        test('should return empty object with no renderables', () => {
            expect(getFirstChainItem([])).toEqual({});
        });
    });
});
