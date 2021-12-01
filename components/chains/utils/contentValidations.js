import get from '../../private/common/utils/get';

export const customFieldValidation = ({ featureId, sectionChildren }) =>
    sectionChildren.some(el => get(el, 'props.id', undefined) === featureId);

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
