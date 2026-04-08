import { cva } from '@ln/ds-cva';
import { VARIANTS } from './_helpers';

export const containerClassname = cva(
    'relative flex items-center justify-between gap-24 py-32 px-16 md:p-32',
    {
        variants: {
            variant: {
                [VARIANTS.Blanco]: '',
                [VARIANTS.Negro]:
                    'bg-[url("/pf/resources/images/ln-fondo-radio-negro.webp")]',
                [VARIANTS.Amarillo]:
                    'bg-[url("/pf/resources/images/ln-fondo-radio-amarillo.webp")]'
            }
        },
        defaultVariants: 'fondo-blanco'
    }
);

export const titleClassname = cva('hidden md:block text-body-lg', {
    variants: {
        variant: {
            [VARIANTS.Blanco]: 'font-bold',
            [VARIANTS.Negro]: 'text-neutral-1',
            [VARIANTS.Amarillo]: 'font-bold'
        }
    }
});

export const buttonClassname = cva(
    'rounded-80 text-12 md:text-16 z-10 px-16 py-12',
    {
        variants: {
            variant: {
                [VARIANTS.Blanco]: 'bg-black-default text-ln-radio',
                [VARIANTS.Negro]: 'bg-[#D6E903] text-base-default',
                [VARIANTS.Amarillo]: 'bg-black-default text-ln-radio'
            }
        },
        defaultVariants: 'fondo-blanco'
    }
);
