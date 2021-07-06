import { defaultTargeting } from './defaults';

const PATH_SLOT = 'la_nacion_tablet/Home';

export default {
    cabezal_tab: {
        slotName: `${PATH_SLOT}/cabezal_tab`,
        dimensions: [[728, 90]],
        targeting: defaultTargeting,
        withoutHide: true
    },
    middle1_tab: {
        slotName: `${PATH_SLOT}/middle1_tab`,
        dimensions: [[728, 90]],
        targeting: defaultTargeting,
        withoutHide: true
    },
    middle2_tab: {
        slotName: `${PATH_SLOT}/middle2_tab`,
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
        dimensions: [
            [300, 250],
            [300, 600]
        ],
        targeting: defaultTargeting
    },
    caja2_tab: {
        slotName: `${PATH_SLOT}/caja2_tab`,
        dimensions: [[300, 250]],
        targeting: defaultTargeting
    },
    caja3_tab: {
        slotName: `${PATH_SLOT}/caja3_tab`,
        dimensions: [[300, 250]],
        targeting: defaultTargeting
    },
    caja4_tab: {
        slotName: `${PATH_SLOT}/caja4_tab`,
        dimensions: [[300, 250]],
        targeting: defaultTargeting
    },
    logo_tag_tab: {
        slotName: `${PATH_SLOT}/logo_tag_tab`,
        dimensions: [[40, 280]],
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
