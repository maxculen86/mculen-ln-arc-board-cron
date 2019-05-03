import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4';
import { RESIZER_SECRET, RESIZER_URL } from 'fusion:environment';
import SourceSetSizes from '../../components/private/OTT/programa/programImage/sourceSets.json';
//import { SSL_OP_ALL } from 'constants';

const resolve = key => {
    const { id } = key;
    console.log(
        'KEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEY',
        id
    );
    if (!id) throw new Error('Debe definir id para obtener la imagen');
    return `/photo/api/v2/photos/${id}`;
};

const getPresets = () => {
    console.log('SourceSetSizes', SourceSetSizes);
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
    console.log('presets: ', presets);
    return addResizedUrls(data, {
        resizerSecret: RESIZER_SECRET,
        resizerUrl: RESIZER_URL,
        presets: presets
    });
};

export default {
    resolve,
    schemaName: 'image-schema',
    params: {
        id: 'text'
    }
    //transform
};
