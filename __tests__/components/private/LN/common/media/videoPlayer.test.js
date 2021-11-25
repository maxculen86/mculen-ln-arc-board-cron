import React from 'react';
import VideoPlayer from '../../../../../../components/private/LN/common/media/videoPlayer';
import { mount, shallow } from 'enzyme';
import scriptVideoValidator from '../../../../../../components/private/common/scriptManager/scriptVideoValidator';
import articleSinVideo from '../../../../../../__mocks__/data/articles/5CT4YNKOB5AFNFQ7R33BOOVGAI.json';
import articleConVideo from '../../../../../../__mocks__/data/articles/36G5V7RBRBH2XDBMBZHVCXZNBY.json';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = { outputType: 'amp' };

        return props.children(mockAvailableProps);
    }
}));

import Context from 'fusion:context';
import { getCustParamsEnconde } from '../../../../../../components/private/LN/common/utils/getDataFormated';
import urlForPrerollAds from '../../../../../../components/private/LN/common/utils/urlForPrerollAds';

describe('private - LN - common - media - videoPlayer', () => {
    Context.useAppContext = jest.fn(() => ({ outputType: 'amp' }));

    const mediaData = {
        _id: '9d604899-6f5d-4dcd-9b66-cd6989df063e',
        description: {
            basic: 'Un adelanto'
        },
        duration: 1214,
        headlines: {
            basic: 'El titulo del video'
        },
        promo_items: {
            basic: {
                caption: 'bfxfds',
                credits: {},
                height: 720,
                type: 'image',
                url:
                    'https://d3us6z9haan6vf.cloudfront.net/10-18-2019/t_7b9e5b6b2186491989b2fc9a10d6d92d_name_file_1280x720_2000_v3_1_.jpg',
                width: 1280
            }
        },
        streams: [
            {
                height: 360,
                stream_type: 'mp4',
                url:
                    'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/2019/06/04/5cf6c7cb4cedfd0009715c2f/t_88ba2084a3fe4cf6b47b63a9ba3292d6_name_DREAM_THEATER___Untethered_Angel__OFFICIAL_VIDEO__cropped_cropped/file_640x360-600.mp4',
                width: 640
            },
            {
                height: 720,
                stream_type: 'mp4',
                url:
                    'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/2019/06/04/5cf6c7cb4cedfd0009715c2f/t_88ba2084a3fe4cf6b47b63a9ba3292d6_name_DREAM_THEATER___Untethered_Angel__OFFICIAL_VIDEO__cropped_cropped/file_1280x720-2000-v3_1.mp4',
                width: 1280
            }
        ],
        type: 'video'
    };

    const props = {
        videoId: '9d604899-6f5d-4dcd-9b66-cd6989df063e',
        mediaData: mediaData,
        screenUtils: { device: 'desktop' }
    };

    it('Renderear amp-video si el outputtype es amp', () => {
        let component = mount(<VideoPlayer {...props} />);
        expect(component.find('amp-ima-video').length).toBe(1);
    });

    it('Atributos y nodo del DOM correcto', () => {
        let component = mount(<VideoPlayer {...props} />);
        expect(component.find('amp-ima-video')).toHaveLength(1);
        expect(component.find('amp-ima-video').props().width).toEqual(640);
        expect(component.find('amp-ima-video').prop('data-poster')).toEqual(
            'https://d3us6z9haan6vf.cloudfront.net/10-18-2019/t_7b9e5b6b2186491989b2fc9a10d6d92d_name_file_1280x720_2000_v3_1_.jpg'
        );
        /*expect(component.find('amp-ima-video').props().data-poster).toEqual(
            'https://d3us6z9haan6vf.cloudfront.net/10-18-2019/t_7b9e5b6b2186491989b2fc9a10d6d92d_name_file_1280x720_2000_v3_1_.jpg'
        );*/
        expect(component.find('source').props().src).toEqual(
            'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/2019/06/04/5cf6c7cb4cedfd0009715c2f/t_88ba2084a3fe4cf6b47b63a9ba3292d6_name_DREAM_THEATER___Untethered_Angel__OFFICIAL_VIDEO__cropped_cropped/file_640x360-600.mp4'
        );
        expect(component.find('source').props().type).toEqual('video/mp4');

        props.mediaData.streams[0].stream_type = 'mov';
        component = mount(<VideoPlayer {...props} />);
        expect(component.find('source').props().type).toEqual('video/mov');
    });

    it('No romper si streams no tiene elementos', () => {
        props.mediaData.streams = [];
        let component = mount(<VideoPlayer {...props} />);
        expect(component.find('amp-ima-video')).toHaveLength(0);
    });

    jest.mock('fusion:context', Component => {
        return function(Component) {
            const outputType = 'default';
            return props => <Component {...props} outputType={outputType} />;
        };
    });

    it('No renderear amp-video si outputtype es default', () => {
        let component = shallow(<VideoPlayer {...props} />);
        expect(component.find('amp-ima-video').length).toBe(0);
    });
});

describe('private - common - scriptManager - scriptVideoValidator', () => {
    it('Probar funcion scriptVideoValidator', () => {
        let loadVideo = scriptVideoValidator(articleConVideo);
        expect(loadVideo).toBe(true);

        loadVideo = scriptVideoValidator(articleSinVideo);
        expect(loadVideo).toBe(false);
    });
});

describe('private - LN - common - media - videoPlayer - urlForPrerollAds', () => {
    it('Probar formato segmentacion de ads en powa', () => {
        const tags = [{ description: 'Crónicas', text: 'Crónicas' }];
        const sections = [
            {
                name: 'Economía'
            },
            {
                name: 'Dólar Hoy'
            },
            {
                name: 'Industria'
            },
            {
                name: 'Comercio Exterior'
            },
            {
                name: 'Revista ¡HOLA!'
            },
            {
                name: 'Estilo ¡HOLA!'
            }
        ];

        const custParamsEncoded = getCustParamsEnconde(tags, sections);
        expect(custParamsEncoded).toEqual(
            'te_cronicas%2Cca_economia%2Cca_dolar_hoy%2Cca_industria%2Cca_comercio_exterior%2Cca_revista__hola_%2Cca_estilo__hola_'
        );

        const sections2 = [
            {
                name: 'Economía'
            }
        ];
        const custParamsEncoded2 = getCustParamsEnconde([], sections2);
        expect(custParamsEncoded2).toEqual('ca_economia');
    });
});

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
