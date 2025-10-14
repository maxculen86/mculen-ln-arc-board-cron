// const LOGO_NONE = '--logo none';

export const bannerConfigurations = [
    // ========================================================================
    // BANNER 1/43: megatopDsk
    // ========================================================================
    {
        key: 'megatopDsk',
        slotId: 'megatop_dsk',
        classes: '--megatop',
        isStatic: true
    },
    // ========================================================================
    //  BANNER 2/43: commercialDsk
    // ========================================================================
    {
        key: 'comercialDsk',
        slotId: 'comercial_dsk',
        classes: '--comercial none',
        closeButton: true
    },
    // ========================================================================
    // BANNER 3/43: adhesionDsk
    // ========================================================================
    {
        key: 'adhesionDsk',
        slotId: 'adhesion_dsk',
        classes: `--adhesion_dsk --fixed --close none`,
        hideForSubscriptor: true,
        closeButton: true
    }
];
