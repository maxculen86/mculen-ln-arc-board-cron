import get from '../../../../../../common/utils/get';
import Video from '../../../elements/video';
import getEmbedHref from '../../../../../../common/utils/getEmbedHref';

export const getArticleVideo = article => {
    const videoDefault = get(article, 'additionalProperties.video', null);
    if (videoDefault && videoDefault.type === 'video') {
        return Video(videoDefault.streams);
    }
    return null;
};

export const getYouTubeVideoLink = article => {
    const htmlAttr = get(article, 'additionalProperties.html', null);
    const videoLink = getEmbedHref('src', htmlAttr);

    return videoLink;
};

export default getArticleVideo;
