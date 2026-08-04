import config from '../../../../properties/sites/la-nacion-ar';

const { layoutsName = {} } = config || {};

export const LAYOUT_RULES = {
    oneLargeFourSmall: [
        {
            range: [0, 0],
            size: { default: 24, md: 32 },
            orientation: 'vertical'
        },
        {
            range: [1, 4],
            size: { default: 18, md: 24 },
            orientation: 'vertical'
        }
    ],
    twoHorizontal: [
        {
            range: [0, 1],
            size: { default: 18, md: 24 },
            orientation: 'horizontal'
        }
    ],
    fourVertical: [
        {
            range: [0, 3],
            size: { default: 18 },
            orientation: 'vertical'
        }
    ],
    oneHorizontalThreeVertical: [
        {
            range: [0, 0],
            size: { default: 24 },
            orientation: { default: 'vertical', md: 'horizontal' }
        },
        {
            range: [1, 3],
            size: { default: 18 },
            orientation: { default: 'horizontal', md: 'vertical' },
            clampTitle: true
        }
    ],
    threeVertical: [
        {
            range: [0, 2],
            size: { default: 24, md: 32 },
            orientation: 'vertical'
        }
    ],
    oneHorizontal: [
        {
            range: [0, 0],
            size: { default: 32 },
            orientation: { default: 'vertical', md: 'horizontal' }
        }
    ]
};

export const PAGE_OVERRIDES = {
    [layoutsName.Acumulado]: {
        fourVertical: [
            {
                range: [0, 3],
                size: { default: 18, md: 24 },
                orientation: 'vertical'
            }
        ]
    }
};

const DEFAULT_RULE = { size: 24, orientation: 'vertical' };

const getRules = (diagramation, pageLayout) =>
    PAGE_OVERRIDES[pageLayout]?.[diagramation] ?? LAYOUT_RULES[diagramation];

export const getRuleForIndex = (diagramation, index, pageLayout) =>
    getRules(diagramation, pageLayout)?.find(
        ({ range }) => index >= range[0] && index <= range[1]
    ) ?? DEFAULT_RULE;
