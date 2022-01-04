import setBtnClassName from '../../../../../components/private/common/utils/setBtnClassName';

describe('components - private - common - utils - setBtnClassName', () => {
    const mocks = {
        default: {},
        withIconName: {
            iconName: 'zoom'
        },
        withClassesNames: {
            iconName: 'zoom',
            classesNames: 'class1 class2'
        },
        withIconChildren: {
            children: true,
            iconPosition: 'top',
            iconName: 'zoom'
        }
    };

    it('should be com-button', () => {
        expect(setBtnClassName(mocks.default)).toBe('com-button');
    });

    it('should be com-button and icon', () => {
        expect(setBtnClassName(mocks.withClassesNames)).toBe(
            'com-button class1 class2 --icon'
        );
    });

    it('should be com-button and icon children', () => {
        expect(setBtnClassName(mocks.withIconChildren)).toBe(
            'com-button --icon zoom top'
        );
    });
});
