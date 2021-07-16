import React from 'react';
import { mount, shallow, render } from 'enzyme';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

import Consumer from 'fusion:consumer';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        };

        return props.children(mockAvailableProps);
    }
}));

jest.mock('fusion:static', () => 'mock-static');
jest.mock(
    '../../../../../../components/private/LN/common/media/videoPlayer',
    () => 'mock-video'
);

import Context from 'fusion:context';

import ComInfografia from '../../../../../../components/private/LN/nota/apertura/com-infografia';
import HtmlAMP from '../../../../../../components/private/LN/nota/cuerpo/htmlAMP';
import AperturaNoticia from '../../../../../../components/features/LN-nota/aperturaNoticia';
import Media from '../../../../../../components/private/LN/common/media';

describe('PRIVATE - LN - Nota - Apertura - Noticia', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: { _id: '7' }
    }));

    const promoItemImage = {
        _id: 'QZO4UCHCSJHWJLQBALT2PGR2EY',
        caption: 'Esto es el epigrafe.',
        credits: {
            affiliation: []
        },
        height: 513,
        resized_urls: [
            {
                option: {
                    height: 840,
                    media: '(min-width: 1280px)',
                    width: 1260
                },
                resizedUrl:
                    '/resizer/ll9UIKBF1TEj9aV7Fvgnp39l3KM=/1260x840/smart/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/QZO4UCHCSJHWJLQBALT2PGR2EY.jpg'
            }
        ],
        type: 'image',
        url:
            '/resizer/svEUZxJVap7IXrRcLHdWMkYJvO4=/768x513/smart/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/QZO4UCHCSJHWJLQBALT2PGR2EY.jpg',
        width: 768
    };

    const propsConHtml = {
        globalContent: {
            _id: 'ZODSVVPC2VEB7NA3XD6AOYYHLQ',
            subtype: '1',
            headlines: {
                basic:
                    'Alcoholismo. Señales de alerta y los peligros para la salud'
            },
            type: 'story',
            promo_items: {
                apertura_multimedia: {
                    _id: '6POSMWEMKZCZBHINVUG3F4O3BY',
                    content:
                        '<iframe class="pym" id="LNcreativa" frameborder="0" width="100%" height="800" scrolling="no" src="https://especialess3.lanacion.com.ar/18/mundial/mundial2018-historicos/"></iframe>',
                    type: 'raw_html'
                },
                basic: promoItemImage
            }
        },
        outputType: 'amp'
    };

    it('Render OK cuando es Apertura Noticia con HTML en AMP', () => {
        const component = mount(<AperturaNoticia {...propsConHtml} />);

        expect(component).toBeDefined();
        expect(component.find('amp-iframe')).toHaveLength(1);
    });

    const promoItemAperturaMultimedia = {
        _id: '8c639285-8a1c-4b3c-827f-a74da7ff9eab',
        additional_properties: { advertising: { playAds: true } },
        created_date: '2021-06-28T15:55:58Z',
        credits: {
            affiliation: [{ name: 'Trinidad de Apellaniz' }],
            by: [{ name: '', type: 'author' }]
        },
        duration: 101269,
        embed_html:
            '<div class="powa" id="powa-8c639285-8a1c-4b3c-827f-a74da7ff9eab" data-env="sandbox" data-api="sandbox" data-org="lanacionar" data-uuid="8c639285-8a1c-4b3c-827f-a74da7ff9eab" data-aspect-ratio="0.562"><script src="https://lanacionar.video-player.arcpublishing.com/sandbox/powaBoot.js?org=lanacionar"></script></div>',
        headlines: {
            basic:
                'Elecciones. Los posibles candidatos del Gobierno y Juntos por el Cambio'
        },
        promo_items: {
            basic: {
                caption:
                    'A un mes del cierre de listas, te contamos cuáles son los nombres que desfilan como candidatos a Diputados Nacionales en la provincia de Buenos Aires.',
                credits: {},
                height: 720,
                type: 'image',
                url:
                    'https://d3us6z9haan6vf.cloudfront.net/06-28-2021/t_8fa09aec3d94480bbe3e09a8cb08270e_name_file_1280x720_2000_v3_1_.jpg',
                width: 1280
            }
        },
        publish_date: '2021-06-28T16:01:43Z',
        streams: [
            {
                height: 360,
                stream_type: 'mp4',
                url:
                    'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/Trinidad_de_Apellaniz/20210628/60d9f10e52faff00019d351a/t_7edff3bab11d4e5b856272cbcfc066db_name_Video/file_640x360-600.mp4',
                width: 640
            },
            {
                height: 720,
                stream_type: 'mp4',
                url:
                    'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/Trinidad_de_Apellaniz/20210628/60d9f10e52faff00019d351a/t_7edff3bab11d4e5b856272cbcfc066db_name_Video/file_1280x720-2000-v3_1.mp4',
                width: 1280
            }
        ],
        type: 'video'
    };

    const propsConImagen = {
        globalContent: {
            _id: 'ZODSVVPC2VEB7NA3XD6AOYYHLQ',
            subtype: '1',
            headlines: {
                basic:
                    'Alcoholismo. Señales de alerta y los peligros para la salud'
            },
            type: 'story',
            promo_items: { basic: promoItemImage },
            outputType: 'default'
        }
    };

    const propsConImagenYVideo = {
        globalContent: {
            _id: 'ZODSVVPC2VEB7NA3XD6AOYYHLQ',
            subtype: '1',
            headlines: {
                basic:
                    'Alcoholismo. Señales de alerta y los peligros para la salud'
            },
            type: 'story',
            promo_items: {
                basic: promoItemImage,
                apertura_multimedia: promoItemAperturaMultimedia
            },
            outputType: 'default'
        }
    };

    it('Render OK cuando es Apertura Noticia con Imagen', () => {
        const component = mount(<AperturaNoticia {...propsConImagen} />);
        const mediaComponent = component.find(Media);
        expect(mediaComponent).toBeDefined();
        expect(mediaComponent.prop('mediaData')).toBeTruthy();
        expect(mediaComponent.prop('mediaData')).toEqual(promoItemImage);
    });

    it('Render OK cuando es Apertura Noticia con Apertura Multimedia', () => {
        const component = mount(<AperturaNoticia {...propsConImagenYVideo} />);
        const mediaComponent = component.find(Media);
        expect(mediaComponent).toBeDefined();
        expect(mediaComponent.prop('mediaData')).toEqual(
            promoItemAperturaMultimedia
        );
    });
});
