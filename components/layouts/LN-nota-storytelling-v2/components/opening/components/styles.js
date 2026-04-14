import { cva, cx } from '@ln/ds-cva';

const MB_CONTAINER = 'mb-40 md:mb-80';

export const openingImage100Variants = {
    wrapper: cva('w-full max-w-1366 absolute left-1/2 -translate-x-1/2 z-10', {
        variants: {
            variant: {
                below: 'text-center bottom-0 mb-80',
                above: 'top-0 text-center mt-32',
                left: '-translate-y-1/2 top-1/2 m-auto',
                centered: 'top-1/2 transform -translate-y-1/2 text-center'
            }
        }
    }),
    container: cva(`flex flex-col gap-8 ${MB_CONTAINER}`, {
        variants: {
            variant: {
                below: 'm-auto max-w-835 px-24',
                above: 'm-auto max-w-835 px-24',
                left: 'max-w-552 px-24 md:pr-24 md:pl-24',
                centered: 'm-auto max-w-835 px-24'
            }
        }
    }),
    addons: cva('', {
        variants: {
            variant: {
                left: 'items-start'
            }
        }
    })
};

export const sectionHeight = cx(
    'h-[calc(100dvh-var(--header-sticky-height)-var(--header-navbar-height))]',
    'xl:h-[calc(100dvh-var(--header-sticky-height))]'
);
