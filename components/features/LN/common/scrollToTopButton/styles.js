import { cva } from '@ln/ds-cva';

export const containerClassname = cva('sticky z-10 w-40 h-40', {
    variants: {
        template: {
            cards: 'grid col-start-8 justify-self-end row-start-3 top-[calc(100svh-140px)] xl:top-[calc(100svh-110px)] md:col-span-12 xl:col-span-15 md:w-60 md:h-60',
            others: 'ml-auto mb-16 top-60 md:top-110'
        }
    }
});

export const buttonClassname = cva(
    'flex flex-col w-40 h-40 bg-neutral-1 border-1',
    {
        variants: {
            template: {
                cards: 'p-8 md:w-60 md:h-60 gap-y-4',
                others: 'p-4 gap-y-2'
            }
        }
    }
);

export const textButtonClassname = cva('uppercase', {
    variants: {
        template: {
            cards: 'text-14 hidden md:block',
            others: 'text-10'
        }
    }
});
