import VideoJW from '../../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo/elements/videoJW';
import videoMigrado from '../../../../../../../../../../__mocks__/data/nota/cuerpo/video/videoJWMigrado.json';
import videoPowerUp from '../../../../../../../../../../__mocks__/data/nota/cuerpo/video/videoJWPowerUp.json';
import videosinMu38 from '../../../../../../../../../../__mocks__/data/nota/cuerpo/video/videoJWsinMu38.json';

describe('Test de video JW en el cuerpo de la nota', () => {
    it('Si se le pasa un valor null a las video', () => {
        const resp = VideoJW(null);
        expect(resp).toBe(null);
    });

    it('Si le pasas un video migrado de Arc a JW', () => {
        const resp = VideoJW(videoMigrado);
        expect(Object.keys(resp).sort()).toEqual(
            [
                '_t',
                'duration',
                'multimediaFile',
                'multimediaFiles',
                'multimediaHls',
                'thumbnailImage'
            ].sort()
        );
        expect(resp.multimediaHls).toBe(
            'https://cdn.jwplayer.com/manifests/JgtuNUEs.m3u8'
        );
        expect(resp.multimediaFile).toMatchObject({
            _t: 'mmf',
            width: 1080,
            height: 1920,
            url: 'https://cdn.jwplayer.com/videos/JgtuNUEs-SomplJdm.mp4'
        });
        expect(resp.thumbnailImage).toMatchObject({
            _t: 'mmi',
            order: 0,
            src:
                'https://cdn.jwplayer.com/v2/media/JgtuNUEs/poster.jpg?width=720'
        });
    });

    it('Si le pasas un video de Power Up JW', () => {
        const resp = VideoJW(videoPowerUp);
        expect(Object.keys(resp).sort()).toEqual(
            [
                '_t',
                'duration',
                'multimediaFile',
                'multimediaFiles',
                'multimediaHls',
                'thumbnailImage'
            ].sort()
        );
        expect(resp.multimediaFile).toMatchObject({
            _t: 'mmf',
            width: 1920,
            height: 1080,
            url: 'https://cdn.jwplayer.com/videos/I7RTBP0c-SomplJdm.mp4'
        });
        expect(resp.thumbnailImage).toMatchObject({
            _t: 'mmi',
            order: 0,
            src:
                'https://cdn.jwplayer.com/v2/media/I7RTBP0c/poster.jpg?width=720'
        });
    });

    it('Si no exite el video con extension Mu38', () => {
        const resp = VideoJW(videosinMu38);
        expect(Object.keys(resp).sort()).toEqual(
            [
                '_t',
                'duration',
                'multimediaFile',
                'multimediaFiles',
                'thumbnailImage'
            ].sort()
        );
    });
});
