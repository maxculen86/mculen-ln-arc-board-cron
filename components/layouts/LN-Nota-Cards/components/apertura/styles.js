import { cva } from '@ln/cva';

export const wrapperVariants = cva('flex ai-center mb-20', {
    variants: {
        layout: {
            twoLong: 'flex-column gap-8',
            twoShort: 'gap-16',
            other: 'gap-16'
        }
    },
    defaultVariants: {
        layout: 'other'
    }
});
