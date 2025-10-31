import { cva } from '@ln/cva';

export const cardVariant = cva('', {
    variants: {
        variant: {
            collapsed: 'linked-summary-card-small grid-col-4 flex',
            expanded: ''
        }
    },
    defaultVariants: {
        variant: 'collapsed'
    }
});

export const cardsContainerVariant = cva(
    'bg-neutral-light-50 border border-1 border-all border-neutral-light-100 bg-neutral-light-100__hover transition transition-ease-in transition-duration-500',
    {
        variants: {
            variant: {
                collapsed: 'flex-grow-1',
                expanded: 'expanded-card'
            }
        }
    }
);

export const cardsPaddingVariant = cva('flex flex-column ai-center', {
    variants: {
        variant: {
            collapsed: 'py-24 px-8 h-100 as-stretch px-16_min512',
            expanded: 'px-16 pt-24 pb-32 p-40_m'
        }
    }
});

export const cardsNumberVariant = cva('prumo prumo-black text-56_md', {
    variants: {
        variant: {
            collapsed: 'text-32',
            expanded: 'text-34'
        }
    },
    defaultVariants: {
        variant: 'collapsed'
    }
});

export const cardsTitleVariant = cva(
    'prumo --prumo --font-semi mb-24 text-center tracking-none',
    {
        variants: {
            variant: {
                collapsed: 'text-18 text-20_md',
                expanded: ' text-24 text-28_md'
            }
        },
        defaultVariants: {
            variant: 'collapsed'
        }
    }
);
