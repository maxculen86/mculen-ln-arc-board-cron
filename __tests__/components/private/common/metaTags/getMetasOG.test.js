import getMetasOG from '../../../../../components/private/common/metaTags/getMetasOG';
import getAssetsPath from '../../../../../components/private/common/utils/getAssetsPath';
import getMetaDescriptionForAcum from '../../../../../components/private/common/utils/getMetaDescriptionForAcum';

jest.mock('fusion:content', () => ({
    useContent: () => ({
        _id: '/',
        _website: 'la-nacion-ar',
        name: 'LA NACION',
        site: {
            site_url: null
        },
        children: [
            {
                _id: '/recetas',
                site: {
                    site_url: null
                },
                children: [
                    {
                        _id: '/recetas/carnes',
                        site: {
                            site_url: null
                        }
                    }
                ]
            }
        ]
    })
}));

describe('Common - getMetasOG function', () => {
    it('es una function', () => {
        expect(typeof getMetasOG).toEqual('function');
    });

    it('metas de tipo articulo', () => {
        const props = {
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

            siteProperties: {
                title: 'LA NACION',
                longTitle:
                    'Últimas noticias de Argentina y el mundo - LA NACION',
                description:
                    'odas las noticias de Argentina y el mundo: últimas noticias en actualidad, deportes, coronavirus, economía, política, y tecnología. Encontrá acá la receta de Arroz chaufa de mariscos - LA NACION',
                shareConfig: {
                    facebook: {
                        appID: '205326199490321'
                    }
                }
            },

            arcSite: 'la-nacion-ar',

            metaValue: function metaValue(name) {
                return name === 'title' ? 'Arroz chaufa de mariscos' : '';
            },

            contextPath: '/pf',
            deployment: function deployment() {
                return '$LATEST';
            },
            section: 'nota'
        };
        const metas = [
            {
                property: 'fb_app_id',
                content: '205326199490321'
            },
            {
                property: 'og:type',
                content: 'article'
            },
            {
                property: 'og:title',
                content: 'Arroz chaufa de mariscos'
            },
            {
                property: 'og:description',
                content: 'Encontrá acá la receta de Arroz chaufa de mariscos'
            },
            {
                property: 'og:image',
                content: `https://resizer.glanacion.com.ar/resizer/lBMqatupoieyG9OvjZ2Cu91TgVw=/768x513/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/GDAKALQ7IZBETO6NO4MUEDYBCU.jpg`
            },
            {
                property: 'og:url',
                content: `https://www.lanacion.com.ar/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/`
            },
            {
                property: 'article:published_time',
                content: '2021-01-08T15:24:00.940Z'
            },
            {
                content: 'LA NACION',
                property: 'og:site_name'
            }
        ];
        expect(getMetasOG(props)).toStrictEqual(metas);
    });

    it('metas de tipo website', () => {
        const props = {
            siteProperties: {
                title: 'LA NACION',
                shareConfig: {
                    facebook: {
                        appID: '205326199490321'
                    }
                }
            },
            metaValue: function metaValue(name) {
                if (name === 'title') return 'LA NACION';
                if (name === 'description') return 'Propiedades';
                return '';
            },
            contextPath: '/pf',
            deployment: function deployment() {
                return '$LATEST';
            },
            section: 'acumulado',
            arcSite: 'la-nacion-ar',
            metaDescription: 'Últimas Noticias de LA NACION'
        };

        const metas = [
            {
                property: 'fb_app_id',
                content: '205326199490321'
            },
            {
                property: 'og:type',
                content: 'website'
            },
            {
                property: 'og:title',
                content: 'LA NACION'
            },
            {
                property: 'og:description',
                content: 'Últimas Noticias de LA NACION'
            },
            {
                property: 'og:image',
                content: getAssetsPath(props.contextPath)(props.deployment)(
                    'placeholderLN.jpg'
                )
            },
            {
                property: 'og:url',
                content: 'https://www.lanacion.com.ar/'
            },
            {
                content: 'LA NACION',
                property: 'og:site_name'
            }
        ];

        expect(getMetasOG(props)).toStrictEqual(metas);
    });

    it('metas og de acumulado autor', () => {
        const props = {
            globalContent: {
                _id: 'EZYG5OEVH5HSJJCUMJO5XAHTTA',
                canonical_url: '/recetas/autor/javier-blanco-170/',
                node_type: 'author',
                name: 'Javier Blanco',
                website_url:
                    '/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/'
            },
            siteProperties: {
                title: 'LA NACION',
                shareConfig: {
                    facebook: {
                        appID: '205326199490321'
                    }
                }
            },
            arcSite: 'la-nacion-ar',
            metaValue: function metaValue(name) {
                return name === 'title' ? 'Javier Blanco' : '';
            },
            contextPath: '/pf',
            deployment: function deployment() {
                return '$LATEST';
            },
            metaDescription: 'Últimas Noticias de Javier Blanco'
        };

        const metas = [
            {
                property: 'fb_app_id',
                content: '205326199490321'
            },
            {
                property: 'og:type',
                content: 'website'
            },
            {
                property: 'og:title',
                content: 'Javier Blanco'
            },
            {
                property: 'og:description',
                content: 'Últimas Noticias de Javier Blanco'
            },
            {
                property: 'og:image',
                content: getAssetsPath(props.contextPath)(props.deployment)(
                    'placeholderLN.jpg'
                )
            },
            {
                property: 'og:url',
                content: `https://www.lanacion.com.ar/recetas/autor/javier-blanco-170/`
            }
        ];
        expect(getMetasOG(props)).toStrictEqual(metas);
    });
});
jest.mock('fusion:content', () => ({
    useContent: () => ({
        content_elements: [
            { headlines: { basic: 'Titulo Nota 1' } },
            { headlines: { basic: 'Titulo Nota 2' } }
        ]
    })
}));
describe('Common - getMetasOG function metaDescriptionForAcum', () => {
    it('metaDescriptionForAcum para Section', () => {
        const meteDescription = getMetaDescriptionForAcum(
            'Description',
            '/economia',
            undefined,
            'section',
            '',
            'la-nacion-ar'
        );
        expect(meteDescription).toEqual(
            'Description Titulo Nota 1, Titulo Nota 2'
        );
    });
});

describe('Metas home', () => {
    it('Test para el caso de que el metaValue sea undefined en metas de tipo website', () => {
        const props = {
            siteProperties: {
                title: 'LA NACION',
                description: 'Últimas Noticias de LA NACION',
                shareConfig: {
                    facebook: {
                        appID: '205326199490321'
                    }
                }
            },
            metaValue: function metaValue(name) {
                undefined;
            },
            contextPath: '/pf',
            deployment: function deployment() {
                return '$LATEST';
            },
            section: 'home',
            arcSite: 'la-nacion-ar'
        };

        const metas = [
            {
                property: 'fb_app_id',
                content: '205326199490321'
            },
            {
                property: 'og:type',
                content: 'website'
            },
            {
                property: 'og:title',
                content: ''
            },
            {
                property: 'og:description',
                content: 'Últimas Noticias de LA NACION'
            },
            {
                property: 'og:image',
                content: getAssetsPath(props.contextPath)(props.deployment)(
                    'placeholderLN.jpg'
                )
            },
            {
                property: 'og:url',
                content: 'https://www.lanacion.com.ar/'
            },
            {
                content: 'LA NACION',
                property: 'og:site_name'
            }
        ];

        expect(getMetasOG(props)).toStrictEqual(metas);
    });
});
