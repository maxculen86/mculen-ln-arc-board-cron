import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4';
import { RESIZER_SECRET, RESIZER_URL } from 'fusion:environment';
import SourceSetSizes from '../../components/private/LN/home/common/config/sourceSets';

const resolve = key => {
    const { section_id } = key;
    let section = '';
    if (section_id) {
        section = `+AND+taxonomy.primary_section._id:"${section_id}"`;
    }
    return `content/v4/search/published?website=la-nacion-ar&q=type:story${section}`;
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
    schemaName: 'articles-schema',
    params: {
        section_id: 'text'
    },
    transform
};
