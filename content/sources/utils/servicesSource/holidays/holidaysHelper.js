import {
    monthNames,
    datesDiffInDays,
    getSpecificDate
} from '../../../../../components/private/common/utils/dateAndTimeUtil';
import get from '../../../../../components/private/common/utils/get';
import { weekDays } from '../../../../../components/private/common/utils/transformISODate';
import capitalizeFirstLetter from '../../../../../components/private/common/utils/capitalizeFirstLetter';
import monthsDescriptions from './_config';

const CATHOLIC = 1;

export const getHolidaysMetaData = serviceSubItem => {
    if (serviceSubItem)
        return get(metaDataFactory, 'mes', metaDataFactory.default);

    return get(metaDataFactory, 'home', metaDataFactory.default);
};

const metaDataFactory = {
    home: serviceItem => {
        const year = Number(serviceItem) || new Date().getFullYear();
        return {
            title: `Feriados ${year} en Argentina: Calendario de feriados nacionales - LA NACION`,
            description: `Calendario de feriados nacionales ${year} en Argentina: días no laborables, fines de semana largo y feriados puente del ${year} y ${year +
                1} en LA NACION.`
        };
    },
    mes: (serviceItem, serviceSubItem) => {
        if (serviceItem === '2021') {
            return {
                title: `Feriados en ${serviceSubItem} de ${serviceItem} en Argentina. Calendario ${serviceItem} - LA NACION`,
                description: `Calendario de feriados nacionales en ${serviceSubItem} de ${serviceItem} en Argentina: días no laborables, fines de semana largo y feriados puente en LA NACION.`,
                paragraph: monthsDescriptions[serviceItem]
            };
        }
        return {
            title: `Feriados en ${serviceSubItem} de ${serviceItem} en Argentina. Calendario ${serviceItem} - LA NACION`,
            description: `Calendario de feriados nacionales en ${serviceSubItem} de ${serviceItem} en Argentina: días no laborables, fines de semana largo y feriados puente en LA NACION.`,
            paragraph: get(
                monthsDescriptions[serviceItem],
                `.${serviceSubItem}`,
                ''
            )
        };
    },
    default: serviceItem => {
        const year = Number(serviceItem) || new Date().getFullYear();
        return {
            title: 'Feriados por LA NACION',
            description: `Todos los feriados de ${year} por LA NACION`
        };
    }
};

const getMonthNumber = (monthString = '') => {
    return monthNames.indexOf(monthString) !== -1
        ? monthNames.indexOf(monthString) + 1
        : '';
};
const getMonthName = monthNumber => {
    if (typeof monthNumber !== 'number') return '';
    return monthNames[monthNumber - 1] || 'diciembre';
};

const getNameDay = date => {
    const numberDay = new Date(date).getUTCDay();
    return weekDays[numberDay];
};

const getHolidaysDate = (days, month) => {
    return days.length < 2
        ? `${days} de ${getMonthName(month)}`
        : `${days[0]}-${days[days.length - 1]} de ${getMonthName(month)}`;
};

const createHolidaysArray = ({ data = [], calendarType, year }) => {
    const arrayHolidaysTable = [];
    data.forEach(holiday => {
        const {
            month = '',
            holiday_day_contents: holidayDayContents = []
        } = holiday;
        holidayDayContents.forEach(
            ({ days, reason, day_type_name: dayTypeName }) => {
                return calendarType === CATHOLIC
                    ? arrayHolidaysTable.push({
                          date: `${days} de ${getMonthName(month)}`,
                          day: getNameDay(`${year}-${month}-${days}`),
                          ...(dayTypeName !== 'Puente' && { reason }),
                          dayTypeName
                      })
                    : arrayHolidaysTable.push({
                          reason,
                          date: getHolidaysDate(days, month)
                      });
            }
        );
    });
    return arrayHolidaysTable;
};

const filterHolidaysByType = ({ monthHolidays = [], holidayType = '' }) => {
    return monthHolidays.filter(month => month.dayTypeName === holidayType);
};

const convertHolidaysTable = ({
    holidayArray = [],
    calendarType,
    holidayNameType
}) => {
    if (!holidayArray.length) return undefined;
    const header = [
        {
            _id: 'header-date',
            content: 'Fecha'
        },
        ...(calendarType === CATHOLIC
            ? [
                  {
                      _id: 'header-day',
                      content: 'Día'
                  }
              ]
            : []),
        ...(holidayNameType !== 'Puente'
            ? [
                  {
                      _id: 'header-reason',
                      content: 'Conmemoración'
                  }
              ]
            : [])
    ];
    return {
        header,
        rows: holidayArray.map(holiday => [
            {
                content: holiday.date
            },
            ...(calendarType === CATHOLIC ? [{ content: holiday.day }] : []),
            ...(holidayNameType !== 'Puente'
                ? [{ content: holiday.reason }]
                : [])
        ])
    };
};
const previousAndNextDate = (year, month) => {
    const numericYear = Number(year);
    const previousMonthNumber = getMonthNumber(month) - 1 || 12;
    const previousMonthName = getMonthName(previousMonthNumber);

    const nextMonthNumber =
        month !== 'diciembre' ? getMonthNumber(month) + 1 : 1;

    const nextMonthName = getMonthName(nextMonthNumber);

    return validateNextAndPreviousDate(
        nextMonthName,
        previousMonthName,
        numericYear
    );
};

