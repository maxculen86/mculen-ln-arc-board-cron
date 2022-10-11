import Image from '../../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo/elements/image';
import ArticleImage from '../../../../../../../../../../__mocks__/data/nota/cuerpo/image/image.json';

describe('Test de json de imagen en el cuerpo de la nota', () => {
    it('Si se le pasa un valor null a las imagenes', () => {
        const resp = Image(null);
        expect(resp).toBe(null);
    });

    it('Valores del json de imagen', () => {
        const resp = Image(ArticleImage);
        expect(resp['_t']).toBe('image');
        expect(resp['url']).toBe(
            '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/77NRHRWIWFCFDOCDN34LGQ32SE.jpg'
        );
        expect(resp['parameters']).toHaveLength(5);
        expect(resp['parameters'][0]['media']).toBe(1280);
        expect(resp['parameters'][0]['height']).toBe(768);
        expect(resp['parameters'][0]['width']).toBe(1280);
        expect(resp['parameters'][0]['signature']).toBe(
            'ER1_X3vDXw3P4MNVslw4RT4IVkU=/1280x0'
        );
        expect(resp['credits']).toBe('Miguel Acevedo Riu - LA NACION');
        expect(resp['source']).toBe('LA NACION');
        expect(resp['epigraph']).toBe('Esto es un epigrafe');
    });
});
