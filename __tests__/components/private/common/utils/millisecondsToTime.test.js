import msToTime from '../../../../../components/private/common/utils/millisecondsToTime';
describe('Components - Private - Common - Utils', () => {
    it('if duration is an empty string, it should return the expected format using 0', () => {
        const duration = '';
        expect(msToTime(duration)).toStrictEqual('PT0M0S');
    });
    it('should return to expected format', () => {
        const duration = '162493';
        expect(msToTime(duration)).toStrictEqual('PT2M42S');
    });
});
