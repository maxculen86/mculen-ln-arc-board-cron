import { getArticleSubtype, getImageConfig } from '../fooditArticleSource';
import get from '../../../../../components/private/common/utils/get';
import { getAllImagesAuth } from '../../signingServiceSource/getImagesAuth';
import { addResizedUrls } from '../../../../../components/private/common/utils/image/resizer/addResizerUrls';

export const transformFooditAcu = async (response, query, cachedCall) => {
    const { content_elements: contentElements = [] } = response;

    const transformedElements = await Promise.all(
        contentElements.map(async elem => {
            try {
                const newElem = await getAllImagesAuth(elem, cachedCall);
                Object.assign(elem, newElem);

                const { promo_items: promoItems = {} } = elem;

                return {
                    ...elem,
                    ...addResizedUrls(
                        {
                            ...(promoItems && { promo_items: promoItems })
                        },
                        {
                            presets: {
                                ...getImageConfig(elem, query)
                            },
                            subtype: getArticleSubtype(
                                get(elem, 'subtype', null)
                            ),
                            arcSite: query['arc-site']
                        }
                    )
                };
            } catch (error) {
                console.error(
                    'fooditAcuSource - transformFooditAcu - getImagesAuth error',
                    error
                );
                return elem;
            }
        })
    );

    return {
        ...response,
        content_elements: transformedElements
    };
};
