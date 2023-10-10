import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import { setQuantityByLayout } from '../../utils/common/_helpers-WebApi';
import get from '../../../private/common/utils/get';

// TODO: Agrupar validaciones comunes entre chains

const validateCajaManual = (layout, childProps = []) => {
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
                        collection === 'features' &&
                        ['foodit/Card'].includes(type)
                    )
            ),
            message:
                'La Chain Foodit Caja Manual sólo admite features del tipo Foodit Card'
        }
    ];

    return pageBuilderValidator(rules);
};

export default validateCajaManual;
