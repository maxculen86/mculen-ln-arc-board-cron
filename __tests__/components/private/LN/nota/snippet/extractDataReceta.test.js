import {
    extractDataFromContentElements,
    extractDataFromPromoItems,
    extractDataFromTags,
    extractDataFromCredits
} from '../../../../../../components/private/LN/nota/snippet/extractData/extractDataReceta';
import getBiggestImage from '../../../../../../components/private/LN/common/utils/getBiggestImage';

describe('Tests extractDataReceta() function', () => {
    const contentElements = [
        {
            subtype: 'power-up-receta',
            powerUp: [
                {
                    embed: {
                        config: {
                            items: ['Tomate', 'Lechuga', 'Cebolla'],
                            typeList: 'ingredientes'
                        }
                    }
                },
                {
                    embed: {
                        config: {
                            items: ['Se mezcla'],
                            typeList: 'preparacion'
                        }
                    }
                },
                {
                    embed: {
                        config: {
                            items: [
                                { text: 'Calorías', unit: 'kcal', value: 2 },
                                { text: 'Carbohidratos', unit: 'g', value: 3 },
                                { text: 'Grasas', unit: 'g', value: 1 }
                            ],
                            typeList: 'nutritional-info'
                        }
                    }
                }
            ]
        }
    ];

    const _contentElements = undefined;

    const _data = {
        ingredients: [],
        instructions: [],
        nutrition: {}
    };

    const data = {
        ingredients: ['Tomate', 'Lechuga', 'Cebolla'],
        instructions: [
            {
                '@type': 'HowToSection',
                itemListElement: [{ '@type': 'HowToStep', text: 'Se mezcla' }],
                name: undefined
            }
        ],
        nutrition: {
            calories: '2 kcal',
            carbohydrateContent: '3 g',
            fatContent: '1 g'
        }
    };

    it('should return empty object with ingredients, intructions and nutrition properties', () => {
        expect(extractDataFromContentElements(_contentElements)).toStrictEqual(
            _data
        );
    });

    it('should iterate and assign new properties within nutrition items', () => {
        expect(extractDataFromContentElements(contentElements)).toStrictEqual(
            data
        );
    });
});

