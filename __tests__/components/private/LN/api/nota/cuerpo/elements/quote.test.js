import ArticleQuote from '../../../../../../../../__mocks__/data/nota/cuerpo/quote/quote.json';
import Quote from '../../../../../../../../components/private/LN/api/global/v1/nota/cuerpo/elements/quote';

describe('Test de quote en el cuepo de nota', () => {
    it('Verificar en caso que la cita sea null', () => {
        const resp = Quote(null);
        expect(resp).toBe(null);
    });

    it('Verificar en caso que el contenido de la cita sea vacio', () => {
        const resp = Quote(ArticleQuote[0]);
        expect(resp).toBe(null);
    });

    it('Verificar el tipo de cita "des"', () => {
        const resp = Quote(ArticleQuote[1]);
        expect(resp['valor']['_t']).toBe('des');
    });

    it('Verificar cantidad de elementos para la cita "des"', () => {
        const resp = Quote(ArticleQuote[1]);
        expect(resp['valor']['valor']).toHaveLength(1);
    });

    it('Verificar el tipo de cita "textual"', () => {
        const resp = Quote(ArticleQuote[2]);
        expect(resp['valor']['_t']).toBe('textual');
    });

    it('Verificar cantidad de elementos para la cita "textual"', () => {
        const resp = Quote(ArticleQuote[2]);
        expect(resp['valor']['valor']).toHaveLength(2);
    });

    it('Verificar el tipo de cita "textual" sin autor', () => {
        const resp = Quote(ArticleQuote[3]);
        expect(resp['valor']['valor']).toHaveLength(1);
    });

    it('Verificar respuestas de tipo de cita "des"', () => {
        const resp = Quote(ArticleQuote[1]);
        expect(resp['_t']).toBe('p');
        expect(resp['valor']['valor'][0]).toBe(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id rhoncus tortor. Curabitur sodales tortor mi, et euismod quam dignissim eget. Ut sit amet metus et odio molestie efficitur.'
        );
    });

    it('Verificar respuestas de tipo de cita "textual"', () => {
        const resp = Quote(ArticleQuote[2]);
        expect(resp['_t']).toBe('p');
        expect(resp['valor']['valor'][0]).toBe('Esto es una cita');
        expect(resp['valor']['valor'][1]['_t']).toBe('fue');
        expect(resp['valor']['valor'][1]['valor']).toBe('Ignacio Madrid');
    });
});
