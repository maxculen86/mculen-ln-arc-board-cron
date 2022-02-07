import {
    getAppId,
    getUrl,
    setMetaDescription,
    getData,
    validateTitle,
    getDescription
} from '../../../../../components/private/common/utils/getMetasOGHelper';

describe('Test return functions by getMetasOGHelper', () => {
    it('Test return default function getAppId', () => {
        const siteProperties = undefined;
        expect(getAppId(siteProperties)).toStrictEqual(undefined);
    });
    it('Test function getUrl', () => {
        const domain = 'https://www.lanacion.com.ar/';
        const url = '/el-mundo/un-argentino-contrajo-coronavirus';
        expect(getUrl(true, url, domain)).toStrictEqual(
            'https://www.lanacion.com.ar//el-mundo/un-argentino-contrajo-coronavirus/'
        );
    });

    it('Test return getDescription', () => {
        const props = {
            isArticle: false,
            subheadlinesBasic: 'Todas las noticias de Argentina y el mundo',
            section: 'nota',
            descriptionDefault: 'La nacion',
            metaDescription: 'Ultimas noticias de Argentina y el mundo.'
        };
        expect(getDescription(props)).toStrictEqual(
            'Ultimas noticias de Argentina y el mundo.'
        );
    });
    it('Test return validateTitle', () => {
        const longTitle = 'La Nacion';
        const titleDefault = 'Ultimas noticias en Argentina y El mundo';
        const section = 'home';
        expect(validateTitle(section, longTitle, titleDefault)).toStrictEqual(
            'La Nacion'
        );
    });

    it('Test return function setMetaDescription', () => {
        const data = {
            subtype: 5,
            description: '',
            title: 'Ultimas noticias de Argentina y el Mundo'
        };

        expect(setMetaDescription(data, 'nota')).toStrictEqual(
            'Ultimas noticias de Argentina y el Mundo'
        );
    });

    it('Test return function setMetaDescription subtype RECETA', () => {
        const data = {
            subtype: '7',
            description: 'Preparacion de arroz chaufa de mariscos',
            title: 'Arroz chaufa de mariscos'
        };

        expect(setMetaDescription(data, 'nota')).toStrictEqual(
            'Preparacion de arroz chaufa de mariscos. Encontrá acá la receta de Arroz chaufa de mariscos'
        );
    });

    it('Test return function setMetaDescription subtype RECETA and description string empty', () => {
        const data = {
            subtype: '7',
            description: '',
            title: 'Arroz chaufa de mariscos'
        };

        expect(setMetaDescription(data, 'nota')).toStrictEqual(
            'Encontrá acá la receta de Arroz chaufa de mariscos'
        );
    });

    it('Test return function setMetaDescription subtype !== RECETA and description string != empty', () => {
        const data = {
            subtype: '8',
            description: 'El mundo',
            title: ''
        };

        expect(setMetaDescription(data, 'nota')).toStrictEqual('El mundo');
    });

    it('Test return default function setMetaDescription', () => {
        const data = {
            subtype: 5,
            description:
                'Todas las noticias de Argentina y el mundo en La Nacion',
            title: 'Ultimas noticias de Argentina y el Mundo'
        };

        expect(setMetaDescription(data, 'home')).toStrictEqual(
            'Todas las noticias de Argentina y el mundo en La Nacion'
        );
    });
});

describe('Case return getData', () => {
    const props = {
        siteProperties: {
            title: 'Noticias en La Nacion',
            description: 'Ultimas noticias de Argentina y el mundo',
            longTitle: 'La Nacion',
            shareConfig: {
                facebook: {
                    appID: '205326199490321'
                }
            }
        },
        globalContent: {
            _id: 'EZYG5OEVH5HSJJCUMJO5XAHTTA',
            canonical_url:
                '/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/',
            headlines: { basic: 'Arroz chaufa de mariscos' },
            promo_items: {
                basic: {
                    type: 'image',
                    url:
                        'https://resizer.glanacion.com.ar/resizer/lBMqatupoieyG9OvjZ2Cu91TgVw=/768x513/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/GDAKALQ7IZBETO6NO4MUEDYBCU.jpg'
                },
                receta: {}
            },
            publish_date: '2021-01-08T15:24:00.940Z',
            subheadlines: { basic: '' },
            subtype: '7',
            type: 'story',
            website_url:
                '/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/'
        },
        metaValue: function metaValue(name) {
            return name === 'title' ? 'Arroz chaufa de mariscos' : '';
        },

        contextPath: '/pf',
        deployment: function deployment() {
            return '$LATEST';
        },
        section: 'nota'
    };
    it('Test return function getData', () => {
        expect(getData(props)).toStrictEqual({
            type: 'article',
            title: 'Arroz chaufa de mariscos',
            description: '',
            image:
                'https://resizer.glanacion.com.ar/resizer/lBMqatupoieyG9OvjZ2Cu91TgVw=/768x513/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/GDAKALQ7IZBETO6NO4MUEDYBCU.jpg',
            url:
                'https://www.lanacion.com.ar/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/',
            fbAppId: '205326199490321',
            isArticle: true,
            publishDate: '2021-01-08T15:24:00.940Z',
            tier: 'metered',
            subtype: '7'
        });
    });

    it('Test return function getData section home', () => {
        const properties = {
            ...props,
            globalContent: {
                ...props.globalContent,
                canonical_url: undefined,
                headlines: { basic: 'Ultimas noticias La Nacion' },
                promo_items: {},
                subheadlines: { basic: '' },
                type: 'website'
            },
            metaValue: function metaValue(name) {
                return undefined;
            },
            section: 'home'
        };
        expect(getData(properties)).toStrictEqual({
            type: 'website',
            title: 'La Nacion',
            description: 'Ultimas noticias de Argentina y el mundo',
            image: 'undefined$LATEST',
            url: 'https://www.lanacion.com.arEZYG5OEVH5HSJJCUMJO5XAHTTA/',
            fbAppId: '205326199490321',
            isArticle: false,
            subtype: '7'
        });
    });

    it('Test return getData globalContent undefined', () => {
        const props = {
            siteProperties: {
                title: 'Noticias en La Nacion',
                description: 'Ultimas noticias de Argentina y el mundo',
                longTitle: 'La Nacion'
            },

            metaValue: function metaValue(name) {
                return undefined;
            },

            deployment: function deployment() {
                return '$LATEST';
            }
        };

        expect(getData(props)).toStrictEqual({
            description: undefined,
            fbAppId: '',
            image: 'undefined$LATEST',
            isArticle: false,
            subtype: undefined,
            title: 'Noticias en La Nacion',
            type: 'website',
            url: 'https://www.lanacion.com.ar'
        });
    });
});
