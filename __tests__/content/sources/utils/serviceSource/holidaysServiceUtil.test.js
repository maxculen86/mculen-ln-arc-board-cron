import 'regenerator-runtime/runtime';
import { LANACION_SERVICES_URL } from 'fusion:environment';
import mockFilterHolidays from '../../../../../__mocks__/data/holidays/mockFilterHolidays.json';
import mockHolidays from '../../../../../__mocks__/data/holidays/mockHolidays.json';
import mockCatholicAndJewishHoliday from '../../../../../__mocks__/data/holidays/mockCatholicAndJewishHoliday.json';
import outputTransformHome from '../../../../../__mocks__/data/holidays/outputTransformHome.json';
import inputMonthWithoutHolidays from '../../../../../__mocks__/data/holidays/inputMonthWithoutHolidays.json';
import outputMonthWithoutHolidays from '../../../../../__mocks__/data/holidays/outputMonthWithoutHolidays.json';
import inputMonthWithHolidays from '../../../../../__mocks__/data/holidays/inputMonthWithHolidays.json';
import outputMonthWithHolidays from '../../../../../__mocks__/data/holidays/outputMonthWithHolidays.json';
import error404 from '../../../../../__mocks__/data/logger/error404.json';
import holidays from '../../../../../content/sources/utils/servicesSource/holidays/holidays';
import {
    getMonthNumber,
    getMonthName,
    getNameDay,
    filterHolidaysByType,
    previousAndNextDate,
    createHolidaysArray,
    convertHolidaysTable,
    getNextHolidayData,
    getHolidaysDate
} from '../../../../../content/sources/utils/servicesSource/holidays/holidaysHelper';

const mockResponse = Promise.resolve(mockCatholicAndJewishHoliday);

const {
    getUri,
    request: holidayRequest,
    reject,
    getTemplates,
    transform
} = holidays;

jest.mock('request-promise-native', () => {
    return {
        __esModule: true,
        default: () => mockResponse
    };
});

describe('Test getUri function', () => {
    it('Should return endpoint with the year', () => {
        expect(
            getUri({ service: 'feriados', serviceItem: '2022' })
        ).toStrictEqual(
            'https://arcservices.lanacion.com.ar/api/v1/feriados/2022'
        );
    });
    it('Should return endpoint with the current year', () => {
        expect(getUri({ service: 'feriados' })).toStrictEqual(
            'https://arcservices.lanacion.com.ar/api/v1/feriados/2022'
        );
    });

    it('Should return endpoint with the month detail', () => {
        expect(
            getUri({
                service: 'feriados',
                serviceItem: '2022',
                serviceSubItem: 'mayo'
            })
        ).toStrictEqual(
            'https://arcservices.lanacion.com.ar/api/v1/feriados/2022/5'
        );
    });
    it('Should return error', () => {
        expect(() => {
            getUri({});
        }).toThrow(
            'No está solicitado ningún feriado o el feriado que desea solicitar no existe.'
        );
    });
});

describe('Tests holidays request', () => {
    it('Should return data from the request', () => {
        const queryObj = { service: 'feriados' };
        const req = { queryData: queryObj, auth: {} };

        expect(holidayRequest(req)).toStrictEqual(mockResponse);
    });
});

describe('Tests reject function', () => {
    it('Should reject request', () => {
        const error = { error: error404, uri: '', arcSite: '' };
        expect(() => {
            reject(error);
        }).toThrow();
    });
});

describe('Tests getTemplates function', () => {
    it('Should return string "feriados-mes" as serviceType', () => {
        expect(getTemplates('2022', 'mayo')).toStrictEqual('feriados-mes');
    });
    it('Should return string "feriados-año" as serviceType', () => {
        expect(getTemplates('2022')).toStrictEqual('feriados-año');
        expect(getTemplates('')).toStrictEqual('feriados-año');
        expect(getTemplates()).toStrictEqual('feriados-año');
    });
});

describe('Test getMonthNumber helperFunction', () => {
    it('Should return number', () => {
        expect(getMonthNumber('diciembre')).toBe(12);
    });
    it('Should return string', () => {
        expect(getMonthNumber('hola')).toBe('');
        expect(getMonthNumber('')).toBe('');
        expect(getMonthNumber('2')).toBe('');
        expect(getMonthNumber()).toBe('');
    });
});

