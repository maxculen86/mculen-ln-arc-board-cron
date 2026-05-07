import { cva } from '@ln/ds-cva';

export const sectionVariants = cva('flex', {
    variants: {
        section: {
            'pre-apertura': 'lay-container pl-8',
            apertura: 'w-100 max-w-1366 -mt-16 mx-auto p-0'
        }
    },
    defaultVariants: {
        section: 'pre-apertura'
    }
});
