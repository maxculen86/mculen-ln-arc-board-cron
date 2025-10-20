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

    test('should returns correct cardRegular object without widgetEmbed', () => {
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
        getEmbedWidget.mockReturnValueOnce(null);
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
            autores: undefined,
            authors: undefined,
            marquesina: undefined,
            volanta: null,
            bajada: 'Sample Subheadline',
            imagen: 'image',
            videoYouTube: 'youtubeLink',
            embed: 'iframe',
            chapita: 'VIDEO',
            badge: 'VIDEO',
            badgeStyle: 'positive',
            widgetEmbed: null,
            opinion: false,
            isListenable: undefined,
            videoLoop: null,

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
            autores: undefined,
            authors: undefined,
            marquesina: undefined,
            volanta: null,
            bajada: 'Sample Subheadline',
            imagen: 'image',
            videoYouTube: 'youtubeLink',
            embed: 'iframe',
            widgetEmbed:
                'https://canchallena.clanacion.com.ar/futbol/copa-argentina-2025/boca-juniors-argentino-monte-maiz-aeptpxkh2li6vimrypjso0ff8/widget/?isHome=true',
            opinion: false,
            isListenable: undefined,
            videoLoop: null,
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
        expect(getBadgebyConfig).toHaveBeenCalledTimes(0);
        expect(CardBasic).toHaveBeenCalledTimes(1);
        expect(CardBasic).toHaveBeenCalledWith(article);
    });

    test('Should return null for bajada when hideDescription property is true', () => {
        // ARRANGE
        CardBasic.mockReturnValueOnce({});
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
            autores: undefined,
            authors: undefined,
            marquesina: undefined,
            volanta: null,
            bajada: 'Sample Subheadline',
            opinion: false,
            isListenable: undefined,
            videoLoop: null,
        };

        // ACT
        const result = CardRegular(article);

        // ASSERT
        expect(result).toStrictEqual(expectedCardRegular);
        expect(CardBasic).toHaveBeenCalledTimes(1);
        expect(CardBasic).toHaveBeenCalledWith(article);
    });

    test('Common - CardRegular > Should return null for bajada property when hideDescription is true', () => {
        get.mockImplementation((obj, path, defaultValue) => {
            if (path === 'additionalProperties.hideDescription') return true;
            return defaultValue;
        });

        CardBasic.mockReturnValueOnce({
            title: 'Artículo de prueba',
            video: undefined,
            videos: undefined
        });

        const article = {
            additionalProperties: {
                hideDescription: true
            },
            subheadlines: { basic: 'Sample Subheadline' }
        };

        const expectedCard = {
            title: 'Artículo de prueba',
            categoria: undefined,
            autores: undefined,
            authors: undefined,
            marquesina: undefined,
            volanta: null,
            bajada: null,
            imagen: undefined,
            videoYouTube: undefined,
            widgetEmbed: undefined,
            embed: undefined,
            opinion: false,
            isListenable: undefined,
            videoLoop: null,
            video: undefined,
            videos: undefined
        };

        const result = CardRegular(article);

        expect(result).toEqual(expectedCard);
    });


    test('Common - CardRegular > Should return bajada when hideDescription is false', () => {
        // ARRANGE
        get.mockImplementation((obj, path, defaultValue) => {
            if (path === 'additionalProperties.hideDescription') return false;
            if (path === 'subheadlines.basic') return 'Sample Subheadline';
            return defaultValue;
        });

        const article = {
            additionalProperties: {
                hideDescription: false,
                showVideoLoop: false
            },
            subheadlines: { basic: 'Sample Subheadline' }
        };

        CardBasic.mockReturnValueOnce({
            title: 'Artículo de prueba'
        });

        const expectedCard = {
            title: 'Artículo de prueba',
            categoria: undefined,
            autores: undefined,
            authors: undefined,
            marquesina: undefined,
            volanta: null,
            bajada: 'Sample Subheadline',
            imagen: undefined,
            videoYouTube: undefined,
            widgetEmbed: undefined,
            embed: undefined,
            opinion: false,
            isListenable: undefined,
            videoLoop: null,
            video: undefined,
            videos: undefined
        };

        // ACT
        const result = CardRegular(article);

        // ASSERT
        expect(result).toEqual(expectedCard);
    });


    test('removes `marquesina` and `authors` when sectionAliasMobile is `hashtag`', () => {
        CardBasic.mockReturnValueOnce({
            ...article,
            marquesina: 'Por autor'
        });
        get.mockImplementation((_, path, defaultValue) =>
            path === 'informationBox.sectionAliasMobile'
                ? 'hashtag'
                : defaultValue
        );
        const expectedCardRegular = {
            id: 1,
            title: 'Test article',
            categoria: undefined,
            embed: undefined,
            widgetEmbed: undefined,
            imagen: undefined,
            videoYouTube: undefined,
            autores: null,
            authors: null,
            marquesina: null,
            volanta: null,
            bajada: null,
            opinion: false,
            isListenable: undefined,
            videoLoop: null,

        };

        const result = CardRegular(article);

        expect(result).toStrictEqual(expectedCardRegular);
    });

    test('muestra videoLoop cuando showVideoLoop es true y hay video válido', () => {
        const mockVideo = {
            sources: [
                {
                    file: 'https://video.mp4',
                    type: 'video/mp4',
                    width: 480,
                    height: 270
                }
            ]
        };

        get.mockImplementation((obj, path, defaultValue) => {
            if (path === 'additionalProperties.showVideoLoop') return true;
            if (path === 'additionalProperties.video') return mockVideo;
            return defaultValue;
        });

        getArticleImage.mockReturnValueOnce('imagen.jpg');
        CardBasic.mockReturnValueOnce({ title: 'Artículo de prueba' });

        const article = {
            additionalProperties: {
                showVideoLoop: true,
                video: mockVideo
            }
        };

        const result = CardRegular(article);

        expect(result.videoLoop).toEqual({
            _t: 'mmf',
            width: 480,
            height: 270,
            url: 'https://video.mp4'
        });
        expect(result.imagen).toBe('imagen.jpg');
    });


    test('muestra imagen y oculta videoLoop cuando showVideoLoop es true pero no hay video', () => {
        get.mockImplementation((obj, path, defaultValue) => {
            if (path === 'additionalProperties.showVideoLoop') return true;
            if (path === 'additionalProperties.video') return null;
            return defaultValue;
        });

        getArticleImage.mockReturnValueOnce('imagen.jpg');
        CardBasic.mockReturnValueOnce({ title: 'Artículo de prueba' });

        const article = {
            additionalProperties: {
                showVideoLoop: true
            }
        };

        const result = CardRegular(article);

        expect(result.videoLoop).toBeNull();
        expect(result.imagen).toBe('imagen.jpg');
    });


    test('muestra imagen y oculta videoLoop cuando showVideoLoop es false', () => {
        const mockVideoLoop = {
            sources: [
                {
                    file: 'https://video.mp4',
                    type: 'video/mp4',
                    width: 480,
                    height: 270
                }
            ]
        };

        get.mockImplementation((obj, path, defaultValue) => {
            if (path === 'additionalProperties.showVideoLoop') return false;
            if (path === 'additionalProperties.video') return mockVideoLoop;
            return defaultValue;
        });

        getArticleImage.mockReturnValueOnce('imagen.jpg');
        CardBasic.mockReturnValueOnce({ title: 'Artículo de prueba' });

        const article = {
            additionalProperties: {
                showVideoLoop: false,
                video: mockVideoLoop
            }
        };

        const result = CardRegular(article);

        expect(result.videoLoop).toBeNull();
        expect(result.imagen).toBe('imagen.jpg');
    });
});
