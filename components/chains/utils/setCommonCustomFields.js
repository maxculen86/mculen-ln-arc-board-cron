import PropTypes from 'fusion:prop-types';

const typesButtonStyle = {
    'exc-sub': 'Exclusivo Suscriptor',
    generic: 'Genérico',
    'ln-plus': 'LN+'
};
// TODO: Renombrar las propiedades segun las clases para cada caso
const typeStylesChain = {
    exclusiveSub: 'Exclusivo Suscriptor',
    properties: 'Propiedades',
    camp: 'Campo',
    welfare: 'Bienestar',
    mobility: 'Movilidad'
};

const customFieldsRules = {
    cajaCollection: {
        hideInitialPosition: false,
        hideIdCollection: false,
        hideHideCaja: false,
        groupName: 'Ajuste Collection',
        layouts: {
            bnGrilla4: 'BN Grilla 4',
            bnGrilla8: 'BN Grilla 8'
        },
        defaultLayout: 'bnGrilla4'
    },
    cajaManual: {
        hideInitialPosition: true,
        hideIdCollection: true,
        hideHideCaja: false,
        groupName: 'Ajuste Manual',
        layouts: {
            bnGrilla4: 'BN Grilla 4',
            bnGrilla8: 'BN Grilla 8'
        },
        defaultLayout: 'bnGrilla4'
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
            description: 'Cambiar el diagramación de la caja',
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
            group: 'Techo'
        }),
        linkButton: PropTypes.string.tag({
            name: 'Url del botón',
            description:
                'Ingrese la url que redirige al hacer click al botón. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Techo'
        }),
        buttonStyle: PropTypes.oneOf(Object.keys(typesButtonStyle)).tag({
            label: 'Estilo del boton',
            defaultValue: 'generic',
            description: 'Cambiar el diseño de la caja',
            group: 'Techo',
            labels: typesButtonStyle
        })
    };
};

export default setCommonCustomFields;
