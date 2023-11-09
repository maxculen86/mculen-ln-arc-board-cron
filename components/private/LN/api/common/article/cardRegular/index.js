import get from '../../../../../common/utils/get';
import { getArticleImage } from '../elements/image/index';
import { getArticleVideos, getYouTubeVideoLink } from '../elements/video/index';
import { getArticleTag } from '../elements/tag/index';
import { CardBasic } from '../cardBasic';
import { isNoteListenableHome } from '../../../../../../../content/sources/utils/audioNews/helper';

export const cardRegular = article => {
    return {
        ...CardBasic(article),
        bajada: get(article, 'subheadlines.basic', null),
        chapita: getArticleTag(article),
        imagen: getArticleImage(article),
        video: getArticleVideos(article),
        videos: getArticleVideos(article, true),
        videoYouTube: getYouTubeVideoLink(article),
        isListenable: isNoteListenableHome(article)
    };
};

export default cardRegular;
