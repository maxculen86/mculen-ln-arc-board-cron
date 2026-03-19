import { saveMenu } from '../../../../../../../components/features/foodit-global/common/bookmark/api/menuSave';
import { getAuthTokens } from '../../../../../../../components/private/common/auth/helper/loginHelper';
import {
    addErrorToast,
    addToast,
    TOAST
} from '../../../../../../../components/features/foodit-global/common/bookmark/api/_helper';
import { transformArticleFoodit } from '../../../../../../../components/features/foodit-global/common/utils/notaFooditHelper';
import { getShortestImage } from '../../../../../../../components/private/LN/common/utils/mediaHelper';

jest.mock(
    '../../../../../../../components/private/common/auth/helper/loginHelper'
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/bookmark/api/_helper'
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/utils/notaFooditHelper'
);
jest.mock(
    '../../../../../../../components/private/LN/common/utils/mediaHelper'
);
jest.mock('fusion:environment', () => ({
    PERSONALIZACION_API_FOODIT: 'https://api.test.com/'
}));

const mockArticle = {
    _id: 'article-123',
    headlines: {
        basic: 'Test Recipe'
    },
    canonical_url: 'https://example.com/recipe',
    taxonomy: {
        primary_section: {
            name: 'Recetas'
        }
    },
    promo_items: {
        basic: {
            resized_urls: {
                landscape_md: 'https://example.com/image.jpg'
            }
        }
    }
};

const mockTransformedArticle = {
    title: 'Test Recipe',
    articleId: 'article-123',
    canonicalUrl: 'https://example.com/recipe',
    primarySection: 'Recetas',
    image: {
        resized_urls: {
            landscape_md: 'https://example.com/image.jpg'
        }
    },
    variant: 'recipe',
    tag: 'receta'
};

