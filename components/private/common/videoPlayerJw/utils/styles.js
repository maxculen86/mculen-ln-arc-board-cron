import { cva } from '@ln/cva';

export const videoPlayerVariant = cva(['video-player'], {
    variants: {
        variant: {
            vertical: 'w-100 ratio-9-16 flex jc-center ai-center h-640',
            horizontal: 'bg-black ratio-16-9'
        }
    },
    isOpening: {
        true: '',
        false: ''
    },
    isNotaVideo: {
        true: '',
        false: ''
    },
    defaultVariants: {
        variant: 'horizontal',
        isOpening: false,
        isNotaVideo: false
    },
    compoundVariants: [
        {
            variant: 'vertical',
            isOpening: true,
            isNotaVideo: true,
            className: 'h-478_md h-652_lg'
        },
        {
            variant: 'vertical',
            isOpening: false,
            className: 'w-320'
        }
    ]
});

export const mediaContainerVariant = cva(['media-container relative'], {
    variants: {
        variant: {
            vertical: 'w-100',
            horizontal: 'ratio-16-9'
        },
        isOpening: {
            true: '',
            false: 'mod-media'
        },
        isNotaVideo: {
            false: 'pb-32'
        }
    }
});

export const facadeContainerVariant = cva(['facade-container'], {
    variants: {
        variant: {
            horizontal: 'ratio-16-9',
            vertical: 'ratio-9-16'
        },
        isOpening: {
            true: 'w-100',
            false: 'w-320'
        }
    }
});
