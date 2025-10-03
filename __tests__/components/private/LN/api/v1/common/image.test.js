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
            'https://resizer.glanacion.com/resizer/v2/S6JROK6SOVHG7E7W6RJV74GUNQ.jpg'
        );
        expect(resp.absoluteUrl).toBe(
            'https://resizer.glanacion.com/resizer/v2/S6JROK6SOVHG7E7W6RJV74GUNQ.jpg?auth=110f4f488ecfaa9efe2838f7198bb9695a785a9c65a5b8aad1b4a04342d1c794&width=1920&height=1280&quality=80&smart=true'
        );
    });
});
