import { RESIZER_SECRET, RESIZER_URL } from 'fusion:environment';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import SourceSetSizes from '../../components/private/OTT/programa/programImage/sourceSets.json';

const resolve = key => {
    const { id } = key;
    if (!id) throw new Error('Debe definir id para obtener la imagen');
    return `/photo/api/v2/photos/${id}`;
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
    schemaName: 'image-schema',
    params: {
        id: 'text'
    },
    ttl: 600
};
