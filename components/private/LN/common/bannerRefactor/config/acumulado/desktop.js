import { defaultTargeting } from './defaults';

const PATH_SLOT = 'la_nacion_desktop/Acumulado';

export default {
    unoxuno_dsk: {
        slotName: `${PATH_SLOT}/1x1_dsk`,
        dimensions: [[1, 1]],
        targeting: defaultTargeting
    },
    cabezal_dsk: {
        slotName: `${PATH_SLOT}/cabezal_dsk`,
        dimensions: [[[1260, 100]], [[1260, 100]], [[728, 90]]],
        targeting: defaultTargeting,
        sizemap: {
            breakpoints: [
                [1920, 0],
                [1366, 0],
                [1024, 0]
            ]
        }
    },
    caja1_dsk: {
        slotName: `${PATH_SLOT}/caja1_dsk`,
        dimensions: [
            [
                [300, 600],
                [300, 250]
            ],
            [
                [300, 600],
                [300, 250]
            ],
            [
                [300, 600],
                [300, 250]
            ]
        ],
        targeting: defaultTargeting,
        sizemap: {
            breakpoints: [
                [1920, 0],
                [1366, 0],
                [1024, 0]
            ]
        }
    },
    caja2_dsk: {
        slotName: `${PATH_SLOT}/caja2_dsk`,
        dimensions: [[[300, 250]], [[300, 250]], [[300, 250]]],
        targeting: defaultTargeting,
        sizemap: {
            breakpoints: [
                [1920, 0],
                [1366, 0],
                [1024, 0]
            ]
        }
    },
    caja3_dsk: {
        slotName: `${PATH_SLOT}/caja3_dsk`,
        dimensions: [
            [
                [300, 600],
                [300, 250]
            ],
            [
                [300, 600],
                [300, 250]
            ],
            [
                [300, 600],
                [300, 250]
            ]
        ],
        targeting: defaultTargeting,
        sizemap: {
            breakpoints: [
                [1920, 0],
                [1366, 0],
                [1024, 0]
            ]
        }
    },
    caja4_dsk: {
        slotName: `${PATH_SLOT}/caja4_dsk`,
        dimensions: [[[300, 250]], [[300, 250]], [[300, 250]]],
        targeting: defaultTargeting,
        sizemap: {
            breakpoints: [
                [1920, 0],
                [1366, 0],
                [1024, 0]
            ]
        }
    }
};
