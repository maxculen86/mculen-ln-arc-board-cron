const formatter = new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

export const formatSpanishDate = dateStr => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return '';
    return formatter.format(date);
};

export const toISODate = dateStr => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
};
