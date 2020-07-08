import ModificadorTemplateArticle from '../../../../../../__mocks__/data/nota/modificadorTemplate.json';
import ModificadorTemplate from '../../../../../../components/private/LN/api/v1/nota/modificadorTemplate';
import modificadorTemplate from '../../../../../../components/private/LN/api/v1/nota/modificadorTemplate';

describe('Pruebas unitarias para los modificadores template', () => {
    it('Tes validador de valor en null',()=>{
        const resp = ModificadorTemplate(null);
        expect(resp).toBe(null);
    });

    it('Test valor a retornar null si el distribuidor es LN',()=>{
        const resp = ModificadorTemplate(ModificadorTemplateArticle[1].distributor);
        expect(resp).toBe(null);
    })

    it('Test valores del modificador template',()=>{
        const resp = ModificadorTemplate(ModificadorTemplateArticle[0])
        expect(resp.id).toBe(ModificadorTemplateArticle[0].distributor.reference_id);
        expect(resp.descripcion).toBe(ModificadorTemplateArticle[0].distributor.name);
    })
});
