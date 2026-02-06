import {
    getAnalitycUrls,
    getCanonicalUrls,
    resolveUri,
    getQuery,
    sortData,
    transformData,
    getQueryData
} from '../../../../../content/sources/utils/rankingArticlesSource/_helper';
import config, {
    HOT_SECTION,
    COLD_SECTION,
    DEFAULT_SECTION
} from '../../../../../content/sources/utils/rankingArticlesSource/_config';
import getPresets from '../../../../../content/sources/utils/presets';
import * as images from '../../../../../content/sources/utils/signingServiceSource/getImagesAuth';
jest.mock('fusion:environment', () => {
    return {
        CONTENT_BASE: 'https://api.lanacionar.arcpublishing.com'
    };
});

describe('function => getAnalitycUrls', () => {
    it('when does not recive props or an empty object should return []', () => {
        expect(getAnalitycUrls()).toStrictEqual([]);
        expect(getAnalitycUrls({})).toStrictEqual([]);
    });

    it('when data has not stories should return []', () => {
        expect(getAnalitycUrls({ stories: [] })).toStrictEqual([]);
    });

    it('when data has stories should return only valid stories urls (excluding home, acus and query params)', () => {
        const validUrls = [
            {
                title: 'Horóscopo: las predicciones de Jimena La Torre para la semana del 7 al 13 de febrero - LA NACION',
                url: '/www.lanacion.com.ar/horoscopo/horoscopo-las-predicciones-de-jimena-la-torre-para-la-semana-del-7-al-13-de-febrero-nid07022022/'
            },
            {
                title: '(not set)',
                url: '/www.lanacion.com.ar/deportes/futbol/joaquin-messi-el-juvenil-al-que-le-sugirieron-cambiar-el-apellido-para-no-cargar-con-tanta-presion-nid08022022/'
            },
            {
                title: '(not set)',
                url: 'https://www.lanacion.com.ar/economia/el-gobierno-suma-trabas-y-cierra-mas-el-acceso-que-tienen-las-empresas-a-los-dolares-nid07022022/?utm_source=n_&utm_medium=nl_titulares_del_dia&utm_campaign=nota_titulo_1'
            }
        ];
        const invalidUrls = [
            {
                title: 'https://www.lanacion.com.ar/',
                url: '/www.lanacion.com.ar/'
            },
            ,
            {
                title: '(not set)',
                url: '/www.lanacion.com.ar/espectaculos/'
            },
            {
                title: 'https://www.lanacion.com.ar/estados-unidos/semana-del-infierno-el-brutal-entrenamiento-de-los-marines-de-estados-unidos-en-el-que-murio-un-nid07022022/'
            },
            {}
        ];
        const filteredStories = [
            '/horoscopo/horoscopo-las-predicciones-de-jimena-la-torre-para-la-semana-del-7-al-13-de-febrero-nid07022022/',
            '/deportes/futbol/joaquin-messi-el-juvenil-al-que-le-sugirieron-cambiar-el-apellido-para-no-cargar-con-tanta-presion-nid08022022/',
            '/economia/el-gobierno-suma-trabas-y-cierra-mas-el-acceso-que-tienen-las-empresas-a-los-dolares-nid07022022/'
        ];
        expect(
            getAnalitycUrls({
                createdDate: '2022-02-08T15:00:12.3975319-03:00',
                stories: [...validUrls, ...invalidUrls]
            })
        ).toStrictEqual(filteredStories);
    });
});

describe('function => getCanonicalUrls', () => {
    it.each([
        [50, 30],
        [30, 30],
        [5, 5],
        [0, 0]
    ])(
        'when data length is %p should return and array with %p items',
        (arg, expectedResult) => {
            expect(
                getCanonicalUrls({
                    stories: Array.from({ length: arg }, (_, i) => ({
                        url: `https://www.lanacion.com.ar/economia/el-gobierno-suma-trabas-y-cierra-mas-el-acceso-que-tienen-las-empresas-a-los-dolares-nid07022022/${
                            i + 1
                        }/`
                    }))
                })
            ).toHaveLength(expectedResult);
        }
    );
});

