import env from '../../../../../../../__mocks__/fusion:environment';
import articles from '../../../../../../../__mocks__/data/articleRankingCollections/recetas.json';
import RankingIndex from '../../../../../../../components/private/LN/api/v1/ranking';

describe('Test de index en Json ranking', () => {
    test('Test render', () => {
        var test = console.log(articles.content_elements);
        const resp = RankingIndex('recetas', articles.content_elements);
        expect(resp.acumuladoTotal).toBe(articles.content_elements.length);
    });
});
