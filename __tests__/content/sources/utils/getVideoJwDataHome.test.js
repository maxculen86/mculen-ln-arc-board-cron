import { getVideoJwDataHome } from '../../../../content/sources/utils/getVideoJwDataHome';

describe('content - sources - utils -getVideoJwDataHome', () => {
    it('should return correct video data', () => {
        const videoData = {
            playlist: [
                {
                    sources: ['video.mp4'],
                    image: 'poster.jpg',
                    images: [{ src: 'poster.jpg' }],
                    mediaid: 'GVSSDClx',
                    title: 'Título de prueba',
                    tracks: [{ file: 'subtitulos.vtt' }],
                    duration: 120
                }
            ]
        };

        expect(getVideoJwDataHome(videoData)).toStrictEqual({
            sources: ['video.mp4'],
            image: 'poster.jpg',
            poster: 'poster.jpg',
            images: [{ src: 'poster.jpg' }],
            mediaid: 'GVSSDClx',
            title: 'Título de prueba',
            tracks: [{ file: 'subtitulos.vtt' }],
            duration: 120
        });
    });

    it('should return default empty values when videoData is empty', () => {
        expect(getVideoJwDataHome({})).toStrictEqual({
            sources: [],
            poster: undefined,
            image: undefined,
            images: [],
            mediaid: undefined,
            title: 'Video sin título',
            tracks: [],
            duration: undefined
        });
    });
});
