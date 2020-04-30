import AperturaReceta from '../../../../../../components/private/LN/api/v1/nota/aperturaReceta';
import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';

describe('Test json apertura receta', () => {
    it('Test de render full', () => {
        const resp = AperturaReceta(article.globalContent.promo_items.receta);
        expect(resp.tiempo).toBe(
            article.globalContent.promo_items.receta.embed.config.counterTime
        );
        expect(resp.porciones).toBe(
            article.globalContent.promo_items.receta.embed.config.counterPortion
        );
    });
});
