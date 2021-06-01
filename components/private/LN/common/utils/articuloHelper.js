import PropTypes from 'fusion:prop-types';

const featuredRules = {
    articuloGeneral: {
        hideFeature: true,
        hideOpinion: false
    },
    bomba1: {
        hideFeature: false,
        hideOpinion: true
    }
};

const featureArticleCustomsFields = featuredName => {
    return {
        noteId: PropTypes.string.tag({
            name: 'ID de la nota',
            description: 'Ingrese aquí el id de la nota',
            default: '',
            group: 'Ajustes Básicos'
        }).isRequired,
        title: PropTypes.string.tag({
            name: 'Título',
            description:
                'Ingrese el texto del título. Máx: 100 caracteres incluyendo volanta.',
            default: '',
            group: 'Ajustes Básicos'
        }),
        lead: PropTypes.string.tag({
            name: 'Volanta',
            description: 'Ingrese aquí el texto de la volanta',
            default: '',
            group: 'Ajustes Básicos'
        }),
        imageId: PropTypes.string.tag({
            name: 'Foto',
            description: 'Ingrese aquí el id de la imagen en PhotoCenter',
            default: '',
            group: 'Ajustes Básicos'
        }),
        hideImage: PropTypes.bool.tag({
            name: 'Ocultar foto',
            description: 'Seleccione si no debe mostrarse la foto en la nota ',
            default: false,
            group: 'Ajustes Básicos'
        }),
        authors: PropTypes.string.tag({
            name: 'Firma',
            description: 'Ingrese aquí el texto de la marquesina',
            default: '',
            group: 'Ajustes Básicos'
        }),
        hideFeature: PropTypes.bool.tag({
            name: 'Ocultar Bomba',
            description: 'Seleccione si no debe mostrarse la bomba ',
            default: false,
            group: 'Ajustes Básicos',
            hidden: featuredRules[featuredName].hideFeature
        }),
        description: PropTypes.string.tag({
            name: 'Bajada',
            description: 'Ingrese aquí el texto de la bajada',
            default: '',
            group: 'Ajustes Extra'
        }),
        hideDescription: PropTypes.bool.tag({
            name: 'Ocultar Bajada',
            description: 'Seleccione si no debe mostrarse la bajada en la nota',
            default: false,
            group: 'Ajustes Extra'
        }),
        opinion: PropTypes.bool.tag({
            name: 'Nota Opinión',
            description: 'Seleccione si la nota debe mostrarse de tipo opinión',
            default: false,
            group: 'Ajustes Básicos',
            hidden: featuredRules[featuredName].hideOpinion
        }),
        chapita: PropTypes.string.tag({
            name: 'Chapita',
            description: 'Ingrese aquí el texto de la chapita',
            default: '',
            group: 'Ajustes Extra'
        }),
        html: PropTypes.string.tag({
            name: 'Tablero / HTML',
            description: 'Ingrese aquí el html del tablero',
            default: '',
            group: 'Ajustes Extra'
        })
    };
};

export default featureArticleCustomsFields;
