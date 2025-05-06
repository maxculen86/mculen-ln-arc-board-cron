import getPresets from '../presets';
import get from '../../../../components/private/common/utils/get';
import { getAllImagesAuth } from '../signingServiceSource/getImagesAuth';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer/addResizerUrls';

const transformLnAcu = async (cachedCall, data = {}, siteProps = {}) => {
    try {
        const respData = data;
        const { content_elements: contentElements = [] } = data;

        const { presets, presetsDefault } = getPresets(siteProps);
        const presetsPromoItems = get(presets, 'promo_items', null);

        respData.content_elements = await Promise.all(
            contentElements.map(async elem => {
                const newElem = await getAllImagesAuth(elem, cachedCall);
                Object.assign(elem, newElem);

                const promoItems = get(elem, 'promo_items', null);
                const subtype = get(elem, 'subtype', null);

                return {
                    ...elem,
                    ...addResizedUrls(
                        {
                            ...(promoItems && { promo_items: promoItems })
                        },
                        {
                            presets: {
                                promoItems: presetsPromoItems,
                                presetsDefault
                            },
                            subtype,
                            arcSite: siteProps['arc-site']
                        }
                    )
                };
            })
        );

        return respData;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - content/acuArticlesSourceV2 : ${JSON.stringify(
                data
            )} - siteprops: ${JSON.stringify(siteProps)} - errorMsj:${
                error.message
            }`
        );
        throw new Error(error);
    }
};

export default transformLnAcu;
