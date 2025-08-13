import { cva } from '@ln/cva';

export const cardDiagramationVariant = cva('grid', {
    variants: {
        variant: {
            oneLargeFourSmall:
                'grid-cols-12_m grid-rows_m oneLargeFourSmall gap-24 gap-32_lg',
            twoHorizontal: 'grid-cols-2_m grid-col-2_m gap-24 gap-32_lg',
            fourVertical: 'grid-cols-8 grid-cols-12_sm gap-24 gap-32_lg',
            oneHorizontalThreeVertical: 'grid-cols-12_m gap-16'
        }
    },
    defaultVariants: {
        variant: 'fourVertical'
    }
});

export const cardOrientation = cva('grid', {
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
