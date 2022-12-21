import uncapitalizeFirstLetter from '../../../../../components/private/common/utils/uncapitalizeFirstLetter';

describe('Components - private - common - utils - uncapitalizeFirstLetter', () => {
    it('Should return string with first letter capitalized', () => {
        expect(uncapitalizeFirstLetter('Hola')).toStrictEqual('hola');
        expect(uncapitalizeFirstLetter('Ángel')).toStrictEqual('ángel');
    });

    it('Should return same string with first letter already uncapitalized', () => {
        expect(uncapitalizeFirstLetter('hola')).toStrictEqual('hola');
    });

    it('Should return same string when first character is a number', () => {
        expect(uncapitalizeFirstLetter('1, 2, 3, probando')).toStrictEqual(
            '1, 2, 3, probando'
        );
    });

    it('Should return empty string for edge cases', () => {
        expect(uncapitalizeFirstLetter()).toStrictEqual('');
        expect(uncapitalizeFirstLetter('')).toStrictEqual('');
        expect(uncapitalizeFirstLetter(null)).toStrictEqual('');
        expect(uncapitalizeFirstLetter({})).toStrictEqual('');
    });
});
