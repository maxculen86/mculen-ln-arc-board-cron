import pageBuilderValidator from '../../private/common/utils/pageBuilderValidator';
import { CHAIN_STYLE } from '../utils/_helpers';

const { HASHTAG } = CHAIN_STYLE;

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
