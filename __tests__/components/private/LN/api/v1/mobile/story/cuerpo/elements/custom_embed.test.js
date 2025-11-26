import env from '../../../../../../../../../../__mocks__/fusion:environment';
import ElementCustomEmbed from '../../../../../../../../../../__mocks__/data/nota/cuerpo/custom_embed/custom_embed.json';
import CustomEmbed from '../../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo/elements/custom_embed';

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
        expect(resp[0]['_t']).toBe('header');
        expect(resp[0]['level']).toBe(2);
        expect(resp[0]['value']).toBe('Prueba parallax!');
        expect(resp[1]['_t']).toBe('image');
        expect(resp[1]['url']).toBe(
            'https://resizer.glanacion.com/resizer/0ZBvgthSHk6mZmK3v5EeYSFujGQ=/1920x1280/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/SU2YQWVAOVA7JFRFP7UBMWDDM4.webp'
        );
        expect(resp[2]['_t']).toBe('text');
        expect(resp[2]['valor']).toBe(
            'Parrafo de prueba para parallax en foto al 100 mediante power-up!'
        );
    });

    it('Test custom embed sin imagen', () => {
        const resp = CustomEmbed(ElementCustomEmbed[2]);
        expect(resp[0]['_t']).toBe('header');
        expect(resp[0]['level']).toBe(2);
        expect(resp[0]['value']).toBe('Prueba parallax!');
        expect(resp[1]['_t']).toBe('text');
        expect(resp[1]['valor']).toBe(
            'Parrafo de prueba para parallax en foto al 100 mediante power-up!'
        );
    });

    it('Test custom embed sin titulo', () => {
        const resp = CustomEmbed(ElementCustomEmbed[3]);
        expect(resp[0]['_t']).toBe('image');
        expect(resp[0]['url']).toBe(
            'https://resizer.glanacion.com/resizer/0ZBvgthSHk6mZmK3v5EeYSFujGQ=/1920x1280/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/SU2YQWVAOVA7JFRFP7UBMWDDM4.webp'
        );
        expect(resp[1]['_t']).toBe('text');
        expect(resp[1]['valor']).toBe(
            'Parrafo de prueba para parallax en foto al 100 mediante power-up!'
        );
    });

    it('Test custom embed sin cuerpo', () => {
        const resp = CustomEmbed(ElementCustomEmbed[4]);
        expect(resp[0]['_t']).toBe('header');
        expect(resp[0]['level']).toBe(2);
        expect(resp[0]['value']).toBe('Prueba parallax!');
        expect(resp[1]['_t']).toBe('image');
        expect(resp[1]['url']).toBe(
            'https://resizer.glanacion.com/resizer/0ZBvgthSHk6mZmK3v5EeYSFujGQ=/1920x1280/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/SU2YQWVAOVA7JFRFP7UBMWDDM4.webp'
        );
    });

    it('Test custom embed sin cuerpo', () => {
        const resp = CustomEmbed(ElementCustomEmbed[5]);
        expect(resp).toBe(null);
    });
});

