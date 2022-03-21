const transformISODate = (
    date = '0000-00-00T00:00:00',
    type = 'dd/mm/yyyy'
) => {
    const transformedDate = date
        .match(/([^T]+)/)[0]
        .split('-')
        .reverse()
        .join('/');
    if (type === 'dd/mm') {
        const dateWithoutYear = transformedDate.split('/');
        dateWithoutYear.pop();
        return dateWithoutYear.join('/');
    }
    if (type === 'withDay') {
        const dateWithDay = new Date(date);
        return `${weekDays[dateWithDay.getDay()]} ${transformedDate}`;
    }
    return transformedDate;
};

export default transformISODate;

const weekDays = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
];
