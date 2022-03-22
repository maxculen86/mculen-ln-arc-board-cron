const weekDays = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
];

const dates = {
    'day dd/mm/yyyy': date => {
        const dateWithDay = new Date(date.join('/'));
        return `${weekDays[dateWithDay.getDay()]} ${date.reverse().join('/')}`;
    },
    'dd/mm': date => {
        date.reverse().pop();
        return date.join('/');
    },
    'dd/mm/yyyy': date => date.reverse().join('/')
};

const transformISODate = (
    date = '0000-00-00T00:00:00',
    type = 'dd/mm/yyyy'
) => {
    const transformedDate = date.match(/([^T]+)/)[0].split('-');
    return dates[type](transformedDate);
};

export default transformISODate;
