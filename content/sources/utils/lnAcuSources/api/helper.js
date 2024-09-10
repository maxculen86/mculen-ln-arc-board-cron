import getPresets from '../../presets';
import get from '../../../../../components/private/common/utils/get';
import { addResizedUrls } from '../../../../../components/private/common/utils/image/resizer/addResizerUrls';
import { isFotoAl100orStorytelling } from '../../../../../components/private/common/utils/subtypes/subtypeHelper';
import { isNotRecommend } from '../../collectionsHelper';
import {
    addHoursAndFormat,
    hasFutureDisplayDate,
    isOlderThanXHoursAgo
} from '../../../../../components/private/common/utils/dateAndTimeUtil';

const transformLnAcuApi = async (
    data = {},
    siteProps = {},
    cachedCall = {}
) => {
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

        // Si viene de mas notas return solo las necesarias mas 1 por si se excluye misma nota
        if (type === 'story') {
            const originalSize = Math.floor(size / 1.5);
            respData.content_elements = respData.content_elements
                .filter(art => (shouldNotFilter ? art : !isNotRecommend(art)))
                .slice(0, Number(originalSize) + 1);
        }
        // De todos los Content Elements, solo traigo el primero que sea parrafo
        // (para no mandar mas info innecesaria)
        respData.content_elements = respData.content_elements.map(story => {
            const storyContentElements = get(story, 'content_elements', []);
            return {
                ...story,
                content_elements: [
                    storyContentElements.find(e => e.type === 'text') || {}
                ]
            };
        });

        // Si viene de Ultimas Noticias
        if (sectionsIds) {
            respData.content_elements = respData.content_elements
                .filter(story => !isOlderThanXHoursAgo(story.display_date, 24))
                .filter(story => !hasFutureDisplayDate(story.display_date))
                .map(story => {
                    return {
                        ...story,
                        display_date: addHoursAndFormat(-3, story.display_date),
                        website_url: story.canonical_url
                    };
                });
            if (!respData.content_elements.length) {
                respData.next = 0;
            }
        }

        return respData;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - content/sources/utils/lnAcuSources - api - helper : ${JSON.stringify(
                data
            )} - siteprops: ${JSON.stringify(siteProps)} - errorMsj:${
                error.message
            }`
        );
        throw new Error(error);
    }
};

export default transformLnAcuApi;
