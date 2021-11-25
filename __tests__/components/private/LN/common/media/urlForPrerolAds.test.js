import Context from 'fusion:context';
import urlForPrerollAds from '../../../../../../components/private/LN/common/utils/urlForPrerollAds';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = { outputType: 'default' };

        return props.children(mockAvailableProps);
    }
}));

describe('urlPrerolAds throw the correct url', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent,
        requestUri
    }));
    const globalContent = {
        _id: 'ZMIG7KDD7NBUBAIXTNEHJRNFXI',
        canonical_url: '/arquitectura/videonota-de-prueba-nid15092021/',
        label: {
            edicion: {
                display: true,
                text: 'Digital'
            },
            enviar_a_apps: {
                display: true,
                text: 'Si',
                url: ''
            },
            mostrar_banners: {
                display: true,
                text: 'Si',
                url: ''
            },
            recomendar: {
                display: true,
                text: 'Si',
                url: ''
            },
            trust: {
                text: 'Noticia Original'
            }
        },
        taxonomy: {
            primary_section: {
                _id: '/arquitectura',
                _website: 'la-nacion-ar',
                additional_properties: {
                    original: {
                        migration: {
                            id_section_ln9: '',
                            migrated_mob: 'true'
                        }
                    }
                },
                name: 'Arquitectura',
                parent_id: '/',
                path: '/arquitectura',
                type: 'section'
            },
            sections: [
                {
                    _id: '/arquitectura',
                    _website: 'la-nacion-ar',
                    additional_properties: {
                        original: {
                            migration: {
                                id_section_ln9: '',
                                migrated_mob: 'true'
                            }
                        }
                    },
                    name: 'Arquitectura',
                    parent_id: '/',
                    path: '/arquitectura',
                    type: 'section'
                }
            ]
        },
        type: 'story',
        website_url: '/arquitectura/videonota-de-prueba-nid15092021/'
    };
    const requestUri =
        '/arquitectura/videonota-de-prueba-nid15092021/?_website=la-nacion-ar';
    it('Should throw an url', () => {
        const adURL = urlForPrerollAds('desktop');
        expect(adURL.length) > 0;
    });
});

describe('urlPrerolAds with mostrar banner no', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent,
        requestUri
    }));
    const globalContent = {
        _id: 'ZMIG7KDD7NBUBAIXTNEHJRNFXI',
        canonical_url: '/arquitectura/videonota-de-prueba-nid15092021/',
        label: {
            edicion: {
                display: true,
                text: 'Digital'
            },
            enviar_a_apps: {
                display: true,
                text: 'Si',
                url: ''
            },
            mostrar_banners: {
                display: true,
                text: 'No',
                url: ''
            },
            recomendar: {
                display: true,
                text: 'Si',
                url: ''
            },
            trust: {
                text: 'Noticia Original'
            }
        },
        taxonomy: {
            primary_section: {
                _id: '/arquitectura',
                _website: 'la-nacion-ar',
                additional_properties: {
                    original: {
                        migration: {
                            id_section_ln9: '',
                            migrated_mob: 'true'
                        }
                    }
                },
                name: 'Arquitectura',
                parent_id: '/',
                path: '/arquitectura',
                type: 'section'
            },
            sections: [
                {
                    _id: '/arquitectura',
                    _website: 'la-nacion-ar',
                    additional_properties: {
                        original: {
                            migration: {
                                id_section_ln9: '',
                                migrated_mob: 'true'
                            }
                        }
                    },
                    name: 'Arquitectura',
                    parent_id: '/',
                    path: '/arquitectura',
                    type: 'section'
                }
            ]
        },
        type: 'story',
        website_url: '/arquitectura/videonota-de-prueba-nid15092021/'
    };
    const requestUri =
        '/arquitectura/videonota-de-prueba-nid15092021/?_website=la-nacion-ar';
    it('Should return an empty string', () => {
        const adURL = urlForPrerollAds('desktop');
        expect(adURL).toBe('');
    });
});
