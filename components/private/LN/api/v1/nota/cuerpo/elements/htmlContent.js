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
            resp.id = 'html';
            resp.src = htmlData.content;
            if (resp.src.indexOf('twitter-tweet') !== -1) {
                const linksTwitter = resp.src.match(/(<a([^>]+)>)/gi);
                if (linksTwitter && linksTwitter.length > 0) {
                    resp.src = `<blockquotet class="twitter-tweet">${
                        linksTwitter[linksTwitter.length - 1]
                    }</blockquote><script async src="https://platform.twitter.com/widgets.js" charset ="utf-8"></script>`;
                }
                resp.src = resp.src.replace(RegExp('\\n  |\\n', 'g'), '');
            }

            break;
    }

    return {
        _t: 'p',
        valor: resp
    };
};

html.type = 'raw_html';

export default html;
