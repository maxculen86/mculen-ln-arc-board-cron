import { cva } from '@ln/ds-cva';
import { HEADER_VARIANTS } from './constants';

const defaultVariants = {
    position: HEADER_VARIANTS.POSITION.DEFAULT,
    appearance: HEADER_VARIANTS.APPEARANCE.LIGHT_THEME
};

// TODO: ajustar o quitar clases de variante negativa cuando este dark-theme implementado en el DS.

export const wrapperHeaderVariants = cva('z-20', {
    variants: {
        position: {
            default: '',
            sticky: 'sticky top-0'
        },
        appearance: {
            light: 'bg-primary-foreground',
            dark: ''
        }
    },
    defaultVariants
});

export const wrapperMainHeaderVariants = cva('', {
    variants: {
        position: {
            default: 'justify-center py-16 md:py-24 h-64 md:h-96',
            sticky: 'py-8'
        },
        appearance: {
            light: 'bg-neutral-1 border-b border-muted',
            dark: ''
        }
    },
    defaultVariants
});

export const centerOptionsVariants = cva(
    'flex relative justify-center items-center w-152 h-16 ',
    {
        variants: {
            position: {
                default: 'md:w-304 md:h-32 xl:w-380 xl:h-40',
                sticky: 'md:w-228 md:h-24 '
            },
            appearance: {
                light: '',
                dark: ''
            }
        },
        defaultVariants
    }
);
