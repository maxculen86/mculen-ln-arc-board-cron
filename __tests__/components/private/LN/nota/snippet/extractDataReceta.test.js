import { extractDataFromContentElements } from '../../../../../../components/private/LN/nota/snippet/extractData/extractDataReceta';

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
