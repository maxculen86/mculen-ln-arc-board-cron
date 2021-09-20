import isNotShowcase from '../../../../content/sources/utils/isNotShowcase';
describe('content - sources - ultils - isShocase', () => {
    const articleDataShowcaseTrue = {
        _id: 'KXBYVZCYQRBRLNFJEOULS7AN4A',
        type: 'story',
        version: '0.10.7',
        label: {
            showcase: {
                display: true,
                text: 'Si',
                url: ''
            }
        }
    };
    const articleDataShowcaseFalse = {
        _id: 'KXBYVZCYQRBRLNFJEOULS7AN4A',
        type: 'story',
        version: '0.10.7',
        label: {
            showcase: {
                display: true,
                text: 'No',
                url: ''
            }
        }
    };
    it('should return true, when showcase is "Si"', () => {
        expect(isNotShowcase(articleDataShowcaseTrue)).toBeFalsy();
    });
    it('should return false, when showcase is "No"', () => {
        expect(isNotShowcase(articleDataShowcaseFalse)).toBeTruthy();
    });
    it('should return true, when label showcase is empty', () => {
        expect(isNotShowcase({})).toBeTruthy();
    });
});
