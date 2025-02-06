import { cva } from '@ln/cva';

export const cardDiagramationVariant = cva('grid gap-24', {
    variants: {
        variant: {
            oneLargeFourSmall: 'grid-cols-12_m grid-rows_m oneLargeFourSmall',
            twoHorizontal: 'grid-cols-2_m grid-col-2_m',
            fourVertical: 'grid-cols-4_m grid-col-2_m',
            oneHorizontalThreeVertical: 'grid-cols-12_m'
        }
    },
    defaultVariants: {
        variant: 'fourVertical'
    }
});

export const cardGameVariant = cva('grid', {
    variants: {
        horizontal: {
            true: 'col-span-6_m',
            false: 'col-span-2_m'
        }
    },
    defaultVariants: {
        horizontal: true
    }
});
