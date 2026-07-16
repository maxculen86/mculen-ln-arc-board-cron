import { cva, cx } from '@ln/ds-cva';

const CONTAINER_CENTERED = 'm-auto max-w-835 px-24';

export const openingImage100Variants = {
    wrapper: cva('w-full max-w-1366 absolute z-10', {
        variants: {
            variant: {
                below: 'left-1/2 -translate-x-1/2 text-center bottom-0 mb-40 md:mb-80',
                above: 'left-1/2 -translate-x-1/2 top-0 text-center mt-40 md:mt-80',
                left: '-translate-y-1/2 top-1/2 m-auto',
                centered:
                    'left-1/2 -translate-x-1/2 top-1/2 transform -translate-y-1/2 text-center'
            }
        }
    }),
    container: cva(`flex flex-col gap-12`, {
        variants: {
            variant: {
                below: CONTAINER_CENTERED,
                above: CONTAINER_CENTERED,
                left: 'max-w-550 px-16 md:pr-0 md:pl-24 md:max-w-635 xl:pl-32 lg:pr-0 2xl:pl-64',
                centered: CONTAINER_CENTERED
            }
        }
    }),
    addons: cva('', {
        variants: {
            variant: {
                left: 'items-start mr-auto'
            }
        }
    })
};

export const sectionHeight = cx(
    'h-[calc(100vh-var(--header-sticky-height)-var(--header-navbar-height)-48px)]',
    'md:h-[calc(100vh-var(--header-sticky-height)-var(--header-navbar-height))]',
    'xl:h-[calc(100vh-var(--header-sticky-height))]'
);

export const BASE_COVER_CLASS = 'w-full h-full object-cover';
export const OPACITY_CLASS = 'opacity-60';
