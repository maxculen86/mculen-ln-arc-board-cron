import pageBuilderValidator from '../../private/common/utils/pageBuilderValidator';
import { CHAIN_STYLE, VERTICALS, LAYOUTS } from '../utils/_helpers';

const { HASHTAG } = CHAIN_STYLE;
const { GRILLA4VERTICALES } = LAYOUTS;

export const validateChain = ({
    idCollection,
    articles = [],
    layout,
    chainStyle
}) => {
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
        }
    ];

    return pageBuilderValidator(rules);
};

export default validateChain;
