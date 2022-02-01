import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import getProperties from 'fusion:properties';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import get from '../../components/private/common/utils/get';

import { createResizer } from '../../components/private/common/utils/image/resizer';

const fetch = key => {
    const { url, subtype = '1' } = key;
    if (url.match('(http(s?):)?([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)')) {
        return { url, subtype };
    }
    return null;
};

const transform = (data, siteProps) => {
    const arcSite = siteProps['arc-site'];
    const properties = getProperties(arcSite);

    const presetsDefault = get(
        properties,
        `imageConfig.resize.default.sizes`,
        null
    );

    const presetsPromoItemsFotoAl100 =
        (data.subtype === FOTOAL100 || data.subtype === STORYTELLING) &&
        get(properties, 'imageConfig.resize.fotoAl100.promo_items.sizes', null);
    const presetsContentElementsFotoAl100 =
        data.subtype === FOTOAL100 &&
        get(
            properties,
            'imageConfig.resize.fotoAl100.content_elements.sizes',
            null
        );
    const presetsPromoItems = get(
        properties,
        'imageConfig.resize.l.promo_items.sizes',
        null
    );

    const present =
        presetsPromoItemsFotoAl100 ||
        presetsContentElementsFotoAl100 ||
        presetsPromoItems ||
        presetsDefault;

    const resizer = createResizer(RESIZER_KEY, RESIZER_URL);
    return resizer.resizeUrls(data.url, 0, 0, present);
};

export default {
    fetch,
    params: {
        url: 'text',
        subtype: 'text'
    },
    transform,
    ttl: 600
};
