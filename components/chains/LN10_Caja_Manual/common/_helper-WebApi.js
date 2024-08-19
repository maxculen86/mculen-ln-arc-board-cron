import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import { setQuantityByLayout } from '../../utils/common/_helpers-WebApi';
import get from '../../../private/common/utils/get';
import { validateStyle } from '../../utils/checkValidationStyle';

// TODO: Agrupar validaciones comunes entre chains

const validateCajaManual = (
    layout,
    childProps = [],
    chainStyle,
    isGrid6MasTimeline = false
) => {
    const LN_COMMON_ARTICLE = 'LN-10/article';
    const COLLECTION_FEATURES = 'features';
    const LN_CARD_HTML = 'LN-10/CardHtml';
    const LN_TIMELINE = 'LN-10/timeline';
    const minimum = setQuantityByLayout({
        layout,
        countTimeline: isGrid6MasTimeline
    });
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
            validation:
                isGrid6MasTimeline &&
                !childProps.find(
                    ({ collection, type }) =>
                        collection === COLLECTION_FEATURES &&
                        type === LN_TIMELINE
                ),
            message: 'Esta diagramación requiere el feature LN10 Timeline'
        },
        {
            validation: childProps.some(
                ({ collection, type }) =>
                    !(
                        collection === COLLECTION_FEATURES &&
                        ([LN_COMMON_ARTICLE, LN_CARD_HTML].includes(type) ||
                            (isGrid6MasTimeline && type === LN_TIMELINE))
                    )
            ),
            message:
                'La Chain LN10 Caja Manual sólo admite features del tipo LN10 Artículo'
        },
        {
            validation: childrenPropsLength < minimum,
            message: `Se requiere la carga de ${minimum -
                childrenPropsLength} artículo${
                minimum - childrenPropsLength > 1 ? 's' : ''
            }`
        }
    ];

    return pageBuilderValidator(rules);
};

export default validateCajaManual;
