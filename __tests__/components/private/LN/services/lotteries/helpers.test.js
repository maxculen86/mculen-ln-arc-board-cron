import { removeEmptyElements } from '../../../../../../components/private/LN/services/lotteries/helpers';

describe('removeEmptyElements function', () => {
    it('should remove elements that contain hyphens', () => {
        const inputArray = ['1', '-', '2', '--', '3', '4'];
        const expectedOutput = ['1', '2', '3', '4'];
        expect(removeEmptyElements(inputArray)).toEqual(expectedOutput);
    });

    it('should return the array intact if there are no dashed elements', () => {
        const inputArray = ['1', '2', '3', '4'];
        const expectedOutput = ['1', '2', '3', '4'];
        expect(removeEmptyElements(inputArray)).toEqual(expectedOutput);
    });

    it('should return the input unchanged if it is not an array', () => {
        const inputString = 'inputString';
        expect(removeEmptyElements(inputString)).toEqual(inputString);
    });

    it('should return an empty array if all elements are dashes', () => {
        const inputArray = ['-', '--', '---'];
        const expectedOutput = [];
        expect(removeEmptyElements(inputArray)).toEqual(expectedOutput);
    });

    it('should return an empty array if the input array is empty', () => {
        const inputArray = [];
        const expectedOutput = [];
        expect(removeEmptyElements(inputArray)).toEqual(expectedOutput);
    });
});
