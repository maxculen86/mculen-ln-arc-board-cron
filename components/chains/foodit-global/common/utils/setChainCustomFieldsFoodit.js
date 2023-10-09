import PropTypes from 'fusion:prop-types';
import { LAYOUTS } from './helper-WebApi';

const { CAROUSEL, BN_12_GRID } = LAYOUTS;

const customFieldsRules = {
    cajaCollection: {
        hideInitialPosition: false,
        hideIdCollection: false,
        hideHideCaja: false,
        hideButton: false,
        groupName: 'Ajuste Collection',
        layouts: {
            [CAROUSEL]: 'Carrusel',
            [BN_12_GRID]: 'Grilla 12'
        },
        defaultLayout: BN_12_GRID
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
            group: customFieldsRules[featuredName].groupName
        }),
        title: PropTypes.string.tag({
            name: 'Texto',
            description: 'Ingrese aquí el título de la caja.',
            defaultValue: '',
            group: 'Techo'
        }),
        hideTitle: PropTypes.boolean.tag({
            name: 'Ocultar techo',
            description: 'Marque para ocultar el techo',
            defaultValue: false,
            group: 'Techo'
        })
    };
};

export default setChainFooditCustomFields;
