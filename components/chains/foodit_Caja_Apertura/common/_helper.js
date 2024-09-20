import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import { LAYOUTS } from '../../foodit-global/common/utils/helper-WebApi';

const { BN_FOCAL_1, BN_FOCAL_1_MAS_4 } = LAYOUTS;

export const validateOpeningFoodit = ({ layout, childProps = [] }) => {
    const rules = [
        {
            validation: !layout,
            message: 'Se requiere que seleccione una diagramación'
        },
        {
            validation: childProps.length > 5,
            message: 'La caja no puede tener mas de 5 articulos'
        },
        {
            validation: childProps.find(child => child?.type !== 'foodit/Card'),
            message: 'La caja solo puede tener hijos del tipo Foodit Card'
        }
    ];

    const layoutRules = {
        [BN_FOCAL_1_MAS_4]: [
            {
                validation:
                    childProps.filter(child => child?.customFields?.isDayRecipe)
                        .length !== 1,
                message:
                    'Se requiere que una sola de las recetas sea marcada como receta del dia'
            },
            {
                validation: childProps.length !== 5,
                message:
                    'Se requieren 5 articulos para la diagramacion seleccionada'
            }
        ],
        [BN_FOCAL_1]: [
            {
                validation: !childProps.length,
                message:
                    'Se requieren almenos un articulo para la diagramacion seleccionada'
            }
        ]
    };

    return pageBuilderValidator([...rules, ...(layoutRules[layout] || [])]);
};
