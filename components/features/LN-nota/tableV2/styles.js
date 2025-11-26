import { cva } from '@ln/cva';

export const cellVariants = cva(
    ['text-start', 'p-8', 'h-100', 'border border-2 border-neutral-light-1'],
    {
        variants: {
            variant: {
                header: [
                    'header-cell',
                    'bg-muted',
                    'text-16',
                    'font-bold',
                    'text-neutral-light-800',
                    'min-w-148 min-w-200_md'
                ],
                body: ['body-cell', 'text-14']
            },
            withBg: {
                true: 'bg-neutral-light-50'
            },
            withBorderRight: {
                true: 'border-right'
            },
            withBorderLeft: {
                true: 'border-left'
            }
        },
        compoundVariants: [
            {
                variant: 'body',
                withBg: true,
                className: ''
            }
        ],
        defaultVariants: {
            variant: 'body',
            withBg: false,
            withBorderRight: true,
            withBorderLeft: true
        }
    }
);
