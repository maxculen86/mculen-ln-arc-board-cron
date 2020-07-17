import Section from '../../../../../../components/private/LN/api/v1/nota/sectionArticle';
import article from '../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA4.json';

describe('Test de index en JSON de section en nota', () => {
    const resp = Section(article.taxonomy.primary_section);
    //Revisar categorias recetas
    it('Render de section no migradas', () => {
        expect(resp.id).toBe(43);
        expect(resp.valor).toBe('Recetas');
    });
});
