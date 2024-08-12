import msToTime from '../../../../../components/private/common/utils/millisecondsToTime';
describe('Components - Private - Common - Utils', () => {
    it('if duration is an empty string, it should return the expected format using 0', () => {
        const duration = '';
        expect(msToTime(duration)).toStrictEqual('PT0M0S');
    });
    it('should return to expected format if "duration" is a string of milliseconds', () => {
        const duration = '162493';
        expect(msToTime(duration)).toStrictEqual('PT2M42S');
    });
    it('should return to the expected format if "duration" is a number of seconds', () => {
        const duration = 3221;
        expect(msToTime(duration)).toStrictEqual('PT53M41S');
    });
});
