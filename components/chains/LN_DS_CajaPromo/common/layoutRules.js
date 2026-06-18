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
            size: { default: 24 },
            orientation: { default: 'vertical', md: 'horizontal' }
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
    ]
};

const DEFAULT_RULE = { size: 24, orientation: 'vertical' };

export const getRuleForIndex = (layout, index) =>
    LAYOUT_RULES[layout]?.find(
        ({ range }) => index >= range[0] && index <= range[1]
    ) ?? DEFAULT_RULE;
