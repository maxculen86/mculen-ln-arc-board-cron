import get from '../../../../../common/utils/get';
import { getArticleImage } from '../elements/image/index';
import { getArticleVideos, getYouTubeVideoLink } from '../elements/video/index';
import { getArticleTag } from '../elements/tag/index';
import { CardBasic } from '../cardBasic';
import { isNoteListenableForApps } from '../../../../../../../content/sources/utils/audioNews/helper';

export const cardRegular = article => {
    const hideDescriptionValue = get(
        article,
        'additionalProperties.hideDescription'
    );

    return {
        ...CardBasic(article),
        bajada: hideDescriptionValue
            ? null
            : get(article, 'subheadlines.basic'),
        chapita: getArticleTag(article),
        imagen: getArticleImage(article),
        video: getArticleVideos(article),
        videos: getArticleVideos(article, true),
        videoYouTube: getYouTubeVideoLink(article),
        isListenable: isNoteListenableForApps(article)
    };
};

export default cardRegular;
