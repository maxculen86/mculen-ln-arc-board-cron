import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import getProperties from 'fusion:properties';
import sourceSetting from './utils/sourceSetting';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import get from '../../components/private/common/utils/get';

const resolve = key => {
    const { id, size, website } = key;
    if (!id)
        throw new Error(
            'Debe definir un id para realizar la consulta - Collections Source'
        );
    if (!website)
        throw new Error('Debe indicar el website - Collections Source');

    return `/content/v4/collections/?_id=${id}&website=${website}&published=true&size=${size ||
        2}`;
};

const transform = (data, siteProps) => {
    const respData = data;
    const properties = getProperties(siteProps['arc-site']);

    const presetsDefault = get(properties, `imageConfig.resize.default`, null);
    const presetsM = get(properties, `imageConfig.resize.m`, null);

    respData.content_elements = data.content_elements.map(v => {
        return addResizedUrls(v, {
            resizerSecret: RESIZER_KEY,
            resizerUrl: RESIZER_URL,
            presets: {
                promoItems: presetsM.promo_items || presetsDefault,
                contentElements: presetsM.content_elements || presetsDefault,
                presetsDefault
            }
        });
    });
    return respData;
};

export default {
    resolve,
    params: {
        id: 'text',
        website: 'text'
    },
    transform,
    ttl: sourceSetting.collectionSource.ttl
};
