import {
    findTypeChain,
    validatePropsByTypeChain,
    validatePropsChains
} from '../../../../../../../../../../components/private/LN/api/global/components/chains/common/props/validatePropsChains';
import configPropsByTypeChain from '../../../../../../../../../../components/private/LN/api/global/components/chains/config/configPropsByTypeChain';
describe('findTypeChain', () => {
    const props = {
        customFields: {
            chainStyle: 'style1'
        }
    };
    it('should return the given typeChain when it is defined', () => {
        const typeChain = 'hashtag';
        const version = 'LN10';
        const result = findTypeChain(props, typeChain, version);
        expect(result).toEqual(typeChain);
    });

    it('should return the chainStyle from the props.customFields object when typeChain is undefined and no typeChain matches', () => {
        const typeChain = undefined;
        const version = 'LN';
        const result = findTypeChain(props, typeChain, version);
        expect(result).toEqual(props.customFields.chainStyle);
    });

    it('should return the key of the matching typeChain object from the configTypeChain object', () => {
        const typeChain = undefined;
        const version = 'LN10';
        const result = findTypeChain(props, typeChain, version);
        expect(result).toEqual('style1');
    });
    it('should validate the props using the corresponding configPropsByTypeChain function if typeChain is defined', () => {
        const typeChain = 'suscriptor';
        const version = 'LN';
        const propsToValidate = { ...props, typeChain };
        const validateFunc = configPropsByTypeChain[typeChain];
        const result = findTypeChain(propsToValidate, typeChain, version);
        expect(validateFunc(propsToValidate)).toEqual({
            customFields: { chainStyle: 'style1' },
            typeChain: 'suscriptor'
        });
        expect(result).toEqual(typeChain);
    });
});

describe('validatePropsByTypeChain', () => {
    it('should return the same props when typeChain is not defined', () => {
        const props = { prop1: 'value1', prop2: 'value2' };
        const result = validatePropsByTypeChain(props);
        expect(result).toEqual(props);
    });

    it('should return the same props when typeChain is not in configPropsByTypeChain', () => {
        const props = {
            prop1: 'value1',
            prop2: 'value2',
            typeChain: 'unknownTypeChain'
        };
        const result = validatePropsByTypeChain(props);
        expect(result).toEqual(props);
    });

    it('should call the corresponding function in configPropsByTypeChain when typeChain is defined', () => {
        const props = {
            prop1: 'value1',
            prop2: 'value2',
            typeChain: 'hashtag'
        };
        const setFieldsHashTagInChain = jest.fn(() => ({
            newProp: 'newValue',
            typeChain: 'hashtag'
        }));
        configPropsByTypeChain.hashtag = setFieldsHashTagInChain;
        const expectedProps = { newProp: 'newValue', typeChain: 'hashtag' };
        const result = validatePropsByTypeChain(props);
        expect(setFieldsHashTagInChain).toHaveBeenCalledWith(props);
        expect(result).toEqual(expectedProps);
    });
});

describe('validatePropsChains', () => {
    it('should throw an error if the props are missing', () => {
        expect(() => validatePropsChains(null, 'LN/Chain/C01', 'v1')).toThrow();
    });

    it('should return the validated props', () => {
        const props = {
            customFields: {
                section: 'economy'
            }
        };
        const typeChain = 'LN/Chain/C01';
        const version = 'v1';
        const result = validatePropsChains(props, typeChain, version);
        expect(result).toEqual({
            ...props,
            typeChain,
            version
        });
    });
});
