import { cva } from '@ln/cva';

export const mediaScrollerExpandedClasses = cva(
    ['media-scroller-expanded-container'],
    {
        variants: {
            variant: {
                vertical: ['flex', 'jc-center', 'ai-center', 'w-100_md'],
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
                ]
            }
        }
    }
);

const containerClassName = cva(
    [
        'jw-video-container',
        'hide-scrollbar',
        'scroll-snap-block-mandatory',
        'scroll-snap-inline-mandatory_md',
        'w-100_md',
        'grid_md',
        'grid-auto-flow-columm',
        'grid-auto-columns-100',
        'scroll-y-auto',
        'scroll-y-none_md',
        'scroll-x-auto_md'
    ],
    {
        variants: {
            variant: {
                vertical: [
                    'overscroll-bahavior-y-container',
                    'w-100vw',
                    'h-100dvh_max767'
                ],
                horizontal: [
                    'overscroll-bahavior-x-contain',
                    'grid-col-8',
                    'grid-col-12_m',
                    'grid-col-3-15_lg',
                    'gap-16_lg',
                    'overflow-hidden_md'
                ]
            }
        }
    }
);

const listItemClassName = cva(
    [
        'list-item-container',
        'scroll-snap-align-start',
        'scroll-snap-stop-always',
        'scroll-snap-align-center_md',
        'h-100dvh',
        'w-100',
        'js-center',
        'flex',
        'relative'
    ],
    {
        variants: {
            variant: {
                vertical: ['ratio-9-16', 'w-fit_md'],
                horizontal: [
                    'ratio-16-9',
                    'max-w-100dvw',
                    'bg-light-900',
                    'ai-center'
                ]
            }
        }
    }
);

const videoContainerClassName = cva(
    ['video-container', 'flex', 'h-100', 'w-100', 'relative'],
    {
        variants: {
            variant: {
                vertical: ['ratio-9-16', 'py-16_m'],
                horizontal: ['ratio-16-9', 'h-fit']
            }
        }
    }
);

const videoSocialContainerClassName = cva(
    ['video-social-container', 'w-100', 'absolute', 'z-10', 'mt-16_m'],
    {
        variants: {
            variant: {
                vertical: [
                    'vertical',
                    'top-0',
                    'bg-gradient-dark',
                    'bg-none_lg',
                    'py-8'
                ],
                horizontal: [
                    'horizontal',
                    'top-0',
                    'h-fit',
                    'flex',
                    'jc-between',
                    'ai-center'
                ]
            }
        }
    }
);

const closeClassNames = cva(
    ['close-button', 'py-8', 'px-16', 'text-white', 'relative_lg'],
    {
        variants: {
            variant: {
                vertical: ['left--130_lg']
            }
        }
    }
);

const sharebarClassNames = cva(['share-bar'], {
    variants: {
        variant: {
            vertical: ['absolute', 'top-0', 'right-0', 'right--55_lg'],
            horizontal: ['h-100']
        }
    }
});

const swipeClasses = cva(
    [
        'swipe-info',
        'flex',
        'flex-column',
        'ai-center',
        'w-100',
        'absolute',
        'py-8',
        'sm-only'
    ],
    {
        variants: {
            variant: {
                vertical: ['bottom-60', 'left-0'],
                horizontal: ['bottom-80']
            }
        }
    }
);

export const videoContainerExpandedClasses = variant => ({
    containerClassName: containerClassName({ variant }),
    listItemClassName: listItemClassName({ variant }),
    videoContainerClassName: videoContainerClassName({ variant }),
    videoSocialContainerClassName: videoSocialContainerClassName({ variant }),
    closeClassNames: closeClassNames({ variant }),
    sharebarClassNames: sharebarClassNames({ variant }),
    swipeClasses: swipeClasses({ variant })
});

export const arrowsClassNames = cva(
    ['arrow-button', 'bg-white', 'absolute', 'z-1', 'top-50'],
    {
        variants: {
            direction: {
                left: ['arrow-left_md'],
                right: ['arrow-right_md']
            }
        }
    }
);
