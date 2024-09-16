import {
    getAppId,
    getUrl,
    setMetaDescription,
    getData,
    validateTitle,
    getDescription,
    getImageProps
} from '../../../../../components/private/common/utils/getMetasOGHelper';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        arcSite: 'la-nacion-ar'
    }))
}));

describe('Test return functions by getMetasOGHelper', () => {
    it('Test return default function getAppId', () => {
        const siteProperties = undefined;
        expect(getAppId(siteProperties)).toStrictEqual(undefined);
    });
    it('Test function getUrl', () => {
        const domain = 'https://www.lanacion.com.ar/';
        const url = '/el-mundo/un-argentino-contrajo-coronavirus';
        expect(getUrl(url, domain)).toStrictEqual(
            'https://www.lanacion.com.ar//el-mundo/un-argentino-contrajo-coronavirus/'
        );
    });

    it('Test return getDescription', () => {
        const props = {
            isArticle: false,
            subheadlinesBasic: 'Todas las noticias de Argentina y el mundo',
            section: 'nota',
            descriptionDefault: 'La nacion',
            metaDescription: 'Ultimas noticias de Argentina y el mundo.',
            arcSite: 'la-nacion-ar'
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
        const props = {
            data: {
                subtype: 6,
                description: '',
                title: 'Ultimas noticias de Argentina y el Mundo'
            },
            arcSite: 'la-nacion-ar',
            section: 'nota'
        };

        expect(setMetaDescription(props)).toStrictEqual(
            'Ultimas noticias de Argentina y el Mundo'
        );
    });

    it('Test return function setMetaDescription subtype RECETA', () => {
        const props = {
            data: {
                subtype: '7',
                description: 'Preparacion de arroz chaufa de mariscos',
                title: 'Arroz chaufa de mariscos',
                arcSite: 'la-nacion-ar'
            },
            arcSite: 'la-nacion-ar',
            section: 'nota'
        };

        expect(setMetaDescription(props)).toStrictEqual(
            'Preparacion de arroz chaufa de mariscos. Encontrá acá la receta de Arroz chaufa de mariscos'
        );
    });

    it('Test return function setMetaDescription subtype RECETA and description string empty', () => {
        const props = {
            data: {
                subtype: '7',
                description: '',
                title: 'Arroz chaufa de mariscos',
                arcSite: 'la-nacion-ar'
            },
            arcSite: 'la-nacion-ar',
            section: 'nota'
        };

        expect(setMetaDescription(props)).toStrictEqual(
            'Encontrá acá la receta de Arroz chaufa de mariscos'
        );
    });

    it('Test return function setMetaDescription subtype !== RECETA and description string != empty', () => {
        const props = {
            data: {
                subtype: '8',
                description: 'El mundo',
                title: ''
            },
            arcSite: 'la-nacion-ar',
            section: 'nota'
        };

        expect(setMetaDescription(props)).toStrictEqual('El mundo');
    });

    it('Test return default function setMetaDescription', () => {
        const props = {
            data: {
                subtype: 5,
                description:
                    'Todas las noticias de Argentina y el mundo en La Nacion',
                title: 'Ultimas noticias de Argentina y el Mundo'
            },
            arcSite: 'la-nacion-ar',
            section: 'home'
        };

        expect(setMetaDescription(props)).toStrictEqual(
            'Todas las noticias de Argentina y el mundo en La Nacion'
        );
    });

    it('Test return default function setMetaDescription ott', () => {
        const props = {
            arcSite: 'ott',
            ottMetaDescription:
                'Ingresá a LN+ para ver todos los programas y videos online: La Cornisa, Odisea Argentina, El diario de Leuco, Mesa chica y mucho más!'
        };

        expect(setMetaDescription(props)).toStrictEqual(
            props.ottMetaDescription
        );
    });

    it('Test return function setMetaDescription subtype VIDEO without description', () => {
        const props = {
            data: {
                subtype: '5',
                description: '',
                title: 'El titulo del video',
                arcSite: 'la-nacion-ar',
                displayDate: '2024-01-09T19:22:33.461Z'
            },
            arcSite: 'la-nacion-ar',
            section: 'nota'
        };

        expect(setMetaDescription(props)).toStrictEqual(
            'Video de El titulo del video - 09/01/2024'
        );
    });
    it('Test return function setMetaDescription subtype VIDEO with description', () => {
        const props = {
            data: {
                subtype: '5',
                description: 'La descripcion del video',
                title: 'El titulo del video',
                arcSite: 'la-nacion-ar',
                displayDate: '2024-01-09T19:22:33.461Z'
            },
            arcSite: 'la-nacion-ar',
            section: 'nota'
        };

        expect(setMetaDescription(props)).toStrictEqual(
            'La descripcion del video'
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
                    appID: '154042854349421'
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
            display_date: '2021-01-08T15:24:00.940Z',
            first_publish_date: '2021-01-08T15:24:00.940Z',
            last_updated_date: '2021-01-08T15:24:00.940Z',
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
            displayDate: '2021-01-08T15:24:00.940Z',
            image: {
                url:
                    'https://resizer.glanacion.com.ar/resizer/lBMqatupoieyG9OvjZ2Cu91TgVw=/768x513/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/GDAKALQ7IZBETO6NO4MUEDYBCU.jpg',
                width: '768',
                height: '512'
            },
            url:
                'https://www.lanacion.com.ar/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/',
            fbAppId: '154042854349421',
            isArticle: true,
            publishDate: '2021-01-08T15:24:00.940Z',
            firstPublishDate: '2021-01-08T15:24:00.940Z',
            lastUpdatedDate: '2021-01-08T15:24:00.940Z',
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
            image: {
                url: 'undefined$LATEST',
                width: '192',
                height: '192'
            },
            url: 'https://www.lanacion.com.arEZYG5OEVH5HSJJCUMJO5XAHTTA/',
            fbAppId: '154042854349421',
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
            image: {
                url: 'undefined$LATEST',
                width: '192',
                height: '192'
            },
            isArticle: false,
            subtype: undefined,
            title: 'Noticias en La Nacion',
            type: 'website',
            url: 'https://www.lanacion.com.ar'
        });
    });
});

describe('Case return getImageProps', () => {
    it('if acuOgImage object exists', () => {
        const acuOgImg = {
            url:
                'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/7Y2TB3CA3VAUFPUPWJSKH7HIFI.png',
            height: '800',
            width: '800'
        };

        expect(getImageProps(acuOgImg, {}, '')).toEqual(acuOgImg);
    });

    it('if acuOgImage object does not exist and promoItemsBasic exists', () => {
        const promoItemsBasic = {
            url:
                'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/7Y2TB3CA3VAUFPUPWJSKH7HIFI.png',
            type: 'image',
            height: '800',
            width: '800'
        };
        const output = {
            url: promoItemsBasic.url,
            width: '768',
            height: '512'
        };
        expect(getImageProps({}, promoItemsBasic, '')).toEqual(output);
    });

    it('by default, it returns the placeholder', () => {
        const output = {
            url: 'placeholder',
            width: '192',
            height: '192'
        };
        expect(getImageProps({}, {}, 'placeholder')).toEqual(output);
    });
});
