import { getFeaturedTag } from '../../../../../../components/private/LN/api/common/tag/index';

import ArticleTagDestacado from '../../../../../../__mocks__/data/nota/apertura/tagDestacado/tagDestacado.json';

describe('Test unitarios para espacio patrocinado y content lab', () => {
    it('test unitario en caso de enviar un null', () => {
        const respNull = getFeaturedTag(null);
        expect(respNull).toBe(null);
    });

    it('test en caso de enviar una nota sin datos de espacio patrocinado o content Lab', () => {
        const resp = getFeaturedTag(ArticleTagDestacado[3]);
        expect(resp).toBe(null);
    });

    it('test en caso que el espacio patrocinado sea falso', () => {
        const resp = getFeaturedTag(ArticleTagDestacado[2]);
        expect(resp).toBe(null);
    });

    it('test datos de contentLab', () => {
        const resp = getFeaturedTag(ArticleTagDestacado[0]);
        expect(resp.formatoId).toBe(1);
        expect(resp.tipoDescripcion).toBe('contentLab');
        expect(resp.valor).toBe(
            ArticleTagDestacado[0].label.marca_anunciante.text
        );
    });

    it('test datos de espacio patrocinado', () => {
        const resp = getFeaturedTag(ArticleTagDestacado[1]);
        expect(resp.formatoId).toBe(1);
        expect(resp.tipoDescripcion).toBe('Patrocinado');
        expect(resp.valor).toBe('Espacio Patrocinado');
    });
});
