import { cva } from '@ln/cva';

const COL_SPAN_8 = 'col-span-8';

export const openingVideoMediaStyles = cva(
    ['opening-video-container', 'flex-column jc-start', COL_SPAN_8],
    {
        variants: {
            variant: {
                vertical: [
                    'col-span-5_m',
                    'order-1_md',
                    COL_SPAN_8,
                    'grid-col-7-10_l',
                    'max-h-642 max-h-478_md max-h-652_lg',
                    'ai-center',
                    'h-100',
                    'bg-black',
                    'mt-16_m mt-0_l',
                    'flex_m'
                ],
                horizontal: [
                    'col-span-12_m col-span-8_l',
                    'order-1_l',
                    'w-100vw_max767',
                    '-ml-16_max767',
                    'pl-20_l',
                    'mt-24',
                    'mt-0_l',
                    'h-fit',
                    'flex'
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
            horizontal: ['relative', 'bg-black']
        }
    }
});

export const descriptionVariants = cva(
    [
        'opening-video-description',
        'flex flex-column',
        'gap-16',
        'text-neutral-light-1',
        COL_SPAN_8,
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
