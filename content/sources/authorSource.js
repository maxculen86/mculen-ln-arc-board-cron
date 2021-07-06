import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import { createResizer } from '../../components/private/common/utils/image/resizer';
import filter from '../filters/LN/acumulado/author';

const resolve = key => {
    const { _id, website } = key;
    if (!_id) throw new Error('El id de autor es necesario. ');
    const arcSite = key['arc-site'];
    const path = `/author/v1/author-service?website=${website ||
        arcSite}&_id=${_id}`;
    return path;
};

const transform = data => {
    const dataResp = {
        ...data,
        image: { url: data.image || '' },
        node_type: 'author',
        name: data.byline,
        canonical_url: `/autor/${data._id}/`
    };

    if (dataResp.image.url.length === 0) return dataResp;

    return {
        ...dataResp,
        image: {
            url: createResizer(RESIZER_KEY, RESIZER_URL).resizeUrl(
                data.image,
                280,
                280,
                {
                    width: 280,
                    height: 280,
                    media: '(min-width: 320px)',
                    class: '',
                    type: 'image'
                }
            )
        },
        node_type: 'author'
    };
};

export default {
    resolve,
    params: {
        _id: 'text',
        website: 'text'
    },
    filter,
    transform,
    ttl: 360
};
