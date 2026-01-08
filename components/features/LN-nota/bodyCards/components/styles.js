import { cva } from '@ln/cva';

export const cardVariant = cva('', {
    variants: {
        variant: {
            collapsed: 'linked-summary-card-small flex flex-column grid-col-4',
            expanded: ''
        }
    },
    defaultVariants: {
        variant: 'collapsed'
    }
});

export const cardsContainerVariant = cva(
    'flex flex-column ai-center as-stretch ',
    {
        variants: {
            variant: {
                collapsed:
                    'text-center shadow-card-template transition-regular shadow-card-template__hover bg-cards-nota rounded-4 border border-all border-1 border-neutral-light-100 gap-8 p-12 p-24_m flex-grow-1 h-100 w-300_min1366',
                expanded: 'expanded-card gap-16 gap-24_m'
            }
        }
    }
);

export const cardsNumberVariant = cva(
    'prumo prumo-black prumo-slab text-display-sm',
    {
        variants: {
            variant: {
                collapsed: '',
                expanded: 'text-center leading-none'
            }
        },
        defaultVariants: {
            variant: 'collapsed'
        }
    }
);

export const cardsTitleVariant = cva('prumo prumo-slab text-center', {
    variants: {
        variant: {
            collapsed: 'text-18 prumo-semibold leading-[130%] md:text-20',
            expanded: 'text-subheading-lg prumo-bold'
        }
    },
    defaultVariants: {
        variant: 'collapsed'
    }
});
