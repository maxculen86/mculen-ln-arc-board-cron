import getTargetAndRelIfExternal from '../../../../../components/private/common/utils/getTargetAndRelIfExternal';

describe('components - private - common - utils - getTargetAndRelIfExternal', () => {
    it('should return _blank and noopener when isExternal is true', () => {
        const { target, rel } = getTargetAndRelIfExternal(true);
        expect(target).toBe('_blank');
        expect(rel).toBe('noopener');
    });

    it('should return _self and undefined when isExternal is false', () => {
        const { target, rel } = getTargetAndRelIfExternal(false);
        expect(target).toBe('_self');
        expect(rel).toBeUndefined();
    });
});
