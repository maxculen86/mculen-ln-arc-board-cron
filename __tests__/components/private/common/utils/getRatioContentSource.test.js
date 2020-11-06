import {
    getAspectRatio,
    addAspectRatio
} from '../../../../../content/sources/utils/getRatio';

describe('Tests for getRatio content source utils', () => {
    it('Test for getAspectRatio', () => {
        expect(getAspectRatio()).toBeNull();
        expect(getAspectRatio(600, undefined)).toBeNull();
        expect(getAspectRatio(undefined, 400)).toBeNull();
        expect(getAspectRatio(600, 400)).toBe('3:2');
        expect(getAspectRatio(1200, 800)).toBe('3:2');
        expect(getAspectRatio(1281, 854)).toBe('3:2');
        expect(getAspectRatio(1280, 1920)).toBe('2:3');
        expect(getAspectRatio(1280, 720)).toBe('16:9');
    });

    it('Test for addAspectRatio ', () => {
        const items = [{ width: '800', height: '400' }];
        expect(addAspectRatio([])).toStrictEqual([]);
        expect(addAspectRatio(items)).toStrictEqual([
            { height: 533, isNotSmart: true, width: '800' }
        ]);
    });
});
