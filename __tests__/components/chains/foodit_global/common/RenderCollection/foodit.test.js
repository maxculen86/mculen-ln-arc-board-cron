import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import articlesTransformed from '../../../../../../__mocks__/data/foodit_Caja_Collection/articlesTransformed';
import RenderCollection from '../../../../../../components/chains/foodit-global/common/RenderCollection/foodit';
import { filterBookmarksByArticledIs } from '../../../../../../components/features/foodit-global/common/bookmark/_helper';

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

jest.mock(
    '../../../../../../components/features/foodit-global/common/bookmark/_helper',
    () => ({
        ...jest.requireActual(
            '../../../../../../components/features/foodit-global/common/bookmark/_helper'
        ),
        filterBookmarksByArticledIs: jest.fn()
    })
);

describe('Components - Chains - Foodit-Global - Common - RenderCollection - LCP Optimization', () => {
    const articles = articlesTransformed;
    const defaultProps = {
        rules: { roofAs: 'h2' },
        title: 'Test Carousel',
        hideCaja: false,
        hideTitle: false,
        layout: 'carousel',
        error: null,
        articles: articles.slice(0, 4),
        carouselMobile: true,
        carouselIndex: 0
    };

    beforeEach(() => {
        filterBookmarksByArticledIs.mockImplementation(articles =>
            articles.map(article => article.articleId)
        );

        window.LN = {
            observable: {
                publish: jest.fn()
            }
        };

        delete window.innerWidth;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render Carousel layout with title and link', () => {
        const { container } = render(
            <RenderCollection
                rules={{
                    roofAs: 'h2'
                }}
                title="carousel title"
                link="https://lanacion.com"
                hideCaja={false}
                hideTitle={false}
                layout="carousel"
                error={null}
                articles={articles}
            />
        );

        const titleElement = screen.getByRole('link', {
            name: 'carousel title'
        });
        const articleElements = screen.getAllByRole('article');
        const hiddenDiv = container.querySelector('.hidden');
        expect(hiddenDiv).not.toBeInTheDocument();
        expect(titleElement).toBeInTheDocument();
        expect(articleElements).toHaveLength(12);
        expect(container).toMatchSnapshot();
    });

    it('should render BN_12_GRID layout with articles', () => {
        const { container } = render(
            <RenderCollection
                rules={{
                    roofAs: 'h2',
                    classNameParent:
                        'grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32',
                    classNameChildren: 'col-span-8 col-span-4_md'
                }}
                title="Grid Title"
                link=""
                hideCaja={false}
                hideTitle={false}
                layout="bn_12_grid"
                error={null}
                articles={articles}
            />
        );

        const articleElements = screen.getAllByRole('article');

        expect(articleElements).toHaveLength(12);

        expect(container).toMatchSnapshot();
    });

    it('should render nothing when hideCaja is true', () => {
        const { container } = render(
            <RenderCollection
                rules={{
                    roofAs: 'h2',
                    classNameParent:
                        'grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32',
                    classNameChildren: 'col-span-8 col-span-4_md'
                }}
                title="Grid Title"
                link=""
                hideCaja={true}
                hideTitle={false}
                layout="bn_12_grid"
                error={null}
                articles={[]}
            />
        );

        const articleElements = screen.queryAllByRole('article');

        expect(articleElements).toHaveLength(0);

        expect(container).toMatchSnapshot();
    });

    it('should render nothing when there is an error', () => {
        const { container } = render(
            <RenderCollection
                rules={{ roofAs: 'h2' }}
                title="Error Test"
                hideCaja={false}
                hideTitle={false}
                layout="carousel"
                error={{ message: 'An error occurred' }}
                articles={articles}
            />
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('should render nothing when articles array is empty', () => {
        const { container } = render(
            <RenderCollection
                rules={{ roofAs: 'h2' }}
                title="Empty Articles Test"
                hideCaja={false}
                hideTitle={false}
                layout="carousel"
                error={null}
                articles={[]}
            />
        );

        const articleElements = screen.queryAllByRole('article');
        expect(articleElements).toHaveLength(0);
        expect(container).toMatchSnapshot();
    });

    it('should render with all articles bookmarked', () => {
        const bookmarkedArticles = articlesTransformed.map(article => ({
            ...article,
            bookmarkId: `bookmark-${article.articleId}`
        }));

        render(
            <RenderCollection
                rules={{ roofAs: 'h2' }}
                title="All Bookmarked"
                hideCaja={false}
                hideTitle={false}
                layout="carousel"
                error={null}
                articles={bookmarkedArticles}
            />
        );

        const iconElement = document.querySelector(
            'i.icon.w-24.w-20_md.--dark'
        );
        const mockIconElement = iconElement.querySelector(
            'mock-icon[name="bookmark-filled"]'
        );

        expect(iconElement).toBeInTheDocument();
        expect(mockIconElement).toBeInTheDocument();
        expect(mockIconElement).toHaveAttribute('name', 'bookmark-filled');
    });

    it('should trigger the onClick event and publish the correct data', () => {
        const mockCollectionId = 'testCollectionId';
        const mockTitle = 'Test Collection';
        const expectedIds = articlesTransformed.map(
            article => article.articleId
        );

        render(
            <RenderCollection
                rules={{ roofAs: 'h2' }}
                title={mockTitle}
                collectionId={mockCollectionId}
                hideCaja={false}
                hideTitle={false}
                layout="carousel"
                error={null}
                articles={articlesTransformed}
            />
        );

        const buttonElement = screen.getByRole('button', {
            name: 'Guardado'
        });
        fireEvent.click(buttonElement);

        expect(window.LN.observable.publish).toHaveBeenCalledWith('openModal', {
            carouselTitle: mockTitle,
            ids: expectedIds,
            collectionArticles: []
        });
    });

    describe('LCP Optimization Logic', () => {
        it('should apply eager loading when carouselIndex=0, mobile viewport, and carouselMobile=true', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 600
            });

            const { container } = render(
                <RenderCollection
                    {...defaultProps}
                    carouselIndex={0}
                    carouselMobile={true}
                />
            );

            const images = container.querySelectorAll('img');
            expect(images[0]).toHaveAttribute('loading', 'eager');
            expect(images[0]).toHaveAttribute('fetchpriority', 'high');
            expect(images[1]).toHaveAttribute('loading', 'lazy');
            expect(images[1]).toHaveAttribute('fetchpriority', 'low');

            if (images[2]) {
                expect(images[2]).toHaveAttribute('loading', 'lazy');
                expect(images[2]).toHaveAttribute('fetchpriority', 'low');
            }
        });

        it('should not apply eager loading when carouselIndex > 0', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 600
            });

            const { container } = render(
                <RenderCollection
                    {...defaultProps}
                    carouselIndex={1}
                    carouselMobile={true}
                />
            );

            const images = container.querySelectorAll('img');
            images.forEach(img => {
                expect(img).toHaveAttribute('loading', 'lazy');
                expect(img).toHaveAttribute('fetchpriority', 'low');
            });
        });

        it('should not apply eager loading when viewport is desktop', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1200
            });

            const { container } = render(
                <RenderCollection
                    {...defaultProps}
                    carouselIndex={0}
                    carouselMobile={true}
                />
            );

            const images = container.querySelectorAll('img');
            images.forEach(img => {
                expect(img).toHaveAttribute('loading', 'lazy');
                expect(img).toHaveAttribute('fetchpriority', 'low');
            });
        });

        it('should not apply eager loading when carouselMobile=false', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 600
            });

            const { container } = render(
                <RenderCollection
                    {...defaultProps}
                    carouselIndex={0}
                    carouselMobile={false}
                />
            );

            const images = container.querySelectorAll('img');
            images.forEach(img => {
                expect(img).toHaveAttribute('loading', 'lazy');
                expect(img).toHaveAttribute('fetchpriority', 'low');
            });
        });

        it('should optimize different number of images for CAROUSEL vs CAROUSEL_4 layouts', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 600
            });

            const { container: carouselContainer } = render(
                <RenderCollection
                    {...defaultProps}
                    layout="carousel"
                    carouselIndex={0}
                    carouselMobile={true}
                />
            );

            const carouselImages = carouselContainer.querySelectorAll('img');
            expect(carouselImages[0]).toHaveAttribute('loading', 'eager');
            expect(carouselImages[1]).toHaveAttribute('loading', 'lazy');
            if (carouselImages[2]) {
                expect(carouselImages[2]).toHaveAttribute('loading', 'lazy');
            }

            const { container: carousel4Container } = render(
                <RenderCollection
                    {...defaultProps}
                    layout="carousel_4"
                    carouselIndex={0}
                    carouselMobile={true}
                />
            );

            const carousel4Images = carousel4Container.querySelectorAll('img');
            expect(carousel4Images[0]).toHaveAttribute('loading', 'eager');
            expect(carousel4Images[1]).toHaveAttribute('loading', 'lazy');
            if (carousel4Images[2]) {
                expect(carousel4Images[2]).toHaveAttribute('loading', 'lazy');
            }
        });

        it('should not optimize BN_12_GRID layout', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 600
            });

            const { container } = render(
                <RenderCollection
                    {...defaultProps}
                    layout="bn_12_grid"
                    carouselIndex={0}
                    carouselMobile={true}
                    rules={{
                        classNameParent: 'grid grid-cols-8',
                        classNameChildren: 'col-span-4'
                    }}
                />
            );

            const images = container.querySelectorAll('img');
            images.forEach(img => {
                expect(img).toHaveAttribute('loading', 'lazy');
                expect(img).toHaveAttribute('fetchpriority', 'low');
            });
        });
    });
});
