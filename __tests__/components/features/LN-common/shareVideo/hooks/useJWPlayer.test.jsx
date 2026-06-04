import { renderHook, act } from '@testing-library/react';
import { useContent } from 'fusion:content';
import loadJWPlayerScript from '../../../../../../components/chains/utils/loadJWPlayerScript';
import { useJWPlayer } from '../../../../../../components/features/LN-common/shareVideo/hooks/useJWPlayer';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock('../../../../../../components/chains/utils/loadJWPlayerScript', () =>
    jest.fn()
);

jest.mock(
    '../../../../../../components/private/common/videoPlayerJw/utils/helperJw',
    () => ({ onJwPlayerReady: jest.fn() })
);

describe('Components - features - LN-common - shareVideo - hooks - useJWPlayer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useContent.mockReturnValue({ duration: null, title: null });
        delete global.window.jwplayer;
        delete global.window.localStorage;
    });

    it('should initialize with default states', () => {
        const { result } = renderHook(() => useJWPlayer('TdCdBgL'));

        expect(result.current.isScriptLoaded).toBe(false);
        expect(typeof result.current.loadPlayer).toBe('function');
        expect(typeof result.current.setupPlayer).toBe('function');
        expect(result.current.playerRef.current).toBe(null);
    });

    it('should call loadJWPlayerScript once when loadPlayer is called', () => {
        loadJWPlayerScript.mockImplementation((_id, cb) => cb());

        const { result } = renderHook(() => useJWPlayer('TdCdBgL'));

        act(() => {
            result.current.loadPlayer();
        });

        expect(loadJWPlayerScript).toHaveBeenCalledWith(
            'OSRCuuxn',
            expect.any(Function)
        );
        expect(result.current.isScriptLoaded).toBe(true);
    });

    it('should not call loadJWPlayerScript again if already started loading', () => {
        const { result } = renderHook(() => useJWPlayer('TdCdBgL'));

        act(() => {
            result.current.loadPlayer();
            result.current.loadPlayer();
        });

        expect(loadJWPlayerScript).toHaveBeenCalledTimes(1);
    });

    it('should set up player only once if script is loaded', () => {
        const mockSetMute = jest.fn();
        const mockOn = jest.fn();
        const mockSetup = jest.fn(() => ({ setMute: mockSetMute, on: mockOn }));

        global.window.jwplayer = jest.fn(() => ({
            setup: mockSetup
        }));

        global.window.localStorage = {
            getItem: jest.fn(() => 'true')
        };

        loadJWPlayerScript.mockImplementation((_id, callback) => {
            callback();
        });

        const { result } = renderHook(() => useJWPlayer('TdCdBgL'));

        act(() => {
            result.current.loadPlayer();
        });

        act(() => {
            result.current.setupPlayer();
        });

        expect(window.jwplayer).toHaveBeenCalledWith('TdCdBgL');
        expect(mockSetup).toHaveBeenCalledWith({
            file: 'https://cdn.jwplayer.com/videos/TdCdBgL.mp4',
            image: 'https://cdn.jwplayer.com/v2/media/TdCdBgL/poster.jpg',
            width: '100%',
            allowFullscreen: false
        });

        expect(window.localStorage.getItem).toHaveBeenCalledWith(
            'jwplayer.mute'
        );
        expect(mockSetMute).toHaveBeenCalledWith(true);
    });

    it('should not crash when useContent returns null', () => {
        useContent.mockReturnValueOnce(null);

        const { result } = renderHook(() => useJWPlayer('TdCdBgL'));

        expect(result.current.isScriptLoaded).toBe(false);
        expect(typeof result.current.loadPlayer).toBe('function');
        expect(typeof result.current.setupPlayer).toBe('function');
    });
});
