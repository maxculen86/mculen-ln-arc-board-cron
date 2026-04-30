import { cva } from '@ln/ds-cva';

export const paragraphVariants = cva(
    'ds-custom-paragraph font-tertiary text-20 leading-[150%] tracking-[-0.1px]',
    {
        variants: {
            alignment: {
                left: 'text-left',
                center: 'text-center',
                right: 'text-right'
            },
            capital: {
                true: '',
                false: ''
            }
        },
        compoundVariants: [
            {
                capital: true,
                className: 'editorial-drop-cap'
            }
        ],
        defaultVariants: {
            alignment: 'left'
        }
    }
);
