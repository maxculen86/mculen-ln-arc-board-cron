import { cva } from '@ln/cva';

export const wrapperVariants = cva('ai-center', {
    variants: {
        layout: {
            twoLong: 'flex flex-column gap-8 twoLong',
            twoShort: 'grid grid-cols-1-auto-1 twoShort',
            other: 'flex gap-16 other'
        }
    },
    defaultVariants: {
        layout: 'other'
    }
});
