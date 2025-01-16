import { useContent } from 'fusion:content';
import videoFilterLN10 from '../../../../../../../../content/filters/LN/home/LN10/videoFilterLN10';
import isSSR from '../../../../../../LN/common/utils/isSSR';
import { checkForId } from '../index';

const useGetVideoPosterResized = ({
    videoID,
    imageConfig,
    isInApertura,
    isAdmin,
    arcSite
}) =>
    useContent({
        source: (videoID && videoID.trim() && 'videoSource') || null,
        query: {
            id: checkForId(videoID),
            website: 'la-nacion-ar',
            imageConfig,
            isInApertura,
            isAdmin,
            arcSite
        },
        staticMode: isSSR(),
        filter: videoFilterLN10
    });

export default useGetVideoPosterResized;
