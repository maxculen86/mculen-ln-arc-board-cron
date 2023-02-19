import get from '../../../../../../common/utils/get';
import configToGetTypeChain from '../config/jsons/configToGetTypeChain.json';
import { configPropsByTypeChain } from '../config/configPropsByTypeChain';

export const findTypeChain = (props, typeChain) => {
    let keyTypeChainFinded = null;
    const chainStyle = get(props, 'customFields.chainStyle', null);

    if (typeChain && !['chainManual', 'chainCollection'].includes(typeChain)) {
        return typeChain;
    }
    if (chainStyle) {
        return chainStyle;
    }
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
    return result ? keyTypeChainFinded : typeChain;
};

export const validatePropsChains = (props, typeChain) => {
    if (!props) {
        throw new TypeError('The props missing in Chain');
    }
    // Set properties by default and others properties how us typeChain
    const propsValidate = props;
    propsValidate.typeChain = findTypeChain(propsValidate, typeChain);

    // return propsValidate;
    if (propsValidate.typeChain) {
        const callByTypeChain = configPropsByTypeChain[propsValidate.typeChain];
        if (callByTypeChain) {
            return callByTypeChain(propsValidate);
        }
        return propsValidate;
    }
    return propsValidate;
};
