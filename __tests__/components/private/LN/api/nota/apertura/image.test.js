import Image from '../../../../../../../components/private/LN/api/global/v1/nota/image';
import ImageApertura from '../../../../../../../__mocks__/data/nota/apertura/image/image.json';

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
            '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/QZO4UCHCSJHWJLQBALT2PGR2EY.jpg'
        );

        expect(resp['parametros'][0]['ancho']).toBe(1260);
        expect(resp['parametros'][0]['firma']).toBe(
            'll9UIKBF1TEj9aV7Fvgnp39l3KM=/1260x840/smart'
        );

        expect(resp['parametros'][1]['ancho']).toBe(1120);
        expect(resp['parametros'][1]['firma']).toBe(
            'J1GeSMcC7hzJABXY_2p7p8-h4bc=/1120x746/smart'
        );

        expect(resp['parametros'][2]['ancho']).toBe(768);
        expect(resp['parametros'][2]['firma']).toBe(
            'vtffL1SBl_VEgLefu5k5MrXVvzg=/768x512/smart'
        );

        expect(resp['parametros'][3]['ancho']).toBe(350);
        expect(resp['parametros'][3]['firma']).toBe(
            'fqbwxH9bQUswTThZFEO-4GAsIQo=/350x233/smart'
        );

        expect(resp['parametros'][4]['ancho']).toBe(310);
        expect(resp['parametros'][4]['firma']).toBe(
            'XCJEQmFJL4naLbphYqCn22WnXxw=/310x206/smart'
        );
    });

    it('Valores de la imagen con fuente y credito', () => {
        const resp = Image(ImageApertura[1]);
        expect(resp['_t']).toBe('img');
        expect(resp['credito']).toBe('Isaias Anzola');
        expect(resp['fuente']).toBe('Archivo');
        expect(resp['epigrafe']).toBe('Esto es el epigrafe.');
        expect(resp['baseUrl']).toBe(
            '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/QZO4UCHCSJHWJLQBALT2PGR2EY.jpg'
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
