import { cva } from '@ln/cva';

export const openingVideoMediaStyles = cva(
    [
        'opening-video-container',
        'bg-black',
        // 'h-100',
        'flex flex-column jc-start',
        'col-span-8'
    ],
    {
        variants: {
            variant: {
                vertical: [
                    'col-span-5_m',
                    'order-1_md',
                    'col-span-8',
                    'grid-col-7-10_l',
                    'max-h-642 max-h-478_md max-h-652_lg',
                    'ai-center',
                    'h-100'
                ],
                horizontal: [
                    'col-span-12_m col-span-8_l',
                    'order-1_l',
                    'ml-20_md',
                    'mt-24',
                    'mt-0_l',
                    'h-fit'
                ]
            }
        }
    }
);

export const videoStyles = cva(['opening-video', 'scroll-snap-stop-always'], {
    variants: {
        variant: {
            vertical: [
                'ratio-9-16',
                'h-100 max-h-642 max-h-478_md max-h-652_lg',
                'w-100 max-w-fit'
            ],
            horizontal: ['relative']
        }
    }
});

export const descriptionVariants = cva(
    [
        'opening-video-description',
        'flex flex-column',
        'gap-16',
        'text-neutral-light-1',
        'col-span-8',
        'mt-32'
    ],
    {
        variants: {
            variant: {
                vertical: [
                    'col-span-7_m',
                    'grid-col-2-7_l grid-col-3-7_lg',
                    'pr-16_md pr-32_l',
                    'jc-center_m',
                    'mt-0_m'
                ],
                horizontal: ['col-span-12_m col-span-4_l', 'pr-20_md', 'mt-0_l']
            }
        }
    }
);
