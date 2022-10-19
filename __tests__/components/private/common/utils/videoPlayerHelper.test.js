import { setCustomErrorsVideoPlayer } from '../../../../../components/private/common/utils/videoPlayerHelper';
describe('Private - Common - Utils - VideoPlayerHelper', () => {
    it('should test setCustomErrorsVideoPlayer function', () => {
        const expected = expect.objectContaining({
            template: expect.any(Function)
        });
        setCustomErrorsVideoPlayer();
        expect(window.PoWaSettings.error).toBeDefined();
        expect(window.PoWaSettings.error).toEqual(expected);
    });
});