describe('function => resolveUri', () => {
    const mockedDate = new Date(2017, 11, 10);
    const originalDate = Date;

    global.Date = jest.fn(() => mockedDate);
    global.Date.setDate = originalDate.setDate;

    it('in production get the correct url', () => {
        const query = {
            arcSite: 'la-nacion-ar',
            days: 2,
            stories: [
                '/horoscopo/horoscopo-las-predicciones-de-jimena-la-torre-para-la-semana-del-7-al-13-de-febrero-nid07022022/',
                '/deportes/futbol/joaquin-messi-el-juvenil-al-que-le-sugirieron-cambiar-el-apellido-para-no-cargar-con-tanta-presion-nid08022022/',
                '/economia/el-gobierno-suma-trabas-y-cierra-mas-el-acceso-que-tienen-las-empresas-a-los-dolares-nid07022022/'
            ]
        };
        const uri = resolveUri(query);
        expect(uri).toBe(
            'https://api.lanacionar.arcpublishing.com/content/v4/search/published?website=0&size=3&_sourceInclude=_id,subtype,promo_items.basic,promo_items.audio_nota.embed.config.audio_status,headlines.basic,headlines.mobile,headlines.web,subheadlines,canonical_url,body,related_content,website_url,label,first_publish_date,display_date,source.system,label.republicar_audio, taxonomy.primary_section,planning&body=%7B%22query%22:%7B%22bool%22:%7B%22must%22:%5B%7B%22range%22:%7B%22first_publish_date%22:%7B%22gte%22:%222017-12-08T03:00:00.000Z%22,%22lte%22:%222017-12-08T03:00:00.000Z%22%7D%7D%7D,%7B%22term%22:%7B%22type%22:%22story%22%7D%7D,%7B%22exists%22:%7B%22field%22:%22promo_items.basic%22%7D%7D%5D,%22filter%22:%7B%22terms%22:%7B%22canonical_url%22:%5B%22/horoscopo/horoscopo-las-predicciones-de-jimena-la-torre-para-la-semana-del-7-al-13-de-febrero-nid07022022/%22,%22/deportes/futbol/joaquin-messi-el-juvenil-al-que-le-sugirieron-cambiar-el-apellido-para-no-cargar-con-tanta-presion-nid08022022/%22,%22/economia/el-gobierno-suma-trabas-y-cierra-mas-el-acceso-que-tienen-las-empresas-a-los-dolares-nid07022022/%22%5D%7D%7D%7D%7D%7D'
        );
    });
});

describe('function => getQuery', () => {
    it('when sectionId is undefined or "" should return "home"', () => {
        expect(getQuery()).toStrictEqual({
            endpoint: '/home',
            days: 1,
            name: '',
            size: 4
        });
        expect(getQuery('')).toStrictEqual({
            endpoint: '/home',
            days: 1,
            name: '',
            size: 4
        });
    });

    it('should return size 5 when layout is HomeLN10 (LN10-Home_Main)', () => {
        const sectionId = 'economia';
        const layout = 'LN10-Home_Main';
        const { size } = getQuery(sectionId, layout);
        expect(size).toBe(5);
    });

    it('should return size 4 when layout is not HomeLN10', () => {
        const sectionId = 'economia';
        const layout = 'LN-Home_Main';
        const { size } = getQuery(sectionId, layout);
        expect(size).toBe(4);
    });

    it('should return size 4 when layout is undefined', () => {
        const sectionId = 'economia';
        const { size } = getQuery(sectionId);
        expect(size).toBe(4);
    });

    describe('from ranking config file', () => {
        const daysBySection = {
            [HOT_SECTION]: 2,
            [COLD_SECTION]: 7,
            [DEFAULT_SECTION]: 1
        };

        it('should return the correct data for hot sections', () => {
            const sectionId = 'economia';
            const { endpoint, days, name, size } = getQuery(sectionId);
            const sectionConfig = config[sectionId];
            expect(endpoint).toBe(
                `/most-readed-by-sections?Sections=${sectionId}`
            );
            expect(days).toBe(daysBySection[sectionConfig.type]);
            expect(name).toBe(sectionConfig.name);
            expect(size).toBe(4);
        });

        it('should return the correct data for cold sections', () => {
            const sectionId = 'cultura';
            const { endpoint, days, name, size } = getQuery(sectionId);
            const sectionConfig = config[sectionId];
            expect(endpoint).toBe(
                `/most-readed-by-sections?Sections=${sectionId}`
            );
            expect(days).toBe(daysBySection[sectionConfig.type]);
            expect(name).toBe(sectionConfig.name);
            expect(size).toBe(4);
        });

        it('should return the correct data for home', () => {
            const sectionId = '';
            const { endpoint, days, name, size } = getQuery(sectionId);
            const sectionConfig = config.home;
            expect(endpoint).toBe('/home');
            expect(days).toBe(daysBySection[sectionConfig.type]);
            expect(name).toBe('');
            expect(size).toBe(4);
        });

        it('should return the correct data for missing sections', () => {
            const sectionId = 'nueva-seccion';
            const { endpoint, days, name, size } = getQuery(sectionId);
            const sectionConfig = config.home;
            expect(endpoint).toBe('/home');
            expect(days).toBe(daysBySection[sectionConfig.type]);
            expect(name).toBe('');
            expect(size).toBe(4);
        });
    });
});

jest.mock('../../../../../content/sources/utils/presets', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue({
        presets: { promo_items: {} },
        presetsDefault: {}
    })
}));

