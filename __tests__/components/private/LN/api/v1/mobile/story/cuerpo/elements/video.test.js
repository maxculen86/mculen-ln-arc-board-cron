import Video from '../../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo/elements/video';
import ArticleVideo from '../../../../../../../../../../__mocks__/data/nota/cuerpo/video/video.json';

describe('Test de json de imagen en el cuerpo de la nota', () => {
    it('Si se le pasa un valor null a las video', () => {
        const resp = Video(null);
        expect(resp).toBe(null);
    });

    it('Valores del json de video', () => {
        const resp = Video(ArticleVideo[0]);
        expect(resp['_t']).toBe('video');
        expect(resp['duration']).toBe(ArticleVideo[0]['duration']);
        expect(resp['showAd']).toBe('1');
        expect(resp['title']).toBe(ArticleVideo[0]['headlines']['basic']);
        expect(resp['multimediaFile']['_t']).toBe('mmf');
        expect(resp['multimediaFile']['width']).toBe(1280);
        expect(resp['multimediaFile']['height']).toBe(720);
        expect(resp['multimediaFile']['url']).toBe(
            'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/2019/10/22/5daf2cfc46e0fb0009c12a9b/t_19b8dc8ac5b24ccead4960711ad0376f_name_DREAM_THEATER___Untethered_Angel__OFFICIAL_VIDEO__cropped/file_1280x720-2000-v3_1.mp4'
        );
        expect(resp['thumbnailImage']['_t']).toBe('mmi');
        expect(resp['thumbnailImage']['order']).toBe(0);
        expect(resp['thumbnailImage']['src']).toBe(
            ArticleVideo[0]['promo_items']['basic']['url']
        );
    });
});
