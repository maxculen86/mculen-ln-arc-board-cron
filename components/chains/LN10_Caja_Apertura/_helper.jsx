/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'fusion:prop-types';
import { LAYOUTS } from '../utils/common/_helpers-WebApi';

const {
    FOCAL_LEFT,
    FOCAL_LEFT_VIDEO,
    FOCAL_CENTER,
    FOCAL_70,
    BN_OPENING_4,
    FOCAL_100,
    FOCAL_IZQUIERDO_6N
} = LAYOUTS;

export const setCustomFields = () => {
    const CUSTOM_FIELDS_CONFIG = {
        layout: {
            label: 'Diagramación',
            defaultValue: 'left-focal',
            description: 'Cambiar el diseño de la caja',
            group: 'Ajuste Apertura',
            labels: {
                [FOCAL_LEFT]: 'Focal Izquierdo',
                [FOCAL_LEFT_VIDEO]: 'Focal Izquierdo con video vertical',
                [FOCAL_CENTER]: 'Focal Central',
                [FOCAL_70]: 'Focal al 70',
                [BN_OPENING_4]: 'Apertura x 4',
                [FOCAL_100]: 'Focal al 100',
                [FOCAL_IZQUIERDO_6N]: 'Focal izquierdo sin timeline'
            }
        },
        hideCaja: {
            name: 'Ocultar Caja',
            defaultValue: false,
            description: 'Marque para ocultar la caja',
            group: 'Ajuste Apertura',
            hidden: false
        }
    };

    const labelsKeys = Object.keys(CUSTOM_FIELDS_CONFIG.layout.labels);

    return PropTypes.shape({
        layout: PropTypes.oneOf(labelsKeys).tag(CUSTOM_FIELDS_CONFIG.layout),
        hideCaja: PropTypes.boolean.tag(CUSTOM_FIELDS_CONFIG.hideCaja)
    });
};
