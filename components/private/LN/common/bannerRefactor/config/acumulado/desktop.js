import { defaultTargeting } from './defaults';

const PATH_SLOT = 'la_nacion_desktop/Acumulado';

const DIMENSIONS_CAJA = [
    [300, 600],
    [160, 600],
    [120, 600],
    [300, 250]
];

export default {
    '1x1_dsk': {
        slotName: `${PATH_SLOT}/1x1_dsk`,
        dimensions: [[1, 1]],
        targeting: defaultTargeting
    },
    cabezal_dsk: {
        slotName: `${PATH_SLOT}/cabezal_dsk`,
        dimensions: [
            [1260, 170],
            [920, 170],
            [920, 100],
            [970, 90],
            [728, 90],
            [1, 1]
        ],
        targeting: defaultTargeting
    },
    adhesion_dsk: {
        slotName: `${PATH_SLOT}/adhesion_dsk`,
        dimensions: [
            [920, 100],
            [728, 90]
        ],
        targeting: defaultTargeting
    },
    caja1_dsk: {
        slotName: `${PATH_SLOT}/caja1_dsk`,
        dimensions: DIMENSIONS_CAJA,
        targeting: defaultTargeting
    },
    caja2_dsk: {
        slotName: `${PATH_SLOT}/caja2_dsk`,
        dimensions: DIMENSIONS_CAJA,
        targeting: defaultTargeting
    },
    caja3_dsk: {
        slotName: `${PATH_SLOT}/caja3_dsk`,
        dimensions: DIMENSIONS_CAJA,
        targeting: defaultTargeting
    },
    caja4_dsk: {
        slotName: `${PATH_SLOT}/caja4_dsk`,
        dimensions: DIMENSIONS_CAJA,
        targeting: defaultTargeting
    }
};
