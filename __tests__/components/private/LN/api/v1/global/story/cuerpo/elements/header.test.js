import ArticleHeader from '../../../../../../../../../../__mocks__/data/nota/cuerpo/header/header.json';
import Header from '../../../../../../../../../../components/private/LN/api/v1/global/story/cuerpo/elements/header';

describe('Test del header del cuerpo de la nota', () => {
    it('En caso que la información del header null', () => {
        const resp = Header(null);
        expect(resp).toBe(null);
    });

    it('Valores del header 3', () => {
        const resp = Header(ArticleHeader[0]);
        expect(resp['_t']).toBe(`sub${ArticleHeader[0].level}`);
        expect(resp['valor']).toBe(ArticleHeader[0].content);
    });

    it('Valores del header 1', () => {
        const resp = Header(ArticleHeader[1]);
        expect(resp['_t']).toBe(`sub${ArticleHeader[1].level}`);
        expect(resp['valor']).toBe(ArticleHeader[1].content);
    });

    it('Valores del header 2', () => {
        const resp = Header(ArticleHeader[2]);
        expect(resp['_t']).toBe(`sub${ArticleHeader[2].level}`);
        expect(resp['valor']).toBe(ArticleHeader[2].content);
    });

    it('Valores del header 2', () => {
        const resp = Header(ArticleHeader[3]);
        expect(resp).toBe(null);
    });
});
