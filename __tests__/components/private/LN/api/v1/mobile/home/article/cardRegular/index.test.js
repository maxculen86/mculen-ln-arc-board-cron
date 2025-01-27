import get from '../../../../../../../../../../components/private/common/utils/get';
import CardRegular from '../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/cardRegular/index';
import { getArticleImage } from '../../../../../../../../../../components/private/LN/api/common/article/elements/image/index';
import {
    getArticleVideos,
    getYouTubeVideoLink
} from '../../../../../../../../../../components/private/LN/api/common/article/elements/video/index';
import {
    getEmbed,
    getEmbedWidget
} from '../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/elements/embed/index';
import { getBadgebyConfig } from '../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/elements/chapita/index';
import { CardBasic } from '../../../../../../../../../../components/private/LN/api/common/article/cardBasic/index';
import { cardRegular } from '../../../../../../../../../../components/private/LN/api/common/article/cardRegular/index.js';

jest.mock('../../../../../../../../../../components/private/common/utils/get');
jest.mock(
    '../../../../../../../../../../components/private/LN/api/common/article/elements/image/index'
);
jest.mock(
    '../../../../../../../../../../components/private/LN/api/common/article/elements/video/index'
);
jest.mock(
    '../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/elements/embed/index'
);
jest.mock(
    '../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/elements/chapita/index'
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
        const objbadget = {
            chapita: 'VIDEO',
            badge: 'VIDEO',
            badgeStyle: 'positive'
        };
        // Arrange
        get.mockReturnValueOnce('subheadline');
        getArticleImage.mockReturnValueOnce('image');
        getArticleVideos.mockReturnValueOnce('videos');
        getYouTubeVideoLink.mockReturnValueOnce('youtubeLink');
        getEmbed.mockReturnValueOnce('iframe');
        getEmbedWidget.mockReturnValueOnce(
            'https://canchallena.clanacion.com.ar/futbol/copa-argentina-2025/boca-juniors-argentino-monte-maiz-aeptpxkh2li6vimrypjso0ff8/widget/?isHome=true'
        );
        getBadgebyConfig.mockReturnValueOnce(objbadget);
        CardBasic.mockReturnValueOnce({ title: article.title });
        get.mockImplementation((obj, path, defaultValue) => {
            if (path == 'subheadlines.basic') {
                return 'Sample Subheadline';
            }
            return defaultValue;
        });

        const expectedCardRegular = {
            categoria: {
                slug: undefined,
                valor: undefined
            },
            title: 'Test article',
            autor: null,
            autores: null,
            marquesina: null,
            volanta: null,
            bajada: 'Sample Subheadline',
            imagen: 'image',
            videoYouTube: 'youtubeLink',
            embed: 'iframe',
            widgetEmbed:
                'https://canchallena.clanacion.com.ar/futbol/copa-argentina-2025/boca-juniors-argentino-monte-maiz-aeptpxkh2li6vimrypjso0ff8/widget/?isHome=true',
            chapita: 'VIDEO',
            badge: 'VIDEO',
            badgeStyle: 'positive',
            opinion: false,
            isListenable: undefined
        };

        // Act
        const result = CardRegular(article);

        // Assert
        expect(result).toStrictEqual(expectedCardRegular);
        expect(getArticleImage).toHaveBeenCalledTimes(1);
        expect(getArticleImage).toHaveBeenCalledWith(article);
        expect(getYouTubeVideoLink).toHaveBeenCalledTimes(1);
        expect(getYouTubeVideoLink).toHaveBeenCalledWith(article);
        expect(getEmbed).toHaveBeenCalledTimes(1);
        expect(getEmbed).toHaveBeenCalledWith(article);
        expect(getEmbedWidget).toHaveBeenCalledTimes(1);
        expect(getEmbedWidget).toHaveBeenCalledWith(article);
        expect(getBadgebyConfig).toHaveBeenCalledTimes(1);
        expect(getBadgebyConfig).toHaveBeenCalledWith(article);
        expect(CardBasic).toHaveBeenCalledTimes(1);
        expect(CardBasic).toHaveBeenCalledWith(article);
    });

    test('Should return null for bajada when hideDescription property is true', () => {
        // ARRANGE
        get.mockImplementation((obj, path, defaultValue) => {
            if (path == 'subheadlines.basic') {
                return 'Sample Subheadline';
            }
            return defaultValue;
        });

        const expectedCardRegular = {
            categoria: undefined,
            embed: undefined,
            widgetEmbed: undefined,
            imagen: undefined,
            videoYouTube: undefined,
            autor: null,
            autores: null,
            marquesina: null,
            volanta: null,
            bajada: 'Sample Subheadline',
            opinion: false,
            isListenable: undefined
        };

        // ACT
        const result = CardRegular(article);

        // ASSERT
        expect(result).toStrictEqual(expectedCardRegular);
        expect(CardBasic).toHaveBeenCalledTimes(1);
        expect(CardBasic).toHaveBeenCalledWith(article);
    });

    test('Common - CardRegular > Should return null for bajada property when hideDescription is true', () => {
        // ARRANGE
        get.mockImplementation((obj, path, defaultValue) => {
            if (path === 'additionalProperties.hideDescription') {
                return true;
            }
            return defaultValue;
        });

        const article = {
            additionalProperties: {
                hideDescription: true
            },
            subheadlines: { basic: 'Sample Subheadline' }
        };

        const expectedCard = {
            ...CardBasic(article),
            bajada: null,
            chapita: null,
            imagen: undefined,
            isListenable: false,
            video: 'videos',
            videoYouTube: undefined,
            videos: undefined
        };

        // ACT
        const result = cardRegular(article);

        // ASSERT
        expect(result).toEqual(expectedCard);
    });

    test('Common - CardRegular > Should return bajada when hideDescription is false', () => {
        // ARRANGE
        get.mockImplementation((obj, path, defaultValue) => {
            if (path == 'subheadlines.basic') {
                return 'Sample Subheadline';
            }
            return defaultValue;
        });

        const articleWithFalseHideDescription = {
            additionalProperties: {
                hideDescription: false
            },
            subheadlines: { basic: 'Sample Subheadline' }
        };

        const expectedCardWithFalse = {
            ...CardBasic(articleWithFalseHideDescription),
            bajada: 'Sample Subheadline',
            chapita: null,
            imagen: undefined,
            isListenable: false,
            video: undefined,
            videoYouTube: undefined,
            videos: undefined
        };

        // ACT
        const resultWithFalse = cardRegular(articleWithFalseHideDescription);

        // ASSERT
        expect(resultWithFalse).toEqual(expectedCardWithFalse);
    });
});
