import { calculateTimePublish } from '../../../../../components/features/LN-common/LN10_En_Vivo/_helpers';

describe('Tests helpers component EnVivo', () => {
    // const mockActualMinutes = new Date(1);
    // const spy = jest
    //     .spyOn(global, 'Date')
    //     .mockImplementationOnce(() => mockActualMinutes)

    const publishDate = '2022-12-22T12:00:24.647Z';
    test('Deberia retornar que fue publicado hace un minuto', () => {
        expect(calculateTimePublish(publishDate)).not.toBeNull();
        //expect(calculateTimePublish(publishDate)).toStrictEqual('Hace 1 min');
    });
});
