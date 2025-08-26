import { useContent } from 'fusion:content';
import videoPosterFilter from '../../../../../../../../content/filters/LN/home/LN10/videoPosterFilter';
import isSSR from '../../../../../../LN/common/utils/isSSR';
import { checkForId } from '../index';
import replaceUrlResizerToWWW from '../../../../../../../../content/sources/utils/replaceUrlResizerToWWW';
import get from '../../../../get';
import { getShortestImage } from '../../../../../../LN/common/utils/mediaHelper';

const useGetVideoPosterResized = ({
    videoID,
    imageConfig,
    isInApertura,
    isAdmin,
    arcSite,
    diagramacion
}) => {
    const data = useContent({
        source: (videoID && videoID.trim() && 'videosJwSource') || null,
        query: {
            id: checkForId(videoID),
            website: 'la-nacion-ar',
            imageConfig,
            isInApertura,
            isAdmin,
            arcSite
        },
        staticMode: isSSR(),
        filter: videoPosterFilter
    });

    if (!data) return null;

    const promoItemsBasic = get(data, 'resizedImages.promo_items.basic', {});
    const basicWithWWW = replaceUrlResizerToWWW(promoItemsBasic);
    const resizedUrls = get(basicWithWWW, 'resized_urls', []);

    const shortest = getShortestImage(resizedUrls);

    const MOBILE = '(max-width: 767px)';

    const MEDIA_RULES = {
        'center-focal': MOBILE
    };

    const mediaTarget = MEDIA_RULES[diagramacion];

    const posterCandidate = mediaTarget
        ? resizedUrls.find(
              resizedUrl =>
                  get(resizedUrl, 'option.media_preload', '') === mediaTarget
          ) || resizedUrls[0]
        : shortest;

    return {
        promo_items: {
            basic: {
                ...basicWithWWW,
                resized_urls: [posterCandidate]
            }
        }
    };
};
export default useGetVideoPosterResized;
