import {
    secondsToMinutes,
    getDesktopPreviewVideo,
    getDesktopPosterImage
} from '../../../../../components/features/LN-10-global/cardCarrusel/helpers';

describe('components - features - LN-10-global - cardCarrusel - helpers', () => {
    it('should convert seconds to minutes and seconds format', () => {
        expect(secondsToMinutes(125)).toBe('02:05');
        expect(secondsToMinutes(3600)).toBe('60:00');
        expect(secondsToMinutes(59)).toBe('00:59');
    });

    it('should return empty string for invalid input', () => {
        expect(secondsToMinutes(-1)).toBe('');
        expect(secondsToMinutes('string')).toBe('');
        expect(secondsToMinutes(null)).toBe('');
        expect(secondsToMinutes(undefined)).toBe('');
    });

    it('should replace preview video width to 640 when pattern matches', () => {
        expect(
            getDesktopPreviewVideo(
                'https://assets-jpcust.jwpsrv.com/thumbnails/xenvu60g-320.mp4'
            )
        ).toBe('https://assets-jpcust.jwpsrv.com/thumbnails/xenvu60g-640.mp4');
    });

    it('should keep preview video unchanged when pattern does not match', () => {
        expect(
            getDesktopPreviewVideo('https://cdn.jwplayer.com/videos/a.mp4')
        ).toBe('https://cdn.jwplayer.com/videos/a.mp4');
    });

    it('should replace poster width query param to 640', () => {
        expect(
            getDesktopPosterImage(
                'https://cdn.jwplayer.com/v2/media/FaG9jBTV/poster.jpg?width=320'
            )
        ).toBe(
            'https://cdn.jwplayer.com/v2/media/FaG9jBTV/poster.jpg?width=640'
        );
    });

    it('should keep poster unchanged when width query param is missing', () => {
        expect(
            getDesktopPosterImage(
                'https://cdn.jwplayer.com/v2/media/FaG9jBTV/poster.jpg'
            )
        ).toBe('https://cdn.jwplayer.com/v2/media/FaG9jBTV/poster.jpg');
    });
});
