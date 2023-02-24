import get from '../../../../../../../../../../components/private/common/utils/get';
import CardRegular from '../../../../../../../../../../components/private/LN/api/v2/mobile/home/article/cardRegular/index';
import { getArticleImage } from '../../../../../../../../../../components/private/LN/api/common/article/elements/image/index';
import {
    getArticleVideos,
    getYouTubeVideoLink
} from '../../../../../../../../../../components/private/LN/api/common/article/elements/video/index';
import { getArticleTag } from '../../../../../../../../../../components/private/LN/api/common/article/elements/tag/index';
import { CardBasic } from '../../../../../../../../../../components/private/LN/api/common/article/cardBasic/index';

jest.mock('../../../../../../../../../../components/private/common/utils/get');
jest.mock(
    '../../../../../../../../../../components/private/LN/api/common/article/elements/image/index'
);
jest.mock(
    '../../../../../../../../../../components/private/LN/api/common/article/elements/video/index'
);
jest.mock(
    '../../../../../../../../../../components/private/LN/api/common/article/elements/tag/index'
);
jest.mock(
    '../../../../../../../../../../components/private/LN/api/common/article/cardBasic/index'
);

describe('cardRegular', () => {
    const article = { id: 1, title: 'Test article' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('returns correct cardRegular object', () => {
        // Arrange
        get.mockReturnValueOnce('subheadline');
        getArticleImage.mockReturnValueOnce('image');
        getArticleVideos.mockReturnValueOnce('videos');
        getYouTubeVideoLink.mockReturnValueOnce('youtubeLink');
        getArticleTag.mockReturnValueOnce('tag');
        CardBasic.mockReturnValueOnce({ title: article.title });

        const expectedCardRegular = {
            title: article.title,
            bajada: 'subheadline',
            chapita: 'tag',
            imagen: 'image',
            video: 'videos',
            videoYouTube: 'youtubeLink'
        };

        // Act
        const result = CardRegular(article);

        // Assert
        expect(getArticleImage).toHaveBeenCalledTimes(1);
        expect(getArticleImage).toHaveBeenCalledWith(article);
        expect(getArticleVideos).toHaveBeenCalledTimes(1);
        expect(getArticleVideos).toHaveBeenCalledWith(article);
        expect(getYouTubeVideoLink).toHaveBeenCalledTimes(1);
        expect(getYouTubeVideoLink).toHaveBeenCalledWith(article);
        expect(getArticleTag).toHaveBeenCalledTimes(1);
        expect(getArticleTag).toHaveBeenCalledWith(article);
        expect(CardBasic).toHaveBeenCalledTimes(1);
        expect(CardBasic).toHaveBeenCalledWith(article);
    });
});
