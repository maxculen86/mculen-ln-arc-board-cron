import React from 'react';
import { render, screen } from '@testing-library/react';
import OpeningImage50 from '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningImage50';

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) => args.filter(Boolean).join(' ')
}));

jest.mock(
    '../../../../../../../components/features/ui/ln/image/default',
    () =>
        ({
            alt,
            src,
            srcSet,
            sizes,
            width,
            height,
            className,
            fetchPriority,
            loading,
            renderImgOnly = false,
            sources = []
        }) => {
            const image = (
                <img
                    data-testid="image-ui"
                    alt={alt}
                    src={src}
                    srcSet={srcSet}
                    sizes={sizes}
                    width={width}
                    height={height}
                    className={className}
                    fetchPriority={fetchPriority}
                    loading={loading}
                />
            );

            if (renderImgOnly) return image;

            return (
                <picture>
                    {sources.map((source, idx) => (
                        <source
                            key={idx}
                            srcSet={source.srcset}
                            media={source.media}
                        />
                    ))}
                    {image}
                </picture>
            );
        }
);

jest.mock(
    '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningAddons',
    () =>
        ({ globalContent, layout }) => (
            <div
                data-testid="opening-addons"
                data-layout={layout}
                data-content={JSON.stringify(globalContent)}
            />
        )
);

jest.mock(
    '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningTitles',
    () =>
        ({ h1Props, h2Props }) => (
            <div data-testid="opening-titles">
                {h1Props?.text && (
                    <h1 className={h1Props.className}>{h1Props.text}</h1>
                )}
                {h2Props?.text && (
                    <h2 className={h2Props.className}>{h2Props.text}</h2>
                )}
            </div>
        )
);

jest.mock(
    '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/styles',
    () => ({
        sectionHeight: 'mock-section-height'
    })
);

const defaultProps = {
    src: 'https://example.com/image.jpg',
    srcset: 'image-375.jpg 375w, image-1200.jpg 1200w',
    sizes: '(max-width: 767px) 375px, 1200px',
    width: 1200,
    height: 675,
    altText: 'Alt de prueba',
    globalContent: { taxonomy: { sections: [] } },
    layout: 'basic',
    title1: 'Título principal',
    title2: 'Título secundario',
    subheadline: 'Bajada de prueba'
};

const renderComponent = (props = {}) =>
    render(<OpeningImage50 {...defaultProps} {...props} />);

describe('OpeningImage50', () => {
    describe('Base structure', () => {
        it('Renders section element with correct data-diagram', () => {
            const { container } = renderComponent();
            const section = container.querySelector('section');
            expect(section).toBeInTheDocument();
            expect(section).toHaveAttribute(
                'data-diagram',
                'image-50-right-title-left'
            );
        });

        it('Applies sectionHeight to section', () => {
            const { container } = renderComponent();
            expect(container.querySelector('section')).toHaveClass(
                'mock-section-height'
            );
        });

        it('Renders OpeningAddons with globalContent and layout', () => {
            renderComponent();
            const addons = screen.getByTestId('opening-addons');
            expect(addons).toBeInTheDocument();
            expect(addons).toHaveAttribute('data-layout', 'basic');
        });

        it('Renders OpeningTitles with h1Props and h2Props', () => {
            renderComponent();
            expect(screen.getByTestId('opening-titles')).toBeInTheDocument();
            expect(
                screen.getByRole('heading', {
                    level: 1,
                    name: 'Título principal'
                })
            ).toBeInTheDocument();
            expect(
                screen.getByRole('heading', {
                    level: 2,
                    name: 'Título secundario'
                })
            ).toBeInTheDocument();
        });

        it('Applies same CSS class to h1 and h2', () => {
            renderComponent();
            expect(screen.getByRole('heading', { level: 1 })).toHaveClass(
                'text-display-sm pt-4'
            );
            expect(screen.getByRole('heading', { level: 2 })).toHaveClass(
                'text-display-sm pt-4'
            );
        });

        it('does not render titles when title1 and title2 are empty', () => {
            render(<OpeningImage50 src="https://example.com/image.jpg" />);
            expect(screen.queryByRole('heading', { level: 1 })).toBeNull();
            expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
        });
    });

    describe('subheadline', () => {
        it('renders paragraph when subheadline has value', () => {
            renderComponent({ subheadline: 'Una bajada' });
            const p = screen.getByText('Una bajada');
            expect(p.tagName).toBe('P');
            expect(p).toHaveClass('prumo', 'text-white', 'text-subheading-md');
        });

        it('does not render paragraph when subheadline is empty', () => {
            renderComponent({ subheadline: '' });
            expect(screen.queryByText('Una bajada')).toBeNull();
        });

        it('does not render paragraph when subheadline is not passed', () => {
            const { subheadline: _, ...rest } = defaultProps;
            render(<OpeningImage50 {...rest} />);
            expect(screen.queryByRole('paragraph')).toBeNull();
        });
    });

    describe('image', () => {
        it('renders ImageUI when src has value', () => {
            renderComponent();
            const img = screen.getByTestId('image-ui');
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
            expect(img).toHaveAttribute('alt', 'Alt de prueba');
        });

        it('passes fetchPriority="high" and loading="eager" to ImageUI', () => {
            renderComponent();
            const img = screen.getByTestId('image-ui');
            expect(img).toHaveAttribute('fetchPriority', 'high');
            expect(img).toHaveAttribute('loading', 'eager');
        });

        it('passes responsive image attributes to ImageUI', () => {
            renderComponent();
            const img = screen.getByTestId('image-ui');
            expect(img).toHaveAttribute(
                'srcset',
                'image-375.jpg 375w, image-1200.jpg 1200w'
            );
            expect(img).toHaveAttribute(
                'sizes',
                '(max-width: 767px) 375px, 1200px'
            );
        });

        it('renders a plain img without picture sources', () => {
            const { container } = renderComponent();

            expect(screen.getByTestId('image-ui')).toBeInTheDocument();
            expect(container.querySelector('picture')).not.toBeInTheDocument();
            expect(container.querySelectorAll('source')).toHaveLength(0);
        });

        it('does not render ImageUI when src is empty', () => {
            renderComponent({ src: '' });
            expect(screen.queryByTestId('image-ui')).toBeNull();
        });

        it('does not render ImageUI when src is undefined', () => {
            renderComponent({ src: undefined });
            expect(screen.queryByTestId('image-ui')).toBeNull();
        });
    });

    describe('snapshots', () => {
        it('snapshot with all props', () => {
            const { container } = renderComponent();
            expect(container.firstChild).toMatchSnapshot();
        });

        it('snapshot without image', () => {
            const { container } = renderComponent({ src: '' });
            expect(container.firstChild).toMatchSnapshot();
        });

        it('snapshot without subheadline', () => {
            const { container } = renderComponent({ subheadline: '' });
            expect(container.firstChild).toMatchSnapshot();
        });

        it('minimal snapshot (only src)', () => {
            const { container } = render(
                <OpeningImage50 src="https://example.com/image.jpg" />
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
