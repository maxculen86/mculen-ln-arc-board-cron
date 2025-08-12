import { reorderArticlesWithVideo } from '../../../../components/chains/LN10_Caja_Manual/common/_helper-WebApi';
import { assignPropsToChildren } from '../../../../components/chains/LN10_Caja_Collection/common/_helper-WebApi';

jest.mock(
    '../../../../components/chains/LN10_Caja_Collection/common/_helper-WebApi',
    () => ({
        assignPropsToChildren: jest.fn()
    })
);

describe('chains - LN10_Caja_Manual - _helper-WebApi', () => {
    describe('reorderArticlesWithVideo', () => {
        const createMockArticle = (id, noteId = '') => ({
            collection: 'features',
            type: 'LN-10/article',
            props: {
                collection: 'features',
                type: 'LN-10/article',
                id,
                name: null,
                contentConfig: {
                    contentService: '',
                    contentConfigValues: {},
                    inherit: true
                },
                customFields: {
                    variant: 'regular',
                    noteId,
                    imageId: '',
                    video: '',
                    title: '',
                    lead: ''
                },
                displayProperties: {},
                localEdits: {},
                variants: {}
            }
        });

        const createMockVideoPlayer = id => ({
            collection: 'features',
            type: 'LN-10/videoPlayer',
            props: {
                collection: 'features',
                type: 'LN-10/videoPlayer',
                id,
                name: null,
                contentConfig: {
                    contentService: '',
                    contentConfigValues: {},
                    inherit: true
                },
                customFields: {
                    videoId: 'VIDEO_ID_MOCK',
                    title: 'Video de prueba',
                    description: 'Descripción del video mock',
                    autoplay: false
                },
                displayProperties: {},
                localEdits: {},
                variants: {}
            }
        });

        // Mock de childProps reales
        const createMockChildProps = (type, customFields = {}) => ({
            collection: 'features',
            type,
            ...customFields
        });

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return empty array when both articles and childProps are empty', () => {
            assignPropsToChildren.mockReturnValue([]);

            const result = reorderArticlesWithVideo([], []);

            expect(assignPropsToChildren).toHaveBeenCalledWith([], []);
            expect(result).toEqual([]);
        });

        it('should return empty array when no arguments are provided', () => {
            assignPropsToChildren.mockReturnValue([]);

            const result = reorderArticlesWithVideo();

            expect(assignPropsToChildren).toHaveBeenCalledWith([], []);
            expect(result).toEqual([]);
        });

        it('should put video feature first when video is present with real data structure', () => {
            const mockArticle1 = createMockArticle('article1_id', 'NOTE_ID_1');
            const mockVideoPlayer = createMockVideoPlayer('video_player_id');
            const mockArticle2 = createMockArticle('article2_id', 'NOTE_ID_2');

            const mockArticles = [mockArticle1, mockVideoPlayer, mockArticle2];
            const mockChildProps = [
                createMockChildProps('LN-10/article'),
                createMockChildProps('LN-10/videoPlayer'),
                createMockChildProps('LN-10/article')
            ];

            const mockArticlesWithProps = [
                { nodo: mockArticle1, type: 'LN-10/article' },
                { nodo: mockVideoPlayer, type: 'LN-10/videoPlayer' },
                { nodo: mockArticle2, type: 'LN-10/article' }
            ];

            assignPropsToChildren.mockReturnValue(mockArticlesWithProps);

            const result = reorderArticlesWithVideo(
                mockArticles,
                mockChildProps
            );

            expect(assignPropsToChildren).toHaveBeenCalledWith(
                mockArticles,
                mockChildProps
            );
            expect(result).toEqual([
                mockVideoPlayer,
                mockArticle1,
                mockArticle2
            ]);
        });

        it('should return articles in original order when no video feature is present', () => {
            const mockArticle1 = createMockArticle('article1_id', 'NOTE_ID_1');
            const mockArticle2 = createMockArticle('article2_id', 'NOTE_ID_2');
            const mockArticle3 = createMockArticle('article3_id', 'NOTE_ID_3');

            const mockArticles = [mockArticle1, mockArticle2, mockArticle3];
            const mockChildProps = [
                createMockChildProps('LN-10/article'),
                createMockChildProps('LN-10/article'),
                createMockChildProps('LN-10/article')
            ];

            const mockArticlesWithProps = [
                { nodo: mockArticle1, type: 'LN-10/article' },
                { nodo: mockArticle2, type: 'LN-10/article' },
                { nodo: mockArticle3, type: 'LN-10/article' }
            ];

            assignPropsToChildren.mockReturnValue(mockArticlesWithProps);

            const result = reorderArticlesWithVideo(
                mockArticles,
                mockChildProps
            );

            expect(assignPropsToChildren).toHaveBeenCalledWith(
                mockArticles,
                mockChildProps
            );
            expect(result).toEqual([mockArticle1, mockArticle2, mockArticle3]);
        });

        it('should handle multiple video features by taking only the first one', () => {
            const mockArticle1 = createMockArticle('article1_id', 'NOTE_ID_1');
            const mockVideoPlayer1 = createMockVideoPlayer('video_player_1_id');
            const mockArticle2 = createMockArticle('article2_id', 'NOTE_ID_2');
            const mockVideoPlayer2 = createMockVideoPlayer('video_player_2_id');

            const mockArticles = [
                mockArticle1,
                mockVideoPlayer1,
                mockArticle2,
                mockVideoPlayer2
            ];
            const mockChildProps = [
                createMockChildProps('LN-10/article'),
                createMockChildProps('LN-10/videoPlayer'),
                createMockChildProps('LN-10/article'),
                createMockChildProps('LN-10/videoPlayer')
            ];

            const mockArticlesWithProps = [
                { nodo: mockArticle1, type: 'LN-10/article' },
                { nodo: mockVideoPlayer1, type: 'LN-10/videoPlayer' },
                { nodo: mockArticle2, type: 'LN-10/article' },
                { nodo: mockVideoPlayer2, type: 'LN-10/videoPlayer' }
            ];

            assignPropsToChildren.mockReturnValue(mockArticlesWithProps);

            const result = reorderArticlesWithVideo(
                mockArticles,
                mockChildProps
            );

            expect(assignPropsToChildren).toHaveBeenCalledWith(
                mockArticles,
                mockChildProps
            );
            // Should put the first video first, then other non-video features (excluding other videos)
            expect(result).toEqual([
                mockVideoPlayer1,
                mockArticle1,
                mockArticle2
            ]);
        });

        it('should handle single article with video', () => {
            const mockVideoPlayer = createMockVideoPlayer('single_video_id');

            const mockArticles = [mockVideoPlayer];
            const mockChildProps = [createMockChildProps('LN-10/videoPlayer')];

            const mockArticlesWithProps = [
                { nodo: mockVideoPlayer, type: 'LN-10/videoPlayer' }
            ];

            assignPropsToChildren.mockReturnValue(mockArticlesWithProps);

            const result = reorderArticlesWithVideo(
                mockArticles,
                mockChildProps
            );

            expect(assignPropsToChildren).toHaveBeenCalledWith(
                mockArticles,
                mockChildProps
            );
            expect(result).toEqual([mockVideoPlayer]);
        });

        it('should handle mixed feature types correctly with real-world scenario', () => {
            const mockArticle = createMockArticle(
                'article_id',
                'NOTA_PRINCIPAL_ID'
            );
            const mockCardHtml = {
                collection: 'features',
                type: 'LN-10/CardHtml',
                props: {
                    collection: 'features',
                    type: 'LN-10/CardHtml',
                    id: 'card_html_id',
                    customFields: {
                        htmlContent: '<div>Contenido HTML personalizado</div>',
                        title: 'Card HTML de prueba'
                    }
                }
            };
            const mockVideoPlayer = createMockVideoPlayer('main_video_id');
            const mockTimeline = {
                collection: 'features',
                type: 'LN-10/timeline',
                props: {
                    collection: 'features',
                    type: 'LN-10/timeline',
                    id: 'timeline_id',
                    customFields: {
                        size: 5,
                        sectionTagType: 'section',
                        sectionTagValue: '/politica',
                        collectionId: '',
                        url: '',
                        title: 'Ultimas noticias',
                        hideTitle: false,
                        source: 'byTagSection'
                    }
                }
            };

            const mockArticles = [
                mockArticle,
                mockCardHtml,
                mockVideoPlayer,
                mockTimeline
            ];
            const mockChildProps = [
                createMockChildProps('LN-10/article'),
                createMockChildProps('LN-10/CardHtml'),
                createMockChildProps('LN-10/videoPlayer'),
                createMockChildProps('LN-10/timeline')
            ];

            const mockArticlesWithProps = [
                { nodo: mockArticle, type: 'LN-10/article' },
                { nodo: mockCardHtml, type: 'LN-10/CardHtml' },
                { nodo: mockVideoPlayer, type: 'LN-10/videoPlayer' },
                { nodo: mockTimeline, type: 'LN-10/timeline' }
            ];

            assignPropsToChildren.mockReturnValue(mockArticlesWithProps);

            const result = reorderArticlesWithVideo(
                mockArticles,
                mockChildProps
            );

            expect(assignPropsToChildren).toHaveBeenCalledWith(
                mockArticles,
                mockChildProps
            );
            expect(result).toEqual([
                mockVideoPlayer,
                mockArticle,
                mockCardHtml,
                mockTimeline
            ]);
        });

        it('should handle real content structure without video', () => {
            const mockArticle1 = createMockArticle(
                'f0fdBEk1SX3081I',
                'XVJLNYZZ5FCG5GODV2SCRTPTMY'
            );
            const mockTimeline = {
                collection: 'features',
                type: 'LN-10/timeline',
                props: {
                    collection: 'features',
                    type: 'LN-10/timeline',
                    id: 'f0fKCiADYFp853O',
                    customFields: {
                        size: 5,
                        sectionTagType: 'section',
                        sectionTagValue: '/politica',
                        collectionId: '',
                        url: '',
                        title: 'Ultimas noticias',
                        hideTitle: false,
                        source: 'byTagSection'
                    }
                }
            };

            const mockArticles = [mockArticle1, mockTimeline];
            const mockChildProps = [
                createMockChildProps('LN-10/article', {
                    variant: 'regular',
                    noteId: 'XVJLNYZZ5FCG5GODV2SCRTPTMY'
                }),
                createMockChildProps('LN-10/timeline', {
                    size: 5,
                    source: 'byTagSection'
                })
            ];

            const mockArticlesWithProps = [
                {
                    nodo: mockArticle1,
                    type: 'LN-10/article',
                    variant: 'regular'
                },
                { nodo: mockTimeline, type: 'LN-10/timeline', size: 5 }
            ];

            assignPropsToChildren.mockReturnValue(mockArticlesWithProps);

            const result = reorderArticlesWithVideo(
                mockArticles,
                mockChildProps
            );

            expect(assignPropsToChildren).toHaveBeenCalledWith(
                mockArticles,
                mockChildProps
            );
            expect(result).toEqual([mockArticle1, mockTimeline]);
        });
    });
});
