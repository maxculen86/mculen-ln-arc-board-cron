import get from '../../../../../../common/utils/get';
import configToGetTypeChain from '../config/configToGetTypeChain.json';
import {
    setFieldsHashTagInChain,
    setFieldsSuscriptorInChain
} from './configToSetFieldsByChains';

// Here put the same keys from configToGetTypeChain.json how as hashtag
const configToSetProperties = {
    hashtag: setFieldsHashTagInChain,
    suscriptor: setFieldsSuscriptorInChain
};

export const validateFieldsChains = (props, keyTypeChain) => {
    if (!props) {
        throw new TypeError('The props missing in collection');
    }

    // Set properties by default
    const propsValidate = props;
    // return propsValidate;
    if (keyTypeChain) {
        // console.log(KeyTypeChain);
        const callByTypeChain = configToSetProperties[keyTypeChain];
        if (callByTypeChain) {
            return callByTypeChain(propsValidate);
        }
        return propsValidate;
    }
    return propsValidate;
};
export const findKeyTypeChain = props => {
    // console.log(get(props, 'customFields.title', 'NA'));
    let keyTypeChainFinded = null;
    const result = Object.keys(configToGetTypeChain).some(keyTypeChain => {
        keyTypeChainFinded = keyTypeChain;
        return (
            configToGetTypeChain[keyTypeChain] &&
            configToGetTypeChain[keyTypeChain].some(objInProps => {
                return Object.keys(objInProps).every(keyInProps => {
                    return (
                        get(props, keyInProps, '') === objInProps[keyInProps]
                    );
                });
            })
        );
    });
    return result ? keyTypeChainFinded : null;
};
