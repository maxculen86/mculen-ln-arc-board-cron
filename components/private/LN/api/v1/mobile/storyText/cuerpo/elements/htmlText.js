const htmlText = content => {
    if (!content) return null;
    const Regexp1 = RegExp('&nbsp;', 'g');
    const rv = content.replace(Regexp1, ' ');
    return rv.replace(/(<([^>]+)>)/gi, '');
};

export default htmlText;
