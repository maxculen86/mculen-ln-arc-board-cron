import { cva } from '@ln/cva';

export const wrapperVariants = cva('flex items-center', {
    variants: {
        layout: {
            twoLong: 'flex-col gap-2',
            twoShort: 'gap-4',
            other: 'gap-4'
        }
    },
    defaultVariants: {
        layout: 'other'
    }
});
