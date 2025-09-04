import React from 'react';
import { render } from '@testing-library/react';
import { RenderCustomArticle } from '../../../../../../../components/private/LN10/home/components/CommonCollection/renderCustomArticle';

// Mock de los componentes internos
jest.mock(
    '../../../../../../../components/features/LN-10-global/customArticles/fooditBox/default',
    () => ({
        CustomArticleFooditBox: function MockCustomArticleFooditBox(props) {
            return (
                <div data-testid="custom-article-foodit-box" {...props}>
                    Foodit Box Component
                </div>
            );
        }
    })
);

jest.mock(
    '../../../../../../../components/features/LN-10-global/customArticles/segmentedBox/default',
    () => ({
        CustomArticleSegmentedBox: function MockCustomArticleSegmentedBox(
            props
        ) {
            return (
                <div data-testid="custom-article-segmented-box" {...props}>
                    Segmented Box Component
                </div>
            );
        }
    })
);

describe('RenderCustomArticle', () => {
    const mockArticleData = {
        title: 'Test Article',
        content: 'Test content',
        id: '123'
    };

    it('should render CustomArticleFooditBox when isFoodit is true', () => {
        const { getByTestId } = render(
            <RenderCustomArticle
                isFoodit={true}
                isSegmentedBox={false}
                articleData={mockArticleData}
            />
        );

        const fooditBox = getByTestId('custom-article-foodit-box');
        expect(fooditBox).toBeInTheDocument();
        expect(fooditBox).toHaveTextContent('Foodit Box Component');
    });

    it('should render CustomArticleSegmentedBox when isSegmentedBox is true', () => {
        const { getByTestId } = render(
            <RenderCustomArticle
                isFoodit={false}
                isSegmentedBox={true}
                articleData={mockArticleData}
            />
        );

        const segmentedBox = getByTestId('custom-article-segmented-box');
        expect(segmentedBox).toBeInTheDocument();
        expect(segmentedBox).toHaveTextContent('Segmented Box Component');
    });

    it('should return null when neither isFoodit nor isSegmentedBox is true', () => {
        const { container } = render(
            <RenderCustomArticle
                isFoodit={false}
                isSegmentedBox={false}
                articleData={mockArticleData}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it('should pass articleData props to CustomArticleFooditBox', () => {
        const { getByTestId } = render(
            <RenderCustomArticle
                isFoodit={true}
                isSegmentedBox={false}
                articleData={mockArticleData}
            />
        );

        const fooditBox = getByTestId('custom-article-foodit-box');
        expect(fooditBox).toHaveAttribute('title', 'Test Article');
        expect(fooditBox).toHaveAttribute('content', 'Test content');
        expect(fooditBox).toHaveAttribute('id', '123');
    });

    it('should pass articleData props to CustomArticleSegmentedBox', () => {
        const { getByTestId } = render(
            <RenderCustomArticle
                isFoodit={false}
                isSegmentedBox={true}
                articleData={mockArticleData}
            />
        );

        const segmentedBox = getByTestId('custom-article-segmented-box');
        expect(segmentedBox).toHaveAttribute('title', 'Test Article');
        expect(segmentedBox).toHaveAttribute('content', 'Test content');
        expect(segmentedBox).toHaveAttribute('id', '123');
    });

    it('should prioritize isFoodit when both flags are true', () => {
        const { getByTestId, queryByTestId } = render(
            <RenderCustomArticle
                isFoodit={true}
                isSegmentedBox={true}
                articleData={mockArticleData}
            />
        );

        expect(getByTestId('custom-article-foodit-box')).toBeInTheDocument();
        expect(
            queryByTestId('custom-article-segmented-box')
        ).not.toBeInTheDocument();
    });

    it('should handle empty articleData', () => {
        const { getByTestId } = render(
            <RenderCustomArticle
                isFoodit={true}
                isSegmentedBox={false}
                articleData={{}}
            />
        );

        expect(getByTestId('custom-article-foodit-box')).toBeInTheDocument();
    });

    it('should handle undefined articleData', () => {
        const { getByTestId } = render(
            <RenderCustomArticle
                isFoodit={true}
                isSegmentedBox={false}
                articleData={undefined}
            />
        );

        expect(getByTestId('custom-article-foodit-box')).toBeInTheDocument();
    });

    it('matches snapshot when rendering FooditBox', () => {
        const { asFragment } = render(
            <RenderCustomArticle
                isFoodit={true}
                isSegmentedBox={false}
                articleData={mockArticleData}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot when rendering SegmentedBox', () => {
        const { asFragment } = render(
            <RenderCustomArticle
                isFoodit={false}
                isSegmentedBox={true}
                articleData={mockArticleData}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot when returning null', () => {
        const { asFragment } = render(
            <RenderCustomArticle
                isFoodit={false}
                isSegmentedBox={false}
                articleData={mockArticleData}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
