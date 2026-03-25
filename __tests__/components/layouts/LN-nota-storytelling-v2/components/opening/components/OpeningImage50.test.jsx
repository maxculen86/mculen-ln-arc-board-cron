import React from 'react';
import { render, screen } from '@testing-library/react';
import OpeningImage50 from '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningImage50';

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) => args.filter(Boolean).join(' ')
}));

jest.mock(
    '../../../../../../../components/features/ui/ln/image/default',
    () =>
        ({ alt, src, className, fetchPriority, loading, sources }) => (
            <img
                data-testid="image-ui"
                alt={alt}
                src={src}
                className={className}
                fetchPriority={fetchPriority}
                loading={loading}
                data-sources={JSON.stringify(sources)}
            />
        )
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
    pictureSources: [{ srcset: 'image-800.jpg', media: '(min-width: 800px)' }],
    imgDefaultUrl: 'https://example.com/image.jpg',
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
            render(
                <OpeningImage50 imgDefaultUrl="https://example.com/image.jpg" />
            );
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
        it('renders ImageUI when imgDefaultUrl has value', () => {
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

        it('passes pictureSources to ImageUI', () => {
            renderComponent();
            const img = screen.getByTestId('image-ui');
            expect(JSON.parse(img.getAttribute('data-sources'))).toEqual([
                { srcset: 'image-800.jpg', media: '(min-width: 800px)' }
            ]);
        });

        it('does not render ImageUI when imgDefaultUrl is empty', () => {
            renderComponent({ imgDefaultUrl: '' });
            expect(screen.queryByTestId('image-ui')).toBeNull();
        });

        it('does not render ImageUI when imgDefaultUrl is undefined', () => {
            renderComponent({ imgDefaultUrl: undefined });
            expect(screen.queryByTestId('image-ui')).toBeNull();
        });
    });

    describe('snapshots', () => {
        it('snapshot with all props', () => {
            const { container } = renderComponent();
            expect(container.firstChild).toMatchSnapshot();
        });

        it('snapshot without image', () => {
            const { container } = renderComponent({ imgDefaultUrl: '' });
            expect(container.firstChild).toMatchSnapshot();
        });

        it('snapshot without subheadline', () => {
            const { container } = renderComponent({ subheadline: '' });
            expect(container.firstChild).toMatchSnapshot();
        });

        it('minimal snapshot (only imgDefaultUrl)', () => {
            const { container } = render(
                <OpeningImage50 imgDefaultUrl="https://example.com/image.jpg" />
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
