import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import isSSR from './isSSR';

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

const conditionallyCallImageSource = idImage =>
    (idImage && idImage.trim() && 'relatedImageSource') || null;

export function getImage({
    imageId,
    imageConfig,
    id,
    onlyOneApeturaValidateForWWW,
    isAdmin,
    filterImage
}) {
    return (
        useContent({
            source: conditionallyCallImageSource(imageId),
            staticMode: isSSR(),
            query: {
                id: imageId && imageId.trim(),
                published: true,
                imageConfig,
                nid: id,
                boxType: 'ArticleFeature',
                isInApertura: onlyOneApeturaValidateForWWW,
                isAdmin
            },
            filter: filterImage
        }) || null
    );
}

const featureArticleCustomsFields = (featuredName, isLN10) => ({
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
    ...(isLN10 && {
        hideAuthors: PropTypes.bool.tag({
            name: 'Ocultar Firma',
            description: 'Seleccione si no debe mostrarse la firma',
            default: false
        })
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
    ...(isLN10 && {
        video: PropTypes.string.tag({
            name: 'Video',
            description: 'Ingrese aquí el id de Video',
            default: ''
        })
    }),
    ...(!isLN10 && {
        opinion: PropTypes.bool.tag({
            name: 'Nota Opinión',
            description: 'Seleccione si la nota debe mostrarse de tipo opinión',
            default: false,
            hidden: featuredRules[featuredName].hideOpinion
        })
    }),
    chapita: PropTypes.string.tag({
        name: 'Chapita',
        description: 'Ingrese aquí el texto de la chapita',
        default: ''
    }),
    ...(!isLN10 && {
        chapitaStyle: PropTypes.string.tag({
            name: 'Estilo Chapita',
            description: 'Ingrese aquí la clase CSS de la chapita',
            default: ''
        })
    }),
    ...(isLN10 && {
        chapitaStyle: PropTypes.oneOf([
            'negative',
            'positive',
            'live',
            'subscriber'
        ]).tag({
            default: '',
            name: 'Estilo Chapita',
            description: 'Elija la clase CSS de la chapita'
        }),
        videoComercial: PropTypes.bool.tag({
            name: 'Video Comercial',
            description: 'Marque aqui para desactivar carga diferida',
            default: false
        })
    }),
    html: PropTypes.string.tag({
        name: 'HTML',
        description: 'Ingrese aquí el código HTML / embed',
        default: ''
    }),
    ...(isLN10 && {
        cllBoard: PropTypes.string.tag({
            name: 'Tablero de canchallena',
            description: 'Ingrese aquí la url de la ficha del partido',
            default: ''
        })
    }),
    ...(!isLN10 && {
        mobileImageId: PropTypes.string.tag({
            name: 'Foto Mobile',
            description: 'Ingrese aquí el ID de imagen Vertical.',
            default: ''
        })
    })
});

export default featureArticleCustomsFields;
