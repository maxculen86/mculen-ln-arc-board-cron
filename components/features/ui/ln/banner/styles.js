import { cva, cx } from '@ln/ds-cva';

// Constantes de clases repetidas para evitar duplicación de código (SonarQube)
const HORIZONTAL_CENTER_OFFSET = '-translate-x-1/2 left-1/2';
const TABLET_FLEX = 'hidden md:flex';
const MOBILE_ONLY = 'md:hidden';
const RELATIVE_POSITION = 'relative';
const W_SCREEN = 'w-screen';
const DEFAULT_VARIANTS = {
    theme: 'light'
};

export const bannerPlaceholderVariants = {
    wrapper: cva(
        'absolute top-0 left-1/2 -translate-x-1/2 z-1 py-6 px-8 rounded-16',
        {
            variants: {
                theme: {
                    light: 'bg-neutral-1',
                    dark: 'bg-neutral-999'
                }
            },
            defaultVariants: DEFAULT_VARIANTS
        }
    ),
    text: cva('uppercase text-12 text-center leading-[130%]', {
        variants: {
            theme: {
                light: 'text-base-default',
                dark: 'text-neutral-1'
            }
        },
        defaultVariants: DEFAULT_VARIANTS
    })
};

export const bannerWrapperVariants = cva('ds-banner ds-banner-background', {
    variants: {
        theme: {
            light: '',
            dark: 'bg-neutral-999'
        },
        slotId: {
            cabezal_dsk: cx(
                RELATIVE_POSITION,
                'hidden xl:flex',
                W_SCREEN,
                HORIZONTAL_CENTER_OFFSET
            ),
            cabezal_tab: cx(
                RELATIVE_POSITION,
                'hidden md:flex xl:hidden',
                W_SCREEN,
                HORIZONTAL_CENTER_OFFSET
            ),
            sticky2_mob: cx(
                'flex md:hidden fixed left-0 top-0 z-1600',
                W_SCREEN
            ),
            cinturon1_dsk: cx(RELATIVE_POSITION, TABLET_FLEX),
            cinturon2_dsk: cx(RELATIVE_POSITION, TABLET_FLEX),
            cinturon3_dsk: cx(RELATIVE_POSITION, TABLET_FLEX),
            cinturon4_dsk: cx(RELATIVE_POSITION, TABLET_FLEX),
            caja1_mob: cx(RELATIVE_POSITION, MOBILE_ONLY),
            caja2_mob: cx(RELATIVE_POSITION, MOBILE_ONLY),
            caja3_mob: cx(RELATIVE_POSITION, MOBILE_ONLY),
            caja4_mob: cx(RELATIVE_POSITION, MOBILE_ONLY)
        }
    },
    defaultVariants: DEFAULT_VARIANTS
});
