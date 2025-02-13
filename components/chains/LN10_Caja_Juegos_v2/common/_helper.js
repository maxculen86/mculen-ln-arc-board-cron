import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

const GAME_LAYOUT_RULES = {
    'LN10-Home_Main': ['fourVertical', 'oneHorizontalThreeVertical'],
    'LN-acumulado': ['fourVertical', 'oneLargeFourSmall', 'twoHorizontal']
};

export const validateGamesChain = (layout = '', customFields = {}) => {
    const { layout: selectedDiagramation } = customFields;

    const rules = [
        {
            validation: !selectedDiagramation,
            message: 'Se requiere que seleccione una diagramación'
        },
        {
            validation:
                !GAME_LAYOUT_RULES[layout]?.includes(selectedDiagramation),
            message: 'Esta diagramación no está permitida en este layout'
        }
    ];

    return pageBuilderValidator(rules);
};
