import isWebview from '../../../../../components/private/common/utils/isWebview';
describe('common - utils - isWebview', () => {
    it('should return true if agent includes wv', () => {
        expect(isWebview('wv')).toStrictEqual(true);
    });
    it('should return true if agent is ios', () => {
        expect(
            isWebview(
                'Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/98176'
            )
        ).toStrictEqual(true);
    });

    it('should return false if agent does not meet with requirements', () => {
        expect(isWebview('')).toStrictEqual(false);
    });
});
