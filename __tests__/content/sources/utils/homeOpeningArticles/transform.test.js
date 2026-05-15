import {
    extractAperturaHomeArticles,
    transformArticle,
    BOX_ARTICLES_SIZES
} from '../../../../../content/sources/utils/homeOpeningArticles/transform';

const baseImage = {
    id: 'IMG123',
    _t: 'img',
    baseUrl: 'https://www.lanacion.com.ar/resizer/v2/javier-IMG123.jpg',
    absoluteUrl:
        'https://www.lanacion.com.ar/resizer/v2/javier-IMG123.jpg?auth=AUTHTOKEN&width=768&quality=70&smart=false'
};

const makeJsonV2Article = ({
    id = 'A1',
    titulo = 'Titulo',
    fecha = '2026-05-12T10:00:00.000Z',
    imagen = baseImage,
    volanta = '',
    url = `/path/${id}/`
} = {}) => ({
    id,
    titulo,
    volanta,
    url,
    fechaPublicacion: fecha,
    imagen,
    categoria: { _id: '/politica', name: 'Política' }
});

const makeBox = ({
    tipoSeccion = 'apertura',
    idSeccion = 200,
    notas = [],
    extra = {}
} = {}) => ({
    tipoSeccion,
    idSeccion,
    notas,
    ...extra
});

