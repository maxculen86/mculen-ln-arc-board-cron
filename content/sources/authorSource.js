import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import { createResizer } from '../../components/private/common/utils/image/resizer';
import filter from '../filters/LN/acumulado/author';
import force404AMP from './utils/force404AMP';

const resolve = key => {
    const { _id, website, outputType } = key;

    force404AMP({ outputType });

    if (!_id) throw new Error('El id de autor es necesario. ');
    const arcSite = key['arc-site'];
    const path = `/author/v1/author-service?website=${website ||
        arcSite}&_id=${_id}`;
    return path;
};

const transform = (data, query) => {
    const { meteringVariant } = query || {};
    const dataResp = {
        ...data,
        image: { url: data.image || '' },
        node_type: 'author',
        name: data.byline,
        canonical_url: encodeURI(`/autor/${data._id}/`),
        subscription: meteringVariant
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
        website: 'text',
        outputType: 'text',
        redirectUrl: 'text',
        meteringVariant: 'text'
    },
    filter,
    transform,
    ttl: 360
};
