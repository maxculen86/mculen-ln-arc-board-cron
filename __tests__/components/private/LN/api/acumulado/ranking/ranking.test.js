import env from '../../../../../../../__mocks__/fusion:environment';
import articles from '../../../../../../../__mocks__/data/articleRankingCollections/recetas.json';
import RankingIndex from '../../../../../../../components/private/LN/api/v1/acumulado';

describe('Test de index en Json ranking', () => {
    const acuData = {
        articles: articles.content_elements,
        total: articles.content_elements.length
    };
    test('Test render, total Notas', () => {
        const resp = RankingIndex(acuData);
        expect(resp.acumuladoTotal).toBe(acuData.total);
    });
});
