const removeInvalidRelated = content => {
    if (content.length) return content.filter(x => x);
    return content;
};

export default removeInvalidRelated;
