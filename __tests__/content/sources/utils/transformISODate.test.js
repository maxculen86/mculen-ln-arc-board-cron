import transformISODate from '../../../../components/private/common/utils/transformISODate';

describe('Transform ISO Date funciton test', () => {
    const date = '2022-03-03T21:00:00';
    it('should transform date in dd/mm/yyyy', () => {
        expect(transformISODate(date)).toStrictEqual('03/03/2022');
    });
    it('should transform date in dd/mm', () => {
        expect(transformISODate(date, 'dd/mm')).toStrictEqual('03/03');
    });
});
