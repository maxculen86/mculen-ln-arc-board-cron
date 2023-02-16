import pageBuilderValidator from '../../private/common/utils/pageBuilderValidator';
import { setQuantityByLayout } from '../utils/_helpers';
import get from '../../private/common/utils/get';

// TODO: Agrupar validaciones comunes entre chains

const validateCajaManual = (layout, childProps = []) => {
    const LN_COMMON_ARTICLE = 'LN-10/article';
    const COLLECTION_FEATURES = 'features';
    const minimum = setQuantityByLayout({ layout });
    const childrenPropsLength = get(childProps, 'length');

    const rules = [
        {
            validation: !layout,
            message: 'Se requiere que seleccione una diagramación'
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
                        [LN_COMMON_ARTICLE].includes(type)
                    )
            ),
            message:
                'La Chain LN10 Caja Manual sólo admite features del tipo LN10 Artículo'
        }
    ];

    return pageBuilderValidator(rules);
};

export default validateCajaManual;
