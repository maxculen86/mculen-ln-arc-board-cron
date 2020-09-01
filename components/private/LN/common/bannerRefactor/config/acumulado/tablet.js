import { defaultTargeting } from './defaults';

const PATH_SLOT = 'la_nacion_tablet/Acumulado';

export default {
    cabezal_tab: {
        slotName: `${PATH_SLOT}/cabezal_tab`,
        dimensions: [[[728, 90]]],
        targeting: defaultTargeting,
        sizemap: {
            breakpoints: [[768, 0]]
        }
    },
    caja1_tab: {
        slotName: `${PATH_SLOT}/caja1_tab`,
        dimensions: [[[728, 90]]],
        targeting: defaultTargeting,
        sizemap: {
            breakpoints: [[768, 0]]
        }
    },
    caja2_tab: {
        slotName: `${PATH_SLOT}/caja2_tab`,
        dimensions: [[[728, 90]]],
        targeting: defaultTargeting,
        sizemap: {
            breakpoints: [[768, 0]]
        }
    }
};