describe('homeOpeningArticles transform', () => {
    describe('transformArticle', () => {
        it('returns null when article has no id', () => {
            expect(
                transformArticle({ ...makeJsonV2Article(), id: null })
            ).toBeNull();
        });

        it('returns null when article has no image', () => {
            expect(
                transformArticle({ ...makeJsonV2Article(), imagen: null })
            ).toBeNull();
            expect(
                transformArticle({ ...makeJsonV2Article(), imagen: {} })
            ).toBeNull();
        });

        it('maps id/titulo/url/fecha/volanta to Arc Content API shape', () => {
            const article = transformArticle(
                makeJsonV2Article({
                    id: 'XYZ',
                    titulo: 'Mi titulo',
                    volanta: 'Mi volanta',
                    fecha: '2026-05-12T10:00:00.000Z',
                    url: '/seccion/mi-titulo-nid12345/'
                })
            );

            expect(article).toMatchObject({
                _id: 'XYZ',
                headlines: { basic: 'Mi titulo', mobile: 'Mi titulo' },
                display_date: '2026-05-12T10:00:00.000Z',
                website_url: '/seccion/mi-titulo-nid12345/',
                label: { volanta: { text: 'Mi volanta' } }
            });
        });

        it('passes fechaPublicacion through as display_date verbatim', () => {
            const article = transformArticle(
                makeJsonV2Article({ fecha: '2026-05-13 09:41:09' })
            );
            expect(article.display_date).toBe('2026-05-13 09:41:09');
        });

        it('maps `categoria { slug, valor }` to Arc taxonomy.primary_section', () => {
            const article = transformArticle({
                ...makeJsonV2Article(),
                categoria: { slug: '/politica', valor: 'Política' }
            });
            expect(article.taxonomy.primary_section).toEqual({
                _id: '/politica',
                path: '/politica',
                name: 'Política'
            });
        });

        it('returns an empty taxonomy.primary_section when categoria is missing', () => {
            const article = transformArticle({
                ...makeJsonV2Article(),
                categoria: undefined
            });
            expect(article.taxonomy.primary_section).toEqual({});
        });

        it('builds promo_items.basic with resized_urls following boxArticles promo_items sizes', () => {
            const article = transformArticle(makeJsonV2Article());
            expect(article.promo_items.basic.type).toBe('image');
            expect(article.promo_items.basic._id).toBe('IMG123');
            expect(article.promo_items.basic.url).toBe(baseImage.absoluteUrl);

            const urls = article.promo_items.basic.resized_urls;
            expect(urls).toHaveLength(BOX_ARTICLES_SIZES.length);
            expect(urls.map(({ option }) => option)).toEqual([
                {
                    width: 375,
                    height: 250,
                    minScreenWidth: 375,
                    useFullSize: true,
                    proportion: '3:2'
                },
                {
                    width: 300,
                    height: 200,
                    useFullSize: true,
                    proportion: '3:2'
                }
            ]);

            urls.forEach((entry, i) => {
                const expected = BOX_ARTICLES_SIZES[i];
                expect(entry.option.width).toBe(expected.width);
                expect(entry.option.height).toBe(expected.height);
                expect(entry.resizedUrl).toContain(`width=${expected.width}`);
                expect(entry.resizedUrl).toContain(`height=${expected.height}`);
                expect(entry.resizedUrl).toContain('auth=AUTHTOKEN');
            });
            expect(
                urls.some(
                    ({ option }) =>
                        option.width === 233 && option.height === 159
                )
            ).toBe(false);
        });
    });

    describe('extractAperturaHomeArticles', () => {
        it('returns articles only from apertura boxes (excludes other tipoSeccion)', () => {
            const data = {
                items: [
                    makeBox({
                        tipoSeccion: 'apertura',
                        notas: [makeJsonV2Article({ id: 'a1' })]
                    }),
                    makeBox({
                        tipoSeccion: 'enVivo',
                        notas: [makeJsonV2Article({ id: 'env1' })]
                    }),
                    makeBox({
                        tipoSeccion: 'tema',
                        notas: [makeJsonV2Article({ id: 't1' })]
                    })
                ]
            };
            const ids = extractAperturaHomeArticles(data).map(a => a._id);
            expect(ids).toEqual(['a1']);
        });

        it('catches both apertura boxes when home uses LN10_Caja_Apertura in main + pre-apertura sections', () => {
            const data = {
                items: [
                    makeBox({
                        tipoSeccion: 'apertura',
                        notas: [makeJsonV2Article({ id: 'main1' })]
                    }),
                    makeBox({
                        tipoSeccion: 'apertura',
                        notas: [makeJsonV2Article({ id: 'pre1' })]
                    })
                ]
            };
            const ids = extractAperturaHomeArticles(data).map(a => a._id);
            expect(ids).toEqual(expect.arrayContaining(['main1', 'pre1']));
        });

        it('excludes anticipo (tipoSeccion = anticipo)', () => {
            const data = {
                items: [
                    makeBox({
                        tipoSeccion: 'anticipo',
                        idSeccion: 501,
                        notas: [makeJsonV2Article({ id: 'antic' })]
                    }),
                    makeBox({
                        tipoSeccion: 'apertura',
                        notas: [makeJsonV2Article({ id: 'ok' })]
                    })
                ]
            };
            const ids = extractAperturaHomeArticles(data).map(a => a._id);
            expect(ids).toEqual(['ok']);
        });

        it('skips articles without image', () => {
            const data = {
                items: [
                    makeBox({
                        tipoSeccion: 'apertura',
                        notas: [
                            makeJsonV2Article({ id: 'withImg' }),
                            makeJsonV2Article({ id: 'noImg', imagen: null })
                        ]
                    })
                ]
            };
            const ids = extractAperturaHomeArticles(data).map(a => a._id);
            expect(ids).toEqual(['withImg']);
        });

        it('sorts by publish date desc (most recent first, position 1 = newest)', () => {
            const data = {
                items: [
                    makeBox({
                        tipoSeccion: 'apertura',
                        notas: [
                            makeJsonV2Article({
                                id: 'old',
                                fecha: '2026-05-10T08:00:00.000Z'
                            }),
                            makeJsonV2Article({
                                id: 'newest',
                                fecha: '2026-05-12T15:00:00.000Z'
                            }),
                            makeJsonV2Article({
                                id: 'mid',
                                fecha: '2026-05-11T12:00:00.000Z'
                            })
                        ]
                    })
                ]
            };
            const ids = extractAperturaHomeArticles(data).map(a => a._id);
            expect(ids).toEqual(['newest', 'mid', 'old']);
        });

        it('dedupes articles shared between boxes', () => {
            const data = {
                items: [
                    makeBox({
                        tipoSeccion: 'apertura',
                        notas: [makeJsonV2Article({ id: 'shared' })]
                    }),
                    makeBox({
                        tipoSeccion: 'apertura',
                        notas: [
                            makeJsonV2Article({ id: 'shared' }),
                            makeJsonV2Article({ id: 'unique' })
                        ]
                    })
                ]
            };
            const ids = extractAperturaHomeArticles(data).map(a => a._id);
            expect(ids).toEqual(expect.arrayContaining(['shared', 'unique']));
            expect(ids.filter(id => id === 'shared')).toHaveLength(1);
        });

        it('caps the result at 10 articles', () => {
            const notas = Array.from({ length: 20 }, (_, i) =>
                makeJsonV2Article({
                    id: `n${i}`,
                    fecha: new Date(2026, 4, 12, 23 - i).toISOString()
                })
            );
            const data = {
                items: [makeBox({ tipoSeccion: 'apertura', notas })]
            };
            const result = extractAperturaHomeArticles(data);
            expect(result).toHaveLength(10);
            expect(result[0]._id).toBe('n0');
            expect(result[9]._id).toBe('n9');
        });

        it('processes a realistic jsonv2 endpoint response shape (two apertura boxes + enVivo + tema + banners)', () => {
            const realShape = {
                metadata: { paginate: false, outputType: 'jsonv2' },
                items: [
                    {
                        tipoSeccion: 'apertura',
                        idSeccion: 200,
                        diagramacion: 'left-focal-without-timeline',
                        notas: [
                            {
                                id: 'A1',
                                titulo: 'Apertura 1 (más reciente)',
                                volanta: 'Volanta 1',
                                url: '/politica/a1/',
                                fechaPublicacion: '2026-05-13 10:02:35',
                                categoria: {
                                    slug: '/el-mundo',
                                    valor: 'El Mundo'
                                },
                                imagen: {
                                    id: 'IMG_A1',
                                    _t: 'img',
                                    baseUrl:
                                        'https://www.lanacion.com.ar/resizer/v2/a1.jpg',
                                    absoluteUrl:
                                        'https://www.lanacion.com.ar/resizer/v2/a1.jpg?auth=AAA&width=488&height=325&quality=70&smart=true'
                                }
                            },
                            {
                                id: 'A2',
                                titulo: 'Apertura 2',
                                fechaPublicacion: '2026-05-13 08:02:20',
                                categoria: {
                                    slug: '/deportes',
                                    valor: 'Deportes'
                                },
                                imagen: {
                                    id: 'IMG_A2',
                                    _t: 'img',
                                    absoluteUrl:
                                        'https://www.lanacion.com.ar/resizer/v2/a2.jpg?auth=BBB&width=420&height=280&quality=70&smart=true'
                                }
                            }
                        ]
                    },
                    {
                        tipoSeccion: 'enVivo',
                        idSeccion: 700,
                        notas: [
                            {
                                id: 'LIVE',
                                titulo: 'Liveblog (debe quedar afuera)'
                            }
                        ]
                    },
                    { tipoSeccion: 'banner', idSeccion: 402 },
                    {
                        tipoSeccion: 'apertura',
                        idSeccion: 200,
                        diagramacion: 'bn-opening-4',
                        notas: [
                            {
                                id: 'B1',
                                titulo: 'Pre-apertura más nueva',
                                fechaPublicacion: '2026-05-13 09:48:08',
                                imagen: {
                                    id: 'IMG_B1',
                                    _t: 'img',
                                    absoluteUrl:
                                        'https://resizer.glanacion.com/resizer/v2/b1.jpg?auth=CCC&width=420&height=280&quality=70&smart=true'
                                }
                            }
                        ]
                    },
                    {
                        tipoSeccion: 'tema',
                        idSeccion: 305,
                        notas: [
                            { id: 'TEMA', titulo: 'Tema (debe quedar afuera)' }
                        ]
                    }
                ]
            };

            const result = extractAperturaHomeArticles(realShape);
            const ids = result.map(a => a._id);
            expect(ids).toEqual(['A1', 'B1', 'A2']);

            expect(result[0]).toMatchObject({
                _id: 'A1',
                display_date: '2026-05-13 10:02:35',
                website_url: '/politica/a1/',
                label: { volanta: { text: 'Volanta 1' } },
                taxonomy: {
                    primary_section: {
                        _id: '/el-mundo',
                        path: '/el-mundo',
                        name: 'El Mundo'
                    }
                }
            });
            expect(result[0].promo_items.basic.resized_urls).toHaveLength(
                BOX_ARTICLES_SIZES.length
            );
            expect(
                result[0].promo_items.basic.resized_urls[0].resizedUrl
            ).toContain('auth=AAA');
        });
    });
});
