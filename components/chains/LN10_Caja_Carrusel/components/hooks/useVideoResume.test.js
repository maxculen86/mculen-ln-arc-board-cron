import { renderHook } from '@testing-library/react';
import useVideoResume from './useVideoResume';
import * as videoPlayerHelper from '../../../../private/common/utils/videoPlayerHelper';

describe('useVideoResume', () => {
    let registerSpy;
    let cleanupSpy;

    beforeEach(() => {
        cleanupSpy = jest.fn();
        registerSpy = jest
            .spyOn(videoPlayerHelper, 'registerVideoResumeTracking')
            .mockReturnValue(cleanupSpy);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should register tracking when player is provided', () => {
        const player = {};
        const title = 'Test Video';
        const videoId = '123';

        renderHook(() => useVideoResume({ player, title, videoId }));

        expect(registerSpy).toHaveBeenCalledWith({
            player,
            defaultTitle: title,
            defaultId: videoId
        });
    });

    it('should not register tracking when player is missing', () => {
        renderHook(() =>
            useVideoResume({ player: null, title: 'Test', videoId: '123' })
        );

        expect(registerSpy).not.toHaveBeenCalled();
    });

    it('should cleanup tracking on unmount', () => {
        const player = {};
        const { unmount } = renderHook(() =>
            useVideoResume({ player, title: 'Test', videoId: '123' })
        );

        unmount();

        expect(cleanupSpy).toHaveBeenCalled();
    });

    it('should cleanup and re-register when player changes', () => {
        const player1 = { id: 1 };
        const player2 = { id: 2 };
        const props = { player: player1, title: 'Test', videoId: '123' };

        const { rerender } = renderHook(newProps => useVideoResume(newProps), {
            initialProps: props
        });

        expect(registerSpy).toHaveBeenCalledTimes(1);

        rerender({ ...props, player: player2 });

        expect(cleanupSpy).toHaveBeenCalled();
        expect(registerSpy).toHaveBeenCalledTimes(2);
        expect(registerSpy).toHaveBeenLastCalledWith({
            player: player2,
            defaultTitle: 'Test',
            defaultId: '123'
        });
    });
});
