import capitalizeFirstLetter from '../../../../../components/private/common/utils/capitalizeFirstLetter';

describe('Components - private - common - utils - capitalizeFirstLetter', () => {
    it('Should return string with first letter capitalized', () => {
        expect(capitalizeFirstLetter('hola')).toStrictEqual('Hola');
        expect(capitalizeFirstLetter('ángel')).toStrictEqual('Ángel');
    });

    it('Should return same string with first letter already capitalized', () => {
        expect(capitalizeFirstLetter('Hola')).toStrictEqual('Hola');
    });

    it('Should return same string when first character is a number', () => {
        expect(capitalizeFirstLetter('1, 2, 3, probando')).toStrictEqual(
            '1, 2, 3, probando'
        );
    });

    it('Should return empty string for edge cases', () => {
        expect(capitalizeFirstLetter()).toStrictEqual('');
        expect(capitalizeFirstLetter('')).toStrictEqual('');
        expect(capitalizeFirstLetter(null)).toStrictEqual('');
        expect(capitalizeFirstLetter({})).toStrictEqual('');
    });
});
