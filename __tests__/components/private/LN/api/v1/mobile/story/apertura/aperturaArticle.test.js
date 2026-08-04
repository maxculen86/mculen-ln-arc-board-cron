import aperturaArticle from '../../../../../../../../../components/private/LN/api/v1/mobile/story/apertura/aperturaArticle';
import article from '../../../../../../../../../__mocks__/data/articles/SGLHVRAV2VGFHB5OZZ57PKYAVQ.json';
import Image from '../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo/elements/image';
import imageDefault from '../../../../../../../../../components/private/LN/api/v1/mobile/story/apertura/devImageDefault.json';
import articleWithBothTypes from '../../../../../../../../../__mocks__/data/articles/X7HUAP25GFAGDOZ3AHOXLQVL4Q.json';
import articleBasic from '../../../../../../../../../__mocks__/data/articles/YJJ7JHAWNJFTDH2RLJ4QHUTA5A.json';
import articleMultimedia from '../../../../../../../../../__mocks__/data/articles/JLMPIDPYXFH3JPLFTZNJGONPNA.json';
import articleWithOutApertura from '../../../../../../../../../__mocks__/data/articles/2CIOHVMKJBHKDMMHH2WBIZGJWE.json';
import articleWithVideoJW from '../../../../../../../../../__mocks__/data/articles/FJ5DHWYC2BEKFOFGFBJI5WWUCA.json';
import historyTellingArticle from '../../../../../../../../../__mocks__/data/articles/4HFO7YPZBFEYVB6K5XY6IFV3XY.json';

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
        expect(resp.imagenes).toBeUndefined();

        expect(resp.video).not.toBeUndefined();
        expect(console.error).toHaveBeenCalledTimes(0);
    });
});

describe('Test apetura con raw_html', () => {
    test('Esto ya debe estar validadod en el content_elements por lo tanto no retorna la apertura_multimedia aún teniendo configurada basic', () => {
        const resp = aperturaArticle(articleWithBothTypes);

        expect(resp).not.toBeNull();
        expect(resp.html).toBeUndefined();
        expect(resp.imagenesAcumulado).toBeUndefined();
    });

    test('Retorna la apertura basic sin html porque ya debe estar en el content_elements y sin imagenesAcumulado del basic', () => {
        const resp = aperturaArticle(articleBasic);

        expect(resp).not.toBeNull();
        expect(resp.html).toBeUndefined();
        expect(resp.imagenesAcumulado).toBeUndefined();
    });

    test('Retorna la apertura_multimedia sin html porque este tipo de elemento solo se contempla en el content_elements para apertura', () => {
        const resp = aperturaArticle(articleMultimedia);

        expect(resp).not.toBeNull();
        expect(resp.html).toBeUndefined();
    });

    test('No retorna html, configurada solo image en promo_items', () => {
        const resp = aperturaArticle(articleWithOutApertura);

        expect(resp).not.toBeNull();
        expect(resp.html).toBeUndefined();
    });
});

describe('Test apetura con videoJW', () => {
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
    test('Esto ya debe estar validadod en el content_elements por lo tanto no retorna la apertura_multimedia aún teniendo configurada basic', () => {
        const resp = aperturaArticle(articleWithVideoJW);
        expect(resp).not.toBeNull();
        expect(resp.video).not.toBeNull();
        expect(resp.imagenes).toBeUndefined();
        expect(resp.imagenesAcumulado).toBeUndefined();
        expect(console.error).toHaveBeenCalledTimes(0);
    });

    test('Test keys expected', () => {
        const newArticle = { ...article };
        newArticle.label = {
            ...article.label,
            volanta: {
                display: true,
                text: 'Mi volanta',
                url: ''
            }
        };
        const resp = aperturaArticle(newArticle);
        expect(Object.keys(resp).sort()).toEqual(
            [
                'bajada',
                'titulo',
                'tituloMobile',
                'video',
                'volanta',
                'distributor'
            ].sort()
        );
    });
});

