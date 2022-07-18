const removeInvalidRelated = content => {
    if (content.length) return content.filter(Boolean);
    return content;
};

export default removeInvalidRelated;