describe('Test getMonthName helperFunction', () => {
    it('Should return name', () => {
        expect(getMonthName(5)).toBe('mayo');
    });
    it('Should return string', () => {
        expect(getMonthName('enero')).toBe('');
        expect(getMonthName('')).toBe('');
        expect(getMonthName()).toBe('');
    });
});

describe('Test getNameDay helperFunction', () => {
    it('Should return name', () => {
        expect(getNameDay('2022-10-25')).toBe('Martes');
    });
});

describe('Test filterHolidaysByType helperFuction', () => {
    test('Should return holidays type = Puente', () => {
        const filter = filterHolidaysByType({
            monthHolidays: mockFilterHolidays,
            holidayType: 'Puente'
        });
        expect(filter).toHaveLength(1);
    });
    test('Should return holidays type = Trasladable', () => {
        const filter = filterHolidaysByType({
            monthHolidays: mockFilterHolidays,
            holidayType: 'Trasladable'
        });
        expect(filter).toHaveLength(1);
    });
    test('Should return holidays type = Inamovible', () => {
        const filter = filterHolidaysByType({
            monthHolidays: mockFilterHolidays,
            holidayType: 'Inamovible'
        });
        expect(filter).toHaveLength(8);
    });
});
describe('Test previousAndNextDate helperFuction', () => {
    test('Should return only next for border case', () => {
        const result = previousAndNextDate(2021, 'enero');
        expect(result).toStrictEqual({
            next: {
                text: 'febrero 2021',
                title: 'Ir a feriados de febrero del 2021',
                url: '/feriados/2021/febrero/'
            }
        });
    });
    test('Should return only previous for border case', () => {
        const result = previousAndNextDate(2023, 'diciembre');
        expect(result).toStrictEqual({
            previous: {
                text: 'noviembre 2023',
                title: 'Ir a feriados de noviembre del 2023',
                url: '/feriados/2023/noviembre/'
            }
        });
    });
    test('Should return previous and next', () => {
        const result = previousAndNextDate(2021, 'diciembre');
        expect(result).toStrictEqual({
            next: {
                text: 'enero 2022',
                title: 'Ir a feriados de enero del 2022',
                url: '/feriados/2022/enero/'
            },
            previous: {
                text: 'noviembre 2021',
                title: 'Ir a feriados de noviembre del 2021',
                url: '/feriados/2021/noviembre/'
            }
        });
    });
    test('Should return previous and next even receiving year as string', () => {
        const result = previousAndNextDate('2021', 'diciembre');
        expect(result).toStrictEqual({
            next: {
                text: 'enero 2022',
                title: 'Ir a feriados de enero del 2022',
                url: '/feriados/2022/enero/'
            },
            previous: {
                text: 'noviembre 2021',
                title: 'Ir a feriados de noviembre del 2021',
                url: '/feriados/2021/noviembre/'
            }
        });
    });
});

describe('Test createHolidaysArray helperFuction', () => {
    const { holidays } = mockCatholicAndJewishHoliday;
    const { 0: catholicHolidays, 1: jewishHolidays } = holidays;
    const {
        holiday_month_contents: catholicMonthContents,
        year,
        calendar_type: catholicCalendarType
    } = catholicHolidays;
    const {
        holiday_month_contents: jewishMonthContents,
        calendar_type: jewishCalendarType
    } = jewishHolidays;

    test('Should return catholic array', () => {
        const response = createHolidaysArray({
            data: catholicMonthContents,
            calendarType: catholicCalendarType,
            year
        });
        expect(response).toStrictEqual([
            {
                date: '1 de enero',
                day: 'Sábado',
                reason: 'Año nuevo',
                dayTypeName: 'Inamovible'
            }
        ]);
    });
    test('Should return jewish array', () => {
        const response = createHolidaysArray({
            data: jewishMonthContents,
            calendarType: jewishCalendarType
        });
        expect(response).toStrictEqual([
            {
                date: '2-9 de octubre',
                reason: 'Sucot'
            },
            {
                date: '11 de octubre',
                reason: 'Simjat Torá (Purim)'
            }
        ]);
    });
});

