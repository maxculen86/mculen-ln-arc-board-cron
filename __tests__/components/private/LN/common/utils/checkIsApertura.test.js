import checkIsApertura from '../../../../../../components/private/LN/common/utils/checkIsApertura';

describe('Components - Private - LN - Common - utils - checkIsApertura', () => {
    const data = {
        nodeType: 'tags',
        articleIndex: 0,
        articlesInCollection: [],
        isWiki: false
    };
    describe('Cases should be return true', () => {
        it('should return true because is tags without wiki and is first article', () => {
            expect(checkIsApertura(data)).toBeTruthy();
        });
        it('should return true because is nodeType valid without articlesInCollection and is first article', () => {
            expect(
                checkIsApertura({ ...data, nodeType: 'section' })
            ).toBeTruthy();
        });
        it('should return true because is section with dolar-hoy URI at index 0', () => {
            expect(
                checkIsApertura({
                    ...data,
                    nodeType: 'section',
                    articleIndex: 0,
                    requestUri: '/dolar-hoy/'
                })
            ).toBeTruthy();
        });
        it('should return true because is tags without wiki with tema URI at index 0', () => {
            expect(
                checkIsApertura({
                    ...data,
                    articleIndex: 0,
                    requestUri: '/tema/dolar-blue-tid67294/'
                })
            ).toBeTruthy();
        });
    });

    describe('Cases should be return false', () => {
        it('should return false because is not first article', () => {
            expect(checkIsApertura({ ...data, articleIndex: 2 })).toBeFalsy();
        });
        it('should return false because is section without articlesInCollection and is not first article', () => {
            expect(
                checkIsApertura({
                    ...data,
                    nodeType: 'section',
                    articleIndex: 2
                })
            ).toBeFalsy();
        });
        it('should return false because is section with articlesInCollection', () => {
            expect(
                checkIsApertura({
                    ...data,
                    nodeType: 'section',
                    articlesInCollection: [1, 2]
                })
            ).toBeFalsy();
        });
        it('should return false because is tags with wiki', () => {
            expect(checkIsApertura({ ...data, isWiki: true })).toBeFalsy();
        });
        it('should return false because is author', () => {
            expect(
                checkIsApertura({ ...data, nodeType: 'author' })
            ).toBeFalsy();
        });

        it('should return false because is tags without wiki with valid URI but at index 3', () => {
            expect(
                checkIsApertura({
                    ...data,
                    articleIndex: 3,
                    requestUri: '/dolar-hoy/'
                })
            ).toBeFalsy();
        });

        it('should return false because is tags without wiki at index 1 but with invalid URI', () => {
            expect(
                checkIsApertura({
                    ...data,
                    articleIndex: 1,
                    requestUri: '/otro/'
                })
            ).toBeFalsy();
        });

        it('should return false because is tags with dolar-hoy URI at index 1 (nodeType should be section)', () => {
            expect(
                checkIsApertura({
                    ...data,
                    articleIndex: 1,
                    requestUri: '/dolar-hoy/'
                })
            ).toBeFalsy();
        });
    });
});
