import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoPlayer from '../../../../../../components/features/LN/common/video/default';
import { extractVideoData } from '../../../../../../components/features/LN/common/video/utils/videoDataUtils';
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
            loading,
            fetchPriority
        }) {
            return (
                <div
                    id={`facade-${mediaId}`}
                    data-testid="video-facade"
                    data-loading={loading}
                    data-priority={fetchPriority}
                >
                    <div id="button-play" data-testid="play-button">
                        Play
                    </div>
                    <img
                        src={fallbackSrc}
                        alt={alt}
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

describe('components - features - LN - common - video - VideoPlayer (pure)', () => {
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

    let videoData;

    beforeEach(() => {
        Context.useAppContext.mockReturnValue({
            outputType: 'default',
            arcSite: 'la-nacion-ar',
            deployment: jest.fn(path => path),
            contextPath: '/pf',
            globalContent: { subtype: '', promo_items: {} },
            layout: ''
        });
        videoData = extractVideoData(mockData);
    });

    it('renders the video facade with correct mediaId', () => {
        render(<VideoPlayer videoData={videoData} />);
        const facadeDiv = document.querySelector('#facade-testMedia123');
        expect(facadeDiv).toBeInTheDocument();
    });

    it('renders the play button', () => {
        render(<VideoPlayer videoData={videoData} />);
        expect(screen.getByTestId('play-button')).toBeInTheDocument();
    });

    it('renders the player container div with correct id', () => {
        render(<VideoPlayer videoData={videoData} />);
        expect(document.querySelector('#testMedia123')).toBeInTheDocument();
    });

    it('renders data-has-jwplayer attribute', () => {
        render(<VideoPlayer videoData={videoData} />);
        expect(
            document.querySelector('[data-has-jwplayer="true"]')
        ).toBeInTheDocument();
    });

    it('renders data-video-id-jw attribute with correct mediaId', () => {
        render(<VideoPlayer videoData={videoData} />);
        expect(
            document.querySelector('[data-video-id-jw="testMedia123"]')
        ).toBeInTheDocument();
    });

    it('renders data-config attribute with video configuration', () => {
        render(<VideoPlayer videoData={videoData} />);
        const configElement = document.querySelector('[data-config]');
        expect(configElement).toBeInTheDocument();
        const config = JSON.parse(configElement.getAttribute('data-config'));
        expect(config.title).toBe('Test Video Title');
        expect(config.mediaId).toBe('testMedia123');
        expect(config.playerId).toBe('mockPlayer123');
    });

    it('renders figcaption with epigraphTitle when showCaption is true', () => {
        render(<VideoPlayer videoData={videoData} showCaption={true} />);
        const figCaption = document.querySelector('figcaption');
        expect(figCaption).toBeInTheDocument();
        expect(figCaption).toHaveTextContent('Test epigraph');
    });

    it('does not render figcaption when showCaption is false', () => {
        render(<VideoPlayer videoData={videoData} showCaption={false} />);
        expect(document.querySelector('figcaption')).not.toBeInTheDocument();
    });

    it('does not render figcaption when epigraphTitle is missing', () => {
        const dataNoEpigraph = {
            embed: {
                config: {
                    idPlayer: 'mockPlayer123',
                    videoJw: {
                        title: 'Test',
                        description: '',
                        playlist: [
                            {
                                mediaid: 'testMedia123',
                                images: [],
                                image: '',
                                sources: []
                            }
                        ]
                    }
                }
            }
        };
        render(
            <VideoPlayer
                videoData={extractVideoData(dataNoEpigraph)}
                showCaption={true}
            />
        );
        expect(document.querySelector('figcaption')).not.toBeInTheDocument();
    });

    it('uses default player ID when not provided in data', () => {
        const dataWithoutPlayer = {
            embed: {
                config: {
                    idPlayer: '',
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
        render(<VideoPlayer videoData={extractVideoData(dataWithoutPlayer)} />);
        const configElement = document.querySelector('[data-config]');
        const config = JSON.parse(configElement.getAttribute('data-config'));
        expect(config.playerId).toBe('ih0086X3');
    });

    it('renders with hasAutoplay in config', () => {
        render(<VideoPlayer videoData={videoData} hasAutoplay={true} />);
        const configElement = document.querySelector('[data-config]');
        const config = JSON.parse(configElement.getAttribute('data-config'));
        expect(config.hasAutoplay).toBe(true);
    });

    it('passes loadingType and fetchPriority to the facade', () => {
        render(
            <VideoPlayer
                videoData={videoData}
                loadingType="eager"
                fetchPriority="high"
            />
        );
        const facade = screen.getByTestId('video-facade');
        expect(facade).toHaveAttribute('data-loading', 'eager');
        expect(facade).toHaveAttribute('data-priority', 'high');
    });

    it('applies className to the player container', () => {
        render(
            <VideoPlayer
                videoData={videoData}
                className="custom-class aspect-16/9"
            />
        );
        const container = document.querySelector('[data-has-jwplayer="true"]');
        expect(container).toHaveClass('custom-class', 'aspect-16/9');
    });

    it('does not declare arcType (registry is responsibility of wrappers)', () => {
        expect(VideoPlayer.arcType).toBeUndefined();
    });
});
