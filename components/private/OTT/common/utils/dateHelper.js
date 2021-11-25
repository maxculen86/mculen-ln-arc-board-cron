const months = [
    'ENERO',
    'FEBRERO',
    'MARZO',
    'ABRIL',
    'MAYO',
    'JUNIO',
    'JULIO',
    'AGOSTO',
    'SEPTIEMBRE',
    'OCTUBRE',
    'NOVIEMBRE',
    'DICIEMBRE'
];
function getMonthAsText(date) {
    return months[date.getMonth()];
}

function getVideoDateFormat(dateString) {
    const date = new Date(dateString);
    return `${date.getDay()} ${months[date.getMonth()]} ${date.getYear() +
        1900}`;
}

function timeToIso8601(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `T${hours}H${minutes}M${seconds}S`;
}

export default {
    getMonthAsText,
    getVideoDateFormat,
    timeToIso8601
};