describe('Test apetura StoryTelling', () => {
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

    test('Should return correctly values in apertura', () => {
        const newArticle = {
            ...article,
            subtype: '4',
            promo_items: {
                custom_storytelling_opening: {
                    embed: {
                        config: {
                            diagram: 'image-panoramic'
                        }
                    }
                }
            },
            headlines: {
                basic: 'basic headlines',
                mobile: 'mobile headlines',
                native: 'native headlines'
            }
        };
        const resp = aperturaArticle(newArticle);
        expect(Object.keys(resp).sort()).toEqual(
            [
                'bajada',
                'titulo',
                'tituloMobile',
                'tituloNative',
                'distributor',
                'diagram',
                'brand'
            ].sort()
        );
        expect(resp.diagram).toBe('image-panoramic');
        expect(resp.brand).toBe('/deportes');
        expect(resp.tituloNative).toBe('native headlines');
        expect(resp.tituloMobile).toBe('mobile headlines');
        expect(resp.titulo).toBe('basic headlines');
    });

    test('Should return correctly values in apertura whitout native title', () => {
        const newArticle = {
            ...article,
            subtype: '4',
            promo_items: {
                custom_storytelling_opening: {
                    embed: {
                        config: {
                            diagram: 'image-panoramic'
                        }
                    }
                }
            },
            headlines: {
                basic: 'basic headlines',
                mobile: 'mobile headlines'
            }
        };
        const resp = aperturaArticle(newArticle);
        expect(Object.keys(resp).sort()).toEqual(
            [
                'bajada',
                'titulo',
                'tituloMobile',
                ,
                'distributor',
                'diagram',
                'brand'
            ].sort()
        );
        expect(resp.diagram).toBe('image-panoramic');
        expect(resp.brand).toBe('/deportes');
        expect(resp.tituloMobile).toBe('mobile headlines');
        expect(resp.titulo).toBe('basic headlines');
    });

    test('Should return correct values in apertura for storytelling articles when promo_items embed is missing', () => {
        const newArticle = {
            ...article,
            subtype: '4',
            headlines: {
                basic: 'basic headlines',
                mobile: 'mobile headlines'
            }
        };
        const resp = aperturaArticle(newArticle);
        expect(Object.keys(resp).sort()).toEqual(
            ['bajada', 'titulo', 'tituloMobile', 'distributor', 'brand'].sort()
        );
        expect(resp.brand).toBe('/deportes');
        expect(resp.tituloMobile).toBe('mobile headlines');
        expect(resp.titulo).toBe('basic headlines');
    });

    test('Should return correctly values in apertura "a fondo"', () => {
        const newArticle = {
            ...article,
            subtype: '4',
            promo_items: {
                custom_storytelling_opening: {
                    embed: {
                        config: {
                            diagram: 'image-panoramic'
                        }
                    }
                }
            },
            headlines: {
                basic: 'basic headlines',
                mobile: 'mobile headlines',
                native: 'native headlines'
            }
        };
        const resp = aperturaArticle(newArticle);
        expect(Object.keys(resp).sort()).toEqual(
            [
                'bajada',
                'titulo',
                'tituloMobile',
                'tituloNative',
                'distributor',
                'diagram',
                'brand'
            ].sort()
        );
        expect(resp.diagram).toBe('image-panoramic');
        // expect(resp.brand).toBe('/a-fondo'); // TODO Ajustar cuando se defina bien la lógica de a fondo
        expect(resp.tituloNative).toBe('native headlines');
        expect(resp.tituloMobile).toBe('mobile headlines');
        expect(resp.titulo).toBe('basic headlines');
    });
});

describe('Test apertura storytelling without-image', () => {
    test('Retorna diagram image-panoramic cuando el embed viene con without-image', () => {
        const resp = aperturaArticle({
            ...article,
            subtype: '4',
            promo_items: {
                custom_storytelling_opening: {
                    embed: {
                        config: {
                            diagram: 'without-image'
                        }
                    }
                }
            },
            headlines: {
                basic: 'basic headlines',
                mobile: 'mobile headlines'
            }
        });

        expect(resp.diagram).toBe('image-panoramic');
    });

    test('No retorna imagenes cuando storytelling tiene diagram without-image e imagen en promo', () => {
        const resp = aperturaArticle({
            ...historyTellingArticle,
            promo_items: {
                ...historyTellingArticle.promo_items,
                custom_storytelling_opening: {
                    embed: {
                        config: {
                            diagram: 'without-image'
                        }
                    }
                }
            }
        });

        expect(resp.imagenes).toBeUndefined();
        expect(resp.imagenesAcumulado).toBeUndefined();
    });

    test('Retorna imagenes cuando storytelling tiene diagram image-panoramic e imagen en promo', () => {
        const resp = aperturaArticle({
            ...historyTellingArticle,
            promo_items: {
                ...historyTellingArticle.promo_items,
                custom_storytelling_opening: {
                    embed: {
                        config: {
                            diagram: 'image-panoramic'
                        }
                    }
                }
            }
        });

        expect(resp.imagenes).toBeDefined();
        expect(resp.imagenes.length).toBeGreaterThan(0);
    });

    test('No retorna imagenes ni imagenesAcumulado en default case con basic image y without-image', () => {
        const resp = aperturaArticle({
            ...articleWithOutApertura,
            subtype: '4',
            promo_items: {
                basic: articleWithOutApertura.promo_items.basic,
                custom_storytelling_opening: {
                    embed: {
                        config: {
                            diagram: 'without-image'
                        }
                    }
                }
            }
        });

        expect(resp.imagenes).toBeUndefined();
        expect(resp.imagenesAcumulado).toBeUndefined();
    });

    test('Retorna imagenes para nota comun con promo image', () => {
        const resp = aperturaArticle(articleWithOutApertura);

        expect(resp.imagenes).toBeDefined();
        expect(resp.imagenes.length).toBeGreaterThan(0);
    });

    test('Usa imagenesAcumulado cuando el promo principal ya esta en content_elements', () => {
        const promoId =
            historyTellingArticle.promo_items.storytelling_mobile._id;

        const resp = aperturaArticle(historyTellingArticle, [promoId]);

        expect(resp.imagenes).toBeUndefined();
        expect(resp.imagenesAcumulado).toBeDefined();
    });
});
