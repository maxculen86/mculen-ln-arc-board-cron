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

describe('Components - Chains - Foodit-Global - Common - RenderCollection', () => {
    const articles = articlesTransformed;

    beforeEach(() => {
        filterBookmarksByArticledIs.mockImplementation(articles =>
            articles.map(article => article.articleId)
        );

        window.LN = {
            observable: {
                publish: jest.fn()
            }
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should render Carousel layout with title and link', () => {
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

    test('should render BN_12_GRID layout with articles', () => {
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

    test('should render nothing when hideCaja is true', () => {
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

    test('should render nothing when there is an error', () => {
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

    test('should render nothing when articles array is empty', () => {
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

    test('should render with all articles bookmarked', () => {
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
            name: 'Guardar todo'
        });
        fireEvent.click(buttonElement);

        expect(window.LN.observable.publish).toHaveBeenCalledWith('openModal', {
            carouselTitle: mockTitle,
            ids: expectedIds,
            collectionArticles: []
        });
    });
});
