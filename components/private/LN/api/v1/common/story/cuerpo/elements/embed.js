import get from 'lodash.get';
import getEmbedHref from '../../../../../../../common/utils/getEmbedHref';

const embed = (nodo, dataNota) => {
    if (!nodo) return null;

    const valor = get(nodo, 'raw_oembed');

    if (!valor.html) return null;

    const resp = {
        _t: 'ext'
    };

    const facebookPost = 'facebook-post';

    switch (valor.type) {
        case 'tiktok':
        case 'instagram':
            resp.id = 'html';
            resp.src = valor.html;
            break;
        case 'twitter':
            resp.id = 'html';
            resp.src = `<blockquote class="twitter-tweet" style="min-height: 130px;"><a href = "${valor.url}"></a></blockquote>
            <script async src="https://platform.twitter.com/widgets.js" charset ="utf-8"></script>`;
            break;
        case 'facebook-video':
        case facebookPost:
            resp.id = facebookPost;
            resp.src = getEmbedHref('href', valor.html);
            break;
        case 'youtube':
        case 'vimeo':
        case 'dailymotion':
        case 'spotify':
            resp.id = nodo.subtype;
            resp.src = getEmbedHref('src', valor.html);
            break;
        default:
            return null;
    }

    return resp;
};

embed.type = 'oembed_response';

export default embed;
