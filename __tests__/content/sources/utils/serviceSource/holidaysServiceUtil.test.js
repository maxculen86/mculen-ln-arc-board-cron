import 'regenerator-runtime/runtime';
import { render } from '@testing-library/react';
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
    getHolidaysDate,
    getHolidaysMetaData
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

const currentYear = new Date().getFullYear();
const previousYear = new Date().getFullYear() - 1;

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
            `https://arcservices.lanacion.com.ar/api/v1/feriados/${currentYear}`
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
    it('Should return zero', () => {
        expect(getMonthNumber('hola')).toBe(0);
        expect(getMonthNumber('')).toBe(0);
        expect(getMonthNumber('2')).toBe(0);
        expect(getMonthNumber()).toBe(0);
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
        const nextYear = new Date().getFullYear() + 1;
        const result = previousAndNextDate(nextYear, 'diciembre');
        expect(result).toStrictEqual({
            previous: {
                text: `noviembre ${nextYear}`,
                title: `Ir a feriados de noviembre del ${nextYear}`,
                url: `/feriados/${nextYear}/noviembre/`
            }
        });
    });
    test('Should return previous and next', () => {
        const result = previousAndNextDate(previousYear, 'diciembre');
        expect(result).toStrictEqual({
            next: {
                text: `enero ${currentYear}`,
                title: `Ir a feriados de enero del ${currentYear}`,
                url: `/feriados/${currentYear}/enero/`
            },
            previous: {
                text: `noviembre ${previousYear}`,
                title: `Ir a feriados de noviembre del ${previousYear}`,
                url: `/feriados/${previousYear}/noviembre/`
            }
        });
    });
    test('Should return previous and next even receiving year as string', () => {
        const result = previousAndNextDate(String(previousYear), 'diciembre');
        expect(result).toStrictEqual({
            next: {
                text: `enero ${currentYear}`,
                title: `Ir a feriados de enero del ${currentYear}`,
                url: `/feriados/${currentYear}/enero/`
            },
            previous: {
                text: `noviembre ${previousYear}`,
                title: `Ir a feriados de noviembre del ${previousYear}`,
                url: `/feriados/${previousYear}/noviembre/`
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
    test('Should return catholic table with reason row for unmovable holiday type', () => {
        const mockCatholicTable = [
            {
                date: '1 de enero',
                day: 'Sábado',
                reason: 'Año nuevo'
            }
        ];
        const response = convertHolidaysTable({
            holidayArray: mockCatholicTable,
            calendarType: 1,
            holidayNameType: 'Inamovible'
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
    test('Should return catholic table without reason row for bridge holiday type', () => {
        const mockCatholicTable = [
            {
                date: '17 de junio',
                day: 'Viernes',
                reason: 'Feriado Puente Turístico'
            }
        ];
        const response = convertHolidaysTable({
            holidayArray: mockCatholicTable,
            calendarType: 1,
            holidayNameType: 'Puente'
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
                }
            ],
            rows: [
                [
                    {
                        content: '17 de junio'
                    },
                    {
                        content: 'Viernes'
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

describe('Test getHolidaysMetaData', () => {
    it('Should return the correct metadata of the month detail', () => {
        expect(getHolidaysMetaData('enero')('2023', 'enero')).toStrictEqual({
            description:
                'Calendario de feriados nacionales en enero de 2023 en Argentina: días no laborables, fines de semana largo y feriados puente en LA NACION.',
            paragraph:
                'Enero solo tiene un feriado: el Año Nuevo se festeja en su primer día, y es la única jornada de asueto generalizado en el primer mes del año. Enero no tiene días no laborables, aunque por lo general es un período de descanso para los más chicos al coincidir con las vacaciones de verano escolares.',
            title:
                'Feriados en enero de 2023 en Argentina. Calendario 2023 - LA NACION'
        });
    });
    it('Should return the correct default metadata of the month detail', () => {
        expect(getHolidaysMetaData('mayo')('2024', 'mayo')).toStrictEqual({
            description:
                'Calendario de feriados nacionales en mayo de 2024 en Argentina: días no laborables, fines de semana largo y feriados puente en LA NACION.',
            paragraph:
                'Todos los días no laborables de mayo del 2024, asuetos, cuáles son feriados inamovibles y por qué no se trabaja esos días, cuáles podrían cambiar de día, los días feriados puente y por qué son feriados para mayo del 2024. Cuándo es fin de semana largo en 2024. Calendario completo con todas las fechas patrias de la Argentina.',
            title:
                'Feriados en mayo de 2024 en Argentina. Calendario 2024 - LA NACION'
        });
    });
    it('Should return the correct metadata of the calendar home', () => {
        expect(getHolidaysMetaData()('2022')).toStrictEqual({
            title:
                'Feriados 2022 en Argentina: Calendario de feriados nacionales - LA NACION',
            description:
                'Calendario de feriados nacionales 2022 en Argentina: días no laborables, fines de semana largo y feriados puente del 2022 y 2023 en LA NACION.'
        });
    });
    it('Should return the correct metadata for the year current of the calendar home', () => {
        expect(getHolidaysMetaData()()).toStrictEqual({
            title:
                'Feriados 2024 en Argentina: Calendario de feriados nacionales - LA NACION',
            description:
                'Calendario de feriados nacionales 2024 en Argentina: días no laborables, fines de semana largo y feriados puente del 2024 y 2025 en LA NACION.'
        });
    });
});
describe('Test getUri function', () => {
    it('Should return endpoint with the year', () => {
        expect(
            getUri({ service: 'feriados', serviceItem: '2023' })
        ).toStrictEqual(
            'https://arcservices.lanacion.com.ar/api/v1/feriados/2023'
        );
    });
    it('Should return endpoint with the current year', () => {
        const mockDate = new Date(2024, 6, 1);
        const spy = jest
            .spyOn(global, 'Date')
            .mockImplementation(() => mockDate);
        expect(getUri({ service: 'feriados' })).toStrictEqual(
            'https://arcservices.lanacion.com.ar/api/v1/feriados/2024'
        );
        spy.mockRestore();
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

describe('Test transform holidays ', () => {
    const data = {
        dataService: mockHolidays,
        serviceType: 'feriados-año'
    };
    it('Check transform function for holidays home template', () => {
        expect(transform(data)).toStrictEqual(outputTransformHome);
    });
    it('Check transform function for holidays año template', () => {
        const dataYear = { ...data, serviceItem: 2024 };
        expect(transform(dataYear)).toStrictEqual({
            ...outputTransformHome,
            serviceItem: 2024,
            metaData: {
                description:
                    'Calendario de feriados nacionales 2024 en Argentina: días no laborables, fines de semana largo y feriados puente del 2024 y 2025 en LA NACION.',
                title:
                    'Feriados 2024 en Argentina: Calendario de feriados nacionales - LA NACION'
            }
        });
    });
    it.skip('Check transform function in month without holidays ', () => {
        expect(
            transform({
                dataService: inputMonthWithoutHolidays,
                serviceType: 'feriados-mes',
                serviceItem: '2022',
                serviceSubItem: 'noviembre'
            })
        ).toStrictEqual(outputMonthWithoutHolidays);
    });
    it.skip('Check transform function in month with holidays', () => {
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
