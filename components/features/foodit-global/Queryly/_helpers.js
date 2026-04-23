import { getHighestPriorityTag } from '../common/utils/notaFooditHelper';

export const getQueryForFilters = (filters = {}) => {
    const categorysGroup = Object.keys(filters).join('|');
    const filtersGroup = Object.keys(filters)
        .map(key => filters[key].map(value => `[${value}]`).join('^'))
        .join('|');
    if (categorysGroup && filtersGroup) {
        return `&facetedkey=${categorysGroup}&facetedvalue=${filtersGroup}`;
    }

    return '';
};

export const getCustomFiltersGroups = (sections = []) => {
    if (sections) {
        return sections.reduce(
            (acc, currentValue) => {
                const { key } = currentValue;
                const dietaSectionsGroup = [
                    'Vegetariana',
                    'Sin gluten',
                    'Keto',
                    'Sin lactosa',
                    'Vegana'
                ];
                const saladasSectionGroups = [
                    'Arroz',
                    'Tartas',
                    'Pollo',
                    'Pizza y empanadas',
                    'Pastas',
                    'Pescados',
                    'Carnes',
                    'Hamburguesas',
                    'Sopa',
                    'Salsas',
                    'Ensaladas'
                ];

                const dulcesSectionGroup = [
                    'Tortas',
                    'Postres',
                    'Panqueques',
                    'Budines',
                    'Helados',
                    'Batidos'
                ];

                const otherSectionGroup = [
                    'Fácil',
                    'Saludable',
                    'Bajo costo',
                    'Rápida',
                    'Bebidas',
                    'De autor'
                ];

                const currentElementTransformed = {
                    ...currentValue,
                    facetedKey: 'section'
                };

                if (dietaSectionsGroup.includes(key)) {
                    acc.diet.push(currentElementTransformed);
                }

                if (saladasSectionGroups.includes(key)) {
                    acc.salty.push(currentElementTransformed);
                }

                if (dulcesSectionGroup.includes(key)) {
                    acc.sweets.push(currentElementTransformed);
                }

                if (otherSectionGroup.includes(key)) {
                    acc.others.push(currentElementTransformed);
                }

                return acc;
            },
            { diet: [], salty: [], sweets: [], others: [] }
        );
    }

    return {};
};
export const transformListGroups = listFiltersGroups => {
    const {
        section,
        cookingtypes,
        // Se exceptua esta regla debido a que la API de Queryly espera el dato con guiones bajos.
        // eslint-disable-next-line camelcase
        main_ingredients,
        occasions,
        regions,
        subtype
    } = listFiltersGroups || {};

    const namesGroups = {
        subtype: 'Tipo de contenido',
        diet: 'Dieta',
        salty: 'Saladas',
        sweets: 'Dulces',
        others: 'Otros',
        main_ingredients: 'Ingrediente principal',
        cookingtypes: 'Tipo de cocción',
        regions: 'Región',
        occasions: 'Ocasión'
    };

    const customGroups = getCustomFiltersGroups(section);

    const resultGroups = {
        subtype,
        ...customGroups,
        // Se exceptua esta regla debido a que la API de Queryly espera el dato con guiones bajos.
        // eslint-disable-next-line camelcase
        main_ingredients,
        cookingtypes,
        regions,
        occasions
    };

    return Object.entries(resultGroups).reduce((acc, currentValue) => {
        const [key, value = []] = currentValue || [];
        const name = namesGroups[key];
        if (name) {
            acc.push({
                name,
                childrens: value.map(checkbox => ({
                    ...checkbox,
                    checked: false
                })),
                group: key
            });
        }

        return acc;
    }, []);
};

export const getTag = (section = '') => {
    const tagList =
        section &&
        section.split('|').map(tag => ({
            name: tag
        }));

    return getHighestPriorityTag(tagList);
};

export const transformedFilterNames = (filterName = '') => {
    const configSubtypesValues = {
        7: 'Recetas',
        4: 'Notas',
        Recetas: '7',
        Notas: '4'
    };

    return configSubtypesValues[filterName] || filterName;
};

export const checkStateCheckbox = ({
    checkboxes = [],
    group = '',
    filters = {}
}) => {
    const customFilterGroupName = ['diet', 'salty', 'sweets', 'others'];

    return checkboxes.map(filter => {
        const valuesGroup = customFilterGroupName.includes(group)
            ? 'section'
            : group;

        return {
            ...filter,
            checked: filters[valuesGroup]?.includes(`${filter.key}`) || false
        };
    });
};