const validateNextAndPreviousDate = (nextMonth, previousMonth, numericYear) => {
    const currentYear = new Date().getFullYear();
    const previousYear =
        previousMonth === 'diciembre' ? numericYear - 1 : numericYear;
    const nextYear = nextMonth === 'enero' ? numericYear + 1 : numericYear;
    return {
        ...(previousYear > currentYear - 2 && {
            previous: {
                text: `${previousMonth} ${previousYear}`,
                title: `Ir a feriados de ${previousMonth} del ${previousYear}`,
                url: `/feriados/${previousYear}/${previousMonth}/`
            }
        }),
        ...(nextYear < currentYear + 2 && {
            next: {
                text: `${nextMonth} ${nextYear}`,
                title: `Ir a feriados de ${nextMonth} del ${nextYear}`,
                url: `/feriados/${nextYear}/${nextMonth}/`
            }
        })
    };
};

const transformHolidays = (
    dataService,
    serviceType,
    serviceItem,
    serviceSubItem
) => {
    if (!dataService) return {};
    const { holidays = [] } = dataService;

    const { 0: catholicHolidays = {}, 1: jewishHolidays = {} } = holidays;
    const {
        holiday_month_contents: catholicMonthContents = [],
        year = '',
        calendar_type: catholicCalendarType = ''
    } = catholicHolidays;
    const {
        holiday_month_contents: jewishMonthContents = [],
        calendar_type: jewishCalendarType = ''
    } = jewishHolidays;

    const catholicHolidaysArray = createHolidaysArray({
        data: catholicMonthContents,
        calendarType: catholicCalendarType,
        year
    });

    const unmovableHolidays = filterHolidaysByType({
        monthHolidays: catholicHolidaysArray,
        holidayType: 'Inamovible'
    });

    const transferableHolidays = filterHolidaysByType({
        monthHolidays: catholicHolidaysArray,
        holidayType: 'Trasladable'
    });

    const bridgeHolidays = filterHolidaysByType({
        monthHolidays: catholicHolidaysArray,
        holidayType: 'Puente'
    });

    const jewishTable = createHolidaysArray({
        data: jewishMonthContents,
        calendarType: jewishCalendarType
    });

    const getMonthData = index => {
        const monthDataIndex = catholicMonthContents.findIndex(
            x => x.month === index + 1
        );
        return monthDataIndex !== -1
            ? {
                  holidayData:
                      catholicMonthContents[monthDataIndex].holiday_day_contents
              }
            : {};
    };

    return serviceType.includes('año')
        ? {
              calendars: monthNames.map((month, index) => ({
                  monthNumber: index + 1,
                  monthName: capitalizeFirstLetter(month),
                  ...getMonthData(index)
              })),
              tables: {
                  Trasladable: convertHolidaysTable({
                      holidayArray: transferableHolidays,
                      calendarType: catholicCalendarType,
                      holidayNameType: 'Trasladable'
                  }),
                  Inamovible: convertHolidaysTable({
                      holidayArray: unmovableHolidays,
                      calendarType: catholicCalendarType,
                      holidayNameType: 'Inamovible'
                  }),
                  Puente: convertHolidaysTable({
                      holidayArray: bridgeHolidays,
                      calendarType: catholicCalendarType,
                      holidayNameType: 'Puente'
                  }),
                  Judio: convertHolidaysTable({
                      holidayArray: jewishTable,
                      calendarType: jewishCalendarType
                  })
              }
          }
        : {
              calendar: {
                  monthNumber: getMonthNumber(serviceSubItem),
                  monthName: capitalizeFirstLetter(serviceSubItem),
                  monthHolidays: catholicMonthContents
              },
              previousAndNextCalendar: previousAndNextDate(
                  serviceItem,
                  serviceSubItem
              )
          };
};

const getNextHolidayData = monthsArray => {
    if (!monthsArray || !monthsArray.length) return undefined;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const actualMonth = currentDate.getMonth();
    const actualDay = currentDate.getDate();

    const isNotCurrentDay = (holidays, month) =>
        (Array.isArray(holidays.days) &&
            holidays.days.some(day => day > actualDay)) ||
        month - 1 > actualMonth;

    const nextHolidays =
        monthsArray
            .slice(actualMonth)
            .filter(month => Array.isArray(month.holidayData))
            .find(month =>
                month.holidayData.some(holiday =>
                    isNotCurrentDay(holiday, month.monthNumber)
                )
            ) || {};

    if (Object.keys(nextHolidays).length) {
        const { monthNumber, monthName, holidayData } = nextHolidays;

        const correctHoliday = holidayData.find(holiday =>
            isNotCurrentDay(holiday, monthNumber)
        );
        const day = get(correctHoliday, 'days[0]', '');

        return {
            countdown: datesDiffInDays(
                currentDate,
                getSpecificDate(currentYear, monthNumber, day)
            ),
            monthName,
            day,
            reason: get(correctHoliday, 'reason', ''),
            typeHoliday: get(correctHoliday, 'day_type_name', '')
        };
    }
    return {
        countdown: datesDiffInDays(
            currentDate,
            getSpecificDate(currentYear + 1, 1, 1)
        ),
        monthName: 'Enero',
        day: 1,
        reason: 'Año nuevo',
        typeHoliday: 'Inamovible'
    };
};

export {
    getMonthNumber,
    getMonthName,
    getNameDay,
    filterHolidaysByType,
    transformHolidays,
    previousAndNextDate,
    createHolidaysArray,
    convertHolidaysTable,
    getNextHolidayData,
    getHolidaysDate
};
