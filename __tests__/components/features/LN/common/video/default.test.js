import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoPlayer from '../../../../../../components/features/LN/common/video/default';
import Context from 'fusion:context';

jest.mock(
    '../../../../../../components/private/LN/common/utils/urlForPrerollAds',
    () => jest.fn(() => 'https://mock-tags-url.com')
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/getSourcesJw',
    () => jest.fn(() => ({ file: 'https://mock-source.mp4' }))
);

jest.mock(
    '../../../../../../components/features/LN/common/video/component/VideoFacade',
    () => {
        return function MockVideoFacade({
            mediaId,
            images,
            fallbackSrc,
            alt,
            className,
            containerClassName
        }) {
            return (
                <div
                    id={`facade-${mediaId}`}
                    className={`content-facade-jw ${containerClassName}`}
                    data-testid="video-facade"
                >
                    <div id="button-play" data-testid="play-button">
                        Play
                    </div>
                    <img
                        src={fallbackSrc}
                        alt={alt}
                        className={className}
                        data-testid="facade-image"
                    />
                </div>
            );
        };
    }
);

jest.mock(
    '../../../../../../components/private/common/scriptManager/snippetVideo',
    () => {
        return function MockVideoPlayerSnippet() {
            return <script data-testid="video-snippet" />;
        };
    }
);

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:static', () => ({ children }) => <>{children}</>);

describe('components - features - LN - common - video - VideoPlayer', () => {
    beforeEach(() => {
        Context.useAppContext.mockReturnValue({
            outputType: 'default',
            arcSite: 'la-nacion-ar',
            deployment: jest.fn(path => path),
            contextPath: '/pf',
            globalContent: {
                subtype: '',
                promo_items: {}
            },
            layout: ''
        });
    });

    const mockData = {
        embed: {
            config: {
                idPlayer: 'mockPlayer123',
                videoJw: {
                    title: 'Test Video Title',
                    description: 'Test video description',
                    epigraphTitle: 'Test epigraph',
                    playlist: [
                        {
                            mediaid: 'testMedia123',
                            images: [
                                { src: 'image480.jpg', width: 480 },
                                { src: 'image720.jpg', width: 720 }
                            ],
                            image: 'fallback-image.jpg',
                            sources: [
                                {
                                    file: 'https://cdn.jwplayer.com/videos/test.mp4',
                                    type: 'video/mp4'
                                }
                            ]
                        }
                    ]
                }
            }
        }
    };

    it('renders the video player container', () => {
        render(
            <VideoPlayer
                data={mockData}
                parrafo="Test paragraph"
                tituloNota="Test note title"
            />
        );

        const container = document.querySelector('.content-media');
        expect(container).toBeInTheDocument();
    });

    it('renders the video facade with correct mediaId', () => {
        render(
            <VideoPlayer
                data={mockData}
                parrafo="Test paragraph"
                tituloNota="Test note title"
            />
        );

        const facadeDiv = document.querySelector('#facade-testMedia123');
        expect(facadeDiv).toBeInTheDocument();
    });

    it('renders the play button', () => {
        render(
            <VideoPlayer
                data={mockData}
                parrafo="Test paragraph"
                tituloNota="Test note title"
            />
        );

        const playButton = screen.getByTestId('play-button');
        expect(playButton).toBeInTheDocument();
    });

    it('renders the player container div with correct id', () => {
        render(
            <VideoPlayer
                data={mockData}
                parrafo="Test paragraph"
                tituloNota="Test note title"
            />
        );

        const playerContainer = document.querySelector('#testMedia123');
        expect(playerContainer).toBeInTheDocument();
    });

    it('renders data-has-jwplayer attribute', () => {
        render(
            <VideoPlayer
                data={mockData}
                parrafo="Test paragraph"
                tituloNota="Test note title"
            />
        );

        const jwPlayerElement = document.querySelector(
            '[data-has-jwplayer="true"]'
        );
        expect(jwPlayerElement).toBeInTheDocument();
    });

    it('renders data-video-id-jw attribute with correct mediaId', () => {
        render(
            <VideoPlayer
                data={mockData}
                parrafo="Test paragraph"
                tituloNota="Test note title"
            />
        );

        const videoIdElement = document.querySelector(
            '[data-video-id-jw="testMedia123"]'
        );
        expect(videoIdElement).toBeInTheDocument();
    });

    it('renders data-config attribute with video configuration', () => {
        render(
            <VideoPlayer
                data={mockData}
                parrafo="Test paragraph"
                tituloNota="Test note title"
            />
        );

        const configElement = document.querySelector('[data-config]');
        expect(configElement).toBeInTheDocument();

        const config = JSON.parse(configElement.getAttribute('data-config'));
        expect(config.title).toBe('Test Video Title');
        expect(config.mediaId).toBe('testMedia123');
        expect(config.playerId).toBe('mockPlayer123');
    });

    it('renders figcaption with epigraphTitle when showCaption is true', () => {
        render(
            <VideoPlayer
                data={mockData}
                parrafo="Test paragraph"
                tituloNota="Test note title"
            />
        );

        const figCaption = document.querySelector('figcaption');
        expect(figCaption).toBeInTheDocument();
        expect(figCaption).toHaveTextContent('Test epigraph');
    });

    it('does not render figcaption for VIDEO subtype with promo item', () => {
        Context.useAppContext.mockReturnValue({
            outputType: 'default',
            arcSite: 'la-nacion-ar',
            deployment: jest.fn(path => path),
            contextPath: '/pf',
            globalContent: {
                subtype: '5', // VIDEO subtype
                promo_items: {
                    video_jw: {
                        embed: {
                            config: {
                                idVideo: 'testMedia123'
                            }
                        }
                    }
                }
            },
            layout: ''
        });

        render(
            <VideoPlayer
                data={mockData}
                parrafo="Test paragraph"
                tituloNota="Test note title"
            />
        );

        const figCaption = document.querySelector('figcaption');
        expect(figCaption).not.toBeInTheDocument();
    });

    it('uses default player ID when not provided', () => {
        const dataWithoutPlayer = {
            embed: {
                config: {
                    videoJw: {
                        title: 'Test',
                        playlist: [
                            {
                                mediaid: 'test123',
                                images: [],
                                image: 'test.jpg',
                                sources: []
                            }
                        ]
                    }
                }
            }
        };

        render(
            <VideoPlayer
                data={dataWithoutPlayer}
                parrafo="Test"
                tituloNota="Test"
            />
        );

        const configElement = document.querySelector('[data-config]');
        const config = JSON.parse(configElement.getAttribute('data-config'));
        expect(config.playerId).toBe('ih0086X3');
    });

    it('renders with hasAutoplay in config', () => {
        render(
            <VideoPlayer
                data={mockData}
                parrafo="Test paragraph"
                tituloNota="Test note title"
                hasAutoplay={true}
            />
        );

        const configElement = document.querySelector('[data-config]');
        const config = JSON.parse(configElement.getAttribute('data-config'));
        expect(config.hasAutoplay).toBe(true);
    });

    it('applies custom container classes', () => {
        render(
            <VideoPlayer
                data={mockData}
                parrafo="Test paragraph"
                tituloNota="Test note title"
                mediaContainerClassesProps="custom-media-class"
                videoContainerClassesProps="custom-video-class"
            />
        );

        const mediaContainer = document.querySelector('.custom-media-class');
        const videoContainer = document.querySelector('.custom-video-class');

        expect(mediaContainer).toBeInTheDocument();
        expect(videoContainer).toBeInTheDocument();
    });

    it('has arcType property set to video_jw', () => {
        expect(VideoPlayer.arcType).toBe('video_jw');
    });
});
