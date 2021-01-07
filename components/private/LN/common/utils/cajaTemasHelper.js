import PropTypes from 'fusion:prop-types';

export const classRules = {
    focalLeft: '--focal --left',
    focalRight: '--focal --right',
    notaAl100: '--cinema',
    grilla: '',
    author: ''
};

export const cajaTemasCustomsFields = () => {
    return {
        url: PropTypes.url.tag({
            label: 'Url',
            description:
                'Ingrese la url que redirige al hacer click al titulo. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Custom Fields'
        }),
        title: PropTypes.string.tag({
            name: 'Título / Techo',
            description: 'Ingrese aquí el título de la caja de temas',
            defaultValue: '',
            group: 'Custom Fields'
        }),
        initialPosition: PropTypes.number.tag({
            label: 'Nota Inicial',
            description: 'Indicar a partir de que nota desea mostrar',
            defaultValue: 1,
            group: 'Custom Fields'
        }).isRequired,
        layout: PropTypes.oneOf([
            'notaAl100',
            'grilla',
            'focalLeft',
            'focalRight',
            'author'
        ]).tag({
            label: 'Diseño',
            defaultValue: 'grilla',
            description: 'Cambiar el diseño de la caja',
            group: 'Custom Fields',
            labels: {
                notaAl100: 'Nota al 100',
                grilla: 'Grilla 2, 3, 4, 6, 9, 12',
                focalLeft: 'Focal Izquierdo',
                focalRight: 'Focal Derecho',
                author: 'Autor'
            }
        }).isRequired,
        notesQuantity: PropTypes.number.tag({
            label: 'Cantidad Notas',
            description: 'Indicar cantidad de notas',
            group: 'Custom Fields'
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
            group: 'Custom Fields',
            labels: {
                default: 'Sin Color',
                '--pink': 'Rosa',
                '--blue': 'Azul',
                '--red': 'Rojo',
                '--teal': 'Turqueza'
            }
        })
    };
};
