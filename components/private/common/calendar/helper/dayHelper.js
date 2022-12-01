export const dayLetter = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export const getInitialDay = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
};

export const getLastDay = (year, month) => {
    const lastDay = new Date(year, month, 0);
    return lastDay.getDate();
};

export const getHighlightDayClass = (holidayData, day) => {
    const dictionary = {
        Inamovible: ' --immovable',
        Puente: ' --bridge',
        Trasladable: ' --transferable'
    };
    const dayHighlight = holidayData.length
        ? holidayData.find(h => day === h.days[0])
        : undefined;
    if (!dayHighlight) return '';
    return dictionary[dayHighlight.day_type_name];
};
