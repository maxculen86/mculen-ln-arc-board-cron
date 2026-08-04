import { cva } from '@ln/ds-cva';

export const bulletVariants = cva('', {
    variants: {
        brand: {
            none: 'text-neutral-200',
            economia: 'text-comunidad-de-negocios-lighten',
            propiedades: 'text-propiedades-lighten',
            salud: 'text-bienestar-lighten',
            autos: 'text-movilidad-lighten',
            campo: 'text-campo-lighten',
            futuria: 'text-futuria-lighten',
            'que-sale': 'text-que-sale-lighten',
            deportes: 'text-deportes-lighten',
            living: 'text-living-lighten',
            jardin: 'text-jardin-lighten',
            hola: 'text-hola-lighten',
            lugares: 'text-lugares-lighten'
        }
    },
    defaultVariants: {
        brand: 'none'
    }
});
