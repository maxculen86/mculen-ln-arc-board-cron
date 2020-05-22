jest.mock('../../../../../../components/private/LN/api/v1/nota/image', () => {
    return () => {
        return 'image-mock';
    };
});
jest.mock('../../../../../../components/private/LN/api/v1/nota/video', () => {
    return () => {
        return 'video-mock';
    };
});

jest.mock(
    '../../../../../../components/private/LN/api/v1/nota/aperturaReceta',
    () => {
        return () => {
            return 'receta-mock';
        };
    }
);

jest.mock(
    '../../../../../../components/private/LN/api/v1/common/author',
    () => {
        return () => {
            return 'author-mock';
        };
    }
);

import Apertura from '../../../../../../components/private/LN/api/v1/nota/aperturaArticle';
import article from '../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA4.json';

describe('Test de JSON de apertura en article', () => {
    it('Render de atributos de apertura', () => {
        const resp = Apertura(article);
        expect(resp.titulo).toBe(article.headlines.basic);
        expect(resp.bajada).toBe(article.subheadlines.basic);
        expect(resp.volanta).toBe(article.label.volanta.text);

        resp.imagenes.forEach(image => {
            expect(image).toBe('image-mock');
        });
    });

    it('Render video destacado', () => {
        article.promo_items.basic.type = 'video';
        const resp = Apertura(article);
        expect(resp.video).toBe('video-mock');
    });

    it('Render detalle de receta', () => {
        const resp = Apertura(article);
        expect(resp.receta).toBe('receta-mock');
    });

    it('Render autor del articulo', () => {
        const resp = Apertura(article);
        resp.autores.forEach(element => {
            expect(element).toBe('author-mock');
        });
    });
});
