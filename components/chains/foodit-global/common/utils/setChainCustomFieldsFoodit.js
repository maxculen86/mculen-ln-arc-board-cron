import PropTypes from 'fusion:prop-types';
import { LAYOUTS } from './helper-WebApi';

const {
    CAROUSEL,
    BN_12_GRID,
    BN_2_GRID,
    BN_FOCAL_1,
    BN_FOCAL_1_MAS_4
} = LAYOUTS;

const customFieldsRules = {
    cajaManual: {
        hideInitialPosition: true,
        hideIdCollection: true,
        hideHideCaja: false,
        hideButton: false,
        hideRoofProps: false,
        groupName: 'Ajuste Manual',
        layouts: {
            [BN_2_GRID]: 'BN Grilla 2'
        },
        defaultLayout: BN_2_GRID
    },
    cajaCollection: {
        hideInitialPosition: false,
        hideIdCollection: false,
        hideHideCaja: false,
        hideButton: false,
        hideRoofProps: false,
        groupName: 'Ajuste Collection',
        layouts: {
            [CAROUSEL]: 'Carrusel',
            [BN_12_GRID]: 'Grilla 12'
        },
        defaultLayout: BN_12_GRID
    },
    cajaApertura: {
        hideInitialPosition: true,
        hideIdCollection: true,
        hideHideCaja: true,
        hideButton: true,
        hideRoofProps: true,
        groupName: 'Ajuste Apertura',
        layouts: {
            [BN_FOCAL_1]: 'Focal 1',
            [BN_FOCAL_1_MAS_4]: 'Focal 1 más 4'
        },
        defaultLayout: BN_FOCAL_1
    }
};

const setChainFooditCustomFields = featuredName => {
    return {
        idCollection: PropTypes.string.tag({
            label: 'ID',
            description: 'Ingrese aquí el ID de la collection',
            defaultValue: '',
            group: customFieldsRules[featuredName].groupName,
            hidden: customFieldsRules[featuredName].hideIdCollection
        }).isRequired,
        layout: PropTypes.oneOf(
            Object.keys(customFieldsRules[featuredName].layouts)
        ).tag({
            label: 'Diagramación',
            defaultValue: customFieldsRules[featuredName].defaultLayout,
            description: 'Cambiar la diagramación de la caja',
            group: customFieldsRules[featuredName].groupName,
            labels: customFieldsRules[featuredName].layouts
        }).isRequired,
        initialPosition: PropTypes.number.tag({
            label: 'N° de nota inicial',
            description: 'Indicar a partir de que nota desea mostrar',
            defaultValue: 1,
            group: customFieldsRules[featuredName].groupName,
            hidden: customFieldsRules[featuredName].hideInitialPosition
        }).isRequired,
        hideCaja: PropTypes.boolean.tag({
            name: 'Ocultar Caja',
            description: 'Marque para ocultar la caja',
            defaultValue: false,
            group: customFieldsRules[featuredName].groupName,
            hidden: customFieldsRules[featuredName].hideHideCaja
        }),
        title: PropTypes.string.tag({
            name: 'Texto',
            description: 'Ingrese aquí el título de la caja.',
            defaultValue: '',
            hidden: customFieldsRules[featuredName].hideRoofProps,
            group: 'Techo'
        }),
        link: PropTypes.url.tag({
            label: 'Url',
            description:
                'Ingrese la url que redirige al hacer click al titulo. El formato debe empezar con https://',
            defaultValue: '',
            hidden: customFieldsRules[featuredName].hideRoofProps,
            group: 'Techo'
        }),
        hideTitle: PropTypes.boolean.tag({
            name: 'Ocultar techo',
            description: 'Marque para ocultar el techo',
            defaultValue: false,
            hidden: customFieldsRules[featuredName].hideRoofProps,
            group: 'Techo'
        })
    };
};

export default setChainFooditCustomFields;
