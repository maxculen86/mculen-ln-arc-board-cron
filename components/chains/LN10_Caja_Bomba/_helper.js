import pageBuilderValidator from '../../private/common/utils/pageBuilderValidator';
import get from '../../private/common/utils/get';
import { LAYOUTS } from '../utils/_helpers';

export const getChildrenOfBomba = (preOpeningChildren, chainId) => {
    const chainBomba = preOpeningChildren.find(
        children => get(children, 'props.id', undefined) === chainId
    );

    return get(chainBomba, 'children', []);
};

export const getIsPreOpening = (preOpeningChildren, chainId) =>
    preOpeningChildren.some(
        children => get(children, 'props.id', undefined) === chainId
    );

export const getClassCondition = (layout, childrenOfBomba) => {
    const isImageHidden = get(
        childrenOfBomba[0],
        'props.customFields.hideImage',
        false
    );

    const propsWithImage = {
        classCondition: !isImageHidden && '--with-img',
        diagramation: layout
    };

    const rules = {
        vertical: propsWithImage,
        horizontal: propsWithImage,
        bombitaMas4: {
            classCondition: 'mas-4',
            diagramation: 'bombita'
        },
        default: { diagramation: layout }
    };

    return rules[layout] || rules.default;
};

export const hasVariantNotRegular = (childrenOfBomba = []) => {
    return childrenOfBomba.some(
        child =>
            get(child, 'props.customFields.variant', 'regular') !== 'regular'
    );
};

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