describe('Test function extractDataFromPromoItems', () => {
    const PLACERHOLDER =
        'https://arc-static.glanacion.com/pf/resources/images/placeholderLN-1080.jpg?d=748';
    const promoItems = {
        basic: {
            _id: 'Q6R6LDNENRHUNHYFTJIO4U4RAQ',
            additional_properties: {},
            caption: 'Gentileza: Carat (Belcolade - Puratos)',
            created_date: '2019-10-08T17:00:03Z',
            description: { basic: 'Gentileza: Carat (Belcolade)' },
            distributor: { name: '' },
            height: 721,
            publish_date: '2019-04-15T20:15:00Z',
            resized_urls: [
                {
                    option: {
                        height: 586,
                        media: '(min-width: 1280px)',
                        media_preload: '(min-width: 1280.1px)',
                        width: 879
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/D5T0pT3gy0zcNAMDqfSkK0kmO84=/879x586/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Q6R6LDNENRHUNHYFTJIO4U4RAQ.jpg'
                },
                {
                    option: {
                        height: 746,
                        media_preload:
                            '(min-width: 1024.1px and max-width: 1280px)',
                        width: 1200
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/swXZF8dV4tCLIGiHc7U4VEBYN6g=/1200x746/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Q6R6LDNENRHUNHYFTJIO4U4RAQ.jpg'
                },
                {
                    option: {
                        height: 512,
                        media_preload:
                            '(min-width: 768.1px and max-width: 1024px)',
                        width: 768
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/CJdY_0_w9Gl8JPJzo5AMjPqYSIM=/768x512/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Q6R6LDNENRHUNHYFTJIO4U4RAQ.jpg'
                },
                {
                    option: {
                        height: 234,
                        media_preload:
                            '(min-width: 375.1px and max-width: 768px)',
                        width: 351
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/_EOWkI5RWs8zKZFnRz4IrU8C25I=/351x234/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Q6R6LDNENRHUNHYFTJIO4U4RAQ.jpg'
                },
                {
                    option: {
                        height: 206,
                        media_preload: '(max-width: 375px)',
                        width: 309
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/FpALzRZrfKotDVpJPx2nFWUTMrc=/309x206/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Q6R6LDNENRHUNHYFTJIO4U4RAQ.jpg'
                }
            ],
            subtitle: 'Gentileza: Carat (Belcolade)',
            type: 'image',
            url:
                'https://resizer.glanacion.com/resizer/bHB42cAZV3OwE8ahuR1PL-RL9DM=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Q6R6LDNENRHUNHYFTJIO4U4RAQ.jpg',
            width: 2000
        },
        receta: {
            embed: {
                config: {
                    counterPortion: 1,
                    counterTime: '75',
                    title: 'detalle-receta'
                }
            },
            subtype: 'custom-detalle-receta'
        }
    };

    test('Test return extractDataFromPromoItems when note have image', () => {
        expect(
            extractDataFromPromoItems(promoItems, PLACERHOLDER)
        ).toStrictEqual({
            cookTime: '',
            counterPortion: 1,
            counterTime: '75',
            image: {
                '@context': 'https://schema.org',
                '@type': 'ImageObject',
                url:
                    'https://resizer.glanacion.com/resizer/bHB42cAZV3OwE8ahuR1PL-RL9DM=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Q6R6LDNENRHUNHYFTJIO4U4RAQ.jpg',
                height: '746',
                width: '1200'
            },
            prepTime: ''
        });
    });

    test('Test return extractDataFromPromoItems when image is not exists', () => {
        const promoItems = {
            receta: {
                embed: {
                    config: {
                        counterPortion: 2,
                        title: 'detalle-receta'
                    }
                },
                subtype: 'custom-detalle-receta'
            }
        };

        expect(
            extractDataFromPromoItems(promoItems, PLACERHOLDER)
        ).toStrictEqual({
            cookTime: '',
            counterPortion: 2,
            counterTime: '',
            image: {
                '@context': 'https://schema.org',
                '@type': 'ImageObject',
                url: PLACERHOLDER,
                height: '800',
                width: '1200'
            },
            prepTime: ''
        });
    });
});

describe('Test return function extractDataFromTags', () => {
    test('Test return extractDataFromPromoItems', () => {
        const tags = [
            {
                description: 'Chocolate blanco',
                slug: 'chocolate-blanco-tid47186',
                text: 'Chocolate blanco'
            },
            { description: 'Miel', slug: 'miel-tid47266', text: 'Miel' },
            {
                description: 'Glucosa',
                slug: 'glucosa-tid47227',
                text: 'Glucosa'
            }
        ];
        expect(extractDataFromTags(tags)).toStrictEqual({
            keywords: 'Chocolate blanco, Miel, Glucosa'
        });
    });

    test('Test return when tags is undefiend', () => {
        expect(extractDataFromTags(undefined)).toStrictEqual({ keywords: '' });
    });
});

describe('Test function extractDataFromCredits', () => {
    test('Test return extractDataFromCredits', () => {
        const by = [
            {
                _id: 'miriam-becker-384',
                additional_properties: {
                    original: {
                        author_type: 'Estándar',
                        bio_page: '/autor/miriam-becker-384/',
                        byline: 'Miriam Becker',
                        image: '',
                        role: 'PARA LA NACION'
                    }
                },
                image: { url: '' },
                name: 'Miriam Becker',
                slug: 'miriam-becker-384',
                type: 'author',
                url: '/autor/miriam-becker-384/'
            }
        ];

        expect(extractDataFromCredits(by)).toStrictEqual({
            autores: 'Miriam Becker'
        });
    });

    test('Test return when by is undefined', () => {
        expect(extractDataFromCredits(undefined)).toStrictEqual({
            autores: []
        });
    });
});
