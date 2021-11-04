import Text from '../../../../../../../../../../components/private/LN/api/v1/global/nota/cuerpo/elements/text';
import ArticleText from '../../../../../../../../../../__mocks__/data/nota/cuerpo/text/text.json';

describe('Test Json Text del cuerpo de la nota', () => {
    it('Test para validar si el campo es null', () => {
        const resp = Text(null);
        expect(resp).toBe(null);
    });

    it('Test para validar el content del texto', () => {
        const resp = Text(ArticleText[1]);
        expect(resp).toBe(null);
    });

    it('Test para validar el content del texto vacio', () => {
        const resp = Text(ArticleText[2]);
        expect(resp).toBe(null);
    });
    it('Test para validar el contenido del texto', () => {
        const resp = Text(ArticleText[3]);
        expect(resp['_t']).toBe('p');
        expect(resp['valor']).toBe('Párrafo 1.');
        const resp = Text(ArticleText[0]);
        expect(resp['_t']).toBe('p');
        expect(resp['valor']).toBe('<b>Tipo de letra negrita</b>');
    });
});
