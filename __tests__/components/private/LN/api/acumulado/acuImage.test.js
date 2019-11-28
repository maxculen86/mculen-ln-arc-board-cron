import acuImage from '../../../../../../components/private/LN/api/common/image';
import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';

describe('Json imagen en acumulado', () => {
    test('Render imagen correcto', () => {
        const img = article.globalContent.promo_items.basic;

        const resp = acuImage(img);

        expect(resp.id).toBe(img._id);
        expect(resp.src).toBe(img.resized_urls[0].resizedUrl);
    });
});
