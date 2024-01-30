import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import { setQuantityByLayout } from '../../utils/common/_helpers-WebApi';
import get from '../../../private/common/utils/get';
import { validateStyle } from '../../utils/checkValidationStyle';

// TODO: Agrupar validaciones comunes entre chains

const validateCajaManual = (layout, childProps = [], chainStyle) => {
    const LN_COMMON_ARTICLE = 'LN-10/article';
    const COLLECTION_FEATURES = 'features';
    const LN_CARD_HTML = 'LN-10/CardHtml';
    const minimum = setQuantityByLayout({ layout });
    const childrenPropsLength = get(childProps, 'length');
    const aFondoValidation = validateStyle(layout, chainStyle);

    const rules = [
        {
            validation: !layout,
            message: 'Se requiere que seleccione una diagramación'
        },
        {
            validation: aFondoValidation,
            message:
                'El estilo de caja seleccionado no corresponde para esta diagramación'
        },
        {
            validation: childrenPropsLength < minimum,
            message: `Se requiere la carga de ${minimum -
                childrenPropsLength} artículo${
                minimum - childrenPropsLength > 1 ? 's' : ''
            }`
        },
        {
            validation: childProps.some(
                ({ collection, type }) =>
                    !(
                        collection === COLLECTION_FEATURES &&
                        [LN_COMMON_ARTICLE, LN_CARD_HTML].includes(type)
                    )
            ),
            message:
                'La Chain LN10 Caja Manual sólo admite features del tipo LN10 Artículo'
        }
    ];

    return pageBuilderValidator(rules);
};

export default validateCajaManual;
