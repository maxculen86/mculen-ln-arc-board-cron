import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

const GAME_LAYOUT_RULES = {
    'LN10-Home_Main': ['fourVertical', 'oneHorizontalThreeVertical'],
    'LN-acumulado': [
        'fourVertical',
        'oneLargeFourSmall',
        'twoHorizontal',
        'oneHorizontalThreeVertical'
    ],
    'LN-nota-infografia': ['fourVertical']
};

const DIAGRAMATION_ITEM_LIMITS = {
    oneHorizontalThreeVertical: 4,
    oneLargeFourSmall: 5
};

const MIN_DIAGRAMATION_ITEMS = {
    fourVertical: 4,
    twoHorizontal: 2
};

export const validateGamesChain = (
    layout = '',
    customFields = {},
    gameItems = [],
    contentLabel = 'juego'
) => {
    const { layout: selectedDiagramation } = customFields;

    const minItemsRequired =
        DIAGRAMATION_ITEM_LIMITS[selectedDiagramation] ||
        MIN_DIAGRAMATION_ITEMS[selectedDiagramation];

    const rules = [
        {
            validation: !selectedDiagramation,
            message: 'Se requiere que seleccione una diagramación'
        },
        {
            validation:
                !GAME_LAYOUT_RULES[layout]?.includes(selectedDiagramation),
            message: 'Esta diagramación no está permitida en este layout'
        },
        {
            validation: gameItems.length < minItemsRequired,
            message: `Se requiere la carga de ${minItemsRequired - gameItems.length} ${contentLabel}${minItemsRequired - gameItems.length > 1 ? 's' : ''}`
        }
    ];

    return pageBuilderValidator(rules);
};
