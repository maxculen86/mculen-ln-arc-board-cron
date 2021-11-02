import Video from '../../../../../../../../components/private/LN/api/global/v1/nota/cuerpo/elements/video';
import ArticleVideo from '../../../../../../../../__mocks__/data/nota/cuerpo/video/video.json';

describe('Test de json de imagen en el cuerpo de la nota', () => {
    it('Si se le pasa un valor null a las video', () => {
        const resp = Video(null);
        expect(resp).toBe(null);
    });

    it('Valores del json de video', () => {
        const resp = Video(ArticleVideo[0]);
        expect(resp['_t']).toBe('p');
    });
});
