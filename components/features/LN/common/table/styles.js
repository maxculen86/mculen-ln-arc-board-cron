import { cva } from '@ln/ds-cva';

export const cellVariants = cva('align-middle [&_i]:italic', {
    variants: {
        isSticky: {
            true: 'sticky left-0 z-20 w-160 min-w-160',
            false: 'min-w-148'
        },
        align: {
            left: '',
            center: '',
            right: ''
        }
    },
    compoundVariants: [
        {
            isSticky: false,
            align: 'start',
            className: 'md:min-w-200'
        }
    ]
});
