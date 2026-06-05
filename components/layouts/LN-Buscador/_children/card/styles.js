import { cva } from '@ln/ds-cva';

export const cardContainer = cva(
    'hover:opacity-80 relative isolate col-span-8 md:col-span-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-default focus-visible:ring-offset-2',
    {
        variants: {
            variant: {
                regular: 'flex flex-row-reverse md:flex-col gap-12',
                highlights: ''
            }
        },
        defaultVariants: {
            variant: 'regular'
        }
    }
);

export const imageContainer = cva('', {
    variants: {
        variant: {
            regular:
                'w-126 h-126 shrink-0 md:w-full md:h-auto md:aspect-3/2 border border-neutral-200 overflow-hidden',
            highlights: 'aspect-3/2'
        },
        defaultVariants: {
            variant: 'regular'
        }
    }
});

export const imageStyles = cva('object-cover', {
    variants: {
        variant: {
            regular: 'block h-full w-full ',
            highlights: ''
        }
    },
    defaultVariants: {
        variant: 'regular'
    }
});

export const textContainer = cva('flex flex-col', {
    variants: {
        variant: {
            regular: 'flex-1 gap-12',
            highlights:
                'gap-16 pt-12 pb-16 px-responsive rounded-b-md bg-primary-default/15 justify-center'
        }
    },
    defaultVariants: {
        variant: 'regular'
    }
});

export const footerContainer = cva('', {
    variants: {
        variant: {
            regular: 'text-base-light flex flex-col gap-4',
            highlights: 'flex items-center gap-4 text-primary-default'
        }
    },
    defaultVariants: {
        variant: 'regular'
    }
});
