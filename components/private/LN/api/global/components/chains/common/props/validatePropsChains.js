import get from '../../../../../../../common/utils/get';
import { configTypeChain } from '../../config/configTypeChain';
import { configPropsByTypeChain } from '../../config/configPropsByTypeChain';

export const findTypeChain = (props, typeChain, version) => {
    let keyTypeChainFinded = null;
    const chainStyle = get(props, 'customFields.chainStyle', null);

    if (typeChain) {
        return typeChain;
    }

    const result =
        configTypeChain[version] &&
        Object.keys(configTypeChain[version]).some(keyTypeChain => {
            keyTypeChainFinded = keyTypeChain;
            return (
                configTypeChain[version][keyTypeChain] &&
                configTypeChain[version][keyTypeChain].some(objInProps => {
                    return Object.keys(objInProps).every(keyInProps => {
                        return (
                            get(props, keyInProps, '') ===
                            objInProps[keyInProps]
                        );
                    });
                })
            );
        });
    return result ? keyTypeChainFinded : chainStyle;
};

export const validatePropsByTypeChain = props => {
    const propsValidate = props;
    if (propsValidate.typeChain) {
        const callByTypeChain = configPropsByTypeChain[propsValidate.typeChain];
        if (callByTypeChain) {
            return callByTypeChain(propsValidate);
        }
        return propsValidate;
    }
    return propsValidate;
};

export const validatePropsChains = (props, typeChain, version) => {
    if (!props) {
        throw new TypeError('The props missing in Chain');
    }
    // Set properties by default and others properties how us typeChain
    const propsValidate = props;
    propsValidate.typeChain = findTypeChain(propsValidate, typeChain, version);
    propsValidate.version = version;

    return propsValidate;
};
