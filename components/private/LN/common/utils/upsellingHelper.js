const MULTIPRODUCT_COMBO_TYPES = ['ga-combo2', 'ga-ComboFoodit'];

const getGaComboTypeValues = (gaComboType = '') => {
    if (typeof gaComboType !== 'string') return [];

    return gaComboType
        .split(',')
        .map(comboType => comboType.trim())
        .filter(Boolean);
};

export const isMultiproductGaComboType = (gaComboType = '') => {
    const comboTypeValues = getGaComboTypeValues(gaComboType);

    return MULTIPRODUCT_COMBO_TYPES.every(comboType =>
        comboTypeValues.includes(comboType)
    );
};
