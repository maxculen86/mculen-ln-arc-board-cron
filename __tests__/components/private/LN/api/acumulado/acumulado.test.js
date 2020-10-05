import articlesRecetas from '../../../../../../__mocks__/data/articleCollections/recetas.json';
import articlesDeportes from '../../../../../../__mocks__/data/articleCollections/deportes.json';
import AcuIndex from '../../../../../../components/private/LN/api/v1/acumulado';

describe('Json Acumulado section. Test de integracion', () => {
    it('Test de snapshot Recetas', () => {
        const resp = AcuIndex('Recetas', articlesRecetas, true);
        expect(resp).toMatchSnapshot();
    });
});
