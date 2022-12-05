import capitalizeFirstLetter from './capitalizeFirstLetter';

export const monthNames = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
];

export const getSpecificDate = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    return isNaN(date.getMonth()) ? null : date;
};

export function datesDiffInDays(firstDate, secondDate) {
    if (
        !firstDate ||
        typeof firstDate !== 'object' ||
        isNaN(firstDate.getMonth()) ||
        !secondDate ||
        typeof secondDate !== 'object' ||
        isNaN(secondDate.getMonth())
    )
        return null;
    return Math.ceil((secondDate - firstDate) / (1000 * 3600 * 24));
}

export function formatDate(originalDate) {
    // TODO: en  el render desde el cliente toma la hora del mismo,
    // cuando es ssr toma la hora del servidor.

    const date =
        typeof window === 'object'
            ? originalDate
            : formatDateTreeHoursMore(originalDate);

    const month = setMonth({ date });

    return `${date.getDate()} de ${month} de ${date.getFullYear()}`;
}

const setDay = date => {
    const day = String(date.getDate());
    return day < 10 ? day.padStart(2, '0') : day;
};

const setMonth = ({ date, capitalize }) => {
    const month = date.getMonth();
    const name = monthNames[month];

    return capitalize ? capitalizeFirstLetter(name) : name;
};

export const formatDateWithoutAddingHours = ({ date, capitalize }) => {
    const day = setDay(date);
    const month = setMonth({ date, capitalize });
    const year = date.getFullYear();

    return `${day} de ${month} de ${year}`;
};

export const getTodayDateForAcuDolar = () => {
    const date = new Date();

    const monthIndex = date.getMonth();
    const month = monthNames[monthIndex];
    const day = date.getDate();
    return `${day} de ${month}`;
};

function formatDateHoursAndMint(originalDate) {
    const date = formatDateTreeHoursMore(originalDate);
    const formatHours = `00${date.getHours()}`.slice(-2);
    const formatMinutes = `00${date.getMinutes()}`.slice(-2);
    return `${formatHours}:${formatMinutes}`;
}

function formatDateHoursMinAndSecond(originalDate) {
    const date = formatDateTreeHoursMore(originalDate);
    const formatSeconds = `00${date.getSeconds()}`.slice(-2);
    return `${formatDateHoursAndMint(originalDate)}:${formatSeconds}`;
}

export function formatDateTreeHoursMore(originalDate) {
    return new Date(originalDate - 3600000 * 3);
}

function formatMonthDigits(originalDate) {
    const mont = originalDate.getMonth() + 1;
    if (mont < 10) {
        return `0${mont}`;
    }

    return mont;
}

export function formatYearMontDayDate(originalDate) {
    const date = formatDateTreeHoursMore(originalDate);
    return `${date.getFullYear()}-${formatMonthDigits(date)}-${date.getDate()}`;
}

/**
 * helper para formatear fecha y tiempo
 * @param {string} date
 */
export default function dateAndTimeUtil(displayDate) {
    return {
        date: formatDate(new Date(displayDate)),
        time: formatDateHoursAndMint(new Date(displayDate))
    };
}

/**
 * helper para formatear fecha y hora JSON APPS
 * @param {string} date
 */
export function dateAndTimeForAppsUtil(displayDate) {
    if (displayDate) {
        return `${formatYearMontDayDate(
            new Date(displayDate)
        )} ${formatDateHoursMinAndSecond(new Date(displayDate))}`;
    }
    return displayDate;
}

export function hasFutureDisplayDate(displayDate = '') {
    const dateInJS = new Date(displayDate);
    return dateInJS > new Date();
}

export function isOlderThanXHoursAgo(date, hours) {
    const oneDay = 1000 * 60 * 60 * hours;
    const aHoursAgo = Date.now() - oneDay;
    const dateInJS = new Date(date);
    return dateInJS < aHoursAgo;
}

export function addHoursAndFormat(hours, originalDate) {
    const dateInJS = addHours(hours, originalDate);
    return convertToFormat(dateInJS);
}

export function addHours(hours, originalDate) {
    const dateInJS = new Date(originalDate);
    dateInJS.setHours(dateInJS.getHours() + hours);
    return dateInJS;
}

export function convertToFormat(dateInJS) {
    return `${dateInJS
        .getFullYear()
        .toString()
        .padStart(4, '0')}-${(dateInJS.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${dateInJS
        .getDate()
        .toString()
        .padStart(2, '0')}T${dateInJS
        .getHours()
        .toString()
        .padStart(2, '0')}:${dateInJS
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${dateInJS
        .getSeconds()
        .toString()
        .padStart(2, '0')}`;
}

export function differenceInMinutes(firstDate, secondDate) {
    const date1 = new Date(firstDate);
    const date2 = new Date(secondDate);

    return Math.ceil((date2 - date1) / (1000 * 60));
}

export const substractDays = (date, days) =>
    new Date(date.setDate(date.getDate() - days));

export const formatToISOString = date => date.toISOString().split('T')[0];

export function restMinutes(date, minutes) {
    return new Date(date.getTime() - minutes * 60000);
}

export const getArgentinaYear = () => {
    const date = new Date();
    return date.toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        year: 'numeric'
    });
};
