import { defaultTargeting } from './defaults';

const PATH_SLOT = 'la_nacion_tablet/Acumulado';

export default {
    cabezal_tab: {
        slotName: `${PATH_SLOT}/cabezal_tab`,
        dimensions: [[728, 90]],
        targeting: defaultTargeting,
        withoutHide: true
    },
    adhesion_tab: {
        slotName: `${PATH_SLOT}/adhesion_tab`,
        dimensions: [[728, 90]],
        targeting: defaultTargeting
    },
    caja1_tab: {
        slotName: `${PATH_SLOT}/caja1_tab`,
        dimensions: [[728, 90]],
        targeting: defaultTargeting
    },
    caja2_tab: {
        slotName: `${PATH_SLOT}/caja2_tab`,
        dimensions: [[728, 90]],
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
