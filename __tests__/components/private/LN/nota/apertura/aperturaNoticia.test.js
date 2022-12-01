import React from 'react';
import { render, screen } from '@testing-library/react';
import Context from 'fusion:context';
import AperturaNoticia from '../../../../../../components/features/LN-nota/aperturaNoticia';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        };

        return props.children(mockAvailableProps);
    }
}));

jest.mock(
    '../../../../../../components/private/common/staticValidation',
    () => 'mock-static-validation'
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/urlForPrerollAds',
    () => jest.fn()
);

jest.mock(
    '../../../../../../components/private/common/hocs/withScreenUtils',
    () => {
        return function(Component) {
            return props => (
                <Component {...props} screenUtils={{ device: 'desktop' }} />
            );
        };
    }
);

jest.mock(
    '../../../../../../components/private/LN/common/media/videoPlayer',
    () => 'mock-video'
);

describe('PRIVATE - LN - Nota - Apertura - Noticia', () => {
    const aperturaMultimedia = {
        _id: '2adb18dc-46d9-4159-ba59-8636349ab0e3',
        additional_properties: {
            advertising: {
                playAds: true
            }
        },
        created_date: '2022-09-30T19:20:19Z',
        credits: {
            affiliation: [
                {
                    name: 'Juan Cruz Andrada'
                }
            ],
            by: [
                {
                    name: '',
                    type: 'author'
                }
            ]
        },
        duration: 28027,
        embed_html:
            '<div class="powa" id="powa-2adb18dc-46d9-4159-ba59-8636349ab0e3" data-env="sandbox" data-api="sandbox" data-org="lanacionar" data-uuid="2adb18dc-46d9-4159-ba59-8636349ab0e3" data-aspect-ratio="0.562"><script src="https://lanacionar.video-player.arcpublishing.com/sandbox/powaBoot.js?org=lanacionar"></script></div>',
        headlines: {
            basic: 'Conflicto neumático'
        },
        promo_items: {
            basic: {
                caption: 'Conflicto del neumático',
                credits: {},
                height: 513,
                resized_urls: [
                    {
                        option: {
                            height: 206,
                            media_preload: '(max-width: 375px)',
                            width: 309
                        },
                        resizedUrl:
                            'https://resizer.glanacion.com/resizer/iKoiykA7bhIBeHjWs5egHtauIOM=/309x206/smart/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/09-30-2022/t_be67699132db466a95827ceac7fcbc71_name_file_1280x720_2000_v3_1_.jpg'
                    },
                    {
                        option: {
                            height: 234,
                            media_preload:
                                '(min-width: 375.1px and max-width: 768px)',
                            width: 351
                        },
                        resizedUrl:
                            'https://resizer.glanacion.com/resizer/j7JBsidQ3nrCtsqn2xoK2NqUbL4=/351x234/smart/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/09-30-2022/t_be67699132db466a95827ceac7fcbc71_name_file_1280x720_2000_v3_1_.jpg'
                    }
                ],
                type: 'image',
                url:
                    'https://resizer.glanacion.com/resizer/3IibxbS9Q7-2PL73hRaFQrk5XCA=/768x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/09-30-2022/t_be67699132db466a95827ceac7fcbc71_name_file_1280x720_2000_v3_1_.jpg',
                width: 768
            }
        },
        publish_date: '2022-09-30T19:24:27Z',
        streams: [
            {
                height: 360,
                stream_type: 'mp4',
                url:
                    'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/Juan_Cruz_Andrada/20220930/6337417356289817029a90ff/t_4b976608f9a3479591bb935bb39c257e_name_lv_0_20220929224858/file_640x360-600.mp4',
                width: 640
            },
            {
                height: 720,
                stream_type: 'mp4',
                url:
                    'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/Juan_Cruz_Andrada/20220930/6337417356289817029a90ff/t_4b976608f9a3479591bb935bb39c257e_name_lv_0_20220929224858/file_1280x720-2000-v3_1.mp4',
                width: 1280
            }
        ],
        type: 'video'
    };

    const aperturaImage = {
        _id: 'EP4MVVKHJFARBA6Q273S655TMQ',
        additional_properties: {},
        caption: 'Los hinchas esperan a la Selección en Qatar',
        created_date: '2022-11-16T22:27:29Z',
        credits: {
            affiliation: []
        },
        height: 513,
        resized_urls: [
            {
                option: {
                    height: 206,
                    media_preload: '(max-width: 375px)',
                    width: 309
                },
                resizedUrl:
                    'https://resizer.glanacion.com/resizer/TDFZYvddG7P4p8LrPAuWmlwvddI=/309x206/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/EP4MVVKHJFARBA6Q273S655TMQ.jpg'
            },
            {
                option: {
                    height: 234,
                    media_preload: '(min-width: 375.1px and max-width: 768px)',
                    width: 351
                },
                resizedUrl:
                    'https://resizer.glanacion.com/resizer/5cgnX52cF07G6vJsBMTP1jh5ifg=/351x234/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/EP4MVVKHJFARBA6Q273S655TMQ.jpg'
            }
        ],
        type: 'image',
        url:
            'https://resizer.glanacion.com/resizer/-xDflM1Ic1RxJc06uhR2rL-gr8U=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/EP4MVVKHJFARBA6Q273S655TMQ.jpg',
        width: 768
    };

    const props = {
        outputType: 'default',
        id: 'f0frGY5lQa0L9Ow',
        globalContent: {
            promo_items: {
                apertura_multimedia: aperturaMultimedia,
                basic: aperturaImage
            }
        },
        screenUtils: {
            device: 'desktop'
        }
    };

    describe('Tests in opening cases with html', () => {
        const properties = {
            ...props,
            globalContent: {
                ...props.globalContent,
                headlines: {
                    basic: 'Apertura con HTML'
                },
                promo_items: {
                    apertura_multimedia: {
                        content:
                            '<iframe class="pym" id="LNcreativa" frameborder="0" width="100%" height="800" scrolling="no" src="https://especialess3.lanacion.com.ar/18/mundial/mundial2018-historicos/"></iframe>',
                        type: 'raw_html'
                    }
                }
            }
        };

        test('Render OK in outputType AMP when is Apertura Noticia with HTML', () => {
            Context.useAppContext = jest.fn(() => ({
                outputType: 'amp'
            }));

            const { container } = render(<AperturaNoticia {...properties} />);

            const contentEmbed = screen.getByRole('button');

            expect(container).toBeDefined();
            expect(container.querySelector('.content-media')).toBeDefined();
            expect(contentEmbed).toBeDefined();
            expect(contentEmbed.querySelector('.com-embed')).toBeDefined();
            expect(contentEmbed.querySelector('amp-iframe')).toBeDefined();
            expect(contentEmbed.querySelector('amp-img')).toBeDefined();
        });

        test('Render OK in outputType default when is Apertura Noticia with HTML', () => {
            Context.useAppContext = jest.fn(() => ({
                outputType: 'default'
            }));

            const { container } = render(<AperturaNoticia {...properties} />);

            const contentEmbed = screen.getByRole('button');

            expect(container).toBeDefined();
            expect(container.querySelector('.content-media')).toBeDefined();
            expect(contentEmbed).toBeDefined();
            expect(contentEmbed.querySelector('.com-embed')).toBeDefined();
            expect(
                contentEmbed.querySelector('.contenido-externo')
            ).toBeDefined();
            expect(contentEmbed.querySelector('.com-anexo')).toBeDefined();
            expect(contentEmbed.querySelector('iframe')).toBeDefined();
        });

        test('Render OK when is Apertura Noticia with OPTA AMP', () => {
            const props = {
                ...properties,
                globalContent: {
                    ...properties.globalContent,
                    promo_items: {
                        apertura_multimedia: {
                            _id: '6POSMWEMKZCZBHINVUG3F4O3BY',
                            content:
                                '<opta-widget widget="match_summary" competition="724" season="2021" match="2206117" template="normal" live="true" show_match_header="true" show_score="true" show_attendance="false" show_date="false" date_format="dddd D MMMM YYYY HH:mm" show_cards="none" show_crests="true" show_team_formation="false" show_goals="true" show_goals_combined="true" show_penalties_missed="false" show_halftime_score="false" show_referee="false" show_subs="false" show_venue="true" show_shootouts="false" show_tooltips="false" show_images="false" show_competition_name="true" competition_naming="full" team_naming="full" player_naming="full" show_live="false" show_logo="true" show_title="true" breakpoints="400, 700" sport="football"></opta-widget>',
                            type: 'raw_html'
                        }
                    }
                }
            };

            render(<AperturaNoticia {...props} />);

            const contentMedia = screen.getByRole('button');
            const contentWidget = contentMedia.querySelector(
                `[id='anexo-${props.globalContent.promo_items.apertura_multimedia._id}']`
            );

            expect(contentMedia).toBeDefined();
            expect(contentWidget).toBeDefined();
            expect(contentWidget.querySelector('opta-widget')).toBeDefined();
        });
    });

    describe('Tests for multimedia content cases', () => {
        test('Rendering when is the opening of news with image', () => {
            const properties = {
                ...props,
                globalContent: {
                    ...props.globalContent,
                    headlines: {
                        basic: 'Apertura con Imagen'
                    },
                    promo_items: {
                        basic: aperturaImage
                    }
                }
            };
            const { container } = render(<AperturaNoticia {...properties} />);

            const contentImage = screen.getAllByRole('button');
            const image = container.querySelector('img');
            const figcaption = container.querySelector('figcaption');

            const shortestImage = aperturaImage.resized_urls[0].resizedUrl;

            expect(contentImage).toHaveLength(2);
            expect(image).toBeDefined();
            expect(figcaption).toBeDefined();
            expect(image.getAttribute('src')).toStrictEqual(shortestImage);
            expect(image.getAttribute('loading')).toStrictEqual('eager');
            expect(image.getAttribute('alt')).toStrictEqual(
                aperturaImage.caption
            );
            expect(
                figcaption.querySelector('.com-text').innerHTML
            ).toStrictEqual(aperturaImage.caption);
        });

        test('Render OK when is Apertura Noticia with opening Multimedia', () => {
            const properties = {
                ...props,
                globalContent: {
                    ...props.globalContent,
                    headlines: {
                        basic: 'Apertura con Video'
                    },
                    promo_items: {
                        apertura_multimedia: aperturaMultimedia
                    }
                }
            };

            render(<AperturaNoticia {...properties} />);

            const contentVideo = screen.getByRole('button');
            const video = contentVideo.querySelector(
                `[videoid='${aperturaMultimedia._id}']`
            );

            expect(video).toBeDefined();
            expect(video.getAttribute('autoplay')).toStrictEqual('false');
            expect(video.getAttribute('isapertura')).toStrictEqual('true');
            expect(video.getAttribute('titulonota')).toStrictEqual(
                'Apertura con Video'
            );
        });
    });
});
