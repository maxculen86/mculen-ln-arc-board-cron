import { validateProps } from '../../../../../../../../../../../components/private/LN/api/global/components/features/article/LN10/props/validateProps';

describe('validateProps', () => {
    const props = { customFields: { hideImage: true, imageId: '123' } };
    const configs = { layout: 'center-focal', index: 0 };
    it('should throw an error if props is not provided', () => {
        expect(() => validateProps(undefined, configs)).toThrow(TypeError);
    });

    it('should throw an error if props is null', () => {
        expect(() => validateProps(null, configs)).toThrow(TypeError);
    });

    it('should throw an error if props is an empty object', () => {
        expect(() => validateProps({}, configs)).toThrow(TypeError);
    });

    it('should set customFields.imageId to null if customFields.hideImage is true', () => {
        const newProps = validateProps(props, configs);

        expect(newProps.customFields.imageId).toBeNull();
    });
    it('should return the props object unchanged if no validation rules apply', () => {
        const props = { customFields: { hideImage: false, imageId: '123' } };
        const configs = { layout: 'invalid-layout', index: -1 };

        const newProps = validateProps(props, configs);

        expect(newProps).toEqual(props);
    });
});
