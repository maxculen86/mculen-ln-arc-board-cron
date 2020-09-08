import getEmbedHref from '../../../../../../common/utils/getEmbedHref';

const html = htmlData => {
    if (!htmlData || !htmlData.content) return null;

    const hrefRegex = new RegExp('(?<=</?)([^ >/]+)');
    const htmlTag = hrefRegex.exec(htmlData.content)[1];

    const resp = {
        _t: 'ext'
    };

    switch (htmlTag) {
        case 'iframe':
            resp.src = getEmbedHref('src', htmlData.content).trim();
            resp.id = 'ifrme';
            break;
        default:
            (resp.id = 'html'), (resp.src = htmlData.content);
            break;
    }

    return {
        _t: 'p',
        valor: resp
    };
};

html.type = 'raw_html';

export default html;
