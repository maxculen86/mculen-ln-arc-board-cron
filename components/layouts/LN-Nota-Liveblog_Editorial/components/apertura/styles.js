import { cva } from '@ln/cva';

export const figCaptionVariants = cva('', {
    variants: {
        variant: {
            mobile: '--mobile-only',
            desktop: '--mobile-none border border-transparent text-light-400'
        }
    },
    defaultVariants: {
        variant: 'mobile'
    }
});
