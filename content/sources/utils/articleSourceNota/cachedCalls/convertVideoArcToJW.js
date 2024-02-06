import logger from '../../../../../components/private/common/utils/logger';
import videoJwArticleSource from '../../../videoJwArticleSource';

const convertVideoArcToJw = async (video, arcSite, cachedCall) => {
    const { _id: idVideoArc } = video;

    try {
        return await cachedCall(
            'videoJwArticleSource',
            videoJwArticleSource.fetch,
            {
                query: { idVideoArc, arcSite, video },
                independent: true
            }
        );
    } catch (error) {
        return logger.push(error, {
            source: 'content/sources/videoJwArticleSource.js',
            id: idVideoArc
        });
    }
};

export default convertVideoArcToJw;
