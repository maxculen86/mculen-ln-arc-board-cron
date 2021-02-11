function formatDate(originalDate) {
    // TODO: en  el render desde el cliente toma la hora del mismo,
    // cuando es ssr toma la hora del servidor.

    const date =
        typeof window === 'object'
            ? originalDate
            : formatDateTreeHoursMore(originalDate);

    const monthNames = [
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

    const monthIndex = date.getMonth();

    return `${date.getDate()} de ${
        monthNames[monthIndex]
    } de ${date.getFullYear()}`;
}

function formatDateHoursAndMint(originalDate) {
    const date = formatDateTreeHoursMore(originalDate);
    return `${`00${date.getHours()}`.slice(
        -2
    )}:${`00${date.getMinutes()}`.slice(-2)}`;
}

function formatDateHoursMinAndSecond(originalDate) {
    const date = formatDateTreeHoursMore(originalDate);
    return `${formatDateHoursAndMint(
        originalDate
    )}:${`00${date.getSeconds()}`.slice(-2)}`;
}

function formatDateTreeHoursMore(originalDate) {
    return new Date(originalDate - 3600000 * 3);
}

function formatMonthDigits(originalDate) {
    const mont = originalDate.getMonth() + 1;
    if (mont < 10) {
        return `0${mont}`;
    }

    return mont;
}

function formatYearMontDayDate(originalDate) {
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
