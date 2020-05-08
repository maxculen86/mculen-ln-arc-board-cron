import articles from '../../../../../../__mocks__/data/articleCollections/recetas.json';
import AcuIndex from '../../../../../../components/private/LN/api/v1/acumulado';

describe('Json Acumulado section. Test de integracion', () => {
    it('Test de snapshot', () => {
        const resp = AcuIndex('Recetas', articles, true);

        expect(resp).toMatchSnapshot();
    });
});
