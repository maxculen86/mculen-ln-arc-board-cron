import { cva } from '@ln/ds-cva';

export const variantClassesContainer = cva('bg-brand-sal', {
    variants: {
        variant: {
            snackBarDefault:
                'w-full max-w-328 md:max-w-508 rounded-4 inline-flex fixed bottom-0 left-1/2 -translate-x-1/2 mb-16 z-7 shadow-lg justify-center items-center p-16 gap-8',
            snackBarDrawer: 'flex flex-col pt-24 pb-12 px-16 gap-12 mt-24'
        }
    },
    defaultVariants: {
        variant: 'snackBarDefault'
    }
});

export const variantClassesButton = cva('', {
    variants: {
        variant: {
            snackBarDefault: '',
            snackBarDrawer: 'flex gap-24 w-full justify-end'
        }
    },
    defaultVariants: {
        variant: 'snackBarDefault'
    }
});
