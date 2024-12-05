import isCustomLiveblog from '../../../../../components/private/common/utils/isCustomLiveblog';
import { isEmptyObject } from '../../../../../components/private/common/utils/isEmptyObject';

jest.mock(
    '../../../../../components/private/common/utils/isEmptyObject',
    () => ({
        isEmptyObject: jest.fn()
    })
);

describe('isCustomLiveblog', () => {
    it('should return false if element is not an object', () => {
        expect(isCustomLiveblog(null)).toBe(false);
        expect(isCustomLiveblog(undefined)).toBe(false);
        expect(isCustomLiveblog(123)).toBe(false);
        expect(isCustomLiveblog('string')).toBe(false);
        expect(isCustomLiveblog(true)).toBe(false);
    });

    it('should return false if element is an array', () => {
        expect(isCustomLiveblog([])).toBe(false);
        expect(isCustomLiveblog([1, 2, 3])).toBe(false);
    });

    it('should return false if element is an empty object', () => {
        isEmptyObject.mockReturnValue(true);
        expect(isCustomLiveblog({})).toBe(false);
        expect(isEmptyObject).toHaveBeenCalledWith({});
    });

    it('should return false if the type or subtype properties do not match', () => {
        isEmptyObject.mockReturnValue(false);
        expect(
            isCustomLiveblog({ type: 'custom_embed', subtype: 'not-liveblog' })
        ).toBe(false);
        expect(
            isCustomLiveblog({ type: 'not-embed', subtype: 'custom-liveblog' })
        ).toBe(false);
        expect(
            isCustomLiveblog({ type: 'not-embed', subtype: 'not-liveblog' })
        ).toBe(false);
    });

    it('should return true if the type and subtype properties are correct', () => {
        isEmptyObject.mockReturnValue(false);
        expect(
            isCustomLiveblog({
                type: 'custom_embed',
                subtype: 'custom-liveblog'
            })
        ).toBe(true);
    });

    it('should return false if the type or subtype properties are missing', () => {
        isEmptyObject.mockReturnValue(false);
        expect(isCustomLiveblog({ type: 'custom_embed' })).toBe(false);
        expect(isCustomLiveblog({ subtype: 'custom-liveblog' })).toBe(false);
        expect(isCustomLiveblog({})).toBe(false);
    });
});
