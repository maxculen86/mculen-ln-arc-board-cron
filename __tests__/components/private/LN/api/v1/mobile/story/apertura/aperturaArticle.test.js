import aperturaArticle from '../../../../../../../../../components/private/LN/api/v1/mobile/story/apertura/aperturaArticle';
import article from '../../../../../../../../../__mocks__/data/articles/SGLHVRAV2VGFHB5OZZ57PKYAVQ.json';
import Image from '../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo/elements/image';
import imageDefault from '../../../../../../../../../components/private/LN/api/v1/mobile/story/apertura/devImageDefault.json';
import articleWithBothTypes from '../../../../../../../../../__mocks__/data/articles/X7HUAP25GFAGDOZ3AHOXLQVL4Q.json';
import articleBasic from '../../../../../../../../../__mocks__/data/articles/YJJ7JHAWNJFTDH2RLJ4QHUTA5A.json';
import articleMultimedia from '../../../../../../../../../__mocks__/data/articles/JLMPIDPYXFH3JPLFTZNJGONPNA.json';
import articleWithOutApertura from '../../../../../../../../../__mocks__/data/articles/2CIOHVMKJBHKDMMHH2WBIZGJWE.json';

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

describe('Test apetura con raw_html', () => {
    test('Retorna la apertura_multimedia aún teniendo configurada basic', () => {
        const resp = aperturaArticle(articleWithBothTypes);

        expect(resp).not.toBeNull();
        expect(resp.html).not.toBeNull();
        expect(resp.html).toEqual('apertura_multimedia');
    });

    test('Retorna la apertura basic', () => {
        const resp = aperturaArticle(articleBasic);

        expect(resp).not.toBeNull();
        expect(resp.html).not.toBeNull();
        expect(resp.html).toEqual('Solo basic');
    });

    test('Retorna la apertura_multimedia', () => {
        const resp = aperturaArticle(articleMultimedia);

        expect(resp).not.toBeNull();
        expect(resp.html).not.toBeNull();
        expect(resp.html).toEqual('el contenido del html');
    });

    test('No retorna html, configurada solo image en promo_items', () => {
        const resp = aperturaArticle(articleWithOutApertura);

        expect(resp).not.toBeNull();
        expect(resp.html).toBeUndefined();
    });
});
