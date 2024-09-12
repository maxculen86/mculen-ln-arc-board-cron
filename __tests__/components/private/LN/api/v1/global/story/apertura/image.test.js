import Image from '../../../../../../../../../components/private/LN/api/common/elements/story/image';
import ImageApertura from '../../../../../../../../../__mocks__/data/nota/apertura/image/image.json';

describe('Json de Imagen en Nota', () => {
    it('Retorno null en caso que no se envie data', () => {
        const resp = Image(null);
        expect(resp).toBe(null);
    });

    it('Retorno null en caso que no se tenga resize', () => {
        const resp = Image(ImageApertura[3]);
        expect(resp).toBe(null);
    });

    it('Valores de la imagen', () => {
        const resp = Image(ImageApertura[0]);
        expect(resp['_t']).toBe('img');
        expect(resp['credito']).toBeUndefined();
        expect(resp['fuente']).toBeUndefined();
        expect(resp['epigrafe']).toBe('Esto es el epigrafe.');
        expect(resp['baseUrl']).toBe(
            '/resizer/ll9UIKBF1TEj9aV7Fvgnp39l3KM=/1260x840/smart/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/QZO4UCHCSJHWJLQBALT2PGR2EY.jpg'
        );
    });

    it('Valores de la imagen con fuente y credito', () => {
        const resp = Image(ImageApertura[1]);
        expect(resp['_t']).toBe('img');
        expect(resp['credito']).toBe('Isaias Anzola');
        expect(resp['fuente']).toBe('Archivo');
        expect(resp['epigrafe']).toBe('Esto es el epigrafe.');
        expect(resp['baseUrl']).toBe(
            '/resizer/ll9UIKBF1TEj9aV7Fvgnp39l3KM=/1260x840/smart/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/QZO4UCHCSJHWJLQBALT2PGR2EY.jpg'
        );
    });

    it('Valores de la imagen sin epigrafe', () => {
        const resp = Image(ImageApertura[2]);
        expect(resp['epigrafe']).toBeUndefined();
    });

    it('Valores de la imagen sin autor', () => {
        const resp = Image(ImageApertura[4]);
        expect(resp['credito']).toBeUndefined();
    });
});
