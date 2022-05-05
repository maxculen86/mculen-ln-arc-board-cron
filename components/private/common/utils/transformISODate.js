const weekDays = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
];

const monthNames = {
    '01': 'enero',
    '02': 'febrero',
    '03': 'marzo',
    '04': 'abril',
    '05': 'mayo',
    '06': 'junio',
    '07': 'julio',
    '08': 'agosto',
    '09': 'septiembre',
    '10': 'octubre',
    '11': 'noviembre',
    '12': 'diciembre'
};

const dates = {
    'day dd/mm/yyyy': date => {
        const dateWithDay = new Date(date.join('/'));
        return `${weekDays[dateWithDay.getDay()]} ${date.reverse().join('/')}`;
    },
    'dd/mm': date => {
        date.reverse().pop();
        return date.join('/');
    },
    'dd/mm/yyyy': date => date.reverse().join('/'),
    'dia de mes': date => {
        const dateWithDay = new Date(date);
        const dateFormated = date
            .reverse()
            .join('/')
            .split('/');
        return `${weekDays[dateWithDay.getDay()]} ${dateFormated[0]} de ${
            monthNames[dateFormated[1]]
        }`;
    },
    'yyyy/mm/dd': date => date.join('-')
};

const transformISODate = (
    date = '0000-00-00T00:00:00',
    type = 'dd/mm/yyyy'
) => {
    const transformedDate = date.match(/([^T]+)/)[0].split('-');
    return dates[type](transformedDate);
};

export default transformISODate;
