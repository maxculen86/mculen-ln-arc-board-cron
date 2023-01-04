import stringFallback from '../../../../../components/private/common/utils/stringFallback';

describe('Components - private - common - utils - stringFallback', () => {
    it('Should return the same string when it receives a string', () => {
        expect(stringFallback('hola')).toStrictEqual('hola');
    });

    describe('Testing border cases', () => {
        it('Should return an empty string when the function call has no parameters', () => {
            expect(stringFallback()).toStrictEqual('');
        });
        it('Should return an empty string when it receives an empty string', () => {
            expect(stringFallback('')).toStrictEqual('');
        });
        it('Should return an empty string when it receives null', () => {
            expect(stringFallback(null)).toStrictEqual('');
        });
        it('Should return an empty string when it receives an empty object', () => {
            expect(stringFallback({})).toStrictEqual('');
        });
        it('Should return an empty string when it receives a number', () => {
            expect(stringFallback(3)).toStrictEqual('');
        });
    });
});
