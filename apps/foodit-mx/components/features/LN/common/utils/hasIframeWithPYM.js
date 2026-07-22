const hasIframeWithPYM = content => {
    if (typeof DOMParser !== 'function' || !content) return false;

    const parser = new DOMParser();
    const document = parser.parseFromString(content, 'text/html');

    return Boolean(document.querySelector('iframe.pym'));
};

export default hasIframeWithPYM;
