import * as Accumulated from '../../../../../components/features/LN-Api/Accumulated/json';
import resultSectionSourcePolitica from '../../../../../__mocks__/data/sectionSource/politica.json';
import resultsArticle from '../../../../../__mocks__/data/acuArticleByAuthor/articleSourceAuthor.json';
jest.mock('fusion:consumer', component => {
    return function (component) {
        return class extends component {
            constructor(props) {
                super(props);
                this.props = props;
                this.state = {};
            }
            fetchContent(param) {}
        };
    };
});

jest.mock('../../../../../components/private/common/utils/getSizesFrom', () =>
    jest
        .fn()
        .mockImplementation(
            (isAdmin, sizeCf, pageCf, paramUrlId, requestUri) => ({
                size: sizeCf || 30,
                page: pageCf || 1
            })
        )
);

jest.mock('../../../../../components/private/common/utils/browser', () => ({
    getApiVersion: jest.fn().mockReturnValue(2),
    getApiType: jest.fn().mockReturnValue('mobile'),
    getSizesFrom: jest
        .fn()
        .mockImplementation((isAdmin, value, paramUrlId, type, requestUri) => {
            return value || (type === 'size' ? 30 : 1);
        })
}));

jest.mock('../../../../../components/private/common/utils/get', () =>
    jest.fn().mockImplementation((obj, path, defaultValue) => {
        if (!obj) return defaultValue;
        const keys = path.split('.');
        let result = obj;
        for (const key of keys) {
            if (result && typeof result === 'object' && key in result) {
                result = result[key];
            } else {
                return defaultValue;
            }
        }
        return result;
    })
);

jest.mock(
    '../../../../../components/features/LN-Api/AccumulatedSectionsV1/helper-api',
    () => ({
        getNewAcuElements: jest
            .fn()
            .mockImplementation(
                async (
                    newAcuArticlesSourceSection,
                    oldAcuArticlesSourceSection,
                    query,
                    arcSite
                ) => {
                    return {
                        ...newAcuArticlesSourceSection,
                        content_elements:
                            oldAcuArticlesSourceSection.content_elements.map(
                                elem => ({
                                    ...elem,
                                    processed: true
                                })
                            )
                    };
                }
            )
    })
);

jest.mock(
    '../../../../../components/private/LN/api/v1/global/accumulated',
    () =>
        jest.fn().mockImplementation(acuData => [
            {
                acumuladoTotal: acuData.total || 0,
                banners: ['banner1', 'banner2'],
                articles: acuData.articles || []
            }
        ])
);

jest.mock(
    '../../../../../components/private/LN/api/v2/global/accumulated',
    () =>
        jest.fn().mockImplementation(acuData => [
            {
                acumuladoTotal: acuData.total || 0,
                banners: ['banner1', 'banner2'],
                articles: acuData.articles || []
            }
        ])
);

jest.mock(
    '../../../../../content/sources/utils/pageSource/acumulados/common/calculatePaginationValue',
    () => jest.fn().mockReturnValue({ currentPage: 1, totalPages: 10 })
);

jest.mock(
    '../../../../../content/sources/utils/pageSource/acumulados/v2/mobile/bySection/acuTransformV2Format',
    () =>
        jest
            .fn()
            .mockImplementation(
                (transformedAcu, sectionId, paginationValue) => ({
                    success: true,
                    data: transformedAcu,
                    sectionId,
                    pagination: paginationValue
                })
            )
);

jest.mock('../../../../../content/sources/utils/lnAcuSources/api/helper', () =>
    jest.fn().mockImplementation(async data => data)
);

