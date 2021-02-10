import env from '../../../../../../../__mocks__/fusion:environment';
//import articles from '../../../../../../../__mocks__/data/articleRankingCollections/recetas.json';
import articles from '../../../../../../../__mocks__/data/articleMayInterestCollections/tePuedeInteresar.json';
//import MayInterestIndex from '../../../../../../../components/private/LN/api/v1/ranking';
import MayInterestIndex from '../../../../../../../components/private/LN/api/v1/mayInterest';

describe('Test de index en Json MayInterest', () => {
    test('Test render', () => {
        const resp = MayInterestIndex(articles);
        expect(resp.acumuladoTotal).toBe(articles.length);
    });
});
