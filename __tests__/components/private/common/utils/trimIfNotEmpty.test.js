import trimIfNotEmpty from '../../../../../components/private/common/utils/trimIfNotEmpty';

describe('Components - private - common - utils - trimIfNotEmpty', () => {
    it('Should return the trimmed string when it receives a string with leading or trailing spaces', () => {
        expect(trimIfNotEmpty('test')).toStrictEqual('test');
        expect(trimIfNotEmpty(' test')).toStrictEqual('test');
        expect(trimIfNotEmpty(' test ')).toStrictEqual('test');
        expect(trimIfNotEmpty('test ')).toStrictEqual('test');
        expect(trimIfNotEmpty(' esto es un test ')).toStrictEqual(
            'esto es un test'
        );
    });

    it('Should return the same value when it receives a string empty, null, number or boolean', () => {
        expect(trimIfNotEmpty(null)).toStrictEqual(null);
        expect(trimIfNotEmpty('')).toStrictEqual('');
        expect(trimIfNotEmpty(1)).toStrictEqual(1);
        expect(trimIfNotEmpty(false)).toStrictEqual(false);
    });
});
