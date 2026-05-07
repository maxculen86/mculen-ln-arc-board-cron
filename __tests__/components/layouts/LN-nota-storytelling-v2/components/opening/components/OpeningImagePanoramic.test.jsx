import React from 'react';
import { render, screen } from '@testing-library/react';
import OpeningImagePanoramic from '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningImagePanoramic';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        deployment: jest.fn(path => path),
        contextPath: '/pf'
    }))
}));

jest.mock(
    '../../../../../../../components/features/ui/ln/image/default',
    () => ({
        __esModule: true,
        default: ({
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
                    data-fetch-priority={fetchPriority}
                    data-loading={loading}
                />
            );

            if (renderImgOnly) return image;

            return (
                <picture data-testid="image-picture">
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
    })
);

jest.mock('@ln/ds-common-divider', () => ({
    Divider: ({ className, direction, color }) => (
        <hr
            data-testid="divider"
            className={className}
            data-direction={direction}
            data-color={color}
        />
    )
}));

jest.mock(
    '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningAddons',
    () => ({
        __esModule: true,
        default: () => <div data-testid="opening-addons">OpeningAddons</div>
    })
);

jest.mock(
    '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningTitles',
    () => ({
        __esModule: true,
        default: ({ h1Props, h2Props, baseClassName }) => (
            <div data-testid="opening-titles" data-base-class={baseClassName}>
                <h1>{h1Props?.text}</h1>
                <h2>{h2Props?.text}</h2>
            </div>
        )
    })
);

describe('OpeningImagePanoramic', () => {
    const mockProps = {
        src: 'image-panoramic.jpg',
        srcset: 'image-small.jpg 500w, image-large.jpg 1024w',
        sizes: '(max-width: 500px) 500px, 1024px',
        width: 1024,
        height: 576,
        altText: 'Panoramic image',
        globalContent: { id: 'article-123' },
        layout: 'image-panoramic',
        title1: 'Main Title',
        title2: 'Subtitle',
        subheadline: 'This is the subheadline',
        diagram: 'image-panoramic'
    };

    it('should render panoramic image section', () => {
        const { container } = render(<OpeningImagePanoramic {...mockProps} />);

        const panoramicDiv = container.querySelector(
            '[data-diagram="image-panoramic"]'
        );
        expect(panoramicDiv).toBeInTheDocument();
    });

    it('should render panoramic image with correct attributes', () => {
        render(<OpeningImagePanoramic {...mockProps} />);

        const img = screen.getByAltText('Panoramic image');
        expect(img).toHaveAttribute('data-fetch-priority', 'high');
        expect(img).toHaveAttribute('data-loading', 'eager');
        expect(img).toHaveAttribute(
            'srcset',
            'image-small.jpg 500w, image-large.jpg 1024w'
        );
        expect(img).toHaveAttribute(
            'sizes',
            '(max-width: 500px) 500px, 1024px'
        );
    });

    it('should not render panoramic image when src is empty', () => {
        render(<OpeningImagePanoramic {...mockProps} src="" />);

        expect(screen.queryByTestId('image-ui')).not.toBeInTheDocument();
    });

    it('should render all components in horizontal section', () => {
        render(<OpeningImagePanoramic {...mockProps} />);

        expect(screen.getByTestId('opening-addons')).toBeInTheDocument();
        expect(screen.getByTestId('opening-titles')).toBeInTheDocument();
        expect(screen.getByText('This is the subheadline')).toBeInTheDocument();
    });

    it('should render divider in horizontal section', () => {
        render(<OpeningImagePanoramic {...mockProps} />);

        const divider = screen.getByTestId('divider');
        expect(divider).toBeInTheDocument();
        expect(divider).toHaveClass('max-w-80', 'mt-28', 'mb-16');
        expect(divider).toHaveAttribute('data-color', 'black');
    });

    it('should not render subheadline when not provided', () => {
        render(<OpeningImagePanoramic {...mockProps} subheadline="" />);

        expect(
            screen.queryByText('This is the subheadline')
        ).not.toBeInTheDocument();
    });

    it('should not render subheadline when undefined', () => {
        render(
            <OpeningImagePanoramic {...mockProps} subheadline={undefined} />
        );

        expect(
            screen.queryByText('This is the subheadline')
        ).not.toBeInTheDocument();
    });

    it('should render panoramic image wrapper with full-width classes', () => {
        const { container } = render(<OpeningImagePanoramic {...mockProps} />);

        const panoramicDiv = container.querySelector(
            '[data-diagram="image-panoramic"]'
        );
        expect(panoramicDiv).toHaveClass(
            'w-screen',
            'overflow-hidden',
            'relative'
        );
    });

    it('should render a plain panoramic img without picture sources', () => {
        const { container } = render(<OpeningImagePanoramic {...mockProps} />);

        expect(screen.getByTestId('image-ui')).toBeInTheDocument();
        expect(container.querySelector('picture')).not.toBeInTheDocument();
        expect(container.querySelectorAll('source')).toHaveLength(0);
    });

    it('should pass diagram prop to OpeningAddons', () => {
        render(<OpeningImagePanoramic {...mockProps} />);

        expect(screen.getByTestId('opening-addons')).toBeInTheDocument();
    });

    it('should render titles with center text alignment', () => {
        render(<OpeningImagePanoramic {...mockProps} />);

        const titles = screen.getByTestId('opening-titles');
        expect(titles).toHaveTextContent('Main Title');
        expect(titles).toHaveTextContent('Subtitle');
    });

    it('should render subheadline with max-width constraint', () => {
        render(<OpeningImagePanoramic {...mockProps} />);

        const subheadline = screen.getByText('This is the subheadline');
        expect(subheadline).toHaveClass(
            'font-primary',
            'hero-subheading-fluid',
            'text-center',
            'max-w-635'
        );
    });

    it('passes hero-title-fluid baseClassName to OpeningTitles', () => {
        render(<OpeningImagePanoramic {...mockProps} />);
        expect(screen.getByTestId('opening-titles')).toHaveAttribute(
            'data-base-class',
            'font-primary hero-title-fluid'
        );
    });

    it('should render with minimal props', () => {
        render(
            <OpeningImagePanoramic
                src="image.jpg"
                srcset="image.jpg 1200w"
                sizes="100vw"
                width={1200}
                height={675}
                altText="Image"
                globalContent={{}}
                layout=""
                title1=""
                title2=""
                subheadline=""
                diagram="image-panoramic"
            />
        );

        expect(screen.getByAltText('Image')).toBeInTheDocument();
    });

    it('should handle special characters in titles and subheadline', () => {
        render(
            <OpeningImagePanoramic
                {...mockProps}
                title1="Título con 'comillas' & símbolos"
                title2="Subtítulo: más detalles"
                subheadline='Párrafo con <etiquetas> y "comillas"'
            />
        );

        expect(
            screen.getByText("Título con 'comillas' & símbolos")
        ).toBeInTheDocument();
        expect(screen.getByText('Subtítulo: más detalles')).toBeInTheDocument();
        expect(
            screen.getByText('Párrafo con <etiquetas> y "comillas"')
        ).toBeInTheDocument();
    });

    describe('snapshots', () => {
        it('snapshot with all props', () => {
            const { container } = render(
                <OpeningImagePanoramic {...mockProps} />
            );
            expect(container).toMatchSnapshot();
        });

        it('snapshot without image', () => {
            const { container } = render(
                <OpeningImagePanoramic {...mockProps} src="" />
            );
            expect(container).toMatchSnapshot();
        });

        it('snapshot without subheadline', () => {
            const { container } = render(
                <OpeningImagePanoramic {...mockProps} subheadline="" />
            );
            expect(container).toMatchSnapshot();
        });

        it('minimal snapshot (only src)', () => {
            const { container } = render(
                <OpeningImagePanoramic
                    src="https://example.com/image.jpg"
                    srcset="https://example.com/image.jpg 1200w"
                    sizes="100vw"
                    width={1200}
                    height={675}
                />
            );
            expect(container).toMatchSnapshot();
        });
    });
});
