import { cva } from '@ln/cva';

export const cellVariants = cva(
    ['h-100', 'border border-2 border-neutral-light-1'],
    {
        variants: {
            variant: {
                header: [
                    'header-cell',
                    'bg-muted',
                    'text-16',
                    'font-bold',
                    'text-neutral-light-800'
                ],
                body: ['body-cell', 'text-14']
            },
            withBg: {
                true: 'bg-neutral-light-50',
                false: 'bg-light-0'
            },
            withBorderRight: {
                true: 'border-right'
            },
            withBorderLeft: {
                true: 'border-left'
            },
            isSticky: {
                true: ['sticky', 'left-0', 'w-160', 'min-w-160'],
                false: ['min-w-148']
            },
            isCentered: {
                true: ['vertical-align-middle', 'text-center', 'px-8', 'py-16'],
                false: ['vertical-align-top', 'text-start', 'p-8']
            }
        },
        compoundVariants: [
            {
                isSticky: false,
                isCentered: false,
                className: ['min-w-200_md']
            }
        ],
        defaultVariants: {
            variant: 'body',
            withBg: false,
            withBorderRight: true,
            withBorderLeft: true,
            isSticky: false
        }
    }
);
