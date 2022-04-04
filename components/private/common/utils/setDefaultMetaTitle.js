const setDefaultMetaTitle = (arcSite, { longTitle, title } = {}) => {
    const options = {
        'la-nacion-ar': longTitle,
        ott: title
    };

    return options[arcSite] || 'LA NACION';
};

export default setDefaultMetaTitle;
