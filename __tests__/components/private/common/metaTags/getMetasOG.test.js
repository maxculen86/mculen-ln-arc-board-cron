import { SITE_LANACION } from 'fusion:environment';
import getMetasOG from '../../../../../components/private/common/metaTags/getMetasOG';
import getAssetsPath from '../../../../../components/private/common/utils/getAssetsPath';

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
                            '/resizer/lBMqatupoieyG9OvjZ2Cu91TgVw=/768x513/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/GDAKALQ7IZBETO6NO4MUEDYBCU.jpg'
                    },
                    receta: {}
                },
                subheadlines: { basic: '' },
                subtype: '7',
                type: 'story',
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
            metaValue: function metaValue(name) {
                return name === 'title' ? 'Arroz chaufa de mariscos' : '';
            },
            contextPath: '/pf',
            deployment: function deployment() {
                return '$LATEST';
            }
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
                content: ''
            },
            {
                property: 'og:image',
                content: `/resizer/lBMqatupoieyG9OvjZ2Cu91TgVw=/768x513/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/GDAKALQ7IZBETO6NO4MUEDYBCU.jpg`
            },
            {
                property: 'og:url',
                content: `${SITE_LANACION}/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/`
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
                return name === 'title' ? 'LA NACION' : '';
            },
            contextPath: '/pf',
            deployment: function deployment() {
                return '$LATEST';
            }
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
                content: ''
            },
            {
                property: 'og:image',
                content: getAssetsPath(props.contextPath)(props.deployment)(
                    'placeholderLN.jpg'
                )
            },
            {
                property: 'og:url',
                content: SITE_LANACION
            }
        ];

        expect(getMetasOG(props)).toStrictEqual(metas);
    });
});
