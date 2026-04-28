import {
    getQueryForFilters,
    getCustomFiltersGroups,
    transformListGroups,
    getTag,
    transformedFilterNames,
    checkStateCheckbox
} from '../../../../components/features/foodit-global/Queryly/_helpers';

describe('Tests - helpers - Foodit Buscador', () => {
    describe('Test - getQueryForFilters', () => {
        it('should return a valid query string for given filters', () => {
            const filters = {
                section: ['Vegetariana', 'Keto'],
                regions: ['Asia', 'Europa']
            };

            const result = getQueryForFilters(filters);

            expect(result).toBe(
                '&facetedkey=section|regions&facetedvalue=[Vegetariana]^[Keto]|[Asia]^[Europa]'
            );
        });

        it('should return an empty string for empty filters', () => {
            const result = getQueryForFilters({});
            expect(result).toBe('');
        });
    });

    describe('Test - getCustomFiltersGroups', () => {
        it('should group sections correctly', () => {
            const sections = [
                { key: 'Vegetariana' },
                { key: 'Pizza y empanadas' },
                { key: 'Tortas' },
                { key: 'Fácil' }
            ];

            const result = getCustomFiltersGroups(sections);

            expect(result).toEqual({
                diet: [{ key: 'Vegetariana', facetedKey: 'section' }],
                salty: [{ key: 'Pizza y empanadas', facetedKey: 'section' }],
                sweets: [{ key: 'Tortas', facetedKey: 'section' }],
                others: [{ key: 'Fácil', facetedKey: 'section' }]
            });
        });

        it('should return empty groups for unknown keys or parameters is not defined', () => {
            const sections = [{ key: 'Desconocido' }];

            const result = {
                diet: [],
                salty: [],
                sweets: [],
                others: []
            };

            expect(getCustomFiltersGroups(sections)).toEqual(result);

            expect(getCustomFiltersGroups()).toEqual(result);
        });

        it('should return empty groups when parameters is null', () => {
            expect(getCustomFiltersGroups(null)).toEqual({});
        });

        it('should return empty groups when parameters is null', () => {
            expect(getCustomFiltersGroups(null)).toEqual({});
        });
    });

    describe('Test - transformListGroups', () => {
        const resultDefault = [
            {
                name: 'Tipo de contenido',
                childrens: [],
                group: 'subtype'
            },
            { name: 'Dieta', childrens: [], group: 'diet' },
            { name: 'Saladas', childrens: [], group: 'salty' },
            { name: 'Dulces', childrens: [], group: 'sweets' },
            { name: 'Otros', childrens: [], group: 'others' },
            {
                name: 'Ingrediente principal',
                childrens: [],
                group: 'main_ingredients'
            },
            {
                name: 'Tipo de cocción',
                childrens: [],
                group: 'cookingtypes'
            },
            { name: 'Región', childrens: [], group: 'regions' },
            { name: 'Ocasión', childrens: [], group: 'occasions' }
        ];
        it('should transform listFiltersGroups correctly', () => {
            const listFiltersGroups = {
                section: [{ key: 'Vegetariana' }],
                regions: [{ key: 'Asia' }]
            };

            const result = transformListGroups(listFiltersGroups);

            console.log(result);

            expect(result).toEqual([
                {
                    name: 'Tipo de contenido',
                    childrens: [],
                    group: 'subtype'
                },
                {
                    name: 'Dieta',
                    childrens: [
                        {
                            key: 'Vegetariana',
                            facetedKey: 'section',
                            checked: false
                        }
                    ],
                    group: 'diet'
                },
                { name: 'Saladas', childrens: [], group: 'salty' },
                { name: 'Dulces', childrens: [], group: 'sweets' },
                { name: 'Otros', childrens: [], group: 'others' },
                {
                    name: 'Ingrediente principal',
                    childrens: [],
                    group: 'main_ingredients'
                },
                {
                    name: 'Tipo de cocción',
                    childrens: [],
                    group: 'cookingtypes'
                },
                {
                    name: 'Región',
                    childrens: [{ key: 'Asia', checked: false }],
                    group: 'regions'
                },
                { name: 'Ocasión', childrens: [], group: 'occasions' }
            ]);
        });

        it('should return default when the parameters is not defined or null', () => {
            expect(transformListGroups()).toEqual(resultDefault);
            expect(transformListGroups(null)).toEqual(resultDefault);
        });
    });

    describe('Test - getTag', () => {
        it('should return the highest priority tag', () => {
            // El orden de prioridad de tags es: Fácil, Vegana, Keto, Vegetariana, Rápida, Sin Gluten, Clásica, Maridaje
            const section = 'Vegetariana|Keto|Fácil|Rapida';
            const result = getTag(section);

            expect(result).toEqual('Fácil');
        });

        it('should return a empty string for empty section or null or undefined', () => {
            expect(getTag('')).toEqual('');
            expect(getTag()).toEqual('');
            expect(getTag(null)).toEqual('');
        });
    });

    describe('Test - transformedFilterNames', () => {
        it('should return the transformed name for a known filter', () => {
            expect(transformedFilterNames('7')).toBe('Recetas');
            expect(transformedFilterNames('Notas')).toBe('4');
        });

        it('should return the original name of a filter other than note or recipe', () => {
            const filter = 'Pollo';
            expect(transformedFilterNames(filter)).toBe(filter);
        });
    });

    describe('checkStateCheckbox', () => {
        it('should update the checked state based on filters', () => {
            const checkboxes = [{ key: '1' }, { key: '2' }];
            const filters = { section: ['1'] };

            const result = checkStateCheckbox({
                checkboxes,
                group: 'diet',
                filters
            });

            expect(result).toEqual([
                { key: '1', checked: true },
                { key: '2', checked: false }
            ]);
        });

        it('should handle empty filters', () => {
            const checkboxes = [{ key: '1' }];
            const filters = {};

            const result = checkStateCheckbox({
                checkboxes,
                group: 'section',
                filters
            });

            expect(result).toEqual([{ key: '1', checked: false }]);
        });
    });
});
