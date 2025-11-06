import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PowerupsReceta from '../../../../../../components/features/foodit-global/Body/PowerupsReceta/foodit';

describe('FoodIt', () => {
    const article = {
        taxonomy: {
            sections: [
                {
                    name: 'Postres',
                    path: '/recetas/dulces/postres'
                }
            ]
        },
        promo_items: {
            receta: {
                embed: {
                    config: {
                        cookTime: 10,
                        cookingTypes: ['A la plancha'],
                        counterPortion: 1,
                        counterTime: 15,
                        occasions: ['Navidad'],
                        prepTime: 5,
                        regions: ['Argentina'],
                        title: 'detalle-receta'
                    }
                }
            }
        },
        content_elements: [
            {
                subtype: 'custom-nutrition',
                embed: {
                    config: {
                        items: [
                            {
                                text: 'Calorías',
                                unit: 'kcal',
                                value: 50
                            },
                            {
                                text: 'Carbohidratos',
                                unit: 'g',
                                value: 5
                            }
                        ],
                        typeList: 'nutritional-info'
                    }
                }
            },
            {
                subtype: 'foodit-ingredientes',
                embed: {
                    config: {
                        items: [
                            {
                                fullIngredientString: '100 g de Manteca',
                                includeInShoppingList: true,
                                isMainIngredient: false
                            },
                            {
                                fullIngredientString: '3 Huevo',
                                includeInShoppingList: true,
                                isMainIngredient: false
                            }
                        ],
                        titleList: 'Wafflesito rico'
                    }
                }
            },
            {
                subtype: 'custom-ingrediente',
                embed: {
                    config: {
                        items: ['item1', 'item2'],
                        titleList: 'Powerup ingrediente antiguo'
                    }
                }
            }
        ]
    };

    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            }))
        });
    });

    it('should match snapshot', () => {
        const { getByText } = render(<PowerupsReceta article={article} />);

        expect(
            getByText(article.taxonomy.sections[0].name)
        ).toBeInTheDocument();
        expect(getByText('Carbohidratos: 5 g')).toBeInTheDocument();
        expect(
            getByText(article.promo_items.receta.embed.config.occasions[0])
        ).toBeInTheDocument();
        expect(getByText(`PORCIONES`)).toBeInTheDocument();

        expect(
            getByText(
                `${article.promo_items.receta.embed.config.counterPortion}`
            )
        ).toBeInTheDocument();

        expect(getByText(`item2`)).toBeInTheDocument();
    });
});
