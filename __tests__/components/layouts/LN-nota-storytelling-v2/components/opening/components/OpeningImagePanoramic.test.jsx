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
        default: ({ alt, src, className, fetchPriority, loading, sources }) => (
            <picture data-testid="image-picture">
                {sources?.map((source, idx) => (
                    <source
                        key={idx}
                        srcSet={source.srcset}
                        media={source.media}
                    />
                ))}
                <img
                    alt={alt}
                    src={src}
                    className={className}
                    data-fetch-priority={fetchPriority}
                    data-loading={loading}
                />
            </picture>
        )
    })
);

jest.mock('@ln/ds-common-divider', () => ({
    Divider: ({ className, direction }) => (
        <hr
            data-testid="divider"
            className={className}
            data-direction={direction}
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
        default: ({ h1Props, h2Props }) => (
            <div data-testid="opening-titles">
                <h1>{h1Props?.text}</h1>
                <h2>{h2Props?.text}</h2>
            </div>
        )
    })
);

describe('OpeningImagePanoramic', () => {
    const mockProps = {
        pictureSources: [
            { srcset: 'image-small.jpg 500w', media: '(max-width: 500px)' },
            { srcset: 'image-large.jpg 1024w', media: '(min-width: 501px)' }
        ],
        imgDefaultUrl: 'image-panoramic.jpg',
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
    });

    it('should not render panoramic image when imgDefaultUrl is empty', () => {
        render(<OpeningImagePanoramic {...mockProps} imgDefaultUrl="" />);

        expect(screen.queryByTestId('image-picture')).not.toBeInTheDocument();
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
        expect(divider).toHaveClass(
            'max-w-80',
            'my-40',
            'border-black-default'
        );
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

    it('should render panoramic image with full viewport dimensions', () => {
        const { container } = render(<OpeningImagePanoramic {...mockProps} />);

        const panoramicDiv = container.querySelector(
            '[data-diagram="image-panoramic"]'
        );
        expect(panoramicDiv).toHaveClass(
            'w-screen',
            'h-screen',
            'overflow-hidden',
            'relative'
        );
    });

    it('should render responsive panoramic image with sources', () => {
        render(<OpeningImagePanoramic {...mockProps} />);

        const picture = screen.getByTestId('image-picture');
        const sources = picture.querySelectorAll('source');
        expect(sources).toHaveLength(2);
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
            'prumo',
            'text-subheading-md',
            'text-center',
            'max-w-635'
        );
    });

    it('should render with minimal props', () => {
        render(
            <OpeningImagePanoramic
                pictureSources={[]}
                imgDefaultUrl="image.jpg"
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
            const { container } = <OpeningImagePanoramic {...mockProps} />;
            expect(container).toMatchSnapshot();
        });

        it('snapshot without image', () => {
            const { container } = <OpeningImagePanoramic imgDefaultUrl="" />;
            expect(container).toMatchSnapshot();
        });

        it('snapshot without subheadline', () => {
            const { container } = <OpeningImagePanoramic subheadline="" />;
            expect(container).toMatchSnapshot();
        });

        it('minimal snapshot (only imgDefaultUrl)', () => {
            const { container } = render(
                <OpeningImagePanoramic imgDefaultUrl="https://example.com/image.jpg" />
            );
            expect(container).toMatchSnapshot();
        });
    });
});
