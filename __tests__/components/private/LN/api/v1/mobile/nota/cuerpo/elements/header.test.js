import ArticleHeader from '../../../../../../../../../../__mocks__/data/nota/cuerpo/header/header.json';
import Header from '../../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo/elements/header';

describe('Test del header del cuerpo de la nota', () => {
    it('En caso que la información del header null', () => {
        const resp = Header(null);
        expect(resp).toBe(null);
    });

    it('Valores del header 3', () => {
        const resp = Header(ArticleHeader[0]);
        expect(resp['_t']).toBe('header');
        expect(resp['level']).toBe(ArticleHeader[0].level);
        expect(resp['value']).toBe(ArticleHeader[0].content);
    });

    it('Valores del header 1', () => {
        const resp = Header(ArticleHeader[1]);
        expect(resp['_t']).toBe('header');
        expect(resp['level']).toBe(ArticleHeader[1].level);
        expect(resp['value']).toBe(ArticleHeader[1].content);
    });

    it('Valores del header 2', () => {
        const resp = Header(ArticleHeader[2]);
        expect(resp['_t']).toBe('header');
        expect(resp['level']).toBe(ArticleHeader[2].level);
        expect(resp['value']).toBe(ArticleHeader[2].content);
    });

    it('Valores del header 2', () => {
        const resp = Header(ArticleHeader[3]);
        expect(resp).toBe(null);
    });
    it('Valores del header es distinto de texto', () => {
        const article = [
            {
                _id: 'CQTCQCNHQJDNJN7S5BNF5J7ZIM',
                additional_properties: {},
                content: 1,
                level: 2,
                type: 'header'
            }
        ];
        const resp = Header(article[0]);
        expect(resp).toBe(null);
    });
});
