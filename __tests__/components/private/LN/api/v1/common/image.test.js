import Image from '../../../../../../../components/private/LN/api/common/elements/image/index';
import article from '../../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';
import articleFoto from '../../../../../../../__mocks__/data/nota/cuerpo/image/imageNoResize.json';
import imageResizeV2 from '../../../../../../../__mocks__/data/nota/cuerpo/image/image-resizev2.json';
describe('Json imagen common', () => {
    test('Render imagen correcto', () => {
        const img = article.content_elements[9].promo_items.basic;

        const resp = Image(img);
        expect(resp.id).toBe(img._id);
        expect(resp.baseUrl).toBe(
            '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/LGFOVH6SFFGZVP5V3V7NOW2KFY.jpg'
        );
        expect(resp.absoluteUrl).toBe(
            'https://resizer.glanacion.com/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/LGFOVH6SFFGZVP5V3V7NOW2KFY.jpg'
        );
        expect(resp.parametros[0].ancho).toBe(278);
        expect(resp.parametros[0].firma).toBe(
            'xXjJBfZwE6c26vxfxgfHerlzovg=/278x186/smart'
        );
        expect(resp.parametros[1].ancho).toBe(344);
        expect(resp.parametros[1].firma).toBe(
            'HU7HHdAlJjMA1Wo_zPVxdiJEJg8=/344x230/smart'
        );
        expect(resp.parametros[2].ancho).toBe(768);
        expect(resp.parametros[2].firma).toBe(
            'RsqppSDbxLIgBko6JrbcfGp8QUA=/768x513/smart'
        );
        expect(resp.parametros[3].ancho).toBe(350);
        expect(resp.parametros[3].firma).toBe(
            'Xcn5wLWNR-Jzz6cOGmNUu806tWc=/350x234/smart'
        );
        expect(resp.parametros[4].ancho).toBe(360);
        expect(resp.parametros[4].firma).toBe(
            'Tu91squMfjTVK8l7oVOdLYs_GHw=/360x234/smart'
        );
    });

    test('Si la imagen es null', () => {
        const resp = Image(null);
        expect(resp).toBe(null);
    });

    test('Se envia el objeto pero no contiene Resize Url', () => {
        const resp = Image(articleFoto);
        expect(resp).toBe(null);
    });

    test('Imagen con resize v2', () => {
        const resp = Image(imageResizeV2);
        expect(resp.id).toBe(imageResizeV2._id);
        expect(resp.baseUrl).toBe(
            '/resizer/v2/S6JROK6SOVHG7E7W6RJV74GUNQ.jpg?auth={{param}}'
        );
        expect(resp.absoluteUrl).toBe(
            'https://resizer.glanacion.com/resizer/v2/S6JROK6SOVHG7E7W6RJV74GUNQ.jpg?{{param}}'
        );
        expect(resp.parametros[0].media).toBe(1280);
        expect(resp.parametros[0].ancho).toBe(1920);
        expect(resp.parametros[0].alto).toBe(1280);
        expect(resp.parametros[0].firma).toBe(
            'auth=110f4f488ecfaa9efe2838f7198bb9695a785a9c65a5b8aad1b4a04342d1c794&width=1920&height=1280&quality=80&smart=true'
        );

        expect(resp.parametros[1].media).toBe(1200);
        expect(resp.parametros[1].ancho).toBe(1200);
        expect(resp.parametros[1].alto).toBe(800);
        expect(resp.parametros[1].firma).toBe(
            'auth=110f4f488ecfaa9efe2838f7198bb9695a785a9c65a5b8aad1b4a04342d1c794&width=1200&height=800&quality=80&smart=true'
        );

        expect(resp.parametros[2].media).toBe(1023);
        expect(resp.parametros[2].ancho).toBe(1023);
        expect(resp.parametros[2].alto).toBe(682);
        expect(resp.parametros[2].firma).toBe(
            'auth=110f4f488ecfaa9efe2838f7198bb9695a785a9c65a5b8aad1b4a04342d1c794&width=1023&height=682&quality=80&smart=true'
        );

        expect(resp.parametros[3].media).toBe(1276);
        expect(resp.parametros[3].ancho).toBe(1276);
        expect(resp.parametros[3].alto).toBe(1914);
        expect(resp.parametros[3].firma).toBe(
            'auth=110f4f488ecfaa9efe2838f7198bb9695a785a9c65a5b8aad1b4a04342d1c794&width=1276&height=1914&quality=80&smart=true'
        );

        expect(resp.parametros[4].media).toBe(768);
        expect(resp.parametros[4].ancho).toBe(768);
        expect(resp.parametros[4].alto).toBe(1152);
        expect(resp.parametros[4].firma).toBe(
            'auth=110f4f488ecfaa9efe2838f7198bb9695a785a9c65a5b8aad1b4a04342d1c794&width=768&height=1152&quality=80&smart=true'
        );

        expect(resp.parametros[5].media).toBe(360);
        expect(resp.parametros[5].ancho).toBe(360);
        expect(resp.parametros[5].alto).toBe(540);
        expect(resp.parametros[5].firma).toBe(
            'auth=110f4f488ecfaa9efe2838f7198bb9695a785a9c65a5b8aad1b4a04342d1c794&width=360&height=540&quality=80&smart=true'
        );
    });
});
