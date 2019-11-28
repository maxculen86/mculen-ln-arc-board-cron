import Image from '../../../../../../components/private/LN/api/nota/imageArticle';
jest.mock(
    '../../../../../../components/private/LN/api/nota/imageArticle',
    () => {
        return () => {
            return 'image-mock';
        };
    }
);
jest.mock(
    '../../../../../../components/private/LN/api/nota/videoArticle',
    () => {
        return () => {
            return 'video-mock';
        };
    }
);

import Apertura from '../../../../../../components/private/LN/api/nota/aperturaArticle';
import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';

describe('Test de JSON de apertura en article', () => {
    it('Render de atributos de apertura', () => {
        const resp = Apertura(article.globalContent);
        expect(resp.title).toBe(article.globalContent.headlines.basic);
        expect(resp.subTitle).toBe(article.globalContent.subheadlines.basic);
        expect(resp.image).toBe('image-mock');
    });

    it('Render video destacado', () => {
        article.globalContent.promo_items.basic.type = 'video';
        const resp = Apertura(article.globalContent);
        expect(resp.video).toBe('video-mock');
    });
});
