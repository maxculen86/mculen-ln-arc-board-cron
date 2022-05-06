import env from '../../../../../../../../../../__mocks__/fusion:environment';
import ElementCustomEmbed from '../../../../../../../../../../__mocks__/data/nota/cuerpo/custom_embed/custom_embed.json';
import CustomEmbed from '../../../../../../../../../../components/private/LN/api/v1/global/story/cuerpo/elements/custom_embed';

describe('Test de los elementos parallax en el cuerpo de una nota', () => {
    it('Test de parallax si es null', () => {
        const resp = CustomEmbed(null);
        expect(resp).toBe(null);
    });

    it('Test custom embed subtype', () => {
        const resp = CustomEmbed(ElementCustomEmbed[0]);
        expect(resp).toBe(null);
    });

    it('Test custom embed valores completos', () => {
        const resp = CustomEmbed(ElementCustomEmbed[1]);
        expect(resp[0]['_t']).toBe('sub2');
        expect(resp[0]['valor']).toBe('Prueba parallax!');
        expect(resp[1]['_t']).toBe('p');
        expect(resp[1]['valor']['_t']).toBe('img');
        expect(resp[1]['valor']['baseUrl']).toBe(
            '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/SU2YQWVAOVA7JFRFP7UBMWDDM4.webp'
        );
        expect(resp[2]['_t']).toBe('p');
        expect(resp[2]['valor']).toBe(
            'Parrafo de prueba para parallax en foto al 100 mediante power-up!'
        );
    });

    it('Test custom embed sin imagen', () => {
        const resp = CustomEmbed(ElementCustomEmbed[2]);
        expect(resp[0]['_t']).toBe('sub2');
        expect(resp[0]['valor']).toBe('Prueba parallax!');
        expect(resp[1]['_t']).toBe('p');
        expect(resp[1]['valor']).toBe(
            'Parrafo de prueba para parallax en foto al 100 mediante power-up!'
        );
    });

    it('Test custom embed sin titulo', () => {
        const resp = CustomEmbed(ElementCustomEmbed[3]);
        expect(resp[0]['_t']).toBe('p');
        expect(resp[0]['valor']['_t']).toBe('img');
        expect(resp[0]['valor']['baseUrl']).toBe(
            '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/SU2YQWVAOVA7JFRFP7UBMWDDM4.webp'
        );
        expect(resp[1]['_t']).toBe('p');
        expect(resp[1]['valor']).toBe(
            'Parrafo de prueba para parallax en foto al 100 mediante power-up!'
        );
    });

    it('Test custom embed sin cuerpo', () => {
        const resp = CustomEmbed(ElementCustomEmbed[4]);
        expect(resp[0]['_t']).toBe('sub2');
        expect(resp[0]['valor']).toBe('Prueba parallax!');
        expect(resp[1]['_t']).toBe('p');
        expect(resp[1]['valor']['_t']).toBe('img');
        expect(resp[1]['valor']['baseUrl']).toBe(
            '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/SU2YQWVAOVA7JFRFP7UBMWDDM4.webp'
        );
    });

    it('Test custom embed sin cuerpo', () => {
        const resp = CustomEmbed(ElementCustomEmbed[5]);
        expect(resp).toBe(null);
    });
});
