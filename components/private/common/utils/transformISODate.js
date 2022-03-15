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
    return transformedDate;
};

export default transformISODate;
