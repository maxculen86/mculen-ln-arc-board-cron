import { cva } from '@ln/ds-cva';
import { HEADER_VARIANTS } from './constants';

const defaultVariants = {
    position: HEADER_VARIANTS.POSITION.DEFAULT
};

export const wrapperHeaderVariants = cva(
    'z-20 text-base-default font-secondary',
    {
        variants: {
            position: {
                [HEADER_VARIANTS.POSITION.DEFAULT]: '',
                [HEADER_VARIANTS.POSITION.STICKY]: 'xl:sticky top-0'
            }
        },
        defaultVariants
    }
);

export const wrapperMainHeaderVariants = cva(
    'bg-neutral-1 border-b border-muted',
    {
        variants: {
            position: {
                [HEADER_VARIANTS.POSITION.DEFAULT]:
                    'justify-center py-16 md:py-24 h-64 md:h-96',
                [HEADER_VARIANTS.POSITION.STICKY]: 'py-8'
            }
        },
        defaultVariants
    }
);

export const centerOptionsVariants = cva(
    'flex relative justify-center items-center w-152 h-16 ',
    {
        variants: {
            position: {
                [HEADER_VARIANTS.POSITION.DEFAULT]:
                    'md:w-304 md:h-32 xl:w-380 xl:h-40',
                [HEADER_VARIANTS.POSITION.STICKY]: 'md:w-228 md:h-24 '
            }
        },
        defaultVariants
    }
);
