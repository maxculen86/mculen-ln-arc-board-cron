import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import { createResizer } from '../../../components/private/common/utils/image/resizer';

const transform = data => {
    const dataResp = {
        ...data,
        image: { url: data.image || '' }
    };

    if (dataResp.image.url.length === 0) return dataResp;

    return {
        ...dataResp,
        image: {
            url: createResizer(RESIZER_KEY, RESIZER_URL).resizeUrl(
                data.image,
                80,
                80,
                {
                    width: 80,
                    height: 80,
                    media: '(min-width: 320px)',
                    class: '',
                    type: 'image'
                }
            )
        }
    };
};

export default transform;
