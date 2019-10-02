import { defaultTargeting } from './defaults';

const PATH_SLOT = 'la_nacion_tablet/Acumulado';

const DIMENSIONS_CAJA = [[300, 250], [1, 1]];

export default {
    '1x1_tab': {
        slotName: `${PATH_SLOT}/1x1_tab`,
        dimensions: [[1, 1]],
        targeting: defaultTargeting
    },
    cabezal_tab: {
        slotName: `${PATH_SLOT}/cabezal_tab`,
        dimensions: [[728, 90], [1, 1]],
        targeting: defaultTargeting
    },
    caja1_tab: {
        slotName: `${PATH_SLOT}/caja1_tab`,
        dimensions: DIMENSIONS_CAJA,
        targeting: defaultTargeting
    },
    caja2_tab: {
        slotName: `${PATH_SLOT}/caja2_tab`,
        dimensions: DIMENSIONS_CAJA,
        targeting: defaultTargeting
    },
    caja3_tab: {
        slotName: `${PATH_SLOT}/caja3_tab`,
        dimensions: DIMENSIONS_CAJA,
        targeting: defaultTargeting
    },
    caja4_tab: {
        slotName: `${PATH_SLOT}/caja4_tab`,
        dimensions: DIMENSIONS_CAJA,
        targeting: defaultTargeting
    }
};
