import Image from '../../../../../../../components/private/LN/api/common/elements/image/index';
import articleFoto from '../../../../../../../__mocks__/data/nota/cuerpo/image/imageNoResize.json';
import imageResizeV2 from '../../../../../../../__mocks__/data/nota/cuerpo/image/image-resizev2.json';
describe('Json imagen common', () => {
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
