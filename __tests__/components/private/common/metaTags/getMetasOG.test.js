import getMetasOG from '../../../../../components/private/common/metaTags/getMetasOG';
import Context from 'fusion:context';
import getAssetsPath from '../../../../../components/private/common/utils/getAssetsPath';
import getMetaDescriptionForAcum from '../../../../../components/private/common/utils/getMetaDescriptionForAcum';
import { RECETA } from '../../../../../components/private/common/utils/subtypes/subtypeHelper';

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

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar',
        SITE_LANACION: 'https://www.lanacion.com.ar',
        ARC_STATIC: 'https://arc-static.glanacion.com'
    };
});

describe('Common - getMetasOG function', () => {
    it('es una function', () => {
        expect(typeof getMetasOG).toEqual('function');
    });

    it('metas de tipo articulo', () => {
        const props = {
            title: 'Receta de arroz chaufa de mariscos - LA NACION',
            subtype: RECETA,
            globalContent: {
                _id: 'EZYG5OEVH5HSJJCUMJO5XAHTTA',
                canonical_url:
                    '/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/',
                headlines: { basic: 'Arroz chaufa de mariscos' },
                promo_items: {
                    basic: {
                        type: 'image',
                        url: 'https://resizer.glanacion.com.ar/resizer/lBMqatupoieyG9OvjZ2Cu91TgVw=/768x513/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/GDAKALQ7IZBETO6NO4MUEDYBCU.jpg',
                        width: 768,
                        height: 512,
                        additional_properties: {
                            mime_type: 'image/png'
                        },
                        caption: 'Receta de arroz chaufa de mariscos'
                    },
                    receta: {}
                },
                publish_date: '2021-01-08T15:24:00.940Z',
                first_publish_date: '2021-01-08T15:24:00.940Z',
                last_updated_date: '2021-01-08T15:24:00.940Z',
                subheadlines: { basic: '' },
                subtype: '7',
                type: 'story',
                website_url:
                    '/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/',
                credits: {
                    by: [{ name: 'Carlos Pagni' }]
                },
                taxonomy: {
                    tags: [{ text: 'Odisea Argentina' }],
                    primary_section: { name: 'Receta' }
                }
            },

            siteProperties: {
                title: 'LA NACION',
                longTitle:
                    'Últimas noticias de Argentina y el mundo - LA NACION',
                description:
                    'odas las noticias de Argentina y el mundo: últimas noticias en actualidad, deportes, coronavirus, economía, política, y tecnología. Encontrá acá la receta de Arroz chaufa de mariscos - LA NACION',
                shareConfig: {
                    facebook: {
                        appID: '154042854349421'
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
                property: 'fb:app_id',
                content: '154042854349421'
            },
            {
                property: 'og:type',
                content: 'article'
            },
            {
                property: 'og:title',
                content: 'Receta de arroz chaufa de mariscos - LA NACION'
            },
            {
                property: 'og:description',
                content: 'Encontrá acá la receta de Arroz chaufa de mariscos'
            },
            {
                property: 'og:locale',
                content: 'es_AR'
            },
            {
                property: 'og:image',
                content:
                    'https://resizer.glanacion.com.ar/resizer/lBMqatupoieyG9OvjZ2Cu91TgVw=/768x513/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/GDAKALQ7IZBETO6NO4MUEDYBCU.jpg?width=1200&height=800'
            },

            {
                property: 'og:image:type',
                content: 'image/png'
            },
            {
                property: 'og:image:alt',
                content: 'Receta de arroz chaufa de mariscos'
            },
            {
                property: 'og:image:width',
                content: '1200'
            },
            {
                property: 'og:image:height',
                content: '800'
            },
            {
                property: 'og:url',
                content: `https://www.lanacion.com.ar/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/`
            },
            {
                content: 'LA NACION',
                property: 'og:site_name'
            },
            {
                property: 'article:published_time',
                content: '2021-01-08T15:24:00.940Z'
            },
            {
                property: 'article:modified_time',
                content: '2021-01-08T15:24:00.940Z'
            },
            {
                property: 'article:section',
                content: 'Receta'
            },
            {
                property: 'article:author',
                content: 'Carlos Pagni'
            },
            {
                property: 'article:tag',
                content: 'Odisea Argentina'
            },
            {
                name: 'twitter:image',
                content:
                    'https://resizer.glanacion.com.ar/resizer/lBMqatupoieyG9OvjZ2Cu91TgVw=/768x513/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/GDAKALQ7IZBETO6NO4MUEDYBCU.jpg?width=1200&height=800'
            },
            {
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                name: 'twitter:title',
                content: 'Receta de arroz chaufa de mariscos - LA NACION'
            },
            {
                name: 'twitter:description',
                content: 'Encontrá acá la receta de Arroz chaufa de mariscos'
            },
            {
                name: 'twitter:site',
                content: '@LANACION'
            },
            {
                name: 'twitter:creator',
                content: '@LANACION'
            },
            {
                name: 'twitter:domain',
                content: 'lanacion.com.ar'
            },
            {
                name: 'twitter:url',
                content:
                    'https://www.lanacion.com.ar/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/'
            }
        ];

        expect(getMetasOG(props)).toStrictEqual(metas);
    });

    it('metas de tipo website', () => {
        const props = {
            title: 'Últimas noticias de Argentina y el mundo',
            siteProperties: {
                title: 'LA NACION',
                shareConfig: {
                    facebook: {
                        appID: '154042854349421'
                    }
                }
            },
            metaValue: function metaValue(name) {
                if (name === 'title') return 'LA NACION';
                if (name === 'description') return 'Propiedades';
                return '';
            },
            contextPath: '/pf',
            deployment: function deployment(value) {
                return value;
            },
            section: 'acumulado',
            arcSite: 'la-nacion-ar',
            metaDescription: 'Últimas Noticias de LA NACION',
            globalContentConfig: {
                query: {
                    id: '/'
                }
            }
        };

        const metas = [
            {
                property: 'fb:app_id',
                content: '154042854349421'
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
                property: 'og:locale',
                content: 'es_AR'
            },
            {
                property: 'og:image',
                content: getAssetsPath(props.contextPath)(props.deployment)(
                    'placeholderLN-1200x630.png'
                )
            },
            {
                property: 'og:image:type',
                content: 'image/png'
            },
            {
                property: 'og:image:alt',
                content: 'Placeholder de LA NACION'
            },
            {
                property: 'og:image:width',
                content: '1200'
            },
            {
                property: 'og:image:height',
                content: '630'
            },
            {
                property: 'og:url',
                content: 'https://www.lanacion.com.ar/'
            },
            {
                content: 'LA NACION',
                property: 'og:site_name'
            },
            {
                name: 'twitter:image',
                content: getAssetsPath(props.contextPath)(props.deployment)(
                    'placeholderLN-1200x630.png'
                )
            },
            {
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                name: 'twitter:title',
                content: 'LA NACION'
            },
            {
                name: 'twitter:description',
                content: 'Últimas Noticias de LA NACION'
            },
            {
                name: 'twitter:site',
                content: '@LANACION'
            },
            {
                name: 'twitter:creator',
                content: '@LANACION'
            },
            {
                name: 'twitter:domain',
                content: 'lanacion.com.ar'
            },
            {
                name: 'twitter:url',
                content: 'https://www.lanacion.com.ar/'
            }
        ];

        expect(getMetasOG(props)).toStrictEqual(metas);
    });

    it('metas og de acumulado autor', () => {
        const props = {
            title: 'Javier Blanco',
            globalContent: {
                _id: 'EZYG5OEVH5HSJJCUMJO5XAHTTA',
                canonical_url: '/recetas/autor/javier-blanco-170/',
                node_type: 'author',
                firstName: 'Javier',
                lastName: 'Blanco',
                middleName: '',
                name: 'Javier Blanco',
                website_url:
                    '/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/'
            },
            siteProperties: {
                title: 'LA NACION',
                shareConfig: {
                    facebook: {
                        appID: '154042854349421'
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
            metaDescription: 'Últimas Noticias de Javier Blanco',
            globalContentConfig: {
                query: {
                    _id: 'javier-blanco-slug'
                }
            }
        };

        const metas = [
            { property: 'fb:app_id', content: '154042854349421' },
            { property: 'og:type', content: 'profile' },
            { property: 'og:title', content: 'Javier Blanco' },
            {
                property: 'og:description',
                content: 'Últimas Noticias de Javier Blanco'
            },
            { property: 'og:locale', content: 'es_AR' },
            {
                property: 'og:image',
                content: getAssetsPath(props.contextPath)(props.deployment)(
                    'placeholderLN-1200x630.jpg'
                )
            },
            { property: 'og:image:type', content: 'image/png' },
            { property: 'og:image:alt', content: 'Placeholder de LA NACION' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            {
                property: 'og:url',
                content:
                    'https://www.lanacion.com.ar/recetas/autor/javier-blanco-170/'
            },
            { property: 'profile:first_name', content: 'Javier' },
            { property: 'profile:last_name', content: 'Blanco' },
            { property: 'profile:username', content: 'javier-blanco-slug' },
            {
                name: 'twitter:image',
                content: getAssetsPath(props.contextPath)(props.deployment)(
                    'placeholderLN-1200x630.jpg'
                )
            },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'Javier Blanco' },
            {
                name: 'twitter:description',
                content: 'Últimas Noticias de Javier Blanco'
            },
            { name: 'twitter:site', content: '@LANACION' },
            { name: 'twitter:creator', content: '@LANACION' },
            { name: 'twitter:domain', content: 'lanacion.com.ar' },
            {
                name: 'twitter:url',
                content:
                    'https://www.lanacion.com.ar/recetas/autor/javier-blanco-170/'
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
        Context.useAppContext = jest.fn(() => ({
            globalContent: {},
            arcSite: 'la-nacion-ar'
        }));
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
                        appID: '154042854349421'
                    }
                }
            },
            metaValue: function metaValue(name) {
                undefined;
            },
            contextPath: '/pf',
            deployment: function deployment(value) {
                return value;
            },
            section: 'home',
            arcSite: 'la-nacion-ar',
            globalContentConfig: {
                query: {
                    id: '/'
                }
            }
        };

        const metas = [
            {
                property: 'fb:app_id',
                content: '154042854349421'
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
                property: 'og:locale',
                content: 'es_AR'
            },
            {
                property: 'og:image',
                content: getAssetsPath(props.contextPath)(props.deployment)(
                    'placeholderLN-1200x630.png'
                )
            },
            {
                property: 'og:image:type',
                content: 'image/png'
            },
            {
                property: 'og:image:alt',
                content: 'Placeholder de LA NACION'
            },
            {
                property: 'og:image:width',
                content: '1200'
            },
            {
                property: 'og:image:height',
                content: '630'
            },
            {
                property: 'og:url',
                content: 'https://www.lanacion.com.ar/'
            },
            {
                content: 'LA NACION',
                property: 'og:site_name'
            },
            {
                name: 'twitter:image',
                content: getAssetsPath(props.contextPath)(props.deployment)(
                    'placeholderLN-1200x630.png'
                )
            },
            {
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                name: 'twitter:title',
                content: ''
            },
            {
                name: 'twitter:description',
                content: 'Últimas Noticias de LA NACION'
            },
            {
                name: 'twitter:site',
                content: '@LANACION'
            },
            {
                name: 'twitter:creator',
                content: '@LANACION'
            },
            {
                name: 'twitter:domain',
                content: 'lanacion.com.ar'
            },
            {
                name: 'twitter:url',
                content: 'https://www.lanacion.com.ar/'
            }
        ];

        expect(getMetasOG(props)).toStrictEqual(metas);
    });
});
