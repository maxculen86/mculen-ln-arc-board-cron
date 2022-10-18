import aperturaArticle from '../../../../../../../../../components/private/LN/api/v1/mobile/story/apertura/aperturaArticle';
import article from '../../../../../../../../../__mocks__/data/articles/SGLHVRAV2VGFHB5OZZ57PKYAVQ.json';
import Image from '../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo/elements/image';
import imageDefault from '../../../../../../../../../components/private/LN/api/v1/mobile/story/apertura/devImageDefault.json';

jest.mock('fusion:environment', () => {
    return {
        IS_SANDBOX: 'true'
    };
});
describe('Test aperura article imagen/video validacion defensiva', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(console, 'error');
        // @ts-ignore jest.spyOn adds this functionallity
        console.error.mockImplementation(() => null);
    });

    afterEach(() => {
        // @ts-ignore jest.spyOn adds this functionallity
        console.error.mockRestore();
    });
    test('Medio destacado Básico "Origen del vídeo" con una imagen', () => {
        const image = Image(imageDefault);
        const resp = aperturaArticle(article);
        expect(resp.imagenes).not.toBeUndefined();
        expect(resp.imagenes.length).toBe(1);
        expect(resp.imagenes[0]._t).toBe(image._t);
        expect(resp.imagenes[0].url).toBe(image.url);
        expect(resp.imagenes[0].parameters.length).toBe(
            image.parameters.length
        );
        expect(resp.video).not.toBeUndefined();
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error.mock.calls[0][0]).toBe(
            'La nota id: SGLHVRAV2VGFHB5OZZ57PKYAVQ , tiene seteado en Medio destacado Básico "Origen del vídeo" una imagen. Se esta enviando una imagen por defecto hasta su correción'
        );
    });
});
