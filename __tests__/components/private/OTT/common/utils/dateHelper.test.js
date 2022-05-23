import dateHelper from '../../../../../../components/private/OTT/common/utils/dateHelper';

describe('Private - OTT - Common Utils- dateHelper test', () => {
    const { getVideoDateFormat, timeToIso8601 } = dateHelper;
    it('should test getVideoDateFormat func', () => {
        const testDate = '2022-05-01T15:21:00Z';
        expect(getVideoDateFormat(testDate)).toStrictEqual('1 MAYO 2022');
    });
    it('should test timeToIso8601 func', () => {
        expect(timeToIso8601(8124437)).toStrictEqual('T23H15M24S');
    });
});
