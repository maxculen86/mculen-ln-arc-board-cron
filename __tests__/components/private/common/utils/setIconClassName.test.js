import setIconClassName from '../../../../../components/private/common/utils/setIconClassName';

describe('components - private - common - utils - setIconClassName', () => {
    const mocks = {
        default: {},
        withName: { name: 'zoom' },
        withHref: { name: 'zoom', href: 'url-example' },
        withMod: { name: 'zoom', mod: '--negative' },
        withSize: { name: 'zoom', mod: '--negative', size: '--xs' }
    };

    it('should be com-icon', () => {
        expect(setIconClassName(mocks.default)).toBe('com-icon');
    });

    it('should be com-icon icon-name', () => {
        expect(setIconClassName(mocks.withName)).toBe('com-icon icon-zoom');
        expect(setIconClassName(mocks.withHref)).toBe('com-icon icon-zoom');
    });

    it('should be com-icon icon-name with mod class', () => {
        expect(setIconClassName(mocks.withMod)).toBe(
            'com-icon icon-zoom --negative'
        );
    });

    it('should be com-icon icon-name with mod class and size', () => {
        expect(setIconClassName(mocks.withSize)).toBe(
            'com-icon icon-zoom --negative --xs'
        );
    });
});
