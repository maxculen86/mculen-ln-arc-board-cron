import {
    getFirstParentSection,
    getSectionLogo
} from '../../../../../components/private/common/utils/sectionUtils';
import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import siteProps from '../../../../../__mocks__/data/properties/lnSiteProps';

//TODO: hacer tests
describe('Utils - SectionUtils', () => {
    it('getFirstParentSection test', () => {
        const parent = getFirstParentSection({
            _id: '/recetas/platos-principales/carne'
        });
        expect(parent).toBe('/recetas');
    });
    it('getSectionLogo test BBC', () => {
        const sections = [
            {
                _id: '/deportes',
                _website: 'la-nacion-ar',
                type: 'section',
                version: '0.6.0',
                name: 'Deportes',
                description: null,
                path: '/deportes',
                parent_id: '/',
                parent: {
                    default: '/'
                },
                additional_properties: {
                    original: {
                        _id: '/deportes',
                        site: {
                            site_tagline: null,
                            site_title: 'Deportes',
                            pagebuilder_path_for_native_apps: null,
                            site_description: null,
                            site_about: null,
                            site_url: null,
                            site_keywords: 'Deportes'
                        },
                        site_topper: {
                            site_logo_image: null
                        },
                        social: {
                            twitter: null,
                            facebook: null,
                            rss: null,
                            instagram: null
                        },
                        navigation: {
                            nav_title: null
                        },
                        name: 'Deportes',
                        _website: 'la-nacion-ar',
                        parent: {
                            default: '/',
                            sample: '/',
                            config: null
                        },
                        ancestors: {
                            default: [],
                            sample: ['/'],
                            config: []
                        },
                        _admin: {
                            alias_ids: ['/deportes']
                        },
                        inactive: false,
                        node_type: 'section',
                        order: {
                            sample: 1001
                        }
                    }
                },
                _website_section_id: 'la-nacion-ar./deportes'
            },
            {
                _id: '/deportes/Futbol',
                _website: 'la-nacion-ar',
                type: 'section',
                version: '0.6.0',
                name: 'Futbol',
                description: null,
                path: '/deportes/Futbol',
                parent_id: '/deportes',
                parent: {
                    default: '/deportes'
                },
                additional_properties: {
                    original: {
                        _id: '/deportes/Futbol',
                        site_topper: {
                            site_logo_image: null
                        },
                        site: {
                            site_tagline: null,
                            site_title: null,
                            pagebuilder_path_for_native_apps: null,
                            site_about: null,
                            site_description: null,
                            site_url: null,
                            site_keywords: null
                        },
                        social: {
                            twitter: null,
                            rss: null,
                            facebook: null,
                            instagram: null
                        },
                        navigation: {
                            nav_title: null
                        },
                        name: 'Futbol',
                        _website: 'la-nacion-ar',
                        parent: {
                            default: '/deportes'
                        },
                        ancestors: {
                            default: ['/deportes']
                        },
                        _admin: {
                            alias_ids: ['/deportes/Futbol']
                        },
                        inactive: false,
                        node_type: 'section',
                        children: []
                    }
                },
                _website_section_id: 'la-nacion-ar./deportes/Futbol'
            },
            {
                _id: '/revista-brando',
                type: 'site',
                version: '0.5.8',
                name: 'Brando',
                description: null,
                path: '/revista-brando',
                parent_id: '/revistas',
                additional_properties: {
                    original: {
                        site_topper: {
                            site_logo_image: null
                        },
                        site: {
                            site_tagline: null,
                            site_title: null,
                            pagebuilder_path_for_native_apps: null,
                            site_description: null,
                            site_url: null,
                            site_about: null,
                            site_keywords: null
                        },
                        social: {
                            twitter: null,
                            rss: null,
                            instagram: null,
                            facebook: null
                        },
                        navigation: {
                            nav_title: 'Brando'
                        },
                        Termicas: {
                            debug: 'false'
                        },
                        _admin: {
                            alias_ids: ['/revista-brando']
                        },
                        style: {
                            section_style_name: 'brando'
                        },
                        _id: '/revista-brando',
                        name: 'Brando',
                        parent: '/revistas',
                        ancestors: ['/revistas'],
                        inactive: false
                    }
                }
            },
            {
                _id: '/revistas',
                type: 'site',
                version: '0.5.8',
                name: 'Revistas',
                description: null,
                path: '/revistas',
                parent_id: '/',
                additional_properties: {
                    original: {
                        _id: '/revistas',
                        site_topper: {
                            site_logo_image: null
                        },
                        site: {
                            site_tagline: null,
                            site_title: null,
                            pagebuilder_path_for_native_apps: null,
                            site_description: null,
                            site_url: null,
                            site_about: null,
                            site_keywords: null
                        },
                        social: {
                            twitter: null,
                            rss: null,
                            instagram: null,
                            facebook: null
                        },
                        navigation: {
                            nav_title: 'Revistas'
                        },
                        Termicas: {
                            debug: 'false'
                        },
                        name: 'Revistas',
                        parent: '/',
                        _admin: {
                            alias_ids: ['/revistas']
                        },
                        inactive: false
                    }
                }
            }
        ];
        const layout = 'LN-nota-noticia';
        const distributorName = 'BBC';
        const LogoComponent = getSectionLogo(sections, layout, distributorName);
        expect(LogoComponent).toMatchObject({
            color: true,
            logoName: 'BBC',
            path: ''
        });
    });
});
