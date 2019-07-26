import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4';
import { RESIZER_SECRET, RESIZER_URL } from 'fusion:environment';
import SourceSetSizes from '../../components/private/LN/home/common/config/sourceSets';
import { SSL_OP_ALL } from 'constants';

const resolve = key => {
    const { url, id } = key;
    const basePath = '/content/v4/stories/?website=la-nacion-ar';

    if (id) return `${basePath}&_id=${id}`;
    else if (url) return `${basePath}&website_url=${url}`;
    else throw new Error('Debe definir url o id para obtener la nota');
};

const getPresets = () => {
    const presets = {};
    SourceSetSizes.forEach(ss => {
        ss.values.forEach(v => {
            presets[`${ss.name}_${v.name}`] = {
                height: v.value
            };
        });
    });
    return presets;
};

const transform = data => {
    const presets = getPresets();
    return addResizedUrls(data, {
        resizerSecret: RESIZER_SECRET,
        resizerUrl: RESIZER_URL,
        presets
    });
};

export default {
    resolve,
    params: {
        url: 'text',
        id: 'text'
    },
    transform
};
