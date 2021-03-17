import { defaultTargeting } from './defaults';

const PATH_SLOT = 'la_nacion_desktop/Acumulado';

export default {
    megatop_dsk: {
        slotName: `${PATH_SLOT}/megatop_dsk`,
        dimensions: [[800, 600]],
        targeting: defaultTargeting
    },
    unoxuno_dsk: {
        slotName: `${PATH_SLOT}/1x1_dsk`,
        dimensions: [[1, 1]],
        targeting: defaultTargeting
    },
    cabezal_dsk: {
        slotName: `${PATH_SLOT}/cabezal_dsk`,
        dimensions: [
            [1, 1],
            [728, 90],
            [920, 100],
            [970, 90],
            [1260, 100]
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
        dimensions: [
            [300, 600],
            [300, 250]
        ],
        targeting: defaultTargeting
    },
    caja2_dsk: {
        slotName: `${PATH_SLOT}/caja2_dsk`,
        dimensions: [
            [300, 250],
            [300, 250],
            [300, 250]
        ],
        targeting: defaultTargeting
    },
    caja3_dsk: {
        slotName: `${PATH_SLOT}/caja3_dsk`,
        dimensions: [
            [300, 600],
            [300, 250]
        ],
        targeting: defaultTargeting
    },
    caja4_dsk: {
        slotName: `${PATH_SLOT}/caja4_dsk`,
        dimensions: [
            [300, 600],
            [300, 250]
        ],
        targeting: defaultTargeting
    },
    caja1_amp: {
        slotName: '/133919216/AMP/ROS/caja1_amp',
        dimensions: {
            width: 300,
            height: 250
        }
    },
    caja2_amp: {
        slotName: '/133919216/AMP/ROS/caja2_amp',
        dimensions: {
            width: 300,
            height: 250
        }
    },
    caja3_amp: {
        slotName: '/133919216/AMP/ROS/caja3_amp',
        dimensions: {
            width: 320,
            height: 50
        }
    }
};
