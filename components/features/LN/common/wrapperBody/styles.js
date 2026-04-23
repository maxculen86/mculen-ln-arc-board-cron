import { cva } from '@ln/ds-cva';

export const gridContentVariants = cva('col-span-8', {
    variants: {
        variant: {
            narrow: 'md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-5 max-w-550 md:max-w-635',
            medium: 'md:col-span-12 xl:col-span-10 xl:col-start-4 max-w-750',
            'full-screen':
                'md:col-span-12 xl:col-span-10 xl:col-start-4 w-screen'
        }
    }
});
