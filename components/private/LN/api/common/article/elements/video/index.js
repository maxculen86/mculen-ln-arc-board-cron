import get from '../../../../../../common/utils/get';
import {
    videoCommon as Video,
    videos as Videos
} from '../../../elements/video';
import getEmbedHref from '../../../../../../common/utils/getEmbedHref';

export const getArticleVideos = (article, multiple = false) => {
    const videoDefault = get(article, 'additionalProperties.video', null);
    if (videoDefault && videoDefault.type === 'video') {
        return multiple
            ? Videos(videoDefault.streams)
            : Video(videoDefault.streams);
    }
    return null;
};

export const getYouTubeVideoLink = article => {
    const htmlAttr = get(article, 'additionalProperties.html', null);
    return getEmbedHref('src', htmlAttr);
};

export default getArticleVideos;
