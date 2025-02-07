import getProperties from 'fusion:properties';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import get from '../../components/private/common/utils/get';
import { createResizer } from '../../components/private/common/utils/image/resizer/v1/resizerHelper';

const fetch = key => {
    const { url, subtype = '1' } = key;
    console.warn(
        `LnWarn: customEvent LN API imageResizeSource - fetch url: ${url}`
    );
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

    console.warn(
        `LnWarn: customEvent LN API imageResizeSource - transform data.url: ${data.url}`
    );
    const resizer = createResizer();
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
