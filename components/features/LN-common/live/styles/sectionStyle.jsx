import { cva } from '@ln/cva';

export const sectionVariants = cva('flex', {
    variants: {
        section: {
            'pre-apertura': 'lay-container',
            apertura: 'w-100 max-w-1366 -mt-16 mx-auto p-0'
        }
    },
    defaultVariants: {
        section: 'pre-apertura'
    }
});
