import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import getProperties from 'fusion:properties';
import get from '../../components/private/common/utils/get';

import { createResizer } from '../../components/private/common/utils/image/resizer';

const fetch = key => {
    const { url, preset, presetType } = key;
    if (url.match('(http(s?):)?([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)')) {
        return { url, preset, presetType };
    }
    return null;
};

const transform = (data, siteProps) => {
    const arcSite = siteProps['arc-site'];
    const properties = getProperties(arcSite);
    const preset = get(
        properties,
        `imageConfig.resize.${data.preset}.${data.presetType}`,
        null
    );

    if (!preset) {
        throw new Error(`El preset ${data.preset} no existe`);
    }

    const resizer = createResizer(RESIZER_KEY, RESIZER_URL);
    return resizer.resizeUrls(data.url, 0, 0, preset.sizes);
};

export default {
    fetch,
    params: {
        url: 'text',
        preset: 'text',
        presetType: 'text'
    },
    transform,
    ttl: 600
};
