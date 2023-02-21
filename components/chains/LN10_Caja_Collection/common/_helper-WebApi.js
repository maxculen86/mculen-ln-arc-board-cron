import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import {
    CHAIN_STYLE,
    VERTICALS,
    LAYOUTS,
    setQuantityByLayout
} from '../../utils/common/_helpers-WebApi';
import getChildrenBySection from '../../utils/getChildrenBySection';
import sectionValidation from '../../../layouts/config/LN10-Home.config.json';
import get from '../../../private/common/utils/get';

const { GRILLA4VERTICALES } = LAYOUTS;
const { HASHTAG, SUB_EXCLUSIVE } = CHAIN_STYLE;

export const validateChain = ({
    idCollection,
    articles = [],
    layout,
    renderables = [],
    chainId,
    isInBreakings,
    chainStyle
}) => {
    const articlesLength = get(articles, 'length');
    const minimum = setQuantityByLayout({ layout });

    const rules = [
        {
            validation: !layout,
            message: 'Se requiere que seleccione una diagramación'
        },
        {
            validation: !idCollection,
            message: 'Se requiere el id de la colección'
        },
        {
            validation:
                chainStyle &&
                layout === GRILLA4VERTICALES &&
                !VERTICALS.includes(chainStyle),
            message:
                'La diagramación Grilla 4 Verticales no permite el estilo seleccionado'
        },
        {
            validation: chainStyle === HASHTAG && articles.length < 7,
            message: 'Se requiere minimo 7 articulos para HashTag'
        },
        {
            validation: idCollection && (!articles || !articles.length),
            message: `La colección ${idCollection} no encontró notas`
        },
        {
            validation:
                chainStyle === SUB_EXCLUSIVE &&
                renderables.find(
                    ({ props }) =>
                        props.customFields &&
                        props.customFields.chainStyle === SUB_EXCLUSIVE &&
                        props.id !== chainId
                ),
            message: 'Ya existe una caja collection exclusivo suscriptor'
        },
        {
            validation: !isInBreakings && chainStyle === SUB_EXCLUSIVE,
            message:
                'La caja collection exclusivo suscriptor debe estar dentro de las secciones Breaking 1 y Breaking 2'
        },
        {
            validation: articlesLength < minimum,
            message: `Se requiere la carga de ${minimum -
                articlesLength} artículo${
                minimum - articlesLength > 1 ? 's' : ''
            }`
        }
    ];

    return pageBuilderValidator(rules);
};

export const getBreakingChildren = renderables =>
    ['Breaking_1', 'Breaking_2']
        .map(breakingName =>
            getChildrenBySection({
                renderables,
                section: {
                    title: breakingName,
                    validation: sectionValidation
                }
            })
        )
        .flat();
