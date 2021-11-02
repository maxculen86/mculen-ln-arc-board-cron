import ModificadorTemplateArticle from '../../../../../../__mocks__/data/nota/modificadorTemplate.json';
import ModificadorTemplate from '../../../../../../../components/private/LN/api/global/v1/nota/modificadorTemplate';
import get from 'lodash.get';

describe('Pruebas unitarias para los modificadores template', () => {
    it('Test valor al enviar un null', () => {
        const resp = ModificadorTemplate(null);
        expect(resp).toBe(null);
    });

    it('Test valores del modificador template', () => {
        const distributor = get(
            ModificadorTemplateArticle[0],
            'distributor',
            null
        );
        const resp = ModificadorTemplate(distributor);
        expect(resp.id).toBe('a19656bb-25db-481a-9492-55e88b0ff568');
        expect(resp.descripcion).toBe('BBC Mundo');
    });

    it('Test valor a retornar null si el distribuidor es LN', () => {
        const distributor = get(
            ModificadorTemplateArticle[1],
            'distributor',
            null
        );
        const resp = ModificadorTemplate(distributor);
        expect(resp).toBe(null);
    });

    it('Test valor a retornar null si el distribuidor name es null', () => {
        const distributor = get(
            ModificadorTemplateArticle[2],
            'distributor',
            null
        );
        const resp = ModificadorTemplate(distributor);
        expect(resp).toBe(null);
    });

    it('Test valor a retornar null si el distribuidor es otra variante LN', () => {
        const distributor = get(
            ModificadorTemplateArticle[3],
            'distributor',
            null
        );
        const resp = ModificadorTemplate(distributor);
        expect(resp).toBe(null);
    });

    it('Test valor a retornar null si el distribuidor esta vacio', () => {
        const distributor = get(
            ModificadorTemplateArticle[4],
            'distributor',
            null
        );
        const resp = ModificadorTemplate(distributor);
        expect(resp).toBe(null);
    });
});
