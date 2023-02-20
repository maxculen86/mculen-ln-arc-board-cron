const setFieldsHashTagInChain = props => {
    const {
        idCollection,
        initialPosition,
        layout,
        hideCaja = false
    } = props.customFields;
    return {
        ...props,
        customFields: {
            hideCaja,
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
