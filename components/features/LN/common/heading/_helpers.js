import { cx } from '@ln/ds-cva';

const baseClasses = 'font-primary';
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
                className: cx(baseClasses, 'font-w-bold text-subheading-lg')
            }
        ],
        [
            2,
            {
                tag: 'h3',
                className: cx(baseClasses, 'text-subheading-lg')
            }
        ],
        [
            3,
            {
                className: cx(baseClasses, 'font-w-bold text-subheading-md')
            }
        ],
        [
            4,
            {
                className: cx(baseClasses, 'text-subheading-md')
            }
        ],
        [
            5,
            {
                className: cx(
                    baseClasses,
                    'font-w-bold text-subheading-sm underline'
                )
            }
        ],
        [
            6,
            {
                tag: 'h3',
                className: cx(baseClasses, 'text-subheading-lg underline')
            }
        ]
    ])
};

export const getHeadingConfig = level => ({
    ...HEADING_CONFIG.defaults,
    ...HEADING_CONFIG.variantsByLevel.get(level)
});
