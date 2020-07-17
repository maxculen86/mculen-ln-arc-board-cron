import Image from '../../../../../../components/private/LN/api/v1/common/image';
import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';
import articleFoto from '../../../../../../__mocks__/data/nota/cuerpo/image/imageNoResize.json';

describe('Json imagen common', () => {
    test('Render imagen correcto', () => {
        const img = article.globalContent.promo_items.basic;

        const resp = Image(img);
        expect(resp['_t']).toBe('img');
        expect(resp.id).toBe(img._id);
        expect(resp.src).toBe(img.resized_urls[0].resizedUrl);
        expect(resp.alto).toBe(img.resized_urls[0].option.height);
        expect(resp.ancho).toBe(img.resized_urls[0].option.width);
    });

    test('Si la imagen es null', () => {
        const resp = Image(null);
        expect(resp).toBe(null);
    });

    test('Se envia el objeto pero no contiene Resize Url', () => {
        const resp = Image(articleFoto);
        expect(resp).toBe(null);
    });
});
