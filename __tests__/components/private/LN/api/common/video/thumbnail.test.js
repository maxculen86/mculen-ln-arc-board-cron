import VideoThumbnail from '../../../../../../../components/private/LN/api/common/video/thumbnail';
import VideoArticle from '../../../../../../../__mocks__/data/nota/cuerpo/video/video.json';

describe('Json video common', () => {
    it('Si se envia un valor null', () => {
        const resp = VideoThumbnail(null);
        expect(resp).toBe(null);
    });

    it('Render video common', () => {
        const resp = VideoThumbnail(VideoArticle[0].promo_items);
        expect(resp['_t']).toBe('mmi');
        expect(resp.orden).toBe(0);
        expect(resp.src).toBe(VideoArticle[0].promo_items.basic.url);
    });

    it('Render video sin contenido stream', () => {
        const respNotExist = VideoThumbnail(VideoArticle[3].promo_items);
        expect(respNotExist).toBe(null);

        const respEmpty = VideoThumbnail(VideoArticle[6].promo_items);
        expect(respEmpty).toBe(null);
    });
});
