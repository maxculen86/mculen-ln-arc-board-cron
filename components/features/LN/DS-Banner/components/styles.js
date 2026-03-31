import { cva } from '@ln/ds-cva';

export const bannerPlaceholderVariants = cva('w-300 m-4', {
    variants: {
        theme: {
            light: 'bg-neutral-200',
            dark: 'bg-neutral-800 text-neutral-100',
            error: 'bg-error-default'
        }
    },
    defaultVariants: {
        theme: 'light'
    }
});
