import {
    counterNota,
    getAndSaveCustomDimension,
    filterNotesWithinDays
} from '../../../../../components/private/common/utils/storage';

beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    jest.spyOn(window.localStorage.__proto__, 'setItem');
});

afterEach(() => {
    localStorage.getItem.mockRestore();
    localStorage.setItem.mockRestore();
});

describe('Common - Utils - Storage', () => {
    const idNota = '6Q4WDU7YVJBEZEOLSQEIK3YCYI';
    const today = new Date();
    const fecha = `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}`;

    it('counterNota deberia llamar a localStorage', () => {
        counterNota(idNota);
        expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(window.localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
            'NotasCounterData',
            `[{\"notaId\":\"${idNota}\",\"fecha\":\"${fecha}\"}]`
        );
    });

    it('getAndSaveCustomDimension deberia llamar a localStorage', () => {
        getAndSaveCustomDimension();

        expect(window.localStorage.setItem).toHaveBeenCalledTimes(7);
    });

    it('filterNotesWithinDays deberia filtrar nota anterior a 28 dias', () => {
        const notasCounter = [
            { notaId: '6Q4WDU7YVJBEZEOLSQEIK3YCYI', fecha: '2020-6-5' },
            { notaId: 'AVYWDWDAVVESZGD7HXMW46GTYA', fecha: '2020-8-4' },
            { notaId: 'SONLF2WL3JAPRINOFCPEDZE5Y4', fecha: '2020-8-4' },
            { notaId: 'O6VUCJ32TRG37LUFMGRFVBETBM', fecha: '2020-8-4' }
        ];
        const newNotasCounter = filterNotesWithinDays(notasCounter, 1);

        expect(newNotasCounter.length).toBe(0);
        expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
            'DayCheckCounter',
            today.getDate()
        );
    });
});
