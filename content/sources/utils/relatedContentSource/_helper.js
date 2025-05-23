import get from '../../../../components/private/common/utils/get';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer/addResizerUrls';
import getPresets from '../presets';
import { getAllImagesAuth } from '../signingServiceSource/getImagesAuth';
import { processVolanta } from '../common/volantaHelper';

const transformData = async (response, query, limit, cachedCall) => {
    const basicData = get(response, 'basic', []);
    if (basicData.length === 0) return [];

    const arcSite = query['arc-site'];

    const filteredData = basicData
        .filter(item => item.revision?.published === true)
        .slice(0, limit);

    const { presets, presetsDefault } = getPresets(query);
    const presetsPromoItems = get(presets, 'promo_items', null);

    return Promise.all(
        filteredData.map(async elem => {
            const newElem = await getAllImagesAuth(elem, cachedCall);
            Object.assign(elem, newElem);

            const promoItems = get(elem, 'promo_items', null);
            const credits = get(elem, 'credits', null);
            const presetsCredits = get(presets, 'credits', null);

            return {
                ...elem,
                ...addResizedUrls(
                    {
                        ...(promoItems && { promo_items: promoItems }),
                        ...(credits && { credits })
                    },
                    {
                        presets: {
                            promoItems: presetsPromoItems,
                            ...(credits && { credits: presetsCredits }),
                            presetsDefault
                        },
                        isAdmin: get(query, 'isAdmin', false),
                        arcSite
                    }
                ),
                label: processVolanta(elem)
            };
        })
    );
};

export default transformData;
