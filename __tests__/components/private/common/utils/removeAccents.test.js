import removeAccents from '../../../../../components/private/common/utils/removeAccents';

describe('Private - Common - Utils - removeAccents', () => {
    it('Should return same string without accents', () => {
        expect(removeAccents('Gualeguaychú')).toStrictEqual('Gualeguaychu');
        expect(removeAccents('GUALEGUAYCHÙ')).toStrictEqual('GUALEGUAYCHU');
    });
    it('Should not alter ñ or dieresis', () => {
        expect(removeAccents('pingüino')).toStrictEqual('pingüino');
        expect(removeAccents('Ñandú')).toStrictEqual('Ñandu');
    });
    it('Should not alter numeric strings', () => {
        expect(removeAccents('3.145,2')).toStrictEqual('3.145,2');
    });
    it('Should return null when paramether is not a string', () => {
        expect(removeAccents()).toBeNull();
        expect(removeAccents(3)).toBeNull();
        expect(removeAccents({})).toBeNull();
    });
});
