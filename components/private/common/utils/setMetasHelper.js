export const setDefaultMetaTitle = (arcSite, { longTitle, title } = {}) => {
    const options = {
        'la-nacion-ar': longTitle,
        ott: title
    };

    return options[arcSite] || 'LA NACION';
};

export const setVideoOttMetaTitle = (title, date) => {
    return `${title} programa emitido el ${date} - LN+`;
};

export const setVideoOttDescription = (title, date) => {
    const firstParagraph = `Ingresá en LN+ para ver ${title} programa emitido el ${date}.`;
    return `${firstParagraph} Los mejores programas están en LN+`;
};
