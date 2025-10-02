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
            'https://resizer.glanacion.com/resizer/vMR5levzUGXFrT4MCNJRoaktaiY=/1920x1280/smart/filters:format(webp):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/P4TDYRBWDNB3LCHDELX42HRWAU.jpg'
        );
        expect(resp['url']).not.toContain('height');
        expect(resp['credits']).toBe('Miguel Acevedo Riu - LA NACION');
        expect(resp['source']).toBe('LA NACION');
        expect(resp['epigraph']).toBe('Esto es un epigrafe');
    });
});
