import get from '../../private/common/utils/get';

export const customFieldValidation = ({
    featureId,
    customField,
    sectionChildren,
    value = false
}) =>
    sectionChildren.some(el => {
        const customFieldValue = get(
            el,
            `props.customFields.${customField}`,
            false
        );

        return value
            ? !customFieldValue
            : customFieldValue && get(el, 'props.id', undefined) === featureId;
    });

export const childrenValidation = ({
    featureId,
    customField,
    sectionChildren
}) =>
    sectionChildren.some(
        el =>
            el.children &&
            el.children.some(art =>
                get(art, `props.customFields.${customField}`, false)
            ) &&
            sectionChildren.some(
                cm => get(cm, 'props.id', undefined) === featureId
            )
    );
