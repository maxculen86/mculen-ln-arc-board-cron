import {
    extractSteps,
    extractIngredients
} from '../../../../../../../components/features/foodit-global/common/OpeningRecipe/cookMode/helper';

const createStep = (description, step) => ({
    step,
    title: null,
    description,
    image: null
});

const createImage = (url = 'https://example.com/image.jpg') => ({
    _id: `image-${url}`,
    type: 'image',
    url
});

describe('cookMode/helper', () => {
    describe('extractSteps', () => {
        it('returns empty array if contentElements is not an array', () => {
            expect(extractSteps(null)).toEqual([]);
            expect(extractSteps(undefined)).toEqual([]);
            expect(extractSteps('not an array')).toEqual([]);
        });

        it('returns empty array if there is no preparation header or custom-preparacion', () => {
            const contentElements = [
                { type: 'text', content: 'Introducción' },
                {
                    type: 'header',
                    content: 'Ingredientes',
                    level: 2
                },
                {
                    type: 'list',
                    items: [{ content: 'Harina', type: 'text' }]
                }
            ];

            expect(extractSteps(contentElements)).toEqual([]);
        });

        describe('custom-preparacion', () => {
            it('extracts steps from custom-preparacion', () => {
                const contentElements = [
                    {
                        type: 'custom_embed',
                        subtype: 'custom-preparacion',
                        embed: {
                            config: {
                                items: ['Paso uno', 'Paso dos']
                            }
                        }
                    }
                ];

                expect(extractSteps(contentElements)).toEqual([
                    createStep('Paso uno', 1),
                    createStep('Paso dos', 2)
                ]);
            });

            it('assigns images after custom-preparacion to steps in order', () => {
                const contentElements = [
                    {
                        type: 'custom_embed',
                        subtype: 'custom-preparacion',
                        embed: {
                            config: {
                                items: ['Paso uno', 'Paso dos', 'Paso tres']
                            }
                        }
                    },
                    createImage('https://example.com/img1.jpg'),
                    createImage('https://example.com/img2.jpg')
                ];

                expect(extractSteps(contentElements)).toEqual([
                    {
                        step: 1,
                        title: null,
                        description: 'Paso uno',
                        image: 'https://example.com/img1.jpg'
                    },
                    {
                        step: 2,
                        title: null,
                        description: 'Paso dos',
                        image: 'https://example.com/img2.jpg'
                    },
                    {
                        step: 3,
                        title: null,
                        description: 'Paso tres',
                        image: null
                    }
                ]);
            });

            it('ignores images without url', () => {
                const contentElements = [
                    {
                        type: 'custom_embed',
                        subtype: 'custom-preparacion',
                        embed: {
                            config: {
                                items: ['Paso uno']
                            }
                        }
                    },
                    { type: 'image', url: '' },
                    createImage('https://example.com/img1.jpg')
                ];

                expect(extractSteps(contentElements)).toEqual([
                    {
                        step: 1,
                        title: null,
                        description: 'Paso uno',
                        image: 'https://example.com/img1.jpg'
                    }
                ]);
            });

            it('ignores images that appear after the second custom-preparacion', () => {
                const contentElements = [
                    {
                        type: 'custom_embed',
                        subtype: 'custom-preparacion',
                        embed: {
                            config: {
                                items: ['Paso uno']
                            }
                        }
                    },
                    createImage('https://example.com/img1.jpg'),
                    {
                        type: 'custom_embed',
                        subtype: 'custom-preparacion',
                        embed: {
                            config: {
                                items: ['Paso dos']
                            }
                        }
                    },
                    createImage('https://example.com/img2.jpg')
                ];

                expect(extractSteps(contentElements)).toEqual([
                    {
                        step: 1,
                        title: null,
                        description: 'Paso uno',
                        image: 'https://example.com/img1.jpg'
                    },
                    {
                        step: 2,
                        title: null,
                        description: 'Paso dos',
                        image: null
                    }
                ]);
            });
        });

        describe('lists under Preparation header', () => {
            it('extracts steps from lists under the preparation header', () => {
                const contentElements = [
                    {
                        type: 'header',
                        content: 'Preparación',
                        level: 2
                    },
                    {
                        type: 'list',
                        items: [
                            { content: 'Paso uno', type: 'text' },
                            { content: 'Paso dos', type: 'text' }
                        ]
                    }
                ];

                expect(extractSteps(contentElements)).toEqual([
                    createStep('Paso uno', 1),
                    createStep('Paso dos', 2)
                ]);
            });

            it('assigns an image after a list to the last step of that list', () => {
                const contentElements = [
                    {
                        type: 'header',
                        content: 'Preparación',
                        level: 2
                    },
                    {
                        type: 'list',
                        items: [
                            { content: 'Paso uno', type: 'text' },
                            { content: 'Paso dos', type: 'text' }
                        ]
                    },
                    createImage('https://example.com/img-after.jpg')
                ];

                expect(extractSteps(contentElements)).toEqual([
                    createStep('Paso uno', 1),
                    {
                        step: 2,
                        title: null,
                        description: 'Paso dos',
                        image: 'https://example.com/img-after.jpg'
                    }
                ]);
            });

            it('assigns images between lists to the previous step', () => {
                const contentElements = [
                    {
                        type: 'header',
                        content: 'Preparación',
                        level: 2
                    },
                    {
                        type: 'list',
                        items: [{ content: 'Paso uno', type: 'text' }]
                    },
                    createImage('https://example.com/img-between.jpg'),
                    {
                        type: 'list',
                        items: [{ content: 'Paso dos', type: 'text' }]
                    }
                ];

                expect(extractSteps(contentElements)).toEqual([
                    {
                        step: 1,
                        title: null,
                        description: 'Paso uno',
                        image: 'https://example.com/img-between.jpg'
                    },
                    createStep('Paso dos', 2)
                ]);
            });

            it('ignores images that appear before the first step', () => {
                const contentElements = [
                    {
                        type: 'header',
                        content: 'Preparación',
                        level: 2
                    },
                    createImage('https://example.com/before.jpg'),
                    {
                        type: 'list',
                        items: [{ content: 'Paso uno', type: 'text' }]
                    }
                ];

                expect(extractSteps(contentElements)).toEqual([
                    createStep('Paso uno', 1)
                ]);
            });

            it('stops extraction upon encountering another header level 3 or lower', () => {
                const contentElements = [
                    {
                        type: 'header',
                        content: 'Preparación',
                        level: 2
                    },
                    {
                        type: 'list',
                        items: [{ content: 'Paso uno', type: 'text' }]
                    },
                    {
                        type: 'header',
                        content: 'Tips',
                        level: 3
                    },
                    createImage('https://example.com/after-header.jpg'),
                    {
                        type: 'list',
                        items: [{ content: 'No incluir', type: 'text' }]
                    }
                ];

                expect(extractSteps(contentElements)).toEqual([
                    createStep('Paso uno', 1)
                ]);
            });

            it('prioritizes custom-preparacion over lists when both exist', () => {
                const contentElements = [
                    {
                        type: 'header',
                        content: 'Preparación',
                        level: 2
                    },
                    {
                        type: 'list',
                        items: [{ content: 'Paso de lista', type: 'text' }]
                    },
                    {
                        type: 'custom_embed',
                        subtype: 'custom-preparacion',
                        embed: {
                            config: {
                                items: ['Paso custom']
                            }
                        }
                    }
                ];

                expect(extractSteps(contentElements)).toEqual([
                    createStep('Paso custom', 1)
                ]);
            });

            it('extracts titleList from custom-preparacion', () => {
                const contentElements = [
                    {
                        type: 'custom_embed',
                        subtype: 'custom-preparacion',
                        embed: {
                            config: {
                                titleList: 'Para la masa',
                                items: ['Paso uno', 'Paso dos']
                            }
                        }
                    }
                ];

                expect(extractSteps(contentElements)).toEqual([
                    {
                        step: 1,
                        title: 'Para la masa',
                        description: 'Paso uno',
                        image: null
                    },
                    {
                        step: 2,
                        title: 'Para la masa',
                        description: 'Paso dos',
                        image: null
                    }
                ]);
            });

            it('extracts title from h4 header before list', () => {
                const contentElements = [
                    {
                        type: 'header',
                        content: 'Preparación',
                        level: 1
                    },
                    {
                        type: 'header',
                        content: 'Cortar carne',
                        level: 4
                    },
                    {
                        type: 'list',
                        items: [{ content: 'Paso uno', type: 'text' }]
                    }
                ];

                expect(extractSteps(contentElements)).toEqual([
                    {
                        step: 1,
                        title: 'Cortar carne',
                        description: 'Paso uno',
                        image: null
                    }
                ]);
            });

            it('skips images when looking for h4 title', () => {
                const contentElements = [
                    {
                        type: 'header',
                        content: 'Preparación',
                        level: 1
                    },
                    {
                        type: 'header',
                        content: 'Preparar salsa',
                        level: 4
                    },
                    createImage('https://example.com/image.jpg'),
                    {
                        type: 'list',
                        items: [{ content: 'Paso uno', type: 'text' }]
                    }
                ];

                expect(extractSteps(contentElements)).toEqual([
                    {
                        step: 1,
                        title: 'Preparar salsa',
                        description: 'Paso uno',
                        image: null
                    }
                ]);
            });

            it('returns null title when no h4 header before list', () => {
                const contentElements = [
                    {
                        type: 'header',
                        content: 'Preparación',
                        level: 1
                    },
                    {
                        type: 'list',
                        items: [{ content: 'Paso uno', type: 'text' }]
                    }
                ];

                expect(extractSteps(contentElements)).toEqual([
                    {
                        step: 1,
                        title: null,
                        description: 'Paso uno',
                        image: null
                    }
                ]);
            });

            it('returns null title when h4 is after another header', () => {
                const contentElements = [
                    {
                        type: 'header',
                        content: 'Preparación',
                        level: 1
                    },
                    {
                        type: 'header',
                        content: 'Sección',
                        level: 4
                    },
                    {
                        type: 'header',
                        content: 'Otra sección',
                        level: 4
                    },
                    {
                        type: 'list',
                        items: [{ content: 'Paso uno', type: 'text' }]
                    }
                ];

                expect(extractSteps(contentElements)).toEqual([
                    {
                        step: 1,
                        title: 'Otra sección',
                        description: 'Paso uno',
                        image: null
                    }
                ]);
            });
        });
    });

    describe('extractIngredients', () => {
        it('extracts ingredients from foodit-ingredientes', () => {
            const contentElements = [
                {
                    type: 'custom_embed',
                    subtype: 'foodit-ingredientes',
                    embed: {
                        config: {
                            items: [
                                {
                                    fullIngredientString: '500 g de Harina',
                                    ingredient: 'Harina'
                                },
                                {
                                    ingredient: 'Azúcar'
                                }
                            ]
                        }
                    }
                }
            ];

            expect(extractIngredients(contentElements)).toEqual([
                '500 g de Harina',
                'Azúcar'
            ]);
        });

        it('extracts ingredients from custom-ingrediente', () => {
            const contentElements = [
                {
                    type: 'custom_embed',
                    subtype: 'custom-ingrediente',
                    embed: {
                        config: {
                            items: ['1 taza de leche', '2 huevos']
                        }
                    }
                }
            ];

            expect(extractIngredients(contentElements)).toEqual([
                '1 taza de leche',
                '2 huevos'
            ]);
        });
    });
});
