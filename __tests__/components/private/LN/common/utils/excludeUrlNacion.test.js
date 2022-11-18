import excludeUrlNacion from '../../../../../../components/private/LN/common/utils/excludeUrlNacion';

describe('Component - Private - LN - Common - Utils - excludeUrlNacion', () => {
    const data = {
        hasCollectionApertura: false,
        hasChainBeforeGrid: false,
        nodeType: 'author',
        isWiki: false
    };

    it('should exclude url because nodeType is author', () => {
        expect(excludeUrlNacion(data)).toBeTruthy();
    });
    it('should exclude url because nodeType is tags and isWiki', () => {
        expect(
            excludeUrlNacion({ ...data, nodeType: 'tags', isWiki: true })
        ).toBeTruthy();
    });
    it('should exclude url because hasCollection', () => {
        expect(
            excludeUrlNacion({
                ...data,
                nodeType: 'sections',
                hasCollectionApertura: true
            })
        ).toBeTruthy();
    });
    it('should exclude url because hasChainBeforeGrid', () => {
        expect(
            excludeUrlNacion({
                ...data,
                nodeType: 'sections',
                hasChainBeforeGrid: true
            })
        ).toBeTruthy();
    });
    it('should NOT exclude url because is section and not hasCollectionApertura and not hasChainBeforeGrid', () => {
        expect(excludeUrlNacion({ ...data, nodeType: 'section' })).toBeFalsy();
    });
});
