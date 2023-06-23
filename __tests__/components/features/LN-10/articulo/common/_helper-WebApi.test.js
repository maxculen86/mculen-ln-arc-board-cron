import {
    deleteExtraH1,
    getCardConfig,
    getChainConfig,
    updatesTitleTag
} from '../../../../../../components/features/LN-10/article/common/_helper-WebApi.js';
import diagramationRules from '../../../../../../components/private/common/utils/diagramationRules.js';
import get from '../../../../../../components/private/common/utils/get.js';
import getElementFromRenderables from '../../../../../../components/private/common/utils/getElementFromRenderables.js';
import siteConfig from '../../../../../../properties/sites/la-nacion-ar.js';
import sectionsValidationLN10 from '../../../../../../components/layouts/config/LN10-Home.config.json';
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
                    titleWeight: '--font-medium',
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

describe('Tests - functions - getCardConfig', () => {
    const getRenderables = ({ hideBomba }) => {
        return [
            { collection: 'otros' },
            {
                collection: 'sections',
                children: [
                    {
                        type: 'LN10_Caja_Bomba',
                        props: {
                            customFields: { hideCaja: hideBomba },
                            id: 'f1r5tB0mb4ID'
                        }
                    }
                ]
            },
            {
                collection: 'layouts',
                type: 'LN10-Home_Main'
            },
            {
                collection: 'sections',
                children: [
                    {
                        type: 'LN10_Caja_Bomba',
                        props: {
                            customFields: { hideCaja: false },
                            id: 's3c0ndB0mb4ID'
                        }
                    }
                ]
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
                        hideCaja: false
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
                        hideCaja: false
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

    const noBombaRenderables = [
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
                    hideCaja: false
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
        }
    ];

    test('getCardConfig titleTag should be H1 for the first bomba', () => {
        const layout = 'vertical';
        const articlePosition = 0;
        const bomba = getElementFromRenderables({
            position: 'Pre_Apertura.position',
            config: sectionsValidationLN10,
            typeElement: 'LN10_Caja_Bomba',
            renderables: getRenderables({ hideBomba: false })
        });
        const chainId = 'f1r5tB0mb4ID';

        expect(
            getCardConfig(null, layout, articlePosition, bomba, chainId)
                .titleTag
        ).toBe('h1');
    });

    test('getCardConfig titleTag shouldnt be H1 if the bomba is not the first one in the chain', () => {
        const layout = 'bombitaMas4';
        const articlePosition = 1;
        const bomba = getElementFromRenderables({
            position: 'Pre_Apertura.position',
            config: sectionsValidationLN10,
            typeElement: 'LN10_Caja_Bomba',
            renderables: getRenderables({ hideBomba: false })
        });
        const chainId = 'f1r5tB0mb4ID';

        expect(
            getCardConfig(null, layout, articlePosition, bomba, chainId)
                .titleTag
        ).toBe('h2');
    });

    test('getCardConfig titleTag shouldnt be H1 if the chain is not the first bomba', () => {
        const layout = 'bombita';
        const articlePosition = 0;
        const bomba = getElementFromRenderables({
            position: 'Pre_Apertura.position',
            config: sectionsValidationLN10,
            typeElement: 'LN10_Caja_Bomba',
            renderables: getRenderables({ hideBomba: false })
        });
        const chainId = 'notMatchChainID';

        expect(
            getCardConfig(null, layout, articlePosition, bomba, chainId)
                .titleTag
        ).toBe('h2');
    });

    test('getCardConfig deleteExtraH1 shouldnt be called with no bomba', () => {
        const layout = 'left-focal';
        const articlePosition = 0;
        const bomba = getElementFromRenderables({
            position: 'Pre_Apertura.position',
            config: sectionsValidationLN10,
            typeElement: 'LN10_Caja_Bomba',
            renderables: noBombaRenderables
        });
        const chainId = 'notMatchChainID';
        const deleteExtraH1 = jest.fn();

        getCardConfig(null, layout, articlePosition, bomba, chainId);
        expect(deleteExtraH1).not.toBeCalled();
    });
});

describe('Tests - function - updatesTitleTag', () => {
    test('Should return undefined with no cardConfig', () => {
        const result = updatesTitleTag();
        expect(result).toBe(undefined);
    });

    test('Should keep cardConfig unchanged if no updates are required', () => {
        const cardConfig = [{ titleTag: 'h1', subheadTag: 'h2' }];

        const result = updatesTitleTag(cardConfig);
        expect(result).toEqual(cardConfig[0]);
    });

    test('Should update titleTag and subheadTag if articlePosition is 0 and titleTag is not h1', () => {
        const cardConfig = [{ titleTag: 'h3', subheadTag: 'h4' }];

        const result = updatesTitleTag(cardConfig);
        expect(result).toEqual({ titleTag: 'h1', subheadTag: 'h2' });
    });
});

describe('Tests - function - deleteExtraH1', () => {
    test('should return undefined with no params', () => {
        const updatedConfig = deleteExtraH1();

        expect(updatedConfig).toBe(undefined);
    });

    test('should update titleTag to h2 and subheadTag to h3 if titleTag is h1', () => {
        const articlePosition = 0;
        const cardConfig = [
            { titleTag: 'h1', subheadTag: 'subhead' },
            { titleTag: 'h2', subheadTag: 'subhead' }
        ];

        const updatedConfig = deleteExtraH1(articlePosition, cardConfig);

        expect(updatedConfig).toEqual({
            titleTag: 'h2',
            subheadTag: 'h3'
        });
    });

    test('should not update titleTag and subheadTag if titleTag is not h1', () => {
        const articlePosition = 1;
        const cardConfig = [
            { titleTag: 'h2', subheadTag: 'subhead' },
            { titleTag: 'h3', subheadTag: 'subhead' }
        ];

        const updatedConfig = deleteExtraH1(articlePosition, cardConfig);

        expect(updatedConfig).toEqual({
            titleTag: 'h3',
            subheadTag: 'subhead'
        });
    });
});
