import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import JwVideoPlayer from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayer';
import { useCajaCarruselContext } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext';
import urlForPrerollAds from '../../../../../../components/private/LN/common/utils/urlForPrerollAds';
import {
    registerJwVideoControlsTracking,
    markProgrammaticMute,
    registerVideoResumeTracking
} from '../../../../../../components/private/common/utils/videoPlayerHelper';
import {
    registerPlayerEvents,
    setupPlayer
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper';

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext',
    () => ({
        useCajaCarruselContext: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/urlForPrerollAds',
    () => jest.fn()
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper',
    () => ({
        registerPlayerEvents: jest.fn(),
        setupPlayer: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/common/utils/videoPlayerHelper',
    () => ({
        registerJwVideoControlsTracking: jest.fn(),
        markProgrammaticMute: jest.fn(),
        registerVideoResumeTracking: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks',
    () => ({
        useVideoJwCustomSettings: jest.fn()
    })
);

describe('components - chains - ln10_caja_carrusel - components - JwVideoPlayer', () => {
    const mockPlayer = {
        setMute: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();

        useCajaCarruselContext.mockReturnValue({
            currentIndex: 0,
            preferredVideoFiles: {}
        });

        urlForPrerollAds.mockReturnValue('https://ads.test');
        setupPlayer.mockReturnValue(mockPlayer);
        registerJwVideoControlsTracking.mockReturnValue(jest.fn());
        registerVideoResumeTracking.mockReturnValue(jest.fn());
    });

    const defaultProps = {
        videoId: 'test-video-id',
        title: 'Test video',
        index: 0,
        handleNextCallback: () => {},
        isLoadedScriptJw: true,
        duration: 12,
        titleJwPlayer: 'JW Test video'
    };

    it('should render placeholder video when not in view, index !== currentIndex', () => {
        const { container } = render(
            <JwVideoPlayer {...defaultProps} index={1} />
        );
        const placeholder = container.querySelector('.placeholder-jwplayer');

        expect(placeholder).toBeInTheDocument();
        expect(placeholder).toHaveClass(
            'placeholder-jwplayer flex flex-column w-100 h-100 ratio-9-16 jc-center ai-center bg-black'
        );
    });

    it('renders the video player div with the correct ID', () => {
        const videoId = 'test-video-id';
        const { container } = render(<JwVideoPlayer {...defaultProps} />);
        const videoDiv = container.querySelector(`#${videoId}`);

        expect(videoDiv).toBeInTheDocument();
    });

    it('sets up the player with the expected data', () => {
        render(<JwVideoPlayer {...defaultProps} />);

        expect(setupPlayer).toHaveBeenCalledWith({
            playerId: 'test-video-id',
            videoId: 'test-video-id',
            videoFile: undefined,
            shouldUsePreferredFile: false,
            urlAds: 'https://ads.test',
            counterVideo: undefined
        });
    });

    it('does not initialize tracking when setup does not return a player', () => {
        setupPlayer.mockReturnValueOnce(undefined);

        expect(() => render(<JwVideoPlayer {...defaultProps} />)).not.toThrow();
        expect(markProgrammaticMute).not.toHaveBeenCalled();
        expect(registerPlayerEvents).not.toHaveBeenCalled();
        expect(registerJwVideoControlsTracking).not.toHaveBeenCalled();
        expect(registerVideoResumeTracking).not.toHaveBeenCalled();
    });

    it('initializes player tracking handlers', () => {
        const handleNextCallback = jest.fn();

        render(
            <JwVideoPlayer
                {...defaultProps}
                handleNextCallback={handleNextCallback}
                origin="test-origin"
                roofData={{ title: 'Roof title' }}
            />
        );

        expect(markProgrammaticMute).toHaveBeenCalledWith(mockPlayer);
        expect(mockPlayer.setMute).toHaveBeenCalledWith(false);
        expect(registerPlayerEvents).toHaveBeenCalledWith({
            player: mockPlayer,
            sentProgressRef: expect.any(Object),
            videoId: 'test-video-id',
            title: 'Test video',
            handleNextCallback,
            origin: 'test-origin',
            roofData: { title: 'Roof title' },
            titleJwPlayer: 'JW Test video',
            duration: 12
        });
        expect(registerJwVideoControlsTracking).toHaveBeenCalledWith({
            player: mockPlayer,
            defaultTitle: 'Test video',
            defaultId: 'test-video-id'
        });
        expect(registerVideoResumeTracking).toHaveBeenCalledWith({
            player: mockPlayer,
            defaultTitle: 'Test video',
            defaultId: 'test-video-id'
        });
    });

    describe('desktop horizontal carousel', () => {
        const originalInnerWidth = window.innerWidth;

        beforeEach(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1440
            });
        });

        afterEach(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: originalInnerWidth
            });
        });

        it('renders the player via CDN fallback when preferredVideoFiles is empty', () => {
            useCajaCarruselContext.mockReturnValue({
                currentIndex: 0,
                preferredVideoFiles: {}
            });

            const { container } = render(
                <JwVideoPlayer {...defaultProps} variant="horizontal" />
            );

            expect(
                container.querySelector('#test-video-id')
            ).toBeInTheDocument();
            expect(setupPlayer).toHaveBeenCalledWith(
                expect.objectContaining({
                    shouldUsePreferredFile: false,
                    videoFile: undefined
                })
            );
        });

        it('calls setupPlayer with shouldUsePreferredFile false when videoFile is absent', () => {
            useCajaCarruselContext.mockReturnValue({
                currentIndex: 0,
                preferredVideoFiles: {}
            });

            render(<JwVideoPlayer {...defaultProps} variant="horizontal" />);

            expect(setupPlayer).toHaveBeenCalledWith({
                playerId: 'test-video-id',
                videoId: 'test-video-id',
                videoFile: undefined,
                shouldUsePreferredFile: false,
                urlAds: 'https://ads.test',
                counterVideo: undefined
            });
        });

        it('calls setupPlayer with shouldUsePreferredFile true when preferredVideoFiles has the video', () => {
            useCajaCarruselContext.mockReturnValue({
                currentIndex: 0,
                preferredVideoFiles: {
                    'test-video-id': 'https://cdn.test/preferred.mp4'
                }
            });

            render(<JwVideoPlayer {...defaultProps} variant="horizontal" />);

            expect(setupPlayer).toHaveBeenCalledWith({
                playerId: 'test-video-id',
                videoId: 'test-video-id',
                videoFile: 'https://cdn.test/preferred.mp4',
                shouldUsePreferredFile: true,
                urlAds: 'https://ads.test',
                counterVideo: undefined
            });
        });
    });

    it('should match snapshot, div with id for build video', () => {
        const { container } = render(<JwVideoPlayer {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });
    it('should match snapshot, with placeholder', () => {
        const { container } = render(
            <JwVideoPlayer {...defaultProps} index={1} />
        );
        expect(container).toMatchSnapshot();
    });
});
