jest.mock('../../../../../../components/private/LN/api/nota/image', () => {
    return () => {
        return 'image-mock';
    };
});
jest.mock('../../../../../../components/private/LN/api/nota/video', () => {
    return () => {
        return 'video-mock';
    };
});

jest.mock(
    '../../../../../../components/private/LN/api/nota/aperturaReceta',
    () => {
        return () => {
            return 'receta-mock';
        };
    }
);

import Apertura from '../../../../../../components/private/LN/api/nota/aperturaArticle';
import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';

describe('Test de JSON de apertura en article', () => {
    it('Render de atributos de apertura', () => {
        const resp = Apertura(article.globalContent);
        expect(resp.titulo).toBe(article.globalContent.headlines.basic);
        expect(resp.bajada).toBe(article.globalContent.subheadlines.basic);
        expect(resp.imagen).toBe('image-mock');
    });

    it('Render video destacado', () => {
        article.globalContent.promo_items.basic.type = 'video';
        const resp = Apertura(article.globalContent);
        expect(resp.video).toBe('video-mock');
    });

    it('Rende detalle de receta', () => {
        const resp = Apertura(article.globalContent);
        expect(resp.receta).toBe('receta-mock');
    });
});
