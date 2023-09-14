import { getVideoJwDataHome } from '../../../../content/sources/utils/getVideoJwDataHome';

describe('content - sources - utils -getVideoJwDataHome', () => {
    it('should return sources and poster from videoData', () => {
        const videoData = {
            playlist: [
                {
                    sources: ['video.mp4'],
                    images: [{ src: 'poster.jpg' }]
                }
            ]
        };

        expect(getVideoJwDataHome(videoData)).toStrictEqual({
            sources: ['video.mp4'],
            poster: 'poster.jpg'
        });
    });

    it('should return empty sources and poster when videoData is empty', () => {
        expect(getVideoJwDataHome({})).toStrictEqual({
            sources: [],
            poster: undefined
        });
    });
});
