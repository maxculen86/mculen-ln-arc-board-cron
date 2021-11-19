import ArticleQuote from '../../../../../../../../../../__mocks__/data/nota/cuerpo/quote/quote.json';
import Quote from '../../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo/elements/quote';

describe('Test de quote en el cuepo de nota', () => {
    it('Verificar en caso que la cita sea null', () => {
        const resp = Quote(null);
        expect(resp).toBe(null);
    });

    it('Verificar en caso que el contenido de la cita sea vacio', () => {
        const resp = Quote(ArticleQuote[0]);
        expect(resp).toBe(null);
    });

    it('Verificar el tipo de cita "blockquote"', () => {
        const resp = Quote(ArticleQuote[1]);
        expect(resp['_t']).toBe('blockquote');
        expect(resp['value']).toBe(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id rhoncus tortor. Curabitur sodales tortor mi, et euismod quam dignissim eget. Ut sit amet metus et odio molestie efficitur.'
        );
    });

    it('Verificar el tipo de cita "pullquote"', () => {
        const resp = Quote(ArticleQuote[2]);
        expect(resp['_t']).toBe('pullquote');
        expect(resp['value']).toBe('Esto es una cita');
        expect(resp['author']).toBe('Ignacio Madrid');
    });

    it('Verificar el tipo de cita "pullquote" sin autor', () => {
        const resp = Quote(ArticleQuote[3]);
        expect(resp['author']).toBe(undefined);
    });

    it('Verificar en caso que el contenido sea distinto de texto', () => {
        const resp = Quote(ArticleQuote[4]);
        expect(resp).toBe(null);
    });
});
