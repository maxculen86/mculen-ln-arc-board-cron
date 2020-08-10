import Image from '../../../../../../components/private/LN/api/v1/common/image';
import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';
import articleFoto from '../../../../../../__mocks__/data/nota/cuerpo/image/imageNoResize.json';

describe('Json imagen common', () => {
    test('Render imagen correcto', () => {
        const img = article.globalContent.promo_items.basic;

        const resp = Image(img);    
        expect(resp.id).toBe(img._id);
        expect(resp.baseUrl).toBe('/resizer/{{param}}/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/X2MJ25TCRRD63NGNBDAZGLYRZY.jpg');
        expect(resp.parametros[0].ancho).toBe(1260);
        expect(resp.parametros[0].firma).toBe('Jvik4UuWUb3CBd4fHrEn3v8THpE=/1260x840');
        expect(resp.parametros[1].ancho).toBe(1120);
        expect(resp.parametros[1].firma).toBe('O6Hi7KaUFlbX9FinZ90ovn9YbqM=/1120x746');
        expect(resp.parametros[2].ancho).toBe(768);
        expect(resp.parametros[2].firma).toBe('gjSAiqxUQKPG6auGxxXrfu1tujU=/768x512');
        expect(resp.parametros[3].ancho).toBe(350);
        expect(resp.parametros[3].firma).toBe('Az0Rj0edj1ZwPlsrn35HJrfivZ8=/350x233');
        expect(resp.parametros[4].ancho).toBe(310);
        expect(resp.parametros[4].firma).toBe('gM6LxEhq1MRzEqyKLzL_dQAej-c=/310x206');
    });

    test('Si la imagen es null', () => {
        const resp = Image(null);
        expect(resp).toBe(null);
    });

    test('Se envia el objeto pero no contiene Resize Url', () => {
        const resp = Image(articleFoto);
        expect(resp).toBe(null);
    });
});
