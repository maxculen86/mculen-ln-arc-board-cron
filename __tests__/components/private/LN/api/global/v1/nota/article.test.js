import Nota from '../../../../../../../../components/private/LN/api/global/v1/nota';
import article from '../../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA4.json';

describe('Test json integracion Article', () => {
    it('Test categoria Nota', () => {
        const resp = Nota(article);
        expect(resp.categoria.slug).toBe('/recetas/platos-de-comida-principal');
        expect(resp.categoria.valor).toBe('Platos de comida principal');
    });
});