describe('Test convertHolidaysTable helperFuction', () => {
    test('Should return catholic table', () => {
        const mockCatholicTable = [
            {
                date: '1 de enero',
                day: 'Sábado',
                reason: 'Año nuevo',
                dayTypeName: 'Inamovible'
            }
        ];
        const response = convertHolidaysTable({
            holidayArray: mockCatholicTable,
            calendarType: 1
        });
        expect(response).toStrictEqual({
            header: [
                {
                    _id: 'header-date',
                    content: 'Fecha'
                },
                {
                    _id: 'header-day',
                    content: 'Día'
                },
                {
                    _id: 'header-reason',
                    content: 'Conmemoración'
                }
            ],
            rows: [
                [
                    {
                        content: '1 de enero'
                    },
                    {
                        content: 'Sábado'
                    },
                    {
                        content: 'Año nuevo'
                    }
                ]
            ]
        });
    });
    test('Should return jewish table', () => {
        const mockJewishTable = [
            {
                date: '10 de febrero',
                reason: 'Tou BiChvat'
            }
        ];
        const response = convertHolidaysTable({
            holidayArray: mockJewishTable,
            calendarType: 2
        });
        expect(response).toStrictEqual({
            header: [
                {
                    _id: 'header-date',
                    content: 'Fecha'
                },
                {
                    _id: 'header-reason',
                    content: 'Conmemoración'
                }
            ],
            rows: [
                [
                    {
                        content: '10 de febrero'
                    },
                    {
                        content: 'Tou BiChvat'
                    }
                ]
            ]
        });
    });
});

describe('Test transform holidays ', () => {
    const data = {
        dataService: mockHolidays,
        serviceType: 'feriados-año'
    };
    it('Check transform function for holidays home template', () => {
        expect(transform(data)).toStrictEqual(outputTransformHome);
    });
    it('Check transform function for holidays año template', () => {
        const dataYear = { ...data, serviceItem: 2023 };
        expect(transform(dataYear)).toStrictEqual({
            ...outputTransformHome,
            serviceItem: 2023,
            metaData: {
                description:
                    'Calendario de feriados nacionales 2023 en Argentina: días no laborables, fines de semana largo y feriados puente del 2023 y 2024 en LA NACION.',
                title:
                    'Feriados 2023 en Argentina: Calendario de feriados nacionales - LA NACION'
            }
        });
    });
    it('Check transform function in month without holidays ', () => {
        expect(
            transform({
                dataService: inputMonthWithoutHolidays,
                serviceType: 'feriados-mes',
                serviceItem: '2022',
                serviceSubItem: 'noviembre'
            })
        ).toStrictEqual(outputMonthWithoutHolidays);
    });
    it('Check transform function in month with holidays', () => {
        expect(
            transform({
                dataService: inputMonthWithHolidays,
                serviceType: 'feriados-mes',
                serviceItem: '2022',
                serviceSubItem: 'mayo'
            })
        ).toStrictEqual(outputMonthWithHolidays);
    });
});

describe('Test next holiday data generation with getNextHolidayData', () => {
    const {
        dataService: { calendars }
    } = outputTransformHome;

    describe('When current date is a holiday, should return next holiday', () => {
        it('On christmas should return new year', () => {
            const mockDateObject = new Date(2022, 11, 25);
            const spy = jest
                .spyOn(global, 'Date')
                .mockImplementation(() => mockDateObject);

            expect(getNextHolidayData(calendars)).toStrictEqual({
                countdown: 0,
                day: 1,
                monthName: 'Enero',
                reason: 'Año nuevo',
                typeHoliday: 'Inamovible'
            });
            spy.mockRestore();
        });
    });
    describe('When current date is not holiday, should return upcoming holiday', () => {
        it('On first of july should return independency day', () => {
            const mockDateObject = new Date(2022, 6, 1);
            const spy = jest
                .spyOn(global, 'Date')
                .mockImplementation(() => mockDateObject);

            expect(getNextHolidayData(calendars)).toStrictEqual({
                countdown: 0,
                day: 9,
                monthName: 'Julio',
                reason: 'Día de la Independencia.',
                typeHoliday: 'Inamovible'
            });
            spy.mockRestore();
        });
    });
});

describe('Tests getHolidaysDate', () => {
    it('Should return correct format for date when the array has more than two days', () => {
        expect(getHolidaysDate([1, 2, 3, 4], 4)).toStrictEqual('1-4 de abril');
    });
    it('Should return correct format for date when the array has two days', () => {
        expect(getHolidaysDate([5, 6], 6)).toStrictEqual('5-6 de junio');
    });
    it('Should return correct format for date with only one day', () => {
        expect(getHolidaysDate([23], 11)).toStrictEqual('23 de noviembre');
    });
});
