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
        expect(resp['parameters']).toHaveLength(5);
    });
});
