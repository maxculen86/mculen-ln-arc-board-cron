import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import { videoJWM3u8 } from '../../../private/LN/api/common/elements/videoJW';
import { BackendLnError } from '../../../private/LN/api/common/models/backendLnError';

const Video = (props = {}) => {
    try {
        const { globalContent: video, globalContentConfig = {} } = props;
        const id = get(globalContentConfig, 'query.id', null);

        if (!video) {
            throw new BackendLnError('the video does not exist');
        }

        const {
            title,
            poster: posterUrl,
            duration: fullVideoDuration,
            posterVideo: previewVideoUrl
        } = video;

        const fullVideoUrl = videoJWM3u8(video.sources);

        return {
            id,
            title,
            posterUrl,
            previewVideoUrl,
            fullVideoUrl,
            fullVideoDuration
        };
    } catch (err) {
        return { Success: false, Message: err.message };
    }
};

export default Consumer(Video);
