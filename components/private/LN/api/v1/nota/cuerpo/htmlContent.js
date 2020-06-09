const html = htmlData => {
    if (!htmlData && !htmlData.content) return null;

    const resp = {
        _t: 'ext',
        id: 'html',
        src: htmlData.content
    };

    return {
        _t: 'p',
        valor: resp
    };
};

html.type = 'raw_html';

export default html;
