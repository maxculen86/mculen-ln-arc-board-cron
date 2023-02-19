const setFieldsHashTagInChain = props => {
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

const setFieldsSuscriptorInChain = props => {
    return props;
};

// Here put the same keys from configToGetTypeChain.json how as hashtag
export const configPropsByTypeChain = {
    hashtag: setFieldsHashTagInChain,
    suscriptor: setFieldsSuscriptorInChain
};

export default configPropsByTypeChain;
