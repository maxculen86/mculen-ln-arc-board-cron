import Image from '../../../../../../../components/private/LN/api/v1/common/image/index';
import article from '../../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';
import articleFoto from '../../../../../../../__mocks__/data/nota/cuerpo/image/imageNoResize.json';

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
});
