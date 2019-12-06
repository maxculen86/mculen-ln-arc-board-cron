function formatDate(originalDate) {
    let date = formatDateTreeHoursMore(originalDate);
    const monthNames = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ];

    const monthIndex = date.getMonth();

    return `${date.getDate()} de ${
        monthNames[monthIndex]
    } de ${date.getFullYear()}`;
}

function formatDateHoursAndMint(originalDate) {
    let date = formatDateTreeHoursMore(originalDate);
    return `${`00${date.getHours()}`.slice(
        -2
    )}:${`00${date.getMinutes()}`.slice(-2)}`;
}

function formatDateTreeHoursMore(originalDate) {
    return new Date(originalDate - 3600000 * 3);
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
