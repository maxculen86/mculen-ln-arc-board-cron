import { cx } from '@ln/ds-cva';

const baseClasses = 'font-w-extrabold font-primary';
const HEADING_CONFIG = {
    defaults: {
        tag: 'h4',
        className: 'font-primary font-w-extrabold text-20'
    },
    variantsByLevel: new Map([
        [
            1,
            {
                tag: 'h2',
                className: cx(baseClasses, 'text-32')
            }
        ],
        [
            2,
            {
                tag: 'h3',
                className: cx(baseClasses, 'text-20 md:text-24')
            }
        ],
        [
            4,
            {
                className: cx(baseClasses, 'underline')
            }
        ]
    ])
};

export const getHeadingConfig = level => ({
    ...HEADING_CONFIG.defaults,
    ...HEADING_CONFIG.variantsByLevel.get(level)
});
