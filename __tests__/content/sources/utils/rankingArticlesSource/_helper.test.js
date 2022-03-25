import {
    getAnalitycUrls,
    getCanonicalUrls,
    resolveUri,
    getQuery
    // transformData
} from '../../../../../content/sources/utils/rankingArticlesSource/_helper';
import config, {
    HOT_SECTION,
    COLD_SECTION,
    DEFAULT_SECTION
} from '../../../../../content/sources/utils/rankingArticlesSource/_config';
jest.mock('fusion:environment', () => {
    return {
        RANKING_URL: 'https://api.lanacionar.arcpublishing.com'
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
                title:
                    'Horóscopo: las predicciones de Jimena La Torre para la semana del 7 al 13 de febrero - LA NACION',
                url:
                    '/www.lanacion.com.ar/horoscopo/horoscopo-las-predicciones-de-jimena-la-torre-para-la-semana-del-7-al-13-de-febrero-nid07022022/'
            },
            {
                title: '(not set)',
                url:
                    '/www.lanacion.com.ar/deportes/futbol/joaquin-messi-el-juvenil-al-que-le-sugirieron-cambiar-el-apellido-para-no-cargar-con-tanta-presion-nid08022022/'
            },
            {
                title: '(not set)',
                url:
                    'https://www.lanacion.com.ar/economia/el-gobierno-suma-trabas-y-cierra-mas-el-acceso-que-tienen-las-empresas-a-los-dolares-nid07022022/?utm_source=n_&utm_medium=nl_titulares_del_dia&utm_campaign=nota_titulo_1'
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
                title:
                    'https://www.lanacion.com.ar/estados-unidos/semana-del-infierno-el-brutal-entrenamiento-de-los-marines-de-estados-unidos-en-el-que-murio-un-nid07022022/'
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
                        url: `https://www.lanacion.com.ar/economia/el-gobierno-suma-trabas-y-cierra-mas-el-acceso-que-tienen-las-empresas-a-los-dolares-nid07022022/${i +
                            1}/`
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
            'https://api.lanacionar.arcpublishing.com/content/v4/search/published?website=0&size=3&_sourceInclude=_id,subtype,promo_items.basic,headlines.basic,headlines.mobile,subheadlines,canonical_url,body,related_content,website_url,label&body=%7B%22query%22:%7B%22bool%22:%7B%22must%22:%5B%7B%22range%22:%7B%22first_publish_date%22:%7B%22gte%22:%222017-12-08T03:00:00.000Z%22,%22lte%22:%222017-12-08T03:00:00.000Z%22%7D%7D%7D,%7B%22term%22:%7B%22type%22:%22story%22%7D%7D,%7B%22exists%22:%7B%22field%22:%22promo_items.basic%22%7D%7D%5D,%22filter%22:%7B%22terms%22:%7B%22canonical_url%22:%5B%22/horoscopo/horoscopo-las-predicciones-de-jimena-la-torre-para-la-semana-del-7-al-13-de-febrero-nid07022022/%22,%22/deportes/futbol/joaquin-messi-el-juvenil-al-que-le-sugirieron-cambiar-el-apellido-para-no-cargar-con-tanta-presion-nid08022022/%22,%22/economia/el-gobierno-suma-trabas-y-cierra-mas-el-acceso-que-tienen-las-empresas-a-los-dolares-nid07022022/%22%5D%7D%7D%7D%7D%7D'
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

describe('function => transformData', () => {
    it('should return data with images resized', () => {});
});