describe('Test de los elementos liveblog en el cuerpo de una nota', () => {
    it('Test de liveblog sin time es null', () => {
        const resp = CustomEmbed(ElementCustomEmbed[6]);
        expect(resp[0]['_t']).toBe('header');
        expect(resp[0]['level']).toBe(1);
        expect(resp[0]['value']).toBe('Gym 1 Ciudad Plateada');
    });

    it('Test custom embed de de liveblog valores completos', () => {
        const resp = CustomEmbed(ElementCustomEmbed[7]);
        expect(resp[0]['_t']).toBe('header');
        expect(resp[0]['level']).toBe(1);
        expect(resp[0]['value']).toBe('08:46 Gym 1 Ciudad Plateada');
    });


    describe('Test de los elementos custom-how-to en el cuerpo de una nota', () => {
        it('Test custom-how-to con step y título', () => {
            const nodo = {
                subtype: 'custom-how-to',
                embed: {
                    config: {
                        step: '1',
                        title: '¿Cómo usar el estilo <i>Studio Ghibli </i>en ChatGPT?'
                    }
                }
            };
            const resp = CustomEmbed(nodo);
            expect(resp[0]['_t']).toBe('header');
            expect(resp[0]['level']).toBe(1);
            expect(resp[0]['value']).toBe('1 - ¿Cómo usar el estilo <i>Studio Ghibli </i>en ChatGPT?');
        });

        it('Test custom-how-to sin step', () => {
            const nodo = {
                subtype: 'custom-how-to',
                embed: {
                    config: {
                        title: 'Solo título'
                    }
                }
            };
            const resp = CustomEmbed(nodo);
            expect(resp[0]['_t']).toBe('header');
            expect(resp[0]['level']).toBe(1);
            expect(resp[0]['value']).toBe(' - Solo título');
        });

        it('Test custom-how-to sin título', () => {
            const nodo = {
                subtype: 'custom-how-to',
                embed: {
                    config: {
                        step: '2'
                    }
                }
            };
            const resp = CustomEmbed(nodo);
            expect(resp[0]['_t']).toBe('header');
            expect(resp[0]['level']).toBe(1);
            expect(resp[0]['value']).toBe('2 - ');
        });

        it('Test custom-how-to sin config', () => {
            const nodo = {
                subtype: 'custom-how-to',
                embed: {}
            };
            const resp = CustomEmbed(nodo);
            expect(resp[0]['_t']).toBe('header');
            expect(resp[0]['level']).toBe(1);
            expect(resp[0]['value']).toBe(' - ');
        });
    });


    describe('customEmbed - gallery-embed', () => {

        const baseNode = {
            subtype: 'gallery-embed',
            embed: {
                config: {
                    caption: 'Epígrafe de prueba',
                    count: 2,
                    galleryImages: [
                        { url: 'https://img.com/1.jpg' },
                        { url: 'https://img.com/2.jpg' },
                    ]
                }
            }
        };

        test('Debe mapear la cantidad de imágenes según el count de la diagramacion', () => {
            const result = CustomEmbed(baseNode);
            expect(result.length).toBe(2);
            expect(result[0]).toEqual({ _t: 'image', url: 'https://img.com/1.jpg' },
                { _t: 'image', url: 'https://img.com/2.jpg', epigraph: 'Epígrafe de prueba' });

        });

        test('Debe agregar epígrafe solo a la última imagen', () => {
            const result = CustomEmbed(baseNode);

            expect(result[0]._t).toBe('image');
            expect(result[0]).not.toHaveProperty('epigraph');

            expect(result[1].epigraph).toBe('Epígrafe de prueba');
        });
        test('Si solo hay una imagen, debe agregar epígrafe a esa única imagen', () => {
            const nodo = {
                subtype: 'gallery-embed',
                embed: {
                    config: {
                        caption: 'Epígrafe único',
                        count: 1,
                        galleryImages: [
                            { url: 'https://img.com/one.jpg' }
                        ]
                    }
                }
            };

            const result = CustomEmbed(nodo);

            expect(result.length).toBe(1);
            expect(result[0]).toEqual({
                _t: 'image',
                url: 'https://img.com/one.jpg',
                epigraph: 'Epígrafe único'
            });
        });


        test('Si no hay caption no se agrega epigraph', () => {
            const nodo = {
                ...baseNode,
                embed: {
                    config: {
                        ...baseNode.embed.config,
                        caption: '' // sin epigrafe
                    }
                }
            };

            const result = CustomEmbed(nodo);

            expect(result.some(img => img.epigraph)).toBe(false);
        });

        test('Debe funcionar con lista vacía de imágenes', () => {
            const nodo = {
                ...baseNode,
                embed: { config: { galleryImages: [] } }
            };

            const result = CustomEmbed(nodo);
            expect(result).toEqual([]);
        });
    });

});
