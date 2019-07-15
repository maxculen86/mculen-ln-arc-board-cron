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

    //var event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

    //var options = { year: 'numeric', month: 'short', day: 'numeric', formatMatcher: 'basic' };
    //var local = event.toLocaleDateString('es-AR', options)
}

function getVideoDateFormat(dateString) {
    const date = new Date(dateString);
    return `${date.getDay()} ${months[date.getMonth()]} ${date.getYear() +
        1900}`;
}

function timeToIso8601(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return `T${hours}H${minutes}M${seconds}S`;
}

export default {
    getMonthAsText: getMonthAsText,
    getVideoDateFormat: getVideoDateFormat,
    timeToIso8601: timeToIso8601
};