describe('menuSave API', () => {
    let originalFetch;
    let consoleErrorSpy;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn();
        consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});
        jest.clearAllMocks();

        getAuthTokens.mockResolvedValue({
            token: 'test-token',
            accessToken: 'Bearer test-access'
        });
        transformArticleFoodit.mockReturnValue(mockTransformedArticle);
        getShortestImage.mockReturnValue('https://example.com/image-short.jpg');
    });

    afterEach(() => {
        global.fetch = originalFetch;
        consoleErrorSpy.mockRestore();
    });

    describe('saveMenu', () => {
        it('should save menu successfully and return response', async () => {
            const mockResponse = {
                bookmarkId: 'bookmark-123',
                bookmarkTypeId: 'article-123-monday-lunch'
            };

            global.fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockResponse)
            });

            const result = await saveMenu({
                article: mockArticle,
                selectedDay: 'monday',
                selectedFood: 'lunch'
            });

            expect(transformArticleFoodit).toHaveBeenCalledWith(mockArticle);

            expect(global.fetch).toHaveBeenCalledWith(
                'https://api.test.com/bookmarks/',
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'X-Token': 'test-token',
                        Authorization: 'Bearer test-access'
                    },
                    body: expect.any(String)
                })
            );

            const requestBody = JSON.parse(global.fetch.mock.calls[0][1].body);

            expect(requestBody).toEqual({
                bookmarkType: 'weeklyMenu',
                bookmarkTypeId: 'article-123-monday-lunch',
                bookmarkGroup: 'monday',
                bookmarkParent: 'Recetas',
                bookmarkContent: {
                    id: 'article-123',
                    image: {
                        resized_urls: {
                            landscape_md: 'https://example.com/image.jpg'
                        },
                        url: 'https://example.com/image-short.jpg'
                    },
                    canonical_url: 'https://example.com/recipe',
                    food: 'lunch',
                    title: 'Test Recipe',
                    variant: 'recipe',
                    tag: 'receta'
                }
            });

            expect(addToast).toHaveBeenCalledWith({
                variant: TOAST.SUCCESS.VARIANT,
                title: TOAST.SUCCESS.TITLE,
                message: TOAST.SUCCESS.MESSAGE.SAVE_MENU
            });

            expect(result).toEqual(mockResponse);
        });

        it('should return empty string and show error toast if API fails', async () => {
            global.fetch.mockResolvedValue({
                ok: false,
                status: 500,
                text: jest.fn().mockResolvedValue('Internal Server Error')
            });

            const result = await saveMenu({
                article: mockArticle,
                selectedDay: 'tuesday',
                selectedFood: 'dinner'
            });

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('No se pudo guardar'),
                'Internal Server Error'
            );

            expect(addErrorToast).toHaveBeenCalled();
            expect(result).toBe('');
        });

        it('should return empty string if response does not have bookmarkId', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ success: true })
            });

            const result = await saveMenu({
                article: mockArticle,
                selectedDay: 'wednesday',
                selectedFood: 'breakfast'
            });

            expect(addErrorToast).toHaveBeenCalled();
            expect(result).toBe('');
        });

        it('should handle missing auth tokens', async () => {
            getAuthTokens.mockResolvedValue({
                token: null,
                accessToken: null
            });

            const result = await saveMenu({
                article: mockArticle,
                selectedDay: 'thursday',
                selectedFood: 'lunch'
            });

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                '[postWeeklyMenu] Missing required fields:',
                expect.objectContaining({
                    token: false,
                    accessToken: false
                })
            );

            expect(global.fetch).not.toHaveBeenCalled();
            expect(addErrorToast).toHaveBeenCalled();
            expect(result).toBe('');
        });

        it('should handle missing selectedDay', async () => {
            const result = await saveMenu({
                article: mockArticle,
                selectedDay: null,
                selectedFood: 'lunch'
            });

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                '[postWeeklyMenu] Missing required fields:',
                expect.objectContaining({
                    day: null
                })
            );

            expect(global.fetch).not.toHaveBeenCalled();
            expect(addErrorToast).toHaveBeenCalled();
            expect(result).toBe('');
        });

        it('should handle missing selectedFood', async () => {
            const result = await saveMenu({
                article: mockArticle,
                selectedDay: 'friday',
                selectedFood: null
            });

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                '[postWeeklyMenu] Missing required fields:',
                expect.objectContaining({
                    food: null
                })
            );

            expect(global.fetch).not.toHaveBeenCalled();
            expect(addErrorToast).toHaveBeenCalled();
            expect(result).toBe('');
        });

        it('should handle missing articleId in transformed article', async () => {
            transformArticleFoodit.mockReturnValue({
                ...mockTransformedArticle,
                articleId: null
            });

            const result = await saveMenu({
                article: mockArticle,
                selectedDay: 'saturday',
                selectedFood: 'dinner'
            });

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                '[postWeeklyMenu] Missing required fields:',
                expect.objectContaining({
                    articleId: null
                })
            );

            expect(global.fetch).not.toHaveBeenCalled();
            expect(addErrorToast).toHaveBeenCalled();
            expect(result).toBe('');
        });

        it('should handle network errors gracefully', async () => {
            global.fetch.mockRejectedValue(new Error('Network error'));

            const result = await saveMenu({
                article: mockArticle,
                selectedDay: 'sunday',
                selectedFood: 'breakfast'
            });

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'Error al realizar la solicitud POST:',
                expect.any(Error)
            );

            expect(addErrorToast).toHaveBeenCalled();
            expect(result).toBe('');
        });

        it('should create correct bookmarkTypeId format', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ bookmarkId: 'bm-123' })
            });

            await saveMenu({
                article: mockArticle,
                selectedDay: 'monday',
                selectedFood: 'lunch'
            });

            const requestBody = JSON.parse(global.fetch.mock.calls[0][1].body);

            expect(requestBody.bookmarkTypeId).toBe('article-123-monday-lunch');
        });

        it('should include all required fields in payload', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ bookmarkId: 'bm-123' })
            });

            await saveMenu({
                article: mockArticle,
                selectedDay: 'tuesday',
                selectedFood: 'dinner'
            });

            const requestBody = JSON.parse(global.fetch.mock.calls[0][1].body);

            expect(requestBody).toHaveProperty('bookmarkType', 'weeklyMenu');
            expect(requestBody).toHaveProperty('bookmarkTypeId');
            expect(requestBody).toHaveProperty('bookmarkGroup', 'tuesday');
            expect(requestBody).toHaveProperty('bookmarkParent');
            expect(requestBody).toHaveProperty('bookmarkContent');
            expect(requestBody.bookmarkContent).toHaveProperty('id');
            expect(requestBody.bookmarkContent).toHaveProperty('image');
            expect(requestBody.bookmarkContent).toHaveProperty('canonical_url');
            expect(requestBody.bookmarkContent).toHaveProperty(
                'food',
                'dinner'
            );
            expect(requestBody.bookmarkContent).toHaveProperty('title');
            expect(requestBody.bookmarkContent).toHaveProperty('variant');
            expect(requestBody.bookmarkContent).toHaveProperty('tag');
        });

        it('should use getShortestImage for image URL', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ bookmarkId: 'bm-123' })
            });

            await saveMenu({
                article: mockArticle,
                selectedDay: 'wednesday',
                selectedFood: 'breakfast'
            });

            expect(getShortestImage).toHaveBeenCalledWith({
                landscape_md: 'https://example.com/image.jpg'
            });

            const requestBody = JSON.parse(global.fetch.mock.calls[0][1].body);

            expect(requestBody.bookmarkContent.image.url).toBe(
                'https://example.com/image-short.jpg'
            );
        });

        it('should handle different day values correctly', async () => {
            const days = [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday'
            ];

            for (const day of days) {
                global.fetch.mockClear();
                global.fetch.mockResolvedValue({
                    ok: true,
                    json: jest
                        .fn()
                        .mockResolvedValue({ bookmarkId: `bm-${day}` })
                });

                await saveMenu({
                    article: mockArticle,
                    selectedDay: day,
                    selectedFood: 'lunch'
                });

                const requestBody = JSON.parse(
                    global.fetch.mock.calls[0][1].body
                );

                expect(requestBody.bookmarkGroup).toBe(day);
            }
        });

        it('should handle different food values correctly', async () => {
            const foods = ['breakfast', 'lunch', 'dinner'];

            for (const food of foods) {
                global.fetch.mockClear();
                global.fetch.mockResolvedValue({
                    ok: true,
                    json: jest
                        .fn()
                        .mockResolvedValue({ bookmarkId: `bm-${food}` })
                });

                await saveMenu({
                    article: mockArticle,
                    selectedDay: 'monday',
                    selectedFood: food
                });

                const requestBody = JSON.parse(
                    global.fetch.mock.calls[0][1].body
                );

                expect(requestBody.bookmarkContent.food).toBe(food);
            }
        });
    });
});
