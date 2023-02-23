import get from '../../private/common/utils/get';

export const getChildrenOfBomba = (preOpeningChildren, chainId) => {
    const chainBomba = preOpeningChildren.find(
        children => get(children, 'props.id', undefined) === chainId
    );

    return get(chainBomba, 'children', []);
};

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
