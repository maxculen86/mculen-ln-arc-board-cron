import { getVideoJwDataCarrusel } from '../../../../content/sources/utils/getVideoJwDataCarrusel';

describe('content - sources - utils - getVideoJwDataCarrusel', () => {
    test('should return correct data for a valid videoData object', () => {
        const videoData = {
            playlist: [
                {
                    sources: [{ file: 'video.mp4' }],
                    images: [{ src: 'poster.jpg' }],
                    duration: 120
                }
            ],
            title: 'Video LN'
        };

        const result = getVideoJwDataCarrusel(videoData);
        expect(result).toEqual({
            sources: [{ file: 'video.mp4' }],
            poster: 'poster.jpg',
            duration: 120,
            title: 'Video LN'
        });
    });

    test('should return correct data with string duration for a valid videoData object', () => {
        const videoData = {
            playlist: [
                {
                    sources: [{ file: 'video.mp4' }],
                    images: [{ src: 'poster.jpg' }],
                    duration: '1422378'
                }
            ],
            title: 'Video LN'
        };

        const result = getVideoJwDataCarrusel(videoData);
        expect(result).toEqual({
            sources: [{ file: 'video.mp4' }],
            poster: 'poster.jpg',
            duration: 1422,
            title: 'Video LN'
        });
    });

    test('should return empty values when playlist is empty', () => {
        const videoData = { playlist: [] };

        const result = getVideoJwDataCarrusel(videoData);
        expect(result).toEqual({
            sources: [],
            poster: '',
            duration: 0,
            title: ''
        });
    });
});
