import addForwardSlash from '../../../../../../components/private/LN/common/utils/addForwardSlash';

describe('Private - LN - common - utils -> addForwardSlash', () => {
    describe('With no string parameter', () => {
        it('should return null', () => {
            expect(addForwardSlash()).toBeNull();
        });
    });

    describe('With string finished in forward slash', () => {
        it('should return same string', () => {
            const stringMock = 'https://www.lanacion.com.ar/';
            expect(addForwardSlash(stringMock)).toStrictEqual(stringMock);
        });
    });

    describe('With string NOT finished in forward slash', () => {
        it('should return string with added forward slash', () => {
            expect(addForwardSlash('https://www.lanacion.com.ar')).toMatch(
                /(.*)\/$/gim
            );
            expect(
                addForwardSlash('https://www.lanacion.com.ar')
            ).toStrictEqual('https://www.lanacion.com.ar/');
        });
    });
});
