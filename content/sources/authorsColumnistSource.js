import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import get from 'lodash.get';
import sourceSetting from './utils/sourceSetting';
import { createResizer } from '../../components/private/common/utils/image/resizer';
import filter from '../filters/LN/acumulado/authors';

const resolve = key => {
    const { website, last } = key;
    const arcSite = key['arc-site'];

    const path = `/author/v2/author-service?website=${website ||
        arcSite}&last=${last || ''}`;

    return path;
};

const transform = data => {
    const dataResp = {
        ...data,
        image: { url: data.image || '' }
    };
    // tranformQuitarSectionsInvalidas(data);
    if (dataResp.image.url.length === 0) return dataResp;
    return {
        ...dataResp,
        image: {
            url: createResizer(RESIZER_KEY, RESIZER_URL).resizeUrl(
                data.image,
                80,
                80,
                {
                    width: 80,
                    height: 80,
                    media: '(min-width: 320px)',
                    class: '',
                    type: 'image'
                }
            )
        }
    };
};

export default {
    resolve,
    params: {
        id: 'text',
        website: 'text'
    },
    transform,
    ttl: sourceSetting.authorsColumnistSource.ttl
};
