import { cva } from '@ln/ds-cva';

export const headingVariants = cva('font-primary', {
    variants: {
        level: {
            1: 'font-w-bold text-subheading-lg',
            2: 'text-subheading-lg',
            3: 'font-w-bold text-subheading-md',
            4: 'text-subheading-md',
            5: 'font-w-bold text-subheading-sm underline',
            6: 'text-subheading-lg underline'
        },
        alignment: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right'
        }
    },
    defaultVariants: {
        level: 4,
        alignment: 'left'
    }
});
