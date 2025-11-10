import { cva } from '@ln/cva';

export const dateVariants = cva(['date-time', 'flex ai-center'], {
    variants: {
        variant: {
            dark: 'text-neutral-light-700',
            light: 'text-neutral-light-1'
        }
    },
    defaultVariants: {
        variant: 'dark'
    }
});
