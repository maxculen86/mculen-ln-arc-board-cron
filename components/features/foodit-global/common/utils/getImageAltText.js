const getImageAltText = image => {
    const { alt_text, caption, subtitle = '' } = image || {};

    return alt_text || caption || subtitle;
};

export default getImageAltText;
