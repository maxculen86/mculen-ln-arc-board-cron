import React from 'react';
import { mount, shallow, render } from 'enzyme';
import getProperties from 'fusion:properties';

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
jest.mock(
    '../../../../../../components/private/LN/nota/cuerpo/optaAMP',
    () => 'mock-optaAmp'
);
jest.mock(
    '../../../../../../components/private/LN/nota/cuerpo/htmlAMP',
    () => 'mock-htmlAmp'
);
jest.mock(
    '../../../../../../components/private/LN/nota/cuerpo/html',
    () => 'mock-html'
);

import Context from 'fusion:context';

import AperturaNoticia from '../../../../../../components/features/LN-nota/aperturaNoticia';
import Media from '../../../../../../components/private/LN/common/media';
import optaAMP from '../../../../../../components/private/LN/nota/cuerpo/optaAMP';
import HtmlAMP from '../../../../../../components/private/LN/nota/cuerpo/htmlAMP';
import Html from '../../../../../../components/private/LN/nota/cuerpo/html';

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

    const globalContent = {
        _id: 'ZODSVVPC2VEB7NA3XD6AOYYHLQ',
        subtype: '1',
        headlines: {
            basic: 'Alcoholismo. Señales de alerta y los peligros para la salud'
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
        },
        label: {
            mostrar_banners: {
                text: 'Si'
            }
        }
    };

    it('Render OK cuando es Apertura Noticia con HTML en AMP', () => {
        Context.useAppContext = jest.fn(() => ({
            outputType: 'amp'
        }));
        const component = mount(
            <AperturaNoticia globalContent={globalContent} outputType="amp" />
        );

        expect(component).toBeDefined();
        //expect(component.find('amp-iframe')).toHaveLength(1);
        expect(component.find(HtmlAMP)).toHaveLength(1);
    });

    it('Render OK cuando es Apertura Noticia con HTML en default', () => {
        Context.useAppContext = jest.fn(() => ({
            outputType: 'default'
        }));
        const component = mount(
            <AperturaNoticia
                globalContent={globalContent}
                outputType="default"
            />
        );

        expect(component).toBeDefined();
        expect(component.find(Html)).toHaveLength(1);
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
        label: {
            mostrar_banners: {
                text: 'No'
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
            label: {
                mostrar_banners: {
                    text: 'No'
                }
            }
        },
        outputType: 'default'
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
            label: {
                mostrar_banners: {
                    text: 'No'
                }
            }
        },
        outputType: 'default'
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

    const propsConOptaHtml = {
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
                apertura_multimedia: {
                    _id: '6POSMWEMKZCZBHINVUG3F4O3BY',
                    content:
                        '<opta-widget widget="match_summary" competition="724" season="2021" match="2206117" template="normal" live="true" show_match_header="true" show_score="true" show_attendance="false" show_date="false" date_format="dddd D MMMM YYYY HH:mm" show_cards="none" show_crests="true" show_team_formation="false" show_goals="true" show_goals_combined="true" show_penalties_missed="false" show_halftime_score="false" show_referee="false" show_subs="false" show_venue="true" show_shootouts="false" show_tooltips="false" show_images="false" show_competition_name="true" competition_naming="full" team_naming="full" player_naming="full" show_live="false" show_logo="true" show_title="true" breakpoints="400, 700" sport="football"></opta-widget>',
                    type: 'raw_html'
                }
            },
            label: {
                mostrar_banners: {
                    text: 'No'
                }
            }
        },
        outputType: 'amp'
    };

    it('Render OK cuando es Apertura Noticia con OPTA AMP', () => {
        const component = mount(<AperturaNoticia {...propsConOptaHtml} />);

        expect(component).toBeDefined();
        //expect(optaAMP.exists()).toBeTruthy();
        expect(component.find(optaAMP)).toHaveLength(1);
    });
});
