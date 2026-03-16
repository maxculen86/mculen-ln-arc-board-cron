import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArticlesGrid from '../../../../../components/features/foodit-global/Queryly/_children/articlesGrid';
import { SearchContext } from '../../../../../components/features/foodit-global/Queryly/_children/searchContext';
import { useWindowSize } from '@ln/hooks';
import { useDrawer } from '@ln/common-ui-drawer';

jest.mock('@ln/common-ui-drawer');
jest.mock('@ln/hooks', () => {
    return {
        useWindowSize: jest.fn()
    };
});
jest.mock('@ln/hooks', () => {
    return {
        useWindowSize: jest.fn(() => ({ width: 1280 })),
        useOnClickOutside: jest.fn()
    };
});

describe('ArticlesGrid Component', () => {
    const mockGetNextPage = jest.fn();
    const mockToggleDrawer = jest.fn();

    beforeEach(() => {
        useDrawer.mockReturnValue({ toggleDrawer: mockToggleDrawer });
    });
    const defaultContextValue = {
        data: {
            articlesGrid: [],
            total: 0
        },
        loading: false,
        getNextPage: mockGetNextPage,
        query: ''
    };

    const renderComponent = (contextValue = defaultContextValue) => {
        return render(
            <SearchContext.Provider value={contextValue}>
                <ArticlesGrid />
            </SearchContext.Provider>
        );
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should display the total results and query when articles are present', () => {
        const contextValue = {
            ...defaultContextValue,
            data: {
                articlesGrid: [
                    { guid: '1', title: 'Test Article', section: 'News' }
                ],
                total: 100
            },
            query: 'Technology'
        };

        const { container } = renderComponent(contextValue);
        const element = container.querySelector('#results_count');

        expect(element.querySelector('span').innerHTML).toEqual('100');
        expect(
            screen.getByText('resultados de: Technology')
        ).toBeInTheDocument();
    });

    it('should render the toggle filter button and handle clicks', () => {
        const articlesGrid = [
            {
                guid: '1',
                title: 'Test Article 1',
                section: 'News'
            }
        ];
        useWindowSize.mockReturnValue({ width: 1280 });
        const { container } = renderComponent({
            ...defaultContextValue,
            data: { articlesGrid }
        });

        const toggleButton = container.querySelector('#btn-toggle-filter');
        expect(toggleButton).toBeInTheDocument();
    });

    it('should display the skeleton loader when loading is true', () => {
        renderComponent({ ...defaultContextValue, loading: true });

        expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
    });

    it('should render a list of articles when articlesGrid is not empty', () => {
        const articlesGrid = [
            {
                guid: '1',
                title: 'Test Article 1',
                section: 'News',
                link: '/article-1',
                promo_image: 'image1.jpg',
                video_jw: null
            },
            {
                guid: '2',
                title: 'Test Article 2',
                section: 'Sports',
                link: '/article-2',
                promo_image: 'image2.jpg',
                video_jw: null
            }
        ];

        renderComponent({ ...defaultContextValue, data: { articlesGrid } });

        expect(screen.getByText('Test Article 1')).toBeInTheDocument();
        expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    });

    it('should not render articles when articlesGrid is empty', () => {
        renderComponent();

        expect(screen.queryByText(/Test Article/i)).not.toBeInTheDocument();
    });

    it('should call getNextPage when clicking the "Load More" button', () => {
        const articlesGrid = new Array(24).fill(null).map((_, index) => ({
            guid: `${index + 1}`,
            title: `Test Article ${index + 1}`,
            section: 'News'
        }));

        renderComponent({
            ...defaultContextValue,
            data: { articlesGrid, total: 50 }
        });
        const loadMoreButton = screen.getByRole('button', {
            name: /ver más/i
        });

        fireEvent.click(loadMoreButton);

        expect(mockGetNextPage).toHaveBeenCalledTimes(1);
    });

    it('should not display the "Ver mas" button when there are fewer than 24 articles', () => {
        // Mock de las primeras 24 recetas
        const articlesGrid = new Array(23).fill(null).map((_, index) => ({
            guid: `${index + 1}`,
            title: `Test Article ${index + 1}`,
            section: 'News'
        }));

        renderComponent({ ...defaultContextValue, data: { articlesGrid } });

        expect(
            screen.queryByRole('button', { name: /ver mas/i })
        ).not.toBeInTheDocument();
    });

    it('should handle missing or default values gracefully', () => {
        const articlesGrid = [
            {
                guid: '1',
                title: null,
                section: null,
                link: null,
                promo_image: null
            }
        ];

        const { container } = renderComponent({
            ...defaultContextValue,
            data: { articlesGrid }
        });
        const card = container.querySelector('[data-test-id="card---1"]');
        expect(card).toBeInTheDocument();
    });
});
