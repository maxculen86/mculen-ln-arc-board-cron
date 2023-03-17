import { useContent } from 'fusion:content';
import videoFilterLN10 from '../../../../../../../../content/filters/LN/home/LN10/videoFilterLN10';
import videoFilter from '../../../../../../../../content/filters/LN/home/videoFilter';
import isSSR from '../../../../../../LN/common/utils/isSSR';
import { checkForId } from '../index';
import get from '../../../../get';

const useGetVideoPosterResized = ({
    videoID,
    imageConfig,
    isInApertura,
    isAdmin,
    shouldUseV2,
    arcSite
}) => {
    const videoData = useContent({
        source: (videoID && videoID.trim() && 'videoSource') || null,
        query: {
            id: checkForId(videoID),
            website: 'la-nacion-ar',
            imageConfig,
            isInApertura,
            isAdmin,
            arcSite,
            shouldUseV2
        },
        staticMode: isSSR(),
        filter: shouldUseV2 ? videoFilterLN10 : videoFilter
    });
    // TODO: Una vez que se implemente resizer 2 en todo el sitio, unificar el retorno
    // por defecto en uno solo (actualmente se encuentra de esta forma por la home ln9)
    if (shouldUseV2) {
        return videoData;
    }

    return videoData
        ? {
              promo_items: {
                  basic: {
                      resized_urls: get(videoData, 'resizedUrl', [])
                  }
              }
          }
        : null;
};

export default useGetVideoPosterResized;
