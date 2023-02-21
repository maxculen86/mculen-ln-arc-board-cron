import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import get from '../../../private/common/utils/get';
import { LAYOUTS } from '../../utils/common/_helpers-WebApi';

export const getIsPreOpening = (preOpeningChildren, chainId) =>
    preOpeningChildren.some(
        children => get(children, 'props.id', undefined) === chainId
    );

export const validateChainBomba = (layout, children, isPreOpening) => {
    const missingNotesOnTheBomba = 5 - children.length;
    const rules = [
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
