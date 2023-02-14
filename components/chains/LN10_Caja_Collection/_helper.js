import pageBuilderValidator from '../../private/common/utils/pageBuilderValidator';
import { setQuantityByLayout, CHAIN_STYLE } from '../utils/_helpers';
import get from '../../private/common/utils/get';

const { HASHTAG } = CHAIN_STYLE;

export const validateChain = ({
    idCollection,
    articles = [],
    layout,
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
            validation: chainStyle === HASHTAG && articles.length < 7,
            message: 'Se requiere minimo 7 articulos para HashTag'
        },
        {
            validation: idCollection && (!articles || !articles.length),
            message: `La colección ${idCollection} no encontró notas`
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

export default validateChain;
