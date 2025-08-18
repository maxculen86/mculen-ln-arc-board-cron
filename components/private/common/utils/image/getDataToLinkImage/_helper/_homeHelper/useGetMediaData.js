import { useContent } from 'fusion:content';
import filterArticle from '../../../../../../../../content/filters/LN/nota/articleAcu';
import useGetVideoPosterResized from './useGetVideoPosterResizer';
import isSSR from '../../../../../../LN/common/utils/isSSR';
import { checkForId } from '../index';

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
    noteID,
    isAdmin,
    videoID,
    imageID,
    imageConfig = '',
    isHideImage = true,
    isInApertura = true,
    arcSite,
    diagramacion
}) => {
    const videoData = useGetVideoPosterResized({
        videoID,
        imageConfig,
        isInApertura,
        isAdmin,
        arcSite,
        diagramacion
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
            arcSite
        },
        staticMode: isSSR()
    });

    const imagesByPromoItems = useContent({
        source: conditionallyCallSource(
            noteID,
            'lnHomeBaseArticleSource',
            isHideImage,
            !videoData && !imageByCustomField
        ),
        query: {
            id: checkForId(noteID),
            published: true,
            imageConfig,
            isInApertura,
            isAdmin,
            arcSite
        },
        filter: filterArticle,
        staticMode: isSSR()
    });

    return videoData || imageByCustomField || imagesByPromoItems;
};

export default useGetMediaData;
