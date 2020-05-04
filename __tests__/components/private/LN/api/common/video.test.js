import Video from '../../../../../../components/private/LN/api/v1/common/video';
import article from '../../../../../../__mocks__/data/articles/XLHPSRHOAVDLRNP2LMCCEJM62Y.json';

describe('Json video common', () => {
    it('Render video common', () => {
        const resp = Video(article.promo_items.basic);

        expect(resp.id).toBe(article.promo_items.basic._id);
        expect(resp.url).toBe(article.promo_items.basic.streams[0].url);
    });
});
