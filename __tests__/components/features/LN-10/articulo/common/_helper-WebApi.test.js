import {
    getChainConfig,
    updateCardConfig
} from '../../../../../../components/features/LN-10/article/common/_helper-WebApi.js';
import diagramationRules from '../../../../../../components/private/common/utils/diagramationRules.js';
import siteConfig from '../../../../../../properties/sites/la-nacion-ar.js';
describe('Tests - function - getChainConfig', () => {
    describe('Tests in ACUMULADOS', () => {
        const getRenderables = ({
            hidefirstBox = false,
            hideSecondBox = false
        } = {}) => [
            {
                collection: 'layouts',
                type: 'LN-acumulado'
            },
            {
                collection: 'chains',
                type: 'Ln_Caja_Manual',
                props: {
                    collection: 'chains',
                    type: 'Ln_Caja_Manual',
                    id: 'c0fVElWb9v7fbgC',
                    customFields: {
                        layout: 'grilla2',
                        hideCaja: hidefirstBox
                    }
                },
                children: [
                    {
                        collection: 'features',
                        type: 'LN-common/articulo',
                        props: {
                            id: 'f0fDCrUjW0Oi4qT'
                        }
                    },
                    {
                        collection: 'features',
                        type: 'LN-common/articulo',
                        props: {
                            id: 'f0fTGHntMbtK2TB'
                        }
                    }
                ]
            },
            {
                collection: 'chains',
                type: 'Ln_Caja_Manual',
                props: {
                    collection: 'chains',
                    type: 'Ln_Caja_Manual',
                    id: 'c0fVElWb9v7fbgC',
                    customFields: {
                        layout: 'grilla3',
                        hideCaja: hideSecondBox
                    }
                },
                children: [
                    {
                        collection: 'features',
                        type: 'LN-common/articulo',
                        props: {
                            id: 'f0fDCrUjW0Oi4q'
                        }
                    }
                ]
            }
        ];

        test('should return config the first box', () => {
            expect(
                getChainConfig({
                    featureId: 'f0fDCrUjW0Oi4q',
                    renderables: getRenderables(),
                    cajaTemaConfig: siteConfig.cajaTemaConfig
                })
            ).toStrictEqual({
                config: {
                    imageConfig: 'boxArticles',
                    titleSizeNoMedia: '--m'
                },
                index: 0,
                boxPosition: '01',
                layout: 'grilla3',
                imageConfig: '',
                chainId: 'c0fVElWb9v7fbgC'
            });
        });

        test('should return config the second box, when the first box is hidden', () => {
            expect(
                getChainConfig({
                    featureId: 'f0fTGHntMbtK2TB',
                    renderables: getRenderables({ hidefirstBox: true }),
                    cajaTemaConfig: siteConfig.cajaTemaConfig
                })
            ).toStrictEqual({
                config: {
                    titleSize: '--xl',
                    titleWeight: '--font-extra',
                    imageConfig: 'boxArticlesTwoArticles'
                },
                index: 1,
                boxPosition: '01',
                layout: 'grilla2',
                imageConfig: '',
                chainId: 'c0fVElWb9v7fbgC'
            });
        });
    });

    describe('Tests in HOME LN10', () => {
        const getRenderables = ({ hideBomba, hideApertura, hideManual }) => {
            return [
                {
                    collection: 'layouts',
                    type: 'LN10-Home_Main'
                },
                {
                    collection: 'chains',
                    type: 'LN10_Caja_Bomba',
                    props: {
                        collection: 'chains',
                        type: 'LN10_Caja_Bomba',
                        id: 'c0f6nkS5zKTw44k',
                        customFields: {
                            layout: 'vertical',
                            hideCaja: hideBomba
                        }
                    },
                    children: [
                        {
                            collection: 'features',
                            type: 'LN-10/article',
                            props: {
                                id: 'f0fz979SZZqi7oP'
                            }
                        }
                    ]
                },
                {
                    collection: 'chains',
                    type: 'LN10_Caja_Apertura',
                    props: {
                        collection: 'chains',
                        type: 'LN10_Caja_Apertura',
                        id: 'c0fBuzgHL9Dr3zc',
                        name: null,
                        customFields: {
                            layout: 'bn-opening-4',
                            hideCaja: hideApertura
                        }
                    },
                    children: [
                        {
                            collection: 'features',
                            type: 'LN-10/article',
                            props: {
                                id: 'feature-id'
                            }
                        },
                        {
                            collection: 'features',
                            type: 'LN-10/article',
                            props: {
                                id: 'feature-id-apertura'
                            }
                        }
                    ]
                },
                {
                    collection: 'chains',
                    type: 'LN10_Caja_Manual',
                    props: {
                        collection: 'chains',
                        type: 'LN10_Caja_Manual',
                        id: 'c0f1LmcyHql050W',
                        name: null,
                        customFields: {
                            layout: 'bnFondo',
                            hideCaja: hideManual
                        }
                    },
                    children: [
                        {
                            collection: 'features',
                            type: 'LN-10/article',
                            props: {
                                id: 'id-children-caja-manual-ln10'
                            }
                        }
                    ]
                }
            ];
        };
        test('should return the manual box configuration with box position 01, when the bomb and opening are hidden. ', () => {
            expect(
                getChainConfig({
                    featureId: 'id-children-caja-manual-ln10',
                    renderables: getRenderables({
                        hideBomba: true,
                        hideApertura: true
                    })
                })
            ).toStrictEqual({
                imageConfig: 'm',
                config: diagramationRules('bnFondo')[0],
                index: 0,
                boxPosition: '01',
                layout: 'bnFondo',
                chainId: 'c0f1LmcyHql050W'
            });
        });

        test('should return the manual box configuration with box position 02, when the bomb are hidden but the opening is visibeld', () => {
            expect(
                getChainConfig({
                    featureId: 'id-children-caja-manual-ln10',
                    renderables: getRenderables({
                        hideBomba: true,
                        hideApertura: false
                    })
                })
            ).toStrictEqual({
                imageConfig: 'm',
                config: diagramationRules('bnFondo')[0],
                index: 0,
                boxPosition: '02',
                layout: 'bnFondo',
                chainId: 'c0f1LmcyHql050W'
            });
        });

        test('should return the opening box configuration with boxPosition 01, when the bomb are hidden', () => {
            expect(
                getChainConfig({
                    featureId: 'feature-id-apertura',
                    renderables: getRenderables({
                        hideBomba: true,
                        hideApertura: false
                    })
                })
            ).toStrictEqual({
                imageConfig: 'xs',
                config: diagramationRules('bn-opening-4')[1],
                index: 1,
                boxPosition: '01',
                layout: 'bn-opening-4',
                chainId: 'c0fBuzgHL9Dr3zc'
            });
        });
    });
});

describe('Tests - function - updateCardConfig', () => {
    test('should return titleTag h1 with bomba layout ( "horizontal" or "vertical )', () => {
        const layout = 'horizontal';
        const cardConfig = diagramationRules(layout);

        expect(updateCardConfig(layout, 0, cardConfig).titleTag).toBe('h1');
    });

    test('should replace the titleTag "h1" if the layout is not "horizontal" or "vertical" ', () => {
        const layout = 'left-focal';
        const cardConfig = diagramationRules(layout);

        expect(updateCardConfig(layout, 0, cardConfig).titleTag).toBe('h2');
    });
});
