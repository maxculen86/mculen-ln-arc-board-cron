import { cva } from '@ln/cva';

export const tagVariant = cva('', {
    variants: {
        badge: {
            true: 'absolute right-4 top-10 min-h-24'
        },
        ribbon: {
            true: 'absolute right--3 top--2'
        }
    },
    defaultVariants: {
        variant: 'badge'
    }
});
