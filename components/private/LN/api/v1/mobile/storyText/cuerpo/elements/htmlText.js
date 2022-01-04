const htmlText = content => {
    if (!content) return null;
    return content.replace(/(<([^>]+)>)/gi, '');
};

export default htmlText;
