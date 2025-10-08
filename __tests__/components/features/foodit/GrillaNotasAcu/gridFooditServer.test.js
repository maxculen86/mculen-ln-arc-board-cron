import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridFooditServer from '../../../../../components/features/foodit/GrillaNotasAcu/helpers/gridFooditServer';
import useGridArticlesFoodit from '../../../../../components/features/foodit/GrillaNotasAcu/hooks/useGridArticles';
import articlesFoodit from '../../../../../__mocks__/data/fooditGridArticles/articlesFoodit.json';

jest.mock(
    '../../../../../components/features/foodit/GrillaNotasAcu/hooks/useGridArticles',
    () => jest.fn()
);

jest.mock('@ln/common-ui-icon', () => ({
    Icon: ({ children, className }) => (
        <span className={className} data-testid="icon">
            {children}
        </span>
    )
}));

jest.mock('@ln/common-ui-text', () => ({
    Text: ({ text, as: Component = 'span', className, children }) => (
        <Component className={className} data-testid="text-component">
            {text || children}
        </Component>
    )
}));

jest.mock('@ln/foodit-ui-button', () => ({
    Button: ({ children, className, ...props }) => (
        <button className={className} data-testid="button" {...props}>
            {children}
        </button>
    )
}));

jest.mock('@ln/foodit-ui-link', () => ({
    Link: ({ href, title, className, children, text, ...props }) => (
        <a
            href={href}
            title={title}
            className={className}
            data-testid="roof-link"
            {...props}
        >
            {children || text}
        </a>
    )
}));

describe('Components - features - helpers - gridFooditServer', () => {
    beforeEach(() => {
        useGridArticlesFoodit.mockImplementation(() => {
            return { articles: articlesFoodit, hasMoreArticle: false };
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render gridFooditServer with grid', () => {
        const { container } = render(
            <GridFooditServer idSection="/recetas/saladas" />
        );
        const gridDiv = container.querySelector('.grid');

        expect(gridDiv).toBeInTheDocument();
        expect(screen.getAllByRole('article').length).toStrictEqual(24);
    });

    describe('RoofFoodit rendering logic', () => {
        it('should render RoofFoodit when title is provided and hide is false', () => {
            const { container } = render(
                <GridFooditServer
                    id="test-id"
                    title="Test Title"
                    link="/test-link"
                    hide={false}
                />
            );

            const roofContainer = container.querySelector('.roof-sticky');
            expect(roofContainer).toBeInTheDocument();

            const roofContainerLink = container.querySelector('.roof-sticky a');
            expect(roofContainerLink).toBeInTheDocument();
            expect(roofContainerLink).toHaveAttribute('href', '/test-link');
            expect(roofContainerLink).toHaveAttribute(
                'title',
                'Ir a Test Title'
            );
        });

        it('should render RoofFoodit when only title is provided', () => {
            const { container } = render(
                <GridFooditServer
                    id="test-id"
                    title="Test Title"
                    hide={false}
                />
            );

            const roofContainer = container.querySelector('.roof-sticky');
            expect(roofContainer).toBeInTheDocument();

            const text = screen.getByText('Test Title');
            expect(text).toBeInTheDocument();
        });

        it('should render RoofFoodit when only link is provided', () => {
            const { container } = render(
                <GridFooditServer id="test-id" link="/test-link" hide={false} />
            );

            const roofContainer = container.querySelector('.roof-sticky');
            expect(roofContainer).toBeInTheDocument();

            const roofContainerLink = container.querySelector('.roof-sticky a');
            expect(roofContainerLink).toBeInTheDocument();
            expect(roofContainerLink).toHaveAttribute('href', '/test-link');
        });

        it('should not render RoofFoodit when hide is true', () => {
            const { container } = render(
                <GridFooditServer
                    id="test-id"
                    title="Test Title"
                    link="/test-link"
                    hide={true}
                />
            );

            const roofContainer = container.querySelector('.roof-sticky');
            expect(roofContainer).not.toBeInTheDocument();

            expect(roofContainer).not.toBeInTheDocument();
            expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
        });

        it('should not render RoofFoodit when title and link are empty', () => {
            const { container } = render(
                <GridFooditServer id="test-id" title="" link="" hide={false} />
            );

            const roofContainer = container.querySelector('.roof-sticky');
            expect(roofContainer).not.toBeInTheDocument();
        });

        it('should not render RoofFoodit when no title or link provided (default props)', () => {
            const { container } = render(<GridFooditServer id="test-id" />);

            const roofContainer = container.querySelector('.roof-sticky');
            expect(roofContainer).not.toBeInTheDocument();
        });

        it('should not render RoofFoodit when hide is true even with title and link', () => {
            const { container } = render(
                <GridFooditServer
                    id="test-id"
                    title="Test Title"
                    link="/test-link"
                    hide={true}
                />
            );

            const roofContainer = container.querySelector('.roof-sticky');
            expect(roofContainer).not.toBeInTheDocument();
            expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
        });
    });

    describe('GridArticlesFoodit always renders', () => {
        it('should render GridArticlesFoodit even when RoofFoodit is hidden', () => {
            const { container } = render(
                <GridFooditServer id="test-id" hide={true} />
            );

            const roofContainer = container.querySelector('.roof-sticky');
            expect(roofContainer).not.toBeInTheDocument();

            const gridDiv = container.querySelector('.grid');
            expect(gridDiv).toBeInTheDocument();
        });

        it('should render all articles regardless of RoofFoodit state', () => {
            render(
                <GridFooditServer
                    id="test-id"
                    title="Test Title"
                    hide={false}
                />
            );

            expect(screen.getAllByRole('article').length).toStrictEqual(24);
        });
    });
});
