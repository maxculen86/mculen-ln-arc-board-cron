import {
    registerPlayerEvents,
    setupPlayer
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper';
import {
    buildTagsUrl,
    onJwPlayerReady
} from '../../../../../../components/private/common/videoPlayerJw/utils/helperJw';
import {
    getAdsConfigVideoJw,
    handleEventSwipeVideo
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../../components/private/common/videoPlayerJw/utils/helperJw',
    () => ({
        ...jest.requireActual(
            '../../../../../../components/private/common/videoPlayerJw/utils/helperJw'
        ),
        buildTagsUrl: jest.fn(),
        onJwPlayerReady: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers',
    () => ({
        getAdsConfigVideoJw: jest.fn(),
        handleEventSwipeVideo: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('components - chains - ln10_caja_carrusel - components - jwVideoPlayerHelper', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        buildTagsUrl.mockReturnValue('https://ads.test?permutive=true');
        getAdsConfigVideoJw.mockReturnValue({
            advertising: {
                client: 'googima'
            }
        });
    });

    it('sets up jwplayer with the fallback mp4 file', () => {
        const mockSetup = jest.fn();
        window.jwplayer = jest.fn(() => ({
            setup: mockSetup
        }));

        setupPlayer({
            playerId: 'test-video-id',
            videoId: 'test-video-id',
            shouldUsePreferredFile: false,
            urlAds: 'https://ads.test',
            counterVideo: 3
        });

        expect(window.jwplayer).toHaveBeenCalledWith('test-video-id');
        expect(buildTagsUrl).toHaveBeenCalledWith('https://ads.test');
        expect(getAdsConfigVideoJw).toHaveBeenCalledWith({
            adsUrl: 'https://ads.test?permutive=true',
            customValidation: true
        });
        expect(mockSetup).toHaveBeenCalledWith({
            file: 'https://cdn.jwplayer.com/videos/test-video-id.mp4',
            image: 'https://cdn.jwplayer.com/v2/media/test-video-id/poster.jpg',
            width: '100%',
            allowFullscreen: false,
            advertising: {
                client: 'googima'
            }
        });
    });

    it('sets up jwplayer with the preferred file when available', () => {
        const mockSetup = jest.fn();
        window.jwplayer = jest.fn(() => ({
            setup: mockSetup
        }));

        setupPlayer({
            playerId: 'test-video-id',
            videoId: 'test-video-id',
            videoFile: 'https://cdn.test/preferred.mp4',
            shouldUsePreferredFile: true,
            urlAds: 'https://ads.test',
            counterVideo: 1
        });

        expect(mockSetup).toHaveBeenCalledWith(
            expect.objectContaining({
                file: 'https://cdn.test/preferred.mp4'
            })
        );
        expect(getAdsConfigVideoJw).toHaveBeenCalledWith({
            adsUrl: 'https://ads.test?permutive=true',
            customValidation: false
        });
    });

    it('registers player events and preserves tracking behavior', () => {
        const mockPlayer = {
            on: jest.fn()
        };
        const handleNextCallback = jest.fn();
        const sentProgressRef = {
            current: new Set()
        };

        registerPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            videoId: 'test-video-id',
            title: 'Test video',
            handleNextCallback,
            origin: 'test-origin',
            roofData: { title: 'Roof title' },
            titleJwPlayer: 'JW Test video',
            duration: 12
        });

        const timeHandler = mockPlayer.on.mock.calls.find(
            ([eventName]) => eventName === 'time'
        )?.[1];
        const readyHandler = mockPlayer.on.mock.calls.find(
            ([eventName]) => eventName === 'ready'
        )?.[1];
        const completeHandler = mockPlayer.on.mock.calls.find(
            ([eventName]) => eventName === 'complete'
        )?.[1];
        const playHandler = mockPlayer.on.mock.calls.find(
            ([eventName]) => eventName === 'play'
        )?.[1];

        timeHandler({ currentTime: 8, duration: 10 });
        timeHandler({ currentTime: 9, duration: 10 });
        readyHandler();
        completeHandler();
        completeHandler();
        playHandler();

        expect(addEventToDataLayerV2).toHaveBeenNthCalledWith(1, {
            event: '25',
            rest: {
                videoID: 'test-video-id',
                videoName: 'Test video'
            }
        });
        expect(addEventToDataLayerV2).toHaveBeenNthCalledWith(2, {
            event: '50',
            rest: {
                videoID: 'test-video-id',
                videoName: 'Test video'
            }
        });
        expect(addEventToDataLayerV2).toHaveBeenNthCalledWith(3, {
            event: '75',
            rest: {
                videoID: 'test-video-id',
                videoName: 'Test video'
            }
        });
        expect(addEventToDataLayerV2).toHaveBeenNthCalledWith(4, {
            event: 'videoComplete',
            rest: {
                videoID: 'test-video-id',
                videoName: 'Test video'
            }
        });
        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(4);
        expect(handleNextCallback).toHaveBeenCalledTimes(2);
        expect(onJwPlayerReady).toHaveBeenCalledWith(mockPlayer, {
            currentTitle: 'JW Test video',
            duration: 12000
        });
        expect(handleEventSwipeVideo).toHaveBeenCalledWith({
            videoIdObserved: 'test-video-id',
            videoTitle: 'Test video',
            origin: 'test-origin',
            roofData: { title: 'Roof title' }
        });
    });
});
