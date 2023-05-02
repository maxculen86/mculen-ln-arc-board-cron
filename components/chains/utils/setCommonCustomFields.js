import PropTypes from 'fusion:prop-types';

const typesButtonStyle = {
    'sub-exclusive': 'Exclusivo Suscriptor',
    generico: 'Genérico',
    ln: 'LN+'
};

const ajustCollection = 'Ajuste Collection';

const typeStylesChain = {
    propiedades: 'Propiedades',
    campo: 'Campo',
    bienestar: 'Bienestar',
    movilidad: 'Movilidad',
    'sub-exclusive': 'Exclusivo Suscriptor',
    Hashtag: 'Hashtag',
    yellow: 'A Fondo (Amarillo)',
    white: 'A Fondo (Blanco)',
    red: 'A Fondo (Rojo)',
    green: 'A Fondo (Verde)',
    lightblue: 'A Fondo (Celeste)'
};

const customFieldsRules = {
    cajaCollection: {
        hideInitialPosition: false,
        hideIdCollection: false,
        hideHideCaja: false,
        hideButton: false,
        groupName: ajustCollection,
        layouts: {
            bnGrilla4: 'BN Grilla 4',
            bnGrilla8: 'BN Grilla 8',
            bn_2_1_2_grid: 'BN 2 + Focal 1+2',
            'hash-1-2-2-2_grid': 'HashTag',
            cajaContent1: 'Caja Content',
            bn_1_grid: 'BN 1 nota',
            bn_2_grid: 'BN Grilla 2',
            bn_1_1_grid: 'BN Focal 1 + 1',
            bn_1_2_grid: 'BN Focal 1 + 2',
            bn_1_3_grid: 'BN Focal 1 + 3',
            bn_1_4_grid: 'BN Focal 1 + 4',
            'bn-4-8': 'Grilla 4 Verticales',
            bnFondo: 'BN A Fondo'
        },
        defaultLayout: 'bnGrilla4'
    },
    cajaManual: {
        hideInitialPosition: true,
        hideIdCollection: true,
        hideHideCaja: false,
        hideButton: false,
        groupName: 'Ajuste Manual',
        layouts: {
            bnGrilla4: 'BN Grilla 4',
            bnGrilla8: 'BN Grilla 8',
            cajaContent1: 'Caja Content',
            bn_1_grid: 'BN 1 nota',
            bn_2_grid: 'BN Grilla 2',
            bn_1_1_grid: 'BN Focal 1 + 1',
            bn_1_2_grid: 'BN Focal 1 + 2',
            bn_1_3_grid: 'BN Focal 1 + 3',
            bn_1_4_grid: 'BN Focal 1 + 4',
            bn_2_1_2_grid: 'BN 2 +Focal 1 + 2',
            bnFondo: 'BN A Fondo'
        },
        defaultLayout: 'bnGrilla4'
    },
    cajaCanal: {
        hideInitialPosition: false,
        hideIdCollection: false,
        hideHideCaja: false,
        hideButton: false,
        groupName: 'Ajuste Canales',
        layouts: {
            bn_1_1_grid: 'Focal 1 + 1',
            canal_1_2_grid: 'Canal Focal 1 + 2',
            canal_1_3_grid: 'Canal Focal 1 + 3',
            canal_1_4_grid: 'Canal Focal 1 + 4',
            'bn-4-8': 'Grilla 4 Verticales'
        },
        defaultLayout: 'canal_1_4_grid'
    },
    cajaOpinion: {
        hideInitialPosition: false,
        hideIdCollection: true,
        hideHideCaja: false,
        hideButton: true,
        groupName: ajustCollection,
        layouts: {
            opinion8: 'Opinion x 8',
            opinion4: 'Opinion x 4'
        },
        defaultLayout: 'opinion4'
    }
};

const setCommonCustomFields = featuredName => {
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
        chainStyle: PropTypes.oneOf(Object.keys(typeStylesChain)).tag({
            label: 'Estilo de la caja',
            defaultValue: '',
            description: 'Cambiar el estilo de la caja',
            group: customFieldsRules[featuredName].groupName,
            labels: typeStylesChain
        }),
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
            group: 'Techo'
        }),
        link: PropTypes.url.tag({
            label: 'Url',
            description:
                'Ingrese la url que redirige al hacer click al titulo. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Techo'
        }),
        logoId: PropTypes.string.tag({
            name: 'Logo',
            description: 'Ingrese aquí el id de Photo Center de la imagen',
            defaultValue: '',
            group: 'Techo'
        }),
        hideTitle: PropTypes.boolean.tag({
            name: 'Ocultar techo',
            description: 'Marque para ocultar el techo',
            defaultValue: true,
            group: 'Techo'
        }),
        navigator: PropTypes.string.tag({
            name: 'Navegador',
            description:
                'Ingrese aquí el nombre de una navegación creada en site services',
            defaultValue: '',
            group: 'Techo'
        }),
        buttonText: PropTypes.string.tag({
            name: 'Texto del botón',
            description: 'Ingrese aquí el texto del botón',
            defaultValue: '',
            group: 'Techo',
            hidden: customFieldsRules[featuredName].hideButton
        }),
        linkButton: PropTypes.string.tag({
            name: 'Url del botón',
            description:
                'Ingrese la url que redirige al hacer click al botón. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Techo',
            hidden: customFieldsRules[featuredName].hideButton
        }),
        buttonStyle: PropTypes.oneOf(Object.keys(typesButtonStyle)).tag({
            label: 'Estilo del boton',
            defaultValue: 'generic',
            description: 'Cambiar el diseño de la caja',
            group: 'Techo',
            labels: typesButtonStyle,
            hidden: customFieldsRules[featuredName].hideButton
        })
    };
};

export default setCommonCustomFields;
