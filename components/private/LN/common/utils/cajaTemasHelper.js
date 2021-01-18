import PropTypes from 'fusion:prop-types';

const cajaTemasCustomsFields = () => {
    return {
        url: PropTypes.url.tag({
            label: 'Link',
            description:
                'Ingrese la url que redirige al hacer click al titulo. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Techo'
        }),
        imageId: PropTypes.string.tag({
            name: 'Logo',
            description: 'Ingrese aquí el id de Photo Center de la imagen',
            defaultValue: '',
            group: 'Techo'
        }),
        title: PropTypes.string.tag({
            name: 'Texto',
            description: 'Ingrese aquí el título de la caja de temas',
            defaultValue: '',
            group: 'Techo'
        }),
        hideTitle: PropTypes.boolean.tag({
            name: 'Ocultar techo',
            description: 'Marque para ocultar el techo',
            defaultValue: false,
            group: 'Techo'
        }),
        layout: PropTypes.oneOf([
            'focalLeft3',
            'author3',
            'notaColor3',
            'grilla3',
            'grilla6',
            'grilla9'
        ]).tag({
            label: 'Diagramación',
            defaultValue: 'grilla3',
            description: 'Cambiar el diseño de la caja',
            group: 'Ajuste Collection',
            labels: {
                grilla3: 'Grilla 3',
                grilla6: 'Grilla 6',
                grilla9: 'Grilla 9',
                focalLeft3: 'Focal Izquierdo',
                author3: 'Opinión',
                notaColor3: 'Vertical 3 color'
            }
        }).isRequired,
        backgroundColor: PropTypes.oneOf([
            'default',
            '--pink',
            '--blue',
            '--red',
            '--teal'
        ]).tag({
            label: 'Color de Fondo',
            defaultValue: 'default',
            description: 'Cambiar el color de fondo de la caja',
            group: 'Ajuste Collection',
            labels: {
                default: 'Sin Color',
                '--pink': 'Rosa',
                '--blue': 'Celeste LN',
                '--red': 'Rojo',
                '--teal': 'Verde',
                '--grey': 'Gris'
            }
        }),
        initialPosition: PropTypes.number.tag({
            label: 'N° de nota inicial',
            description: 'Indicar a partir de que nota desea mostrar',
            defaultValue: 1,
            group: 'Ajuste Collection'
        }).isRequired
    };
};

export default cajaTemasCustomsFields;
