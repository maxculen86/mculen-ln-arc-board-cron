import canonicalIdChecker from '../../../../../components/private/common/utils/canonicalIdChecker';

describe('Test canonicalIDChecker', () => {
    const mockDate = new Date(2024, 6, 1);
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    it('Should return the same Id that it receives if incorrect', () => {
        expect(canonicalIdChecker('/economía')).toStrictEqual('/economía');
    });
    it('Should return /feriados when the correct Id is received', () => {
        expect(canonicalIdChecker('/feriados/2024')).toStrictEqual('/feriados');
    });
    it('Should return the same Id that it receives if incorrect', () => {
        expect(canonicalIdChecker('/feriados/2025')).toStrictEqual(
            '/feriados/2025'
        );
    });
});
