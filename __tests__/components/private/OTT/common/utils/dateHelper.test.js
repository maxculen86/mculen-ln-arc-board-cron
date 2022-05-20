import dateHelper from '../../../../../../components/private/OTT/common/utils/dateHelper';

describe('Private - OTT - Common Utils- dateHelper test', () => {
    const { getVideoDateFormat } = dateHelper;
    it('should return corresponding date', () => {
        const testDate = '2022-05-01T15:21:00Z';
        expect(getVideoDateFormat(testDate)).toStrictEqual('1 MAYO 2022');
    });
});
