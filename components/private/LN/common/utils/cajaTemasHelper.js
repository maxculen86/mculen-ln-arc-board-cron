/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-underscore-dangle */
import PropTypes from 'fusion:prop-types';
import config from '../../../../../properties/sites/la-nacion-ar';
import get from '../../../common/utils/get';
import { formatText } from '../../../common/utils/sectionUtils';
import useGlobalProviderAcu from '../../acumulado/hooks/useGlobalProviderAcu';
import sectionsValidation from '../../../../layouts/config/LN-Home.config.json';

const featuredRules = {
    cajaCollection: {
        hideInitialPosition: false,
        hideIdCollection: false,
        hideHideCaja: false,
        groupName: 'Ajuste Collection',
        layouts: {
            focalLeft3: 'Focal Izquierdo',
            focalRight2: 'Focal Derecho',
            author3: 'Opinión',
            notaColorRosa3: 'Vertical 3 color Rosa',
            notaColorVerde3: 'Vertical 3 color Verde',
            grilla1: 'Grilla 1',
            grilla2: 'Grilla 2',
            grilla3: 'Grilla 3',
            grilla6: 'Grilla 6',
            grilla9: 'Grilla 9'
        },
        defaultLayout: 'grilla3'
    },
    cajaManual: {
        hideInitialPosition: true,
        hideIdCollection: true,
        hideHideCaja: false,
        groupName: 'Ajuste Manual',
        layouts: {
            focalLeft3: 'Focal Izquierdo',
            focalRight2: 'Focal Derecho',
            // author3: 'Opinión',
            notaColorRosa3: 'Vertical 3 color Rosa',
            notaColorVerde3: 'Vertical 3 color Verde',
            grilla1: 'Grilla 1',
            grilla2: 'Grilla 2',
            grilla3: 'Grilla 3',
            grilla6: 'Grilla 6',
            grilla9: 'Grilla 9',
            grillaVideo1: 'Grilla 1 - Video'
        },
        defaultLayout: 'focalLeft3'
    },
    cajaOpinion: {
        hideInitialPosition: true,
        hideIdCollection: false,
        hideHideCaja: false,
        groupName: 'Ajuste Collection',
        layouts: {
            opinion4: 'Home Opinion'
        },
        defaultLayout: 'opinion4'
    },
    cajaEditoriales: {
        hideInitialPosition: true,
        hideIdCollection: false,
        hideHideCaja: false,
        groupName: 'Ajuste Collection',
        layouts: {
            editoriales2: 'Home Editoriales'
        },
        defaultLayout: 'editoriales2'
    }
};

export const getLayoutType = (layout, artWithoutDate, _children) => {
    return (
        (layout.includes('opinion4') && 'Opinion') ||
        (layout.includes('editoriales2') && 'Editoriales') ||
        (layout.includes('focal') && 'Focal') ||
        (artWithoutDate && artWithoutDate.length && 'Grilla') ||
        (_children && _children.length && 'ArticleFeature')
    );
};

export const getMarkupForDatalayer = (
    layoutType,
    layout,
    position,
    sectionName
) => {
    const extraOptsdefault = {
        'data-diagramacion-id': '0',
        'data-is-block': true
    };
    const types = {
        Opinion: {
            extraOpts: {
                'data-block-name': 'h_opinion',
                ...extraOptsdefault
            }
        },
        Editoriales: {
            extraOpts: {
                'data-block-name': 'h_editoriales',
                ...extraOptsdefault
            }
        },
        OtrasNoticias: {
            extraOpts: {
                'data-block-name': 'n_otras_noticias',
                ...extraOptsdefault
            }
        },
        UltimasNoticias: {
            extraOpts: {
                'data-block-name': 'n_ultimas_noticias',
                ...extraOptsdefault
            }
        },
        TePuedeInteresarHome: {
            extraOpts: {
                'data-block-name': 'h_sugerencias',
                ...extraOptsdefault
            }
        },
        TePuedeInteresar: {
            extraOpts: {
                'data-block-name': 'n_te_puede_interesar',
                ...extraOptsdefault
            }
        },
        Ranking: {
            extraOpts: {
                'data-block-name': 'n_ranking',
                ...extraOptsdefault
            }
        },
        Default: (pos, section, lay) => {
            if (!pos) return {};
            return {
                extraOptsDiv: {
                    'data-module': `tema_${pos}`
                },
                extraOpts: {
                    'data-block-name': `h_${section}tema-${pos}`,
                    'data-diagramacion-id': lay,
                    'data-is-block': true,
                    id: `tema_${pos}`
                }
            };
        }
    };

    const { extraOptsDiv = {}, extraOpts = {} } =
        types[layoutType] ||
        types[sectionName] ||
        types.Default(position, sectionName, layout);

    return { extraOptsDiv, extraOpts };
};
// Desde acá manejamos los títulos de las cards en Nota
export const customHeading = {
    OtrasNoticias: 'h3',
    UltimasNoticias: 'h3',
    TePuedeInteresar: 'h3',
    Ranking: 'h3'
};

