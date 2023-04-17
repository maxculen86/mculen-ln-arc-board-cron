import { validateChildrensApi } from '../../../../../../../../../components/private/LN/api/global/components/common/utils/_helpers';

describe('validateChildrensApi', () => {
    it('return null if childrens is falsy', () => {
        const result = validateChildrensApi(undefined);
        expect(result).toBeNull();
    });
    it('return null if childrens is not an array', () => {
        const result = validateChildrensApi({});
        expect(result).toBeNull();
    });
    it('return null if all elements of childrens are null', () => {
        const result = validateChildrensApi([null, null, null]);
        expect(result).toBeNull();
    });
    it('return the array of elements if only some of the elements of childrens are null', () => {
        const childrens = [null, null, 1, 2, null];
        const result = validateChildrensApi(childrens);
        expect(result).toBe(childrens);
    });
    it('return the entire element array if I pass all validations to false', () => {
        const childrens = [1, 2, 3, 4];
        const result = validateChildrensApi(childrens);
        expect(result).toBe(childrens);
    });
});
