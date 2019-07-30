/**
 * helper para formatear fecha y tiempo
 * @param {string} date
 */
export default function dateAndTimeUtil(displayDate) {
    return {
        date: new Date(displayDate).toLocaleString('es-419', {
            month: 'long',
            day: '2-digit',
            year: 'numeric'
        }),
        time: new Date(displayDate).toLocaleString('es-419', {
            hour: 'numeric',
            minute: 'numeric'
        })
    };
}
