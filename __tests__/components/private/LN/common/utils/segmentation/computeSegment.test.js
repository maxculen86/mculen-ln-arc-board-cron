import computeSegment from '../../../../../../../components/private/LN/common/utils/segmentation/computeSegment';

describe('segmentation - computeSegment', () => {
    it('returns "test" when last digit is in testDigits', () => {
        const result = computeSegment('1234567890.1234567893', {
            testDigits: ['1', '3', '5'],
            controlDigits: ['0', '2', '4']
        });
        expect(result).toBe('test');
    });

    it('returns "control" when last digit is in controlDigits', () => {
        const result = computeSegment('1234567890.1234567894', {
            testDigits: ['1', '3', '5'],
            controlDigits: ['0', '2', '4']
        });
        expect(result).toBe('control');
    });

    it('returns null when last digit is in neither list', () => {
        const result = computeSegment('1234567890.1234567897', {
            testDigits: ['1', '3', '5'],
            controlDigits: ['0', '2', '4']
        });
        expect(result).toBeNull();
    });

    it('prioritizes test over control when digit is in both', () => {
        const result = computeSegment('1234567890.1234567893', {
            testDigits: ['3'],
            controlDigits: ['3']
        });
        expect(result).toBe('test');
    });

    it('returns null when clientId is falsy', () => {
        expect(
            computeSegment('', { testDigits: ['0'], controlDigits: ['1'] })
        ).toBeNull();
        expect(
            computeSegment(null, { testDigits: ['0'], controlDigits: ['1'] })
        ).toBeNull();
        expect(
            computeSegment(undefined, {
                testDigits: ['0'],
                controlDigits: ['1']
            })
        ).toBeNull();
    });

    it('returns null when both digit lists are empty', () => {
        expect(
            computeSegment('1234567890.1234567890', {
                testDigits: [],
                controlDigits: []
            })
        ).toBeNull();
    });

    it('coerces numeric digits in lists to strings before matching', () => {
        const result = computeSegment('1234567890.1234567895', {
            testDigits: [5],
            controlDigits: [4]
        });
        expect(result).toBe('test');
    });

    it('uses default empty digit lists when options are omitted', () => {
        expect(computeSegment('1234567890.1234567895')).toBeNull();
    });
});
