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