export const getCommonProps = props => {
    const {
        customFields: { layout = 'grilla3', backgroundColor },
        renderables = [],
        id: idFeature,
        globalContent: { name, acumuladoGeneral } = {},
        layout: pageBuilderLayout
    } = props;

    const { cajaTemaConfig = {}, layoutsName = {} } = config || {};
    const { collectionsInPage = [] } = useGlobalProviderAcu() || {};
    const notesQuantity = (layout && Number(layout.slice(-1))) || 3;
    const bgColor =
        backgroundColor === 'default' || backgroundColor === null
            ? ''
            : '--bgcolor ';
    const classCondition = (layout && cajaTemaConfig[layout].className) || '';

    const position =
        renderables
            .filter(ren => ren.collection === 'chains')
            .filter(
                chain =>
                    get(chain, 'props.customFields.hideCaja', false) !== true
            )
            .findIndex(chain => chain.props.id === idFeature) || 0;

    const sectionName = `${formatText(
        pageBuilderLayout === layoutsName.Home ? '' : `${name}_`
    )}`;
    const showDatalayerMark =
        pageBuilderLayout === layoutsName.Home
            ? 'true'
            : get(acumuladoGeneral, 'usa_datalayer', 'false');

    return {
        collectionsInPage,
        notesQuantity,
        bgColor,
        classCondition,
        position:
            showDatalayerMark !== 'false' &&
            `0${Number(position) + 1}`.slice(-2),
        sectionName
    };
};

export const calculateSizeOfCollection = (collections, notesQuantity) => {
    const totalArticlesInCollections = collections.reduce(
        (total, currentValue) => {
            return total + currentValue.articles.length;
        },
        0
    );
    const totalArticlesToAsk = notesQuantity + totalArticlesInCollections;
    return totalArticlesToAsk < 20 ? totalArticlesToAsk : 20;
};

export const getChildrenFromSectionHome = (
    renderables,
    sectionName,
    sectionPosition
) => {
    const INDEX_SECTION =
        get(sectionsValidation, `${sectionName}.position`, sectionPosition) + 1;

    return get(renderables, `[${INDEX_SECTION}].children`, []) || [];
};

export const getChildrenFromAperturaHome = renderables => {
    return getChildrenFromSectionHome(renderables, 'Apertura_1', 3).concat(
        getChildrenFromSectionHome(renderables, 'Apertura_2', 4)
    );
};

export const isInApertura = (tree = {}, idFeature) => {
    const sectionApertura = get(tree, 'children[4].children', []);
    return sectionApertura.find(child => child.props.id === idFeature);
};

export const validateoutItem = itemNota => {
    const regex = new RegExp(`/video/`);
    const results = regex.exec(itemNota.url_nota);
    if (results) return false;

    return true;
};

export const cajaTemasCustomsFields = featuredName => {
    return {
        idCollection: PropTypes.string.tag({
            label: 'ID',
            description: 'Ingrese aquí el ID de la collection',
            defaultValue: '',
            group: featuredRules[featuredName].groupName,
            hidden: featuredRules[featuredName].hideIdCollection
        }).isRequired,
        layout: PropTypes.oneOf(
            Object.keys(featuredRules[featuredName].layouts)
        ).tag({
            label: 'Diagramación',
            defaultValue: featuredRules[featuredName].defaultLayout,
            description: 'Cambiar el diseño de la caja',
            group: featuredRules[featuredName].groupName,
            labels: featuredRules[featuredName].layouts
        }).isRequired,
        // Se Pidió ocultarlo de momento. User Story[73305]
        // backgroundColor: PropTypes.oneOf([
        //     'default',
        //     '--bgpink',
        //     '--bgblue',
        //     '--bgred',
        //     '--bgteal',
        //     '--bggrey'
        // ]).tag({
        //     label: 'Color de Fondo',
        //     defaultValue: 'default',
        //     description: 'Cambiar el color de fondo de la caja',
        //     group: featuredRules[featuredName].groupName,
        //     labels: {
        //         default: 'Sin Fondo',
        //         '--bgpink': 'Rosa',
        //         '--bgblue': 'Celeste LN',
        //         '--bgred': 'Rojo',
        //         '--bgteal': 'Verde',
        //         '--bggrey': 'Gris'
        //     }
        // }),
        initialPosition: PropTypes.number.tag({
            label: 'N° de nota inicial',
            description: 'Indicar a partir de que nota desea mostrar',
            defaultValue: 1,
            group: featuredRules[featuredName].groupName,
            hidden: featuredRules[featuredName].hideInitialPosition
        }).isRequired,
        hideCaja: PropTypes.boolean.tag({
            name: 'Ocultar Caja',
            description: 'Marque para ocultar la caja',
            defaultValue: false,
            group: featuredRules[featuredName].groupName,
            hidden: featuredRules[featuredName].hideHideCaja
        }),
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
            defaultValue: true,
            group: 'Techo'
        })
    };
};
