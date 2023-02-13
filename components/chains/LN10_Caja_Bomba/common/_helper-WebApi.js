import get from '../../../private/common/utils/get';
import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import { LAYOUTS } from '../../utils/common/_helpers-WebApi';

export const getIsPreOpening = (preOpeningChildren, chainId) =>
    preOpeningChildren.some(
        children => get(children, 'props.id', undefined) === chainId
    );

export const validateChainBomba = (
    layout,
    children,
    isPreOpening,
    hasNotVariantRegular
) => {
    const missingNotesOnTheBomba = 5 - children.length;
    const rules = [
        {
            validation: hasNotVariantRegular,
            message: `La variante del Articulo solo puede ser 'regular'`
        },
        {
            validation: layout === LAYOUTS.BOMBITAMAS4 && children.length < 5,
            message: `La diagramacion Bombita + 4 requiere 5 articulos. Faltan ${missingNotesOnTheBomba} articulos`
        },
        {
            validation: !isPreOpening,
            message:
                'La Caja Bomba solo se puede utilizar en la seccion Pre Apertura'
        }
    ];

    return pageBuilderValidator(rules);
};
