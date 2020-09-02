import get from 'lodash.get';
import getEmbedHref from '../../../../../../common/utils/getEmbedHref';

const embed = embedData => {
    if (!embedData) return null;

    const valor = get(embedData, 'raw_oembed');

    if (!valor.html) return null;

    const resp = {
        _t: 'ext'
    };

    switch (valor.type) {
        case 'twitter':
            resp.id = embedData.subtype;
            resp.src = valor.url;
            break;
        case 'instagram':
            resp.id = embedData.subtype;
            resp.src = getEmbedHref('href', valor.html);
            break;
        case 'facebook-video':
            resp.id = 'facebook-post';
            resp.src = getEmbedHref('href', valor.html);
            break;
        case 'facebook-post':
            resp.id = 'facebook-post';
            resp.src = getEmbedHref('href', valor.html);
            break;
        case 'youtube':
        case 'vimeo':
        case 'dailymotion':
        case 'spotify':
            resp.id = embedData.subtype;
            resp.src = getEmbedHref('src', valor.html);
            break;
        default:
            return null;
    }

    return {
        _t: 'p',
        valor: resp
    };
};

embed.type = 'oembed_response';

export default embed;
