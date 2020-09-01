import { defaultTargeting } from './defaults';

const PATH_SLOT = 'la_nacion_mobile/Acumulado';

export default {
    sticky1_mob: {
        slotName: `${PATH_SLOT}/sticky1_mob`,
        dimensions: [[[320, 50]], [[320, 50]]],
        targeting: defaultTargeting,
        sizemap: {
            breakpoints: [
                [360, 0],
                [320, 0]
            ]
        }
    },
    sticky2_mob: {
        slotName: `${PATH_SLOT}/sticky2_mob`,
        dimensions: [[[300, 50]], [[300, 50]]],
        targeting: defaultTargeting,
        sizemap: {
            breakpoints: [
                [360, 0],
                [320, 0]
            ]
        }
    },
    caja1_mob: {
        slotName: `${PATH_SLOT}/caja1_mob`,
        dimensions: [
            [
                [300, 450],
                [300, 250]
            ],
            [
                [300, 450],
                [300, 250]
            ]
        ],
        targeting: defaultTargeting,
        sizemap: {
            breakpoints: [
                [360, 0],
                [320, 0]
            ]
        }
    },
    caja2_mob: {
        slotName: `${PATH_SLOT}/caja2_mob`,
        dimensions: [
            [
                [300, 450],
                [300, 250]
            ],
            [
                [300, 450],
                [300, 250]
            ]
        ],
        targeting: defaultTargeting,
        sizemap: {
            breakpoints: [
                [360, 0],
                [320, 0]
            ]
        }
    },
    caja3_mob: {
        slotName: `${PATH_SLOT}/caja3_mob`,
        dimensions: [
            [
                [300, 450],
                [300, 250]
            ],
            [
                [300, 450],
                [300, 250]
            ]
        ],
        targeting: defaultTargeting,
        sizemap: {
            breakpoints: [
                [360, 0],
                [320, 0]
            ]
        }
    },
    caja4_mob: {
        slotName: `${PATH_SLOT}/caja4_mob`,
        dimensions: [
            [
                [300, 450],
                [300, 250]
            ],
            [
                [300, 450],
                [300, 250]
            ]
        ],
        targeting: defaultTargeting,
        sizemap: {
            breakpoints: [
                [360, 0],
                [320, 0]
            ]
        }
    }
};
