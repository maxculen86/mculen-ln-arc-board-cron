import { cva } from '@ln/cva';

const defaultVariant = 'vertical';

export const cardContainerVariants = cva(
    'flex relative overflow-hidden border-1 border-neutral-200 border-all',
    {
        variants: {
            variant: {
                vertical: 'aspect-9/16',
                horizontal: 'aspect-16/9'
            }
        },
        defaultVariants: {
            variant: defaultVariant
        }
    }
);

export const cardDescriptionVariants = cva(
    'flex flex-col w-full gap-16 absolute bottom-0 breark-word',
    {
        variants: {
            variant: {
                vertical: 'items-center px-16 pb-32',
                horizontal:
                    'items-start md:items-center max-md:h-full px-8 pt-8 md:pt-0 md:px-0 pb-16 md:pb-32'
            }
        },
        defaultVariants: {
            variant: defaultVariant
        }
    }
);

export const cardTitleVariants = cva('prumo prumo-semibold text-light-0', {
    variants: {
        variant: {
            vertical: 'text-center text-24',
            horizontal:
                'text-start max-md:pl-8 md:text-center text-18 leading-[130%] md:text-24'
        }
    },
    defaultVariants: {
        variant: defaultVariant
    }
});

export const cardBadgeVariants = cva(
    'bg-black rounded-16 uppercase z-1 text-[12px] px-8 py-6 text-white w-max',
    {
        variants: {
            variant: {
                vertical: '',
                horizontal: ''
            }
        },
        defaultVariants: {
            variant: defaultVariant
        }
    }
);
