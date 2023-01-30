import get from '../../../../../../../common/utils/get';

export const setFieldsHashTagInChain = props => {
    const { idCollection, initialPosition, layout } = props.customFields;
    return {
        ...props,
        customFields: {
            hideTitle: true,
            idCollection,
            initialPosition,
            layout
        }
    };
};

export const setFieldsSuscriptorInChain = props => {
    return props;
};
