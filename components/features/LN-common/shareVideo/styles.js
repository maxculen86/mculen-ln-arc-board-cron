import { cva } from '@ln/cva';

const RATIO_9_16 = 'ratio-9-16';
const RATIO_16_9 = 'ratio-16-9';

export const carouselVideoExpandedClasses = cva(
    ['carousel-video-expanded', 'w-100', 'h-100dvh'],
    {
        variants: {
            variant: {
                horizontal: [
                    'grid',
                    'grid-cols-8',
                    'grid-cols-12_m',
                    'grid-cols-16_lg',
                    'w-100',
                    'max-w-1366',
                    'mx-auto',
                    'px-16',
                    'px-24_m',
                    'px-32_l'
                ],
                vertical: ['flex', 'jc-center', 'ai-center']
            }
        }
    }
);

export const videoShareClasses = cva(
    ['video-share', 'w-100', 'js-center', 'flex', 'relative', 'h-100dvh'],
    {
        variants: {
            variant: {
                vertical: ['vertical', 'w-fit_md', 'py-16_m', RATIO_9_16],
                horizontal: [
                    'horizontal',
                    'max-w-100dvw',
                    'grid-col-8',
                    'grid-col-12_m',
                    'grid-col-3-15_lg',
                    'gap-16_lg',
                    RATIO_16_9,
                    'jc-center',
                    'flex-column',
                    'relative'
                ]
            }
        }
    }
);

export const shareVideoClasses = cva(
    ['share-video', 'w-100', 'z-1', 'bg-none_lg', 'absolute'],
    {
        variants: {
            variant: {
                vertical: [
                    'top-0',
                    'left-0',
                    'py-8',
                    'mt-16_m',
                    'bg-gradient-dark'
                ],
                horizontal: [
                    'flex',
                    'jc-between',
                    'ai-center',
                    'bottom-100',
                    'h-fit',
                    'top-16'
                ]
            }
        }
    }
);

export const videoShareMediaClasses = cva(
    ['video-share-media', 'flex', 'flex-column', 'w-100', 'ai-center'],
    {
        variants: {
            variant: {
                vertical: [RATIO_9_16, 'jc-center', 'h-100'],
                horizontal: [RATIO_16_9, 'max-w-100dvw']
            }
        }
    }
);

export const buttonShowPlayerClasses = cva(
    ['button-show-player', 'p-0', 'w-100', 'h-100', 'h-fit', 'relative'],
    {
        variants: {
            variant: {
                vertical: [RATIO_9_16],
                horizontal: [RATIO_16_9]
            }
        }
    }
);

export const videoShareButtonClasses = cva(
    [
        'video-share-button',
        'flex',
        'ai-center',
        'rounded-4',
        'gap-8',
        'w-max',
        'py-8',
        'px-16',
        'text-white',
        'relative',
        'font-bold'
    ],
    {
        variants: {
            variant: {
                vertical: ['left--130_lg'],
                horizontal: []
            }
        }
    }
);
