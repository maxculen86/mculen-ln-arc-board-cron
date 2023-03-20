import { useContent } from 'fusion:content';
import filterArticle from '../../../../../../../../content/filters/LN/nota/articleAcu';
import useGetVideoPosterResized from './useGetVideoPosterResizer';
import isSSR from '../../../../../../LN/common/utils/isSSR';
import { checkForId, isHomeLN10 } from '../index';
import withResizerV2 from '../../../enableResizerV2';

const conditionallyCallSource = (
    id,
    sourceType,
    isHideImage,
    isPreiorityMedia = true
) =>
    (id &&
        sourceType &&
        isHideImage === false &&
        id.trim() &&
        isPreiorityMedia &&
        sourceType) ||
    null;

const useGetMediaData = ({
    layout,
    noteID,
    isAdmin,
    videoID,
    imageID,
    imageConfig = '',
    isHideImage = true,
    isInApertura = true,
    arcSite
}) => {
    const shouldUseV2 = isHomeLN10(layout) && withResizerV2;

    const videoData = useGetVideoPosterResized({
        videoID,
        imageConfig,
        isInApertura,
        isAdmin,
        arcSite,
        shouldUseV2
    });

    const imageByCustomField = useContent({
        source: conditionallyCallSource(
            imageID,
            'relatedImageSource',
            isHideImage,
            !videoData
        ),
        query: {
            id: checkForId(imageID),
            published: true,
            imageConfig,
            isInApertura,
            isAdmin,
            arcSite,
            shouldUseV2
        },
        staticMode: isSSR()
    });

    const imagesByPromoItems = useContent({
        source: conditionallyCallSource(
            noteID,
            'articleSourceNota',
            isHideImage,
            !videoData && !imageByCustomField
        ),
        query: {
            id: checkForId(noteID),
            published: true,
            imageConfig,
            isInApertura,
            isAdmin,
            arcSite,
            shouldUseV2
        },
        filter: filterArticle,
        staticMode: isSSR()
    });

    return videoData || imageByCustomField || imagesByPromoItems;
};

export default useGetMediaData;
