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
        expect(objArticle.sizeCf).toBe(10);
        expect(objArticle.sectionId).toBe('/politica');
        expect(objArticle.query).toBeDefined();
    });

    it('should handle customFields with default values', () => {
        const propsWithoutCustomFields = {
            ...defaultProps,
            customFields: {}
        };

        const objArticle = new Accumulated.default(propsWithoutCustomFields);

        expect(objArticle.sizeCf).toBe(30); // valor por defecto
    }); //

    it('should configure query correctly for politics section', () => {
        const objArticle = new Accumulated.default(defaultProps);

        expect(objArticle.query).toEqual({
            page: 1,
            imageConfig: 'm',
            api: true,
            'arc-site': 'la-nacion-ar',
            apiTransform: 'transformLnAcuApi',
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
            apiTransform: 'transformLnAcuApi',
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
            apiTransform: 'transformLnAcuApi',
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
});
