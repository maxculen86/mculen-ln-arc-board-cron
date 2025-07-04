import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import CTRNota, {
    ctrRecommendNote
} from '../../../../components/features/LN-nota/ctrNotaMobile';
import useViewportSize from '../../../../components/private/common/hooks/useViewportSize';
import { isSubscribed } from '../../../../components/private/common/auth/helper/loginHelper';
import { useAppContext } from 'fusion:context';
import '@testing-library/jest-dom';
import StickyMobile from '../../../../components/private/LN/nota/StickyMobile';
import { useRankingArticles } from '../../../../components/features/LN-10/ranking/_helper';

const mockSetTrigger = jest.fn();

jest.mock('fusion:context', () => ({ useAppContext: jest.fn() }));
jest.mock('../../../../components/private/common/hooks/useViewportSize', () =>
    jest.fn()
);
jest.mock('../../../../components/private/common/auth/helper/loginHelper');
jest.mock('../../../../components/features/LN-10/ranking/_helper', () => ({
    ...jest.requireActual(
        '../../../../components/features/LN-10/ranking/_helper'
    ),
    useRankingArticles: jest.fn()
}));
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(initial => [initial, mockSetTrigger]),
    useEffect: jest.fn(f => f())
}));

describe('CTRNota', () => {
    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();

        // Default mock for useRankingArticles
        useRankingArticles.mockReturnValue({
            articles: []
        });
    });

    it('handles scroll event', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                _id: '123',
                taxonomy: {
                    primary_section: {
                        _id: '/sociedad'
                    }
                }
            },
            layout: 'LN-nota-noticia'
        });
        useViewportSize.mockReturnValue('mobile');
        isSubscribed.mockReturnValue(false);
        useRankingArticles.mockReturnValue({
            articles: [
                {
                    _id: 'test-article',
                    canonical_url: '/test-article',
                    headlines: { basic: 'Test Article' },
                    promo_items: { basic: { url: 'test-image.jpg' } },
                    website_url: '/test-article'
                }
            ]
        });

        render(<CTRNota />);
        act(() => {
            window.scrollY = 1801;
            fireEvent.scroll(window);
        });
        expect(mockSetTrigger).toHaveBeenCalledWith(true);
    });

    it('should NOT trigger scroll in non-allowed sections', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                _id: '456',
                taxonomy: {
                    primary_section: {
                        _id: '/deportes'
                    }
                }
            },
            layout: 'LN-nota-noticia'
        });
        useViewportSize.mockReturnValue('mobile');
        isSubscribed.mockReturnValue(false);
        useRankingArticles.mockReturnValue({
            articles: [
                {
                    _id: 'test-article',
                    canonical_url: '/test-article',
                    headlines: { basic: 'Test Article' },
                    promo_items: { basic: { url: 'test-image.jpg' } },
                    website_url: '/test-article'
                }
            ]
        });

        render(<CTRNota />);
        act(() => {
            window.scrollY = 1801;
            fireEvent.scroll(window);
        });
        // En secciones no permitidas, el trigger NO debe activarse
        expect(mockSetTrigger).not.toHaveBeenCalledWith(true);
    });

    it('should NOT render component in non-allowed sections', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                _id: '789',
                taxonomy: {
                    primary_section: {
                        _id: '/economia' // Otra sección NO permitida
                    }
                }
            },
            layout: 'LN-nota-noticia'
        });
        useViewportSize.mockReturnValue('mobile');
        isSubscribed.mockReturnValue(false);
        useRankingArticles.mockReturnValue({
            articles: [
                {
                    _id: 'test-article',
                    canonical_url: '/test-article',
                    headlines: { basic: 'Test Article' },
                    promo_items: { basic: { url: 'test-image.jpg' } },
                    website_url: '/test-article'
                }
            ]
        });

        const { container } = render(<CTRNota />);

        // El componente no debe renderizar nada en secciones no permitidas
        expect(container.firstChild).toBeNull();
    });

    it('should work in all allowed sections', () => {
        const allowedSections = ['/espectaculos', '/sociedad', '/tecnologia'];

        allowedSections.forEach(section => {
            useAppContext.mockReturnValue({
                globalContent: {
                    _id: 'test-id',
                    taxonomy: {
                        primary_section: {
                            _id: section
                        }
                    }
                },
                layout: 'LN-nota-noticia'
            });
            useViewportSize.mockReturnValue('mobile');
            isSubscribed.mockReturnValue(false);
            useRankingArticles.mockReturnValue({
                articles: [
                    {
                        _id: 'test-article',
                        canonical_url: '/test-article',
                        headlines: { basic: 'Test Article' },
                        promo_items: { basic: { url: 'test-image.jpg' } },
                        website_url: '/test-article'
                    }
                ]
            });

            const { unmount } = render(<CTRNota />);

            act(() => {
                window.scrollY = 1801;
                fireEvent.scroll(window);
            });

            // Debe activarse el trigger en todas las secciones permitidas
            expect(mockSetTrigger).toHaveBeenCalledWith(true);

            // Limpiar para la siguiente iteración
            jest.clearAllMocks();
            unmount();
        });
    });

    it('should render text in StickyMobile and check variables', () => {
        const articleToShow = {
            title: 'Sample Article',
            url: '/sample-article'
        };

        render(<StickyMobile articleToShow={articleToShow} />);

        expect(screen.getByText('Lo más leído')).toBeInTheDocument();
        expect(!!articleToShow).toBe(true);
    });

    it('should call useRankingArticles with expected parameters', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                _id: '/sociedad',
                node_type: 'section'
            },
            website: 'la-nacion-ar',
            arcSite: 'la-nacion-ar'
        });
        useViewportSize.mockReturnValue('mobile');
        isSubscribed.mockReturnValue(false);

        render(<CTRNota />);

        expect(useRankingArticles).toHaveBeenCalledWith(
            'sociedad',
            'la-nacion-ar',
            '',
            'ctrMobile',
            null
        );
    });

    it('ctrRecommendNote should return the correct article', () => {
        const articles = [
            { _id: '1', canonical_url: 'url1' },
            { _id: '2', canonical_url: 'url2' },
            { _id: '3', canonical_url: 'url3' }
        ];
        const articlesSeen = ['url1'];
        const actualArticleId = '3';

        const result = ctrRecommendNote(
            articles,
            articlesSeen,
            actualArticleId
        );

        expect(result._id).toBe('2');
    });
});
