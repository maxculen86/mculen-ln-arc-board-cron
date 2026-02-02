const HEADING_CONFIG = {
    defaults: {
        weight: '--font-extra',
        tag: 'h4',
        size: '--m'
    },
    variantsByLevel: new Map([
        [1, { tag: 'h2', size: '--xl' }],
        [2, { tag: 'h3', size: '--l' }],
        [4, { classCondition: 'underline' }]
    ])
};

export const getHeadingConfig = level => ({
    ...HEADING_CONFIG.defaults,
    ...HEADING_CONFIG.variantsByLevel.get(level)
});
