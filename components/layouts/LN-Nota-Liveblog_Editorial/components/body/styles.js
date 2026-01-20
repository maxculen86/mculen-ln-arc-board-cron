import { cva } from '@ln/cva';

export const wrapperPostVariant = cva(
    '-ml-16 -mr-16 ml-0_m mr-0_m liveBlog_post min-w-0 max-w-100vw',
    {
        variants: {
            isPinned: {
                false: 'liveBlog_post--unpinned'
            }
        },
        defaultVariants: {
            isPinned: false
        }
    }
);

export const borderPostVariant = cva(
    'relative border border-all rounded-8_m shadow-post-md',
    {
        variants: {
            isPinned: {
                true: 'border-2_m border-danger-600_m bg-neutral-light-50',
                false: 'border-thin_m border-neutral-light-100_m'
            }
        },
        defaultVariants: {
            isPinned: false
        }
    }
);
