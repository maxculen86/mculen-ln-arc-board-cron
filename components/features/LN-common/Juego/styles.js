import { cva } from '@ln/cva';

export const cardDiagramationVariant = cva('grid', {
    variants: {
        variant: {
            oneLargeFourSmall:
                'grid-cols-12_m grid-rows_m oneLargeFourSmall gap-24',
            twoHorizontal: 'grid-cols-2_m grid-col-2_m gap-24',
            fourVertical: 'grid-cols-8 grid-cols-12_sm',
            oneHorizontalThreeVertical: 'grid-cols-12_m gap-24'
        },
        type: {
            podcast: '',
            game: ''
        }
    },
    compoundVariants: [
        {
            variant: ['oneLargeFourSmall', 'twoHorizontal', 'fourVertical'],
            type: 'podcast',
            className: 'gap-24 gap-32_lg'
        },
        {
            variant: 'fourVertical',
            type: 'game',
            className: 'gap-16 mb-32'
        }
    ],
    defaultVariants: {
        variant: 'fourVertical',
        type: 'game'
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
