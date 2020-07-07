import AperturaReceta from '../../../../../../../components/private/LN/api/v1/nota/apertura/aperturaReceta';
import article from '../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA4.json';

describe('Test json apertura receta', () => {
    it('Test de render full', () => {
        const resp = AperturaReceta(article.promo_items.receta);
        expect(resp.tiempo).toBe(
            article.promo_items.receta.embed.config.counterTime
        );
        expect(resp.porciones).toBe(
            article.promo_items.receta.embed.config.counterPortion
        );
    });
});
