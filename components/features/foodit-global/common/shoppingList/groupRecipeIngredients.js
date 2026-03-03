/**
 * @typedef {Object} RecipeItem
 * @property {string} ingredient - Name of the ingredient
 * @property {string} [amount] - Amount of the ingredient
 * @property {string} [unit] - Unit of measurement
 * @property {string} [abbreviation] - Abbreviated unit
 * @property {boolean} isMainIngredient - Whether this is a main ingredient
 * @property {string} fullIngredientString - Complete ingredient string
 * @property {boolean} includeInShoppingList - Whether to include in shopping list
 */

/**
 * @typedef {Object} Recipe
 * @property {string} typeList - Type of recipe list
 * @property {RecipeItem[]} items - List of ingredients
 * @property {string} titleList - Title of the recipe section
 */

const SPECIAL_UNITS = {
    A_GUSTO: 'a gusto',
    CANTIDAD_NECESARIA: 'cantidad necesaria'
};

const pluralRules = {
    atado: 'atados',
    baya: 'bayas',
    bocha: 'bochas',
    'cda.': 'cdas.',
    'cdta.': 'cdtas.',
    filete: 'filetes',
    hoja: 'hojas',
    Lata: 'latas',
    paquete: 'paquetes',
    pizca: 'pizcas',
    rama: 'ramas',
    ramita: 'ramitas',
    rebanada: 'rebanadas',
    rodaja: 'rodajas',
    sobre: 'sobres',
    tournedo: 'tournedos',
    U: 'U'
};

const unitGroups = {
    weight: ['g', 'kg', 'gramo', 'kilogramo'],
    volume: ['ml', 'l', 'mililitro', 'litro']
};

// Utility functions
const parseFraction = fraction => {
    if (!fraction) return null;
    if (typeof fraction === 'number') return fraction;
    if (fraction.includes('/')) {
        const [num, denom] = fraction.split('/');
        return parseFloat(num) / parseFloat(denom);
    }
    return parseFloat(fraction);
};

const isQuantifiableUnit = unit =>
    unitGroups.weight.includes(unit.toLowerCase()) ||
    unitGroups.volume.includes(unit.toLowerCase());

const getPluralForm = (amount, unit) => {
    if (!unit) return '';
    if (isQuantifiableUnit(unit)) return unit;

    const parsedAmount = parseFraction(amount);
    if (parsedAmount <= 1) return unit;

    const singularForm = unit.toLowerCase();
    return pluralRules[singularForm] || unit;
};

// Helper functions for ingredient processing
const normalizeItem = item => ({
    ...item,
    normalizedName: item.ingredient?.trim().toLowerCase() || '',
    normalizedUnit: item.unit?.toLowerCase() || '',
    parsedAmount: parseFraction(item.amount),
    group: item.titleList || 'default'
});

const flattenAndNormalizeIngredients = recipeList =>
    recipeList.flatMap(recipe => (recipe.items || []).map(normalizeItem));

const groupByNormalizedName = ingredients =>
    ingredients.reduce((acc, curr) => {
        if (!curr.normalizedName) return acc;
        if (!acc[curr.normalizedName]) acc[curr.normalizedName] = [];
        acc[curr.normalizedName].push(curr);
        return acc;
    }, {});

const isAmountQuantifiable = item =>
    item.amount !== null && item.amount !== undefined && item.amount !== '';

const handleSpecialCases = items => {
    const specialCases = new Set(
        items
            .map(item => item.unit?.toLowerCase())
            .filter(unit =>
                [
                    SPECIAL_UNITS.A_GUSTO,
                    SPECIAL_UNITS.CANTIDAD_NECESARIA
                ].includes(unit)
            )
    );

    if (specialCases.size === 0) {
        return items[0]?.unit || '';
    }

    if (specialCases.size === 1) {
        return Array.from(specialCases)[0];
    }

    return `${SPECIAL_UNITS.A_GUSTO}/${SPECIAL_UNITS.CANTIDAD_NECESARIA}`;
};

const formatAmounts = items => {
    if (!items.length) return '';

    const quantifiableItems = items.filter(isAmountQuantifiable);
    if (!quantifiableItems.length) return handleSpecialCases(items);

    const groupedByUnit = quantifiableItems.reduce((acc, item) => {
        const unit = item.abbreviation || item.unit;
        if (!acc[unit]) acc[unit] = [];
        acc[unit].push(item);
        return acc;
    }, {});

    if (Object.keys(groupedByUnit).length === 0) {
        const specialCaseResult = handleSpecialCases(items);
        if (specialCaseResult) return specialCaseResult;
    }

    return Object.entries(groupedByUnit)
        .map(([unit, unitItems]) => {
            const totalAmount = unitItems.reduce(
                (sum, item) => sum + parseFraction(item.amount),
                0
            );
            return `${totalAmount} ${getPluralForm(totalAmount, unit)}`.trim();
        })
        .join(' + ');
};

/**
 * Groups and formats recipe ingredients
 * @param {Recipe[]} recipeList - List of recipes with their ingredients
 * @returns {Array<{name: string, displayAmount: string, group: string}>}
 */
export const groupRecipeIngredients = recipeList => {
    const allIngredients = flattenAndNormalizeIngredients(recipeList);
    const groupedByName = groupByNormalizedName(allIngredients);

    return Object.entries(groupedByName)
        .flatMap(([name, items]) => {
            const mandatory = items.filter(item => !item.isOptionalIngredient);
            const optional = items.filter(item => item.isOptionalIngredient);

            const createEntry = (groupItems, isOpt) => {
                // If we have any quantifiable items, they take precedence
                const quantifiableItems =
                    groupItems?.items?.filter(isAmountQuantifiable);
                const itemsToFormat =
                    quantifiableItems?.length > 0
                        ? quantifiableItems
                        : groupItems;
                const ingredientName =
                    groupItems.find(item => item.ingredient)?.ingredient ||
                    name;
                const suffix = isOpt ? ' (opcional)' : '';

                return {
                    name: ingredientName + suffix,
                    displayAmount: formatAmounts(itemsToFormat),
                    fullIngredientNameToCopy: `${formatAmounts(itemsToFormat)} de ${name}${suffix}`,
                    group:
                        groupItems.find(item => item.group)?.group || 'default'
                };
            };

            const result = [];
            if (mandatory.length > 0)
                result.push(createEntry(mandatory, false));
            if (optional.length > 0) result.push(createEntry(optional, true));

            return result;
        })
        .filter(
            (item, index, self) =>
                // Remove duplicates based on normalized name
                index ===
                self.findIndex(
                    el => el.name.toLowerCase() === item.name.toLowerCase()
                )
        );
};
