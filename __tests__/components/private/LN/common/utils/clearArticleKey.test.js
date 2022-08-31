import clearArticleKey from '../../../../../../components/private/LN/common/utils/clearArticleKey';

describe('private - LN - common - utils - clearArticleKey', () => {
    const generalMock = [
        { _id: '2CIOHVMKJBHKDMMHH2WBIZGJWE', paywallEnabled: '1' },
        { _id: '2CIOHVMKJBHKDMMHH2WBIZGJWA', paywallEnabled: '1' },
        { _id: '2CIOHVMKJBHKDMMHH2WBIZGJWT', paywallEnabled: '1' },
        { _id: '2CIOHVMKJBHKDMMHH2WBIZGJWW', paywallEnabled: '1' },
        { _id: '2CIOHVMKJBHKDMMHH2WBIZGJWZ', paywallEnabled: '1' }
    ];

    it('returns array of articles with prop clean', () => {
        const propToClear = 'paywallEnabled';
        const result = clearArticleKey(generalMock, propToClear);

        expect(result).toBeInstanceOf(Array);
        expect(result.every(article => article[propToClear] === ''));

        result.forEach(article => {
            const currentKeys = Object.keys(article);
            const expectedKeys = Object.keys(generalMock[0]);

            expect(currentKeys).toMatchObject(expectedKeys);
        });
    });

    it('returns the same array if key is undefined', () => {
        const result = clearArticleKey(generalMock);
        expect(result).toMatchObject(generalMock);
    });
});
