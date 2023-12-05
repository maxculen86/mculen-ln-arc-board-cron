import { replaceVideoId } from '../../../../content/sources/utils/replaceVideoId';

const testReplaceVideoId = (url, newId) => {
    const result = replaceVideoId(url, newId);
    return { originalUrl: url, newId, result };
};
describe('replaceVideoId', () => {
    test('should replace video ID in the URL', () => {
        const testData = testReplaceVideoId(
            'https://example.com/vidabcdefgh',
            '12345678'
        );
        expect(testData.result).toBe('https://example.com/jwid12345678');
        expect(testData.originalUrl).toBe('https://example.com/vidabcdefgh');
        expect(testData.newId).toBe('12345678');
    });
});
