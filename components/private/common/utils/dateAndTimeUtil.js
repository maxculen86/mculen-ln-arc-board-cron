/**
 * helper para formatear fecha y tiempo
 * @param {string} date
 */
export default function dateAndTimeUtil(displayDate) {
    return {
        date: new Date(displayDate).toLocaleString('es-AR', {
            month: 'long',
            day: '2-digit',
            year: 'numeric'
        }),
        time: new Date(displayDate).toLocaleString('es-AR', {
            hour: 'numeric',
            minute: 'numeric'
        })
    };
}
