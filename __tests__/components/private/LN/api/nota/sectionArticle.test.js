import Section from '../../../../../../components/private/LN/api/v1/nota/sectionArticle';
import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';

describe('Test de index en JSON de section en nota', () => {
    const resp = Section(article.globalContent.taxonomy.primary_section);
    it('Render de section', () => {
        expect(resp.id).toBe(
            article.globalContent.taxonomy.primary_section._id
        );
        expect(resp.nombre).toBe(
            article.globalContent.taxonomy.primary_section.name
        );
    });
});
