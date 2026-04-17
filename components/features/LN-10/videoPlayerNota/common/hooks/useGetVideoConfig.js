import { useContent } from 'fusion:content';
import videoPlayerFilter from '../../../../../../content/filters/LN/home/LN10/videoPlayerFilter';
import { checkForId } from '../../../article/common/_helper-WebApi';
import get from '../../../../../private/common/utils/get';

const useGetVideoData = ({ videoId, imageConfig, staticMode = false }) => {
    const videoData = useContent({
        source: checkForId(videoId) ? 'videosJwSource' : null,
        query: {
            id: checkForId(videoId),
            website: 'la-nacion-ar',
            imageConfig
        },
        staticMode,
        filter: videoPlayerFilter
    });
    const { title, sources, mediaid, poster, resizedImages, duration } =
        videoData || {};

    return {
        title,
        videoFile: get(sources, '[0].file', ''),
        poster,
        mediaId: mediaid,
        resizedImages,
        playlist: [{ sources, mediaid }],
        duration: duration * 1000
    };
};

export default useGetVideoData;
