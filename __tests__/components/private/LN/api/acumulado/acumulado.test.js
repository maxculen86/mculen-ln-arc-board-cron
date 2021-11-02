import articlesRecetas from '../../../../../../__mocks__/data/articleCollections/recetas.json';
import articlesDeportes from '../../../../../../__mocks__/data/articleCollections/deportes.json';
import AcuIndex from '../../../../../../components/private/LN/api/global/v1/accumulated';

describe('Json Acumulado section. Test de integracion', () => {
    const acuData = {
        name: 'Recetas',
        articles: articlesRecetas,
        paginator: 100,
        total: 2667,
        configuration: undefined
    };
    const resp = AcuIndex(acuData);
    test('Test name', () => {
        expect('Recetas').toMatch(acuData.name);
    });

    test('Test total', () => {
        expect(acuData.articles.length).toBeGreaterThan(0);
    });
});
