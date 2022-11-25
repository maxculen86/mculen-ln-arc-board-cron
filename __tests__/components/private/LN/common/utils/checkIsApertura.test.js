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
    });
});
