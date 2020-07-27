import Cuerpo from '../../../../../../../components/private/LN/api/v1/nota/cuerpo';
import ArticleSinCuerpo from '../../../../../../../__mocks__/data/nota/cuerpo/notaSinCuerpo.json';
import ArticleInfografia from '../../../../../../../__mocks__/data/nota/cuerpo/notaInfografia.json';
import ArticleCuerpo from '../../../../../../../__mocks__/data/nota/cuerpo/notaCuerpo.json';

describe('Test Json Text del cuerpo de la nota', () => {
    it('Test para validar si el cuerpo es null', () => {
        const resp = Cuerpo(ArticleSinCuerpo);
        expect(resp).toBe(null);
    });

    it('Test para validar la cantidad de elementos del cuerpo', () => {
        const resp = Cuerpo(ArticleCuerpo);
        expect(resp.length).toBe(ArticleCuerpo.content_elements.length);
    });

    it('Test para validar si es infografia el contenido debe ser igual al contenido + 1', () => {        
        const originalLength = ArticleInfografia.content_elements.length;
        const resp = Cuerpo(ArticleInfografia);                

        expect(resp.length).toBe(originalLength + 1);
    });

    // it('Test para validar el content del texto vacio', () => {
    //     const resp = Text(ArticleText[2]);
    //     expect(resp).toBe(null);
    // });
    // it('Test para validar el contenido del texto', () => {
    //     const resp = Text(ArticleText[0]);
    //     expect(resp['_t']).toBe('p');
    //     expect(resp['valor']).toBe('Párrafo 1.');
    // });
});
