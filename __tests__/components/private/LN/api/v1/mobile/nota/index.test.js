import IndexNota from '../../../../../../../../components/private/LN/api/v1/mobile/story';
import ArticleFourElements from '../../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA5.json';
import ArticleSevenElements from '../../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA7.json';
import ArticleNineElements from '../../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA9.json';
import ArticleElevenElements from '../../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA1.json';

describe('Test json integracion Article', () => {
    it('Luego del primer elemento/párrafo. Se dibuja siempre.', () => {
        const resp = IndexNota(ArticleFourElements);
        expect(resp.contenido.length).toBe(6);
        expect(resp.contenido[1]._t).toBe('banner');
    });
    it('Luego del 4to elemento/párrafo. Se dibuja si la nota tiene al menos 4 elementos.', () => {
        const resp = IndexNota(ArticleFourElements);
        expect(resp.contenido.length).toBe(6);
        expect(resp.contenido[1]._t).toBe('banner');
        expect(resp.contenido[5]._t).toBe('banner');
    });
    it('Luego del 7mo elemento/párrafo. Se dibuja si la nota tiene al menos 7 elementos.', () => {
        const resp = IndexNota(ArticleSevenElements);
        expect(resp.contenido.length).toBe(10);
        expect(resp.contenido[1]._t).toBe('banner');
        expect(resp.contenido[5]._t).toBe('banner');
        expect(resp.contenido[9]._t).toBe('banner');
    });
    it('Luego del 9no elemento/párrafo. Se dibuja si la nota tiene al menos 9 elementos.', () => {
        const resp = IndexNota(ArticleNineElements);
        expect(resp.contenido.length).toBe(13);
        expect(resp.contenido[1]._t).toBe('banner');
        expect(resp.contenido[5]._t).toBe('banner');
        expect(resp.contenido[9]._t).toBe('banner');
        expect(resp.contenido[12]._t).toBe('banner');
    });
    it('Luego del 11no elemento/párrafo. Se dibuja si la nota tiene al menos 11 elementos.', () => {
        const resp = IndexNota(ArticleElevenElements);
        expect(resp.contenido.length).toBe(16);
        expect(resp.contenido[1]._t).toBe('banner');
        expect(resp.contenido[5]._t).toBe('banner');
        expect(resp.contenido[9]._t).toBe('banner');
        expect(resp.contenido[12]._t).toBe('banner');
        expect(resp.contenido[15]._t).toBe('banner');
    });

    it('Mostrar the trust project', () => {
        const resp = IndexNota(ArticleFourElements);
        expect(resp.trust).toBe(true);
    });
    it('No Mostrar the trust project', () => {
        const resp = IndexNota(ArticleSevenElements);
        expect(resp.trust).toBe(false);
    });
});
