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

function getVideoDateFormat(date) {
    return `${date.getDay()} ${months[date.getMonth()]} ${date.getYear() +
        1900}`;
}

export default {
    getMonthAsText: getMonthAsText,
    getVideoDateFormat: getVideoDateFormat
};
