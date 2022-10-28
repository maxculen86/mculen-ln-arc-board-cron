import { monthNames } from '../../../../../components/private/common/utils/dateAndTimeUtil';
import { weekDays } from '../../../../../components/private/common/utils/transformISODate';
import capitalizeFirstLetter from '../../../../../components/private/common/utils/capitalizeFirstLetter';

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

const createHolidaysArray = (data, calendarType, year) => {
    const arrayHolidaysTable = [];
    data.map(holiday => {
        const {
            month = '',
            holiday_day_contents: holidayDayContents = []
        } = holiday;
        return holidayDayContents.map(
            ({ days, reason, day_type_name: dayTypeName }) => {
                return calendarType === 1
                    ? arrayHolidaysTable.push({
                          date: `${days} de ${getMonthName(month)}`,
                          day: getNameDay(`${year}-${month}-${days}`),
                          reason,
                          dayTypeName
                      })
                    : arrayHolidaysTable.push({
                          ...(days.length <= 2
                              ? {
                                    date: `${days.join('-')} de ${getMonthName(
                                        month
                                    )}`,
                                    reason
                                }
                              : {
                                    date: `${days[0]}-${
                                        days[days.length - 1]
                                    } de ${getMonthName(month)}`,
                                    reason
                                })
                      });
            }
        );
    });
    return arrayHolidaysTable;
};

const filterHolidaysByType = ({ monthHolidays, holidayType = '' }) => {
    return monthHolidays.filter(month => month.dayTypeName === holidayType);
};

const convertHolidaysTable = (holidayArray, calendarType) => {
    if (!holidayArray.length) return null;
    const header = [
        {
            _id: 'header-date',
            content: 'Fecha'
        },
        ...(calendarType === 1
            ? [
                  {
                      _id: 'header-day',
                      content: 'Día'
                  }
              ]
            : []),
        {
            _id: 'header-reason',
            content: 'Conmemoración'
        }
    ];
    return {
        header,
        rows: holidayArray.map(holiday => [
            {
                content: holiday.date
            },
            ...(calendarType === 1 ? [{ content: holiday.day }] : []),
            {
                content: holiday.reason
            }
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
        ...(!(previousYear <= currentYear - 2) && {
            previous: {
                text: `${previousMonth} ${previousYear}`,
                url: `/feriados/${previousYear}/${previousMonth}/`
            }
        }),
        ...(!(nextYear >= currentYear + 2) && {
            next: {
                text: `${nextMonth} ${nextYear}`,
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

    const catholicHolidaysArray = createHolidaysArray(
        catholicMonthContents,
        catholicCalendarType,
        year
    );

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

    const jewishTable = createHolidaysArray(
        jewishMonthContents,
        jewishCalendarType
    );

    const getMonthData = (month, index) => {
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
                  ...getMonthData(month, index)
              })),
              tables: {
                  Trasladable: convertHolidaysTable(
                      transferableHolidays,
                      catholicCalendarType
                  ),
                  Inamovible: convertHolidaysTable(
                      unmovableHolidays,
                      catholicCalendarType
                  ),
                  Puente: convertHolidaysTable(
                      bridgeHolidays,
                      catholicCalendarType
                  ),
                  Judio: convertHolidaysTable(jewishTable, jewishCalendarType)
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

export {
    getMonthNumber,
    getMonthName,
    getNameDay,
    filterHolidaysByType,
    transformHolidays,
    previousAndNextDate,
    createHolidaysArray,
    convertHolidaysTable
};
