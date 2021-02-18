import env from '../../../../../../../__mocks__/fusion:environment';
import articlesMayInterest from '../../../../../../../__mocks__/data/articleMayInterestCollections/mayInterest.json';
import MayInterestIndex from '../../../../../../../components/private/LN/api/v1/acumulado';

describe('Test de index en Json MayInterest', () => {
    const acuData = {
        name: 'Te puede interesar',
        articles: articlesMayInterest,
        total: articlesMayInterest.length,
        configuration: undefined
    };

    test('Test titulo MayInterest', () => {
        const resp = MayInterestIndex(acuData);
        expect(resp.titulo).toBe('Te puede interesar');
    });
});