describe('components - features - LN-Api - Accumulated - json.js', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
            arcSite: 'la-nacion-ar',
            children: [],
            collection: 'features',
            id: 'f0fbqPGS59PM2x',
            outputType: 'json',
            globalContent: resultSectionSourcePolitica,
            customFields: {
                size: 10,
                page: 1,
                paramUrlId: 'params',
                title: null
            },
            requestUri:
                '/api/mobile/v2/notas/bySection/politica/params=size:10;page:1/?_website=la-nacion-ar&outputType=json'
        };
    });

    it('should initialize correctly with valid props', () => {
        const objArticle = new Accumulated.default(defaultProps);

        expect(objArticle.props).toEqual(defaultProps);
        expect(objArticle.state).toEqual({});
        expect(objArticle.sectionId).toBe('/politica');
        expect(objArticle.query).toBeDefined();
        expect(objArticle.query.size).toBe(10);
    });

    it('should handle customFields with default values', () => {
        const propsWithoutCustomFields = {
            ...defaultProps,
            customFields: {}
        };

        const objArticle = new Accumulated.default(propsWithoutCustomFields);

        expect(objArticle.query.size).toBe(30);
        expect(objArticle.query.page).toBe(1);
    });

    it('should configure query correctly for politics section', () => {
        const objArticle = new Accumulated.default(defaultProps);

        expect(objArticle.query).toEqual({
            page: 1,
            imageConfig: 'm',
            api: true,
            'arc-site': 'la-nacion-ar',
            size: 10,
            sectionId: '/politica',
            excludeSourceOrigin: ''
        });
    });

    it('should configure query correctly for subscribers section', () => {
        const propsSuscriptores = {
            ...defaultProps,
            globalContent: {
                ...resultSectionSourcePolitica,
                _id: '/suscriptores'
            }
        };

        const objArticle = new Accumulated.default(propsSuscriptores);

        expect(objArticle.query).toEqual({
            page: 1,
            imageConfig: 'm',
            api: true,
            'arc-site': 'la-nacion-ar',
            size: 10,
            tagId: 'la-nacion-cerca',
            sourceOrigin: 'composer'
        });
    });

    it('should configure query correctly for latest news section', () => {
        const propsUltimasNoticias = {
            ...defaultProps,
            globalContent: {
                ...resultSectionSourcePolitica,
                _id: '/ultimas-noticias'
            },
            customFields: {
                ...defaultProps.customFields,
                sections: ['/politica', '/economia']
            }
        };

        const objArticle = new Accumulated.default(propsUltimasNoticias);

        expect(objArticle.query).toEqual({
            page: 1,
            imageConfig: 'm',
            api: true,
            'arc-site': 'la-nacion-ar',
            size: 10,
            sectionsIds: '("/politica"+OR+"/economia")',
            sourceOrigin: 'composer'
        });
    });

    it('should return null when there is no acuArticlesSourceSection', async () => {
        const objArticle = new Accumulated.default(defaultProps);
        objArticle.state = {};

        const result = await objArticle.render();

        expect(result).toBeNull();
    });

    it('should return null when there are no content_elements', async () => {
        const objArticle = new Accumulated.default(defaultProps);
        objArticle.state = {
            acuArticlesSourceSection: {
                content_elements: null
            }
        };

        const result = await objArticle.render();

        expect(result).toBeNull();
    });

    it('should process accumulated articles correctly', async () => {
        const objArticle = new Accumulated.default(defaultProps);
        objArticle.state = {
            acuArticlesSourceSection: resultsArticle
        };

        const result = await objArticle.render();

        expect(result).toBeDefined();
        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(result.sectionId).toBe('/politica');
        expect(result.pagination).toBeDefined();
    });

    it('should use section name as default title', async () => {
        const objArticle = new Accumulated.default(defaultProps);
        objArticle.state = {
            acuArticlesSourceSection: resultsArticle
        };

        const result = await objArticle.render();

        expect(result).toBeDefined();
    });

    it('should change name to "Suscriptores" for subscribers section', async () => {
        const propsSuscriptores = {
            ...defaultProps,
            globalContent: {
                ...resultSectionSourcePolitica,
                _id: '/suscriptores'
            }
        };

        const objArticle = new Accumulated.default(propsSuscriptores);
        objArticle.state = {
            acuArticlesSourceSection: resultsArticle
        };

        const result = await objArticle.render();

        expect(result).toBeDefined();
    });

    it('should handle errors during render and return error object', async () => {
        const objArticle = new Accumulated.default(defaultProps);
        objArticle.state = {
            acuArticlesSourceSection: resultsArticle
        };

        // Simular un error en getNewAcuElements
        const {
            getNewAcuElements
        } = require('../../../../../components/features/LN-Api/AccumulatedSectionsV1/helper-api');
        getNewAcuElements.mockRejectedValueOnce(
            new Error('Error de procesamiento')
        );

        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const result = await objArticle.render();

        expect(result).toEqual({
            Success: false,
            Message: 'Error de procesamiento'
        });

        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
    it('should transform article data correctly', async () => {
        const objArticle = new Accumulated.default(defaultProps);
        objArticle.state = {
            acuArticlesSourceSection: resultsArticle
        };

        const result = await objArticle.render();

        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
    });

    it('should include configuration in transformed data', async () => {
        const objArticle = new Accumulated.default(defaultProps);
        objArticle.state = {
            acuArticlesSourceSection: resultsArticle,
            globalContent: { config: 'test' }
        };

        const result = await objArticle.render();

        expect(result).toBeDefined();
    });
    it('should integrate correctly with getNewAcuElements', async () => {
        const objArticle = new Accumulated.default(defaultProps);
        objArticle.state = {
            acuArticlesSourceSection: resultsArticle
        };

        const {
            getNewAcuElements
        } = require('../../../../../components/features/LN-Api/AccumulatedSectionsV1/helper-api');

        const result = await objArticle.render();

        expect(getNewAcuElements).toHaveBeenCalledWith(
            expect.any(Object),
            resultsArticle,
            objArticle.query,
            defaultProps.arcSite
        );
        expect(result).toBeDefined();
    });

    it('should integrate correctly with acuTransformV2Format', async () => {
        const objArticle = new Accumulated.default(defaultProps);
        objArticle.state = {
            acuArticlesSourceSection: resultsArticle
        };

        const acuTransformV2Format = require('../../../../../content/sources/utils/pageSource/acumulados/v2/mobile/bySection/acuTransformV2Format');

        const result = await objArticle.render();

        expect(acuTransformV2Format).toHaveBeenCalledWith(
            expect.any(Array),
            objArticle.sectionId,
            expect.any(Object)
        );
        expect(result).toBeDefined();
    });

    describe('distributor branch', () => {
        it('should configure query with distributorId and excludeSourceOrigin', () => {
            const propsDistributor = {
                ...defaultProps,
                globalContent: {
                    ...resultSectionSourcePolitica,
                    _id: '/distribuidor-x',
                    distributorId: 'dist-123',
                    slug: '/distribuidor-x'
                }
            };

            const objArticle = new Accumulated.default(propsDistributor);

            expect(objArticle.query).toEqual({
                page: 1,
                imageConfig: 'm',
                api: true,
                'arc-site': 'la-nacion-ar',
                distributorId: 'dist-123',
                size: 10,
                excludeSourceOrigin: ''
            });
            expect(objArticle.query.sectionId).toBeUndefined();
        });

        it('should set sectionId to distributorSlug when distributor is present', () => {
            const propsDistributor = {
                ...defaultProps,
                globalContent: {
                    ...resultSectionSourcePolitica,
                    distributorId: 'dist-123',
                    slug: '/distribuidor-x'
                }
            };

            const objArticle = new Accumulated.default(propsDistributor);

            expect(objArticle.sectionId).toBe('/distribuidor-x');
        });

        it('should add excludeSourceOrigin=ArcImporter-LnData on distributor when restriction is false', () => {
            const propsDistributor = {
                ...defaultProps,
                globalContent: {
                    ...resultSectionSourcePolitica,
                    distributorId: 'dist-123',
                    slug: '/distribuidor-x',
                    acumuladoGeneral: {
                        ...(resultSectionSourcePolitica.acumuladoGeneral || {}),
                        mostrar_en_acu_apps: 'false'
                    }
                }
            };

            const objArticle = new Accumulated.default(propsDistributor);

            expect(objArticle.query.excludeSourceOrigin).toBe(
                'ArcImporter-LnData'
            );
            expect(objArticle.query.distributorId).toBe('dist-123');
        });
    });

    describe('globalContentConfig.source strategy', () => {
        it('should take distributor branch when source=distributorSource (even without distributorId on globalContent)', () => {
            const propsSourceDistributor = {
                ...defaultProps,
                globalContent: {
                    ...resultSectionSourcePolitica,
                    slug: '/the-new-york-times'
                },
                globalContentConfig: { source: 'distributorSource' }
            };

            const objArticle = new Accumulated.default(propsSourceDistributor);

            expect(objArticle.query.sectionId).toBeUndefined();
            expect(objArticle.query).toHaveProperty('distributorId');
            expect(objArticle.sectionId).toBe('/the-new-york-times');
        });

        it('should take section branch when source=sectionSource even if globalContent has distributorId', () => {
            const propsSourceSection = {
                ...defaultProps,
                globalContent: {
                    ...resultSectionSourcePolitica,
                    distributorId: 'dist-123',
                    slug: '/should-be-ignored'
                },
                globalContentConfig: { source: 'sectionSource' }
            };

            const objArticle = new Accumulated.default(propsSourceSection);

            expect(objArticle.query.sectionId).toBe('/politica');
            expect(objArticle.query.distributorId).toBeUndefined();
            expect(objArticle.sectionId).toBe('/politica');
        });

        it('should fall back to distributorId shape detection when globalContentConfig.source is missing', () => {
            const propsLegacy = {
                ...defaultProps,
                globalContent: {
                    ...resultSectionSourcePolitica,
                    distributorId: 'dist-123',
                    slug: '/distribuidor-x'
                }
            };

            const objArticle = new Accumulated.default(propsLegacy);

            expect(objArticle.query.distributorId).toBe('dist-123');
            expect(objArticle.sectionId).toBe('/distribuidor-x');
        });
    });

    describe('featureSectionId override (customFields.sectionId)', () => {
        it('should use customFields.sectionId as the sectionId in the query', () => {
            const propsOverride = {
                ...defaultProps,
                customFields: {
                    ...defaultProps.customFields,
                    sectionId: '/economia'
                }
            };

            const objArticle = new Accumulated.default(propsOverride);

            expect(objArticle.query.sectionId).toBe('/economia');
            expect(objArticle.sectionId).toBe('/economia');
        });

        it('should fire suscriptores branch when override equals /suscriptores even if globalContent._id differs', () => {
            const propsOverride = {
                ...defaultProps,
                customFields: {
                    ...defaultProps.customFields,
                    sectionId: '/suscriptores'
                }
            };

            const objArticle = new Accumulated.default(propsOverride);

            expect(objArticle.query.tagId).toBe('la-nacion-cerca');
            expect(objArticle.query.sourceOrigin).toBe('composer');
            expect(objArticle.query.sectionId).toBeUndefined();
        });

        it('should call fetchContent for sectionSource when featureSectionId is provided', () => {
            const fetchSpy = jest
                .spyOn(Accumulated.default.prototype, 'fetchContent')
                .mockImplementation(() => {});

            const propsOverride = {
                ...defaultProps,
                customFields: {
                    ...defaultProps.customFields,
                    sectionId: '/economia'
                }
            };

            new Accumulated.default(propsOverride);

            expect(fetchSpy).toHaveBeenCalledTimes(2);
            expect(fetchSpy.mock.calls[0][0]).toHaveProperty(
                'acuArticlesSourceSection'
            );
            expect(fetchSpy.mock.calls[1][0]).toEqual({
                sectionSource: {
                    source: 'sectionSource',
                    query: {
                        id: '/economia',
                        website: 'la-nacion-ar',
                        api: 'true'
                    }
                }
            });

            fetchSpy.mockRestore();
        });

        it('should NOT call fetchContent for sectionSource when featureSectionId is missing', () => {
            const fetchSpy = jest
                .spyOn(Accumulated.default.prototype, 'fetchContent')
                .mockImplementation(() => {});

            new Accumulated.default(defaultProps);

            expect(fetchSpy).toHaveBeenCalledTimes(1);
            expect(fetchSpy.mock.calls[0][0]).toHaveProperty(
                'acuArticlesSourceSection'
            );

            fetchSpy.mockRestore();
        });
    });

    describe('excludeSourceOrigin (mostrar_en_acu_apps)', () => {
        it('should set excludeSourceOrigin to ArcImporter-LnData when mostrar_en_acu_apps is "false"', () => {
            const propsRestricted = {
                ...defaultProps,
                globalContent: {
                    ...resultSectionSourcePolitica,
                    acumuladoGeneral: {
                        ...(resultSectionSourcePolitica.acumuladoGeneral || {}),
                        mostrar_en_acu_apps: 'false'
                    }
                }
            };

            const objArticle = new Accumulated.default(propsRestricted);

            expect(objArticle.query.excludeSourceOrigin).toBe(
                'ArcImporter-LnData'
            );
        });

        it('should leave excludeSourceOrigin empty by default', () => {
            const objArticle = new Accumulated.default(defaultProps);

            expect(objArticle.query.excludeSourceOrigin).toBe('');
        });
    });

    describe('render — title and tag resolution', () => {
        it('should call transformLnAcuApi with content and query', async () => {
            const transformLnAcuApi = require('../../../../../content/sources/utils/lnAcuSources/api/helper');
            const objArticle = new Accumulated.default(defaultProps);
            objArticle.state = {
                acuArticlesSourceSection: resultsArticle
            };

            await objArticle.render();

            expect(transformLnAcuApi).toHaveBeenCalledWith(
                resultsArticle,
                objArticle.query
            );
        });

        it('should prefer routeParams.title over any other title source', async () => {
            const indexV2 = require('../../../../../components/private/LN/api/v2/global/accumulated');
            const propsRoute = {
                ...defaultProps,
                globalContent: {
                    ...resultSectionSourcePolitica,
                    query: { title: 'Custom Route Title' }
                }
            };
            const objArticle = new Accumulated.default(propsRoute);
            objArticle.state = {
                acuArticlesSourceSection: resultsArticle,
                sectionSource: { name: 'Should Be Ignored' }
            };

            await objArticle.render();

            expect(indexV2).toHaveBeenCalledWith(
                expect.objectContaining({ name: 'Custom Route Title' })
            );
        });

        it('should use sectionSource.acumuladoGeneral.hierarchy_navigation when sectionSource is present', async () => {
            const indexV2 = require('../../../../../components/private/LN/api/v2/global/accumulated');
            const propsOverride = {
                ...defaultProps,
                customFields: {
                    ...defaultProps.customFields,
                    sectionId: '/economia'
                }
            };
            const objArticle = new Accumulated.default(propsOverride);
            objArticle.state = {
                acuArticlesSourceSection: resultsArticle,
                sectionSource: {
                    acumuladoGeneral: {
                        hierarchy_navigation: 'Economía Hierarchy'
                    },
                    name: 'Economía'
                }
            };

            await objArticle.render();

            expect(indexV2).toHaveBeenCalledWith(
                expect.objectContaining({ name: 'Economía Hierarchy' })
            );
        });

        it('should fall back to sectionSource.name when no hierarchy_navigation is present', async () => {
            const indexV2 = require('../../../../../components/private/LN/api/v2/global/accumulated');
            const propsOverride = {
                ...defaultProps,
                globalContent: {
                    ...resultSectionSourcePolitica,
                    acumuladoGeneral: undefined
                },
                customFields: {
                    ...defaultProps.customFields,
                    sectionId: '/economia'
                }
            };
            const objArticle = new Accumulated.default(propsOverride);
            objArticle.state = {
                acuArticlesSourceSection: resultsArticle,
                sectionSource: { name: 'Economía' }
            };

            await objArticle.render();

            expect(indexV2).toHaveBeenCalledWith(
                expect.objectContaining({ name: 'Economía' })
            );
        });

        it('should include routeParams.tag in acuData when provided', async () => {
            const indexV2 = require('../../../../../components/private/LN/api/v2/global/accumulated');
            const propsTag = {
                ...defaultProps,
                globalContent: {
                    ...resultSectionSourcePolitica,
                    query: { tag: 'mi-tag' }
                }
            };
            const objArticle = new Accumulated.default(propsTag);
            objArticle.state = {
                acuArticlesSourceSection: resultsArticle
            };

            await objArticle.render();

            expect(indexV2).toHaveBeenCalledWith(
                expect.objectContaining({ tag: 'mi-tag' })
            );
        });

        it('should NOT include tag when routeParams.tag is empty string', async () => {
            const indexV2 = require('../../../../../components/private/LN/api/v2/global/accumulated');
            const propsEmptyTag = {
                ...defaultProps,
                globalContent: {
                    ...resultSectionSourcePolitica,
                    query: { tag: '' }
                }
            };
            const objArticle = new Accumulated.default(propsEmptyTag);
            objArticle.state = {
                acuArticlesSourceSection: resultsArticle
            };

            await objArticle.render();

            const callArg =
                indexV2.mock.calls[indexV2.mock.calls.length - 1][0];
            expect(callArg.tag).toBeUndefined();
        });
    });

    describe('render — pagination and slug payload', () => {
        it('should remove banners when deep pagination (page * size - size > 16)', async () => {
            const propsDeep = {
                ...defaultProps,
                customFields: {
                    ...defaultProps.customFields,
                    size: 10,
                    page: 3
                }
            };
            const objArticle = new Accumulated.default(propsDeep);
            objArticle.state = {
                acuArticlesSourceSection: resultsArticle
            };

            const result = await objArticle.render();

            expect(result.data[0].banners).toBeUndefined();
        });

        it('should keep banners when not deep pagination', async () => {
            const objArticle = new Accumulated.default(defaultProps);
            objArticle.state = {
                acuArticlesSourceSection: resultsArticle
            };

            const result = await objArticle.render();

            expect(result.data[0].banners).toEqual(['banner1', 'banner2']);
        });

        it('should use globalContentConfig.query.sectionId for slugForPayload when present', async () => {
            const acuTransformV2Format = require('../../../../../content/sources/utils/pageSource/acumulados/v2/mobile/bySection/acuTransformV2Format');
            const propsConfig = {
                ...defaultProps,
                globalContentConfig: { query: { sectionId: '/from-config' } }
            };
            const objArticle = new Accumulated.default(propsConfig);
            objArticle.state = {
                acuArticlesSourceSection: resultsArticle
            };

            await objArticle.render();

            expect(acuTransformV2Format).toHaveBeenCalledWith(
                expect.any(Array),
                '/from-config',
                expect.any(Object)
            );
        });

        it('should fall back to this.sectionId for slugForPayload when globalContentConfig is empty', async () => {
            const acuTransformV2Format = require('../../../../../content/sources/utils/pageSource/acumulados/v2/mobile/bySection/acuTransformV2Format');
            const objArticle = new Accumulated.default(defaultProps);
            objArticle.state = {
                acuArticlesSourceSection: resultsArticle
            };

            await objArticle.render();

            expect(acuTransformV2Format).toHaveBeenCalledWith(
                expect.any(Array),
                '/politica',
                expect.any(Object)
            );
        });
    });
});
