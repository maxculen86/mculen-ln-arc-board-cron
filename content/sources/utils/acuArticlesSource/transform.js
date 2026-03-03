import getPresets from '../presets';
import get from '../../../../components/private/common/utils/get';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer/addResizerUrls';
import { isFotoAl100orStorytelling } from '../../../../components/private/common/utils/subtypes/subtypeHelper';
import { isNotRecommend } from '../collectionsHelper';
import {
    addHoursAndFormat,
    hasFutureDisplayDate,
    isOlderThanXHoursAgo
} from '../../../../components/private/common/utils/dateAndTimeUtil';
import { getAllImagesAuth } from '../signingServiceSource/getImagesAuth';
import { processVolanta } from '../common/volantaHelper';

const transform = async (data = {}, siteProps = {}, cachedCall = {}) => {
    try {
        const respData = data;
        const {
            sectionsIds,
            type,
            size,
            shouldNotFilter,
            excludePreload,
            hasCollectionApertura
        } = siteProps;

        const { content_elements: contentElements = [] } = data;

        const { presets, presetsDefault } = getPresets(siteProps);
        const presetsPromoItems = get(presets, 'promo_items', null);

        respData.content_elements = await Promise.all(
            contentElements.map(async (elem, index) => {
                const newElem = await getAllImagesAuth(elem, cachedCall);
                Object.assign(elem, newElem);

                const isInApertura =
                    !hasCollectionApertura && !excludePreload && index === 0;
                const promoItems = get(elem, 'promo_items', null);
                const subtype = get(elem, 'subtype', null);
                const presetsCredits = get(presets, 'credits', null);
                const credits = get(elem, 'credits', null);
                const api = get(siteProps, 'api', false);
                return {
                    ...elem,
                    label: processVolanta(elem),
                    ...addResizedUrls(
                        {
                            ...(promoItems && { promo_items: promoItems }),
                            ...(api && credits && { credits })
                        },
                        {
                            presets: {
                                promoItems: presetsPromoItems,
                                ...(api &&
                                    credits && { credits: presetsCredits }),
                                presetsDefault
                            },
                            // Se pasa el subtype para que las notas de foto al 100
                            // y storytelling no sean excluidas de las validaciones del resizer
                            // y pueda aplicarse 3:2, focal point o smartcrop
                            subtype: isFotoAl100orStorytelling(subtype)
                                ? '-1'
                                : subtype,
                            isInApertura,
                            arcSite: siteProps['arc-site']
                        }
                    )
                };
            })
        );

        // Si viene de mas notas return solo las necesarias mas 1 por si se excluye misma nota
        if (type === 'story') {
            const originalSize = Math.floor(size / 1.5);
            respData.content_elements = respData.content_elements
                .filter(art => (shouldNotFilter ? art : !isNotRecommend(art)))
                .slice(0, Number(originalSize) + 1);
        }
        // De todos los Content Elements, solo traigo:
        // - el primer parrafo (fallback de bajada)
        // - el primer numeric_rating (power up de calificacion)
        // para no mandar mas info innecesaria.
        respData.content_elements = respData.content_elements.map(story => {
            const storyContentElements = get(story, 'content_elements', []);
            const firstText = storyContentElements.find(e => e.type === 'text');
            const numericRating = storyContentElements.find(
                e => e.type === 'numeric_rating'
            );
            const compactContentElements = [firstText, numericRating].filter(
                Boolean
            );

            return {
                ...story,
                content_elements: compactContentElements.length
                    ? compactContentElements
                    : [{}]
            };
        });

        // Si viene de Ultimas Noticias
        if (sectionsIds) {
            respData.content_elements = respData.content_elements
                .filter(story => !isOlderThanXHoursAgo(story.display_date, 24))
                .filter(story => !hasFutureDisplayDate(story.display_date))
                .map(story => ({
                    ...story,
                    display_date: addHoursAndFormat(-3, story.display_date),
                    website_url: story.canonical_url
                }));
            if (!respData.content_elements.length) {
                respData.next = 0;
            }
        }

        return respData;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - content/acuArticlesSource : ${JSON.stringify(
                data
            )} - siteprops: ${JSON.stringify(siteProps)} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
