import getTagList, {
    getListsFromPowerup,
    setUrlTag
} from '../../../../../../components/features/foodit-global/Body/PowerupsReceta/_helper';

import { content_elements } from '../../../../../../__mocks__/data/articlesFoodit/SubtypeReceta/fichaReceta2.json';

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar'
    };
});

describe('Tests - body - PowerupsReceta - helpers', () => {
    describe('Tests function setUrlTag', () => {
        test('Returns an empty list if no arguments are provided', () => {
            expect(setUrlTag()).toEqual([]);
        });

        test('Returns an empty list if tagList is an empty array', () => {
            expect(setUrlTag({ tagList: [] })).toEqual([]);
        });

        test('Returns labels with section URLs correctly', () => {
            const input = {
                nameSection: '',
                primarySection: 'Recetas',
                tagList: [
                    { name: 'Al horno', path: '/al-horno/' },
                    { name: 'Frito', path: '/frito' }
                ]
            };

            expect(setUrlTag(input)).toEqual([
                {
                    text: 'Al horno',
                    url: '/al-horno/'
                },
                {
                    text: 'Frito',
                    url: '/frito/'
                }
            ]);
        });

        test('Returns tags with default URLs if no path is provided in the tags', () => {
            const input = {
                idArticle: 'ABC-123',
                nameSection: 'occasions',
                primarySection: 'Recetas',
                tagList: ['Desayunos', 'Postres']
            };

            expect(setUrlTag(input)).toEqual([
                {
                    text: 'Desayunos',
                    url: 'https://foodit.lanacion.com.ar/tema/desayunos/?query=recetas&title=Desayunos&groups=occasions&itemGroups=Desayunos'
                },
                {
                    text: 'Postres',
                    url: 'https://foodit.lanacion.com.ar/tema/postres/?query=recetas&title=Postres&groups=occasions&itemGroups=Postres'
                }
            ]);
        });

        test('Returns an empty list if tagList is null', () => {
            expect(setUrlTag({ tagList: null })).toEqual([]);
        });

        test('Returns tags with URL based on primarySection if tagList is not provided', () => {
            const input = {
                primarySection: { name: 'Recetas', path: '/recetas/' }
            };

            expect(setUrlTag(input)).toEqual([]);
        });
    });

    describe('tests function getTagList', () => {
        test('Returns an empty list if no arguments are provided', () => {
            const result = getTagList();
            expect(result).toEqual([]);
        });

        test('Returns an empty list if the arguments value is null', () => {
            const result = getTagList({
                cookingTypes: null,
                occasions: null,
                taxonomy: null,
                regions: null
            });
            expect(result).toEqual([]);
        });

        test('Return cookingTypes tags correctly', () => {
            const result = getTagList({
                idArticle: 'ABC-123',
                taxonomy: {
                    primary_section: { name: 'Recetas' }
                },
                cookingTypes: ['Al horno']
            });

            expect(result).toEqual([
                {
                    text: 'Al horno',
                    url: 'https://foodit.lanacion.com.ar/tema/al-horno/?query=recetas&title=Al horno&groups=cookingtypes&itemGroups=Al horno'
                }
            ]);
        });

        test('Returns occasion tags correctly', () => {
            const result = getTagList({
                idArticle: 'ABC-123',
                taxonomy: {
                    primary_section: { name: 'Recetas' }
                },
                occasions: ['Día de la Amistad', 'Aniversario']
            });

            expect(result).toEqual([
                {
                    text: 'Día de la Amistad',
                    url: 'https://foodit.lanacion.com.ar/tema/día-de-la-amistad/?query=recetas&title=Día de la Amistad&groups=occasions&itemGroups=Día de la Amistad'
                },
                {
                    text: 'Aniversario',
                    url: 'https://foodit.lanacion.com.ar/tema/aniversario/?query=recetas&title=Aniversario&groups=occasions&itemGroups=Aniversario'
                }
            ]);
        });

        test('Returns region labels correctly', () => {
            const input = {
                idArticle: 'ABC-123',
                taxonomy: {
                    primary_section: { name: 'Recetas' }
                },
                regions: ['Italiana', 'Estadounidense']
            };
            const result = getTagList(input);
            expect(result).toEqual([
                {
                    text: 'Italiana',
                    url: 'https://foodit.lanacion.com.ar/tema/italiana/?query=recetas&title=Italiana&groups=regions&itemGroups=Italiana'
                },
                {
                    text: 'Estadounidense',
                    url: 'https://foodit.lanacion.com.ar/tema/estadounidense/?query=recetas&title=Estadounidense&groups=regions&itemGroups=Estadounidense'
                }
            ]);
        });

        test('Returns section labels correctly', () => {
            const input = {
                taxonomy: {
                    primary_section: { name: 'Dulces' },
                    sections: [
                        { name: 'Sin gluten', path: '/recetas/sin-gluten' },
                        { name: 'Postres', path: '/recetas/postres' }
                    ]
                }
            };
            const result = getTagList(input);
            expect(result).toEqual([
                { text: 'Sin gluten', url: '/recetas/sin-gluten/' },
                { text: 'Postres', url: '/recetas/postres/' }
            ]);
        });

        test('Returns a combined list of tags correctly', () => {
            const input = {
                idArticle: 'ABC-123',
                cookingTypes: ['Al horno'],
                occasions: ['Día de la Amistad'],
                regions: ['Italiana'],
                taxonomy: {
                    primary_section: { name: 'Recetas' },
                    sections: [{ name: 'Postres', path: '/recetas/postres' }]
                }
            };
            const result = getTagList(input);
            expect(result).toEqual([
                {
                    text: 'Al horno',
                    url: 'https://foodit.lanacion.com.ar/tema/al-horno/?query=recetas&title=Al horno&groups=cookingtypes&itemGroups=Al horno'
                },
                {
                    text: 'Día de la Amistad',
                    url: 'https://foodit.lanacion.com.ar/tema/día-de-la-amistad/?query=recetas&title=Día de la Amistad&groups=occasions&itemGroups=Día de la Amistad'
                },
                {
                    text: 'Italiana',
                    url: 'https://foodit.lanacion.com.ar/tema/italiana/?query=recetas&title=Italiana&groups=regions&itemGroups=Italiana'
                },
                { text: 'Postres', url: '/recetas/postres/' }
            ]);
        });

        test('Should filter the sections ¿Qué cocinar hoy?, Recetas, Dietas', () => {
            const input = {
                taxonomy: {
                    primary_section: { name: 'Dulces' },
                    sections: [
                        { name: 'Sin gluten', path: '/recetas/sin-gluten' },
                        { name: 'Postres', path: '/recetas/postres' },
                        { name: 'Recetas', path: '/recetas' },
                        { name: 'Dietas', path: '/dietas' },
                        { name: '¿Qué cocinar hoy?', path: '/que-cocinar-hoy' }
                    ]
                }
            };
            const result = getTagList(input);
            expect(result).toEqual([
                { text: 'Sin gluten', url: '/recetas/sin-gluten/' },
                { text: 'Postres', url: '/recetas/postres/' }
            ]);
        });
    });

    describe('tests function getListsFromPowerup', () => {
        test('Returns empty arrays for ingredientsLists and nutritionLists if no arguments are provided', () => {
            const { ingredientsLists, nutritionLists } = getListsFromPowerup();
            expect(ingredientsLists).toEqual([]);
            expect(nutritionLists).toEqual([]);
        });

        test('Returns lists from mocked content_elements', () => {
            const { ingredientsLists } = getListsFromPowerup(content_elements);

            expect(ingredientsLists.length).toBe(5);
            expect(ingredientsLists).toMatchSnapshot();
        });
    });
});
