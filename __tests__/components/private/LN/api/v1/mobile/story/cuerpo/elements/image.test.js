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
            'https://resizer.glanacion.com/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/P4TDYRBWDNB3LCHDELX42HRWAU.jpg'
        );
        expect(resp['parameters']).toHaveLength(4);
        expect(resp['parameters'][0]['media']).toBe(1280);
        expect(resp['parameters'][0]['height']).toBe(1280);
        expect(resp['parameters'][0]['width']).toBe(1920);
        expect(resp['parameters'][0]['signature']).toBe(
            'vMR5levzUGXFrT4MCNJRoaktaiY=/1920x1280/smart/filters:format(webp):quality(70)'
        );
        expect(resp['credits']).toBe('Miguel Acevedo Riu - LA NACION');
        expect(resp['source']).toBe('LA NACION');
        expect(resp['epigraph']).toBe('Esto es un epigrafe');
    });
});
