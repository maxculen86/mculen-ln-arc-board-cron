import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import get from 'lodash.get';
import getProperties from 'fusion:properties';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import filter from '../filters/LN/nota/article';

const resolve = (key, a) => {
    const { url, id, website, published } = key;

    const arcSite = key['arc-site'];
    let basePath = `/content/v4/stories/?website=${website || arcSite}`;

    if (published) basePath = `${basePath}&published=${published}`;

    if (id) return `${basePath}&_id=${id}`;
    if (url) return `${basePath}&website_url=${url}`;

    throw new Error('Debe definir url o id para obtener la nota');
};

const transform = (data, siteProps) => {
    const arcSite = siteProps['arc-site'];
    const properties = getProperties(arcSite);

    let presets = get(
        properties,
        `imageConfig.resize.nota.bySubtype[${data.subtype}]`,
        null
    );

    if (!presets) {
        presets = get(
            properties,
            'imageConfig.resize.nota.bySubtype[default]',
            null
        );
    }

    let resp = data;
    if (presets) {
        resp = addResizedUrls(data, {
            resizerSecret: RESIZER_KEY,
            resizerUrl: RESIZER_URL,
            presets
        });
    }
    return tranformQuitarSectionsInvalidas(resp);
};

const tranformQuitarSectionsInvalidas = jsonArticle => {
    const sections = get(jsonArticle, 'taxonomy.sections');
    const resp = {
        ...jsonArticle,
        taxonomy: {
            ...jsonArticle.taxonomy,
            sections: sections
                ? sections.filter(s => s.type === 'section')
                : null
        }
    };
    return resp;
};

export default {
    resolve,
    params: {
        url: 'text',
        id: 'text',
        website: 'text',
        published: 'bool'
    },
    filter,
    transform
};
