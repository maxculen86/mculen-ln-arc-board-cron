import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import getProperties from 'fusion:properties';
import get from 'lodash.get';
import { createResizer } from '../../components/private/common/utils/image/resizer';

const resolve = key => {
    const { url, preset } = key;
    console.log('contentSOurce', url);
    // if (url.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/)) {
    //     return url;
    // }
    return url;
};

const transform = (data, siteProps) => {
    // console.log('------ data en contentSource image', data);

    const arcSite = siteProps['arc-site'];
    const properties = getProperties(arcSite);
    const preset = get(properties, `imageConfig.resize.notaM`, null);
    // if (!preset) {
    //     throw new Error(`El preset ${data.preset} no existe`);
    // }

    const resizer = createResizer(RESIZER_KEY, RESIZER_URL);
    const resizedUrls = resizer.resizeUrls(data, 0, 0, preset);

    return resizedUrls;
};

export default {
    resolve,
    params: {
        url: 'text'
    },
    transform
};
