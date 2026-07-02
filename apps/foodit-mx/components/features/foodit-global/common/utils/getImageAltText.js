const getImageAltText = image => {
    const { alt_text, caption, subtitle = '', title = '' } = image || {};

    return alt_text || caption || subtitle || title;
};

export default getImageAltText;
