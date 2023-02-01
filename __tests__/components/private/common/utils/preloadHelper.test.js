import {
    excludePreloadAcu,
    getDataPreloadAcu
} from '../../../../../components/private/common/utils/preloadHelper';

describe('Preload helper', () => {
    describe('getDataPreloadAcu', () => {
        const cases = [
            ['QJ3BOEZVQNEYZEVBXHF4C7KAWY', 'section', '', 'aperturaAcu'],
            ['', 'section', 'section', 'boxArticles'],
            ['', '', '', 'boxArticles'],
            ['QJ3BOEZVQNEYZEVBXHF4C7KAWY', '', '', 'aperturaAcu']
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
                'deportes',
                true,
                {
                    nodeType: 'section',
                    id: '/deportes',
                    hasFeatureAcumuladoApertura: false,
                    idCollectionApertura: null,
                    hasChainBeforeGrid: true
                }
            ],
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
                    id:
                        '3cf09432d5c3e56daa92236477ad963f485d5c10aeccff6a874f489950050b2c',
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
});