describe('function => transformData', () => {
    it('should transform data array with valid inputs', async () => {
        const mockData = [
            {
                headlines: { basic: 'Test' },
                promo_items: { basic: { url: 'test.jpg' } },
                website_url: '/test',
                subtype: 'article',
                label: {
                    republicar_audio: 'yes'
                }
            }
        ];
        const mockQuery = { section: 'commonRanking' };
        const mockCachedCall = jest.fn();

        const result = await transformData(mockData, mockQuery, mockCachedCall);

        expect(result).toHaveLength(1);
        expect(result[0].website_url).toBe('/test');
        expect(result[0].headlines).toBeDefined();
        expect(result[0].label.republicar_audio).toBe('yes');
    });

    it('should authenticate and resize images for each element', async () => {
        const mockData = [
            {
                promo_items: { basic: { url: 'test.jpg' } }
            }
        ];
        const mockQuery = { section: 'test' };

        const getAllImagesAuth = jest
            .spyOn(images, 'getAllImagesAuth')
            .mockResolvedValue({
                promo_items: { basic: { url: 'test.jpg', auth: { 1: 'hash' } } }
            });

        const result = await transformData(mockData, mockQuery, jest.fn());

        expect(result[0].promo_items.basic.auth).toBeDefined();
        expect(getAllImagesAuth).toHaveBeenCalled();
    });

    it('should use default presets when section is not commonRanking', async () => {
        const mockData = [{ promo_items: { basic: {} } }];
        const mockQuery = { section: 'other' };

        getPresets.mockReturnValueOnce({
            presets: { promo_items: { default: { sizes: [] } } },
            presetsDefault: {}
        });

        const result = await transformData(mockData, mockQuery, jest.fn());

        expect(result[0].promo_items).toBeDefined();
    });

    it('should return empty array when input data is empty', async () => {
        const emptyData = [];
        const mockQuery = { section: 'test' };

        const result = await transformData(emptyData, mockQuery, jest.fn());

        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    it('should handle missing query parameters', async () => {
        const mockData = [
            {
                headlines: { basic: 'Test' },
                promo_items: [{ text: 'i am a promo_item' }]
            }
        ];
        const emptyQuery = {};

        getPresets.mockReturnValueOnce({
            presets: { promo_items: { default: { sizes: [] } } },
            presetsDefault: {}
        });

        const result = await transformData(mockData, emptyQuery, jest.fn());

        expect(result).toHaveLength(1);
        expect(result[0].headlines).toBeDefined();
    });

    it('should handle missing website_url and use canonical_url', async () => {
        const mockData = [
            {
                headlines: { basic: 'Test' },
                canonical_url: '/canonical'
            }
        ];
        const mockQuery = { section: 'test' };

        const result = await transformData(mockData, mockQuery, jest.fn());

        expect(result[0].website_url).toBe('/canonical');
    });

    it('should handle website_url and ignore canonical_url', async () => {
        const mockData = [
            {
                headlines: { basic: 'Test' },
                canonical_url: '/canonical',
                website_url: '/originalWebsiteUrl'
            }
        ];
        const mockQuery = { section: 'test' };

        const result = await transformData(mockData, mockQuery, jest.fn());

        expect(result[0].website_url).not.toBe('/canonical');
        expect(result[0].website_url).toBe('/originalWebsiteUrl');
    });
});

describe('Función => sortData', () => {
    const articles = [
        { canonical_url: 'url1', title: 'Artículo 1' },
        { canonical_url: 'url2', title: 'Artículo 2' },
        { canonical_url: 'url3', title: 'Artículo 3' }
    ];

    const stories = ['url1', 'url2', 'url3'];

    test.each`
        description                                              | size | expected
        ${'It should return an empty array if the size is 0'}    | ${0} | ${[]}
        ${'It should return an empty array if stories is empty'} | ${2} | ${[]}
    `('$description', ({ size, expected }) => {
        const result = sortData(articles, [], size);
        expect(result).toEqual(expected);
    });

    test('It should return an array of articles with the specified size', () => {
        const result = sortData(articles, stories, 2);
        expect(result).toHaveLength(2);
    });

    test('It should return an array with articles corresponding to stories', () => {
        const result = sortData(articles, stories, 3);
        expect(result).toEqual(articles);
    });

    test('It should not include articles that do not match any story', () => {
        const customStories = ['url1', 'url4', 'url5'];
        const result = sortData(articles, customStories, 2);
        expect(result).toEqual([articles[0]]);
    });
});

describe('function => getQueryData', () => {
    it('Should receive correct data from the query and isApiFetch true', async () => {
        const mockQuery = {
            sectionId: 'deportes/futbol',
            size: 6,
            imageConfig: 'boxArticles',
            api: true
        };

        const result = await getQueryData(mockQuery);

        expect(result.name).toBe('Fútbol');
        expect(result.isApiFetch).toBeTruthy();
        expect(result.sectionId).toBe('deportes/futbol');
        expect(result.size).toBe(4);
    });

    it('Should receive correct data from the query and isApiFetch false', async () => {
        const mockQuery = {
            sectionId: 'deportes/futbol',
            size: 6,
            imageConfig: 'boxArticles'
        };

        const result = await getQueryData(mockQuery);

        expect(result.name).toBe('Fútbol');
        expect(result.isApiFetch).toBeFalsy();
        expect(result.sectionId).toBe('deportes/futbol');
        expect(result.size).toBe(4);
    });
});
