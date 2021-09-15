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
            default: ''
        }).isRequired,
        title: PropTypes.string.tag({
            name: 'Título',
            description:
                'Ingrese el texto del título. Máx: 100 caracteres incluyendo volanta.',
            default: ''
        }),
        lead: PropTypes.string.tag({
            name: 'Volanta',
            description: 'Ingrese aquí el texto de la volanta',
            default: ''
        }),
        imageId: PropTypes.string.tag({
            name: 'Foto',
            description: 'Ingrese aquí el id de la imagen en PhotoCenter',
            default: ''
        }),
        hideImage: PropTypes.bool.tag({
            name: 'Ocultar foto',
            description: 'Seleccione si no debe mostrarse la foto en la nota ',
            default: false
        }),
        authors: PropTypes.string.tag({
            name: 'Firma',
            description: 'Ingrese aquí el texto de la marquesina',
            default: ''
        }),
        hideFeature: PropTypes.bool.tag({
            name: 'Ocultar Bomba',
            description: 'Seleccione si no debe mostrarse la bomba ',
            default: false,
            hidden: featuredRules[featuredName].hideFeature
        }),
        description: PropTypes.string.tag({
            name: 'Bajada',
            description: 'Ingrese aquí el texto de la bajada',
            default: ''
        }),
        hideDescription: PropTypes.bool.tag({
            name: 'Ocultar Bajada',
            description: 'Seleccione si no debe mostrarse la bajada en la nota',
            default: false
        }),
        opinion: PropTypes.bool.tag({
            name: 'Nota Opinión',
            description: 'Seleccione si la nota debe mostrarse de tipo opinión',
            default: false,
            hidden: featuredRules[featuredName].hideOpinion
        }),
        chapita: PropTypes.string.tag({
            name: 'Chapita',
            description: 'Ingrese aquí el texto de la chapita',
            default: ''
        }),
        video: PropTypes.string.tag({
            name: 'VIDEO',
            description: 'Ingrese aquí el ID del video de VideoCenter',
            default: ''
        }),
        html: PropTypes.string.tag({
            name: 'Tablero / HTML',
            description: 'Ingrese aquí el html del tablero',
            default: ''
        })
    };
};

export default featureArticleCustomsFields;
