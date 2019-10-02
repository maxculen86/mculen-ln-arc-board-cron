import { defaultTargeting } from './defaults';

const PATH_SLOT = 'la_nacion_mobile/Acumulado';

const DIMENSIONS_STICKY = [[320, 100], [320, 50], [1, 1]];
const DIMENSIONS_CAJA = [[320, 50], [300, 250], [300, 450], [320, 100], [1, 1]];

export default {
    '1x1_mob': {
        slotName: `${PATH_SLOT}/1x1_mob`,
        dimensions: [[1, 1]],
        targeting: defaultTargeting
    },
    cabezal_mob: {
        slotName: `${PATH_SLOT}/cabezal_mob`,
        dimensions: [[300, 50]],
        targeting: defaultTargeting
    },
    sticky1_mob: {
        slotName: `${PATH_SLOT}/sticky1_mob`,
        dimensions: DIMENSIONS_STICKY,
        targeting: defaultTargeting
    },
    sticky2_mob: {
        slotName: `${PATH_SLOT}/sticky2_mob`,
        dimensions: DIMENSIONS_STICKY,
        targeting: defaultTargeting
    },
    caja1_mob: {
        slotName: `${PATH_SLOT}/caja1_mob`,
        dimensions: DIMENSIONS_CAJA,
        targeting: defaultTargeting
    },
    caja2_mob: {
        slotName: `${PATH_SLOT}/caja2_mob`,
        dimensions: DIMENSIONS_CAJA,
        targeting: defaultTargeting
    },
    caja3_mob: {
        slotName: `${PATH_SLOT}/caja3_mob`,
        dimensions: DIMENSIONS_CAJA,
        targeting: defaultTargeting
    },
    caja4_mob: {
        slotName: `${PATH_SLOT}/caja4_mob`,
        dimensions: DIMENSIONS_CAJA,
        targeting: defaultTargeting
    }
};
