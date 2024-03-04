import getProperties from 'fusion:properties';
import get from '../../../private/common/utils/get';
import { resizeImgUrl } from '../../../private/common/utils/image/resizer/v2/buildResizerUrls';

export const transform = (data = {}) => {
    const { creditHash = '', byline = '', _id = '' } = data;
    const properties = getProperties('foodit');
    const imagePreset = get(
        properties,
        `imageConfig.resize.chefs.credits.sizes`,
        {
            width: 280,
            height: 280,
            media: '(min-width: 320px)',
            class: '',
            type: 'image'
        }
    );
    let imageUrl = get(data, 'image.url', '') || get(data, 'image', '');

    return {
        ...data,
        ...(imageUrl && {
            image: {
                url: resizeImgUrl({
                    arcImage: {
                        url: imageUrl,
                        auth: { 1: creditHash },
                        type: 'image'
                    },
                    defaultResizeWithSmart: imagePreset
                })
            }
        }),
        name: byline,
        canonical_url: encodeURI(`/autor/${_id || ''}/`)
    };
};

export default transform;
