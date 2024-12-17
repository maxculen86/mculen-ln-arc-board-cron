import defaultBody, {
    errorHandling
} from '../../../../../../../../../../components/private/LN/api/common/elements/story/cuerpo/templates/default';
import BackendLnError from '../../../../../../../../../../components/private/LN/api/common/models/backendLnError';

describe('errorHandling', () => {
    it('should return concatenated result when selectedComponent executes successfully', () => {
        const res = ['initial'];
        const selectedComponent = jest.fn((current, storyId) => ['newElement']);
        const current = 'currentData';
        const storyId = '12345';

        const result = errorHandling(res, selectedComponent, current, storyId);

        expect(result).toEqual(['initial', 'newElement']);
        expect(selectedComponent).toHaveBeenCalledWith(current, storyId);
    });

    it('should log BackendError when selectedComponent throws an error', () => {
        const res = ['initial'];
        const selectedComponent = jest.fn(() => {
            throw new Error('Test error');
        });
        const current = 'currentData';
        const storyId = '12345';

        console.error = jest.fn();

        const result = errorHandling(res, selectedComponent, current, storyId);

        expect(console.error).toHaveBeenCalledWith(expect.any(BackendLnError));
    });
});

describe('defaultBody', () => {
    it('should apply the correct component function for each content element', () => {
        const mockComponent = jest.fn((current, storyId) => ({
            ...current,
            processed: true
        }));
        const components = {
            type1: mockComponent,
            type2: mockComponent
        };
        const contentElements = [
            { type: 'type1', data: 'data1' },
            { type: 'type2', data: 'data2' }
        ];
        const storyId = '123';
        const result = defaultBody(contentElements, components, storyId);
        expect(result).toEqual([
            { type: 'type1', data: 'data1', processed: true },
            { type: 'type2', data: 'data2', processed: true }
        ]);
        expect(mockComponent).toHaveBeenCalledTimes(2);
    });

    it('should return an empty array when contentElements is empty', () => {
        const components = {
            type1: jest.fn(),
            type2: jest.fn()
        };
        const contentElements = [];
        const storyId = '123';
        const result = defaultBody(contentElements, components, storyId);
        expect(result).toEqual([]);
    });
});
