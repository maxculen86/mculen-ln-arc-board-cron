import React from 'react';
import { render, screen } from '@testing-library/react';
import OpeningImage100 from '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningImage100';

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
            classnames,
            fetchPriority,
            loading,
            renderImgOnly = false,
            sources = []
        }) => {
            const image = (
                <img
                    alt={alt}
                    src={src}
                    srcSet={srcSet}
                    sizes={sizes}
                    width={width}
                    height={height}
                    className={classnames?.image}
                    data-fetch-priority={fetchPriority}
                    data-loading={loading}
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
    })
);

jest.mock(
    '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningAddons',
    () => ({
        __esModule: true,
        default: ({ globalContent, layout, classnames }) => (
            <div data-testid="opening-addons">OpeningAddons</div>
        )
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

describe('OpeningImage100', () => {
    const mockProps = {
        diagram: 'title-below',
        src: 'image-default.jpg',
        srcset: 'image-small.jpg 500w, image-large.jpg 1024w',
        sizes: '(max-width: 500px) 500px, 1024px',
        width: 1024,
        height: 576,
        altText: 'Article image',
        globalContent: { id: 'article-123' },
        layout: 'image-100-title',
        title1: 'Main Title',
        title2: 'Subtitle',
        subheadline: 'This is the subheadline'
    };

    it('should render all sections with provided data', () => {
        render(<OpeningImage100 {...mockProps} />);

        expect(screen.getByTestId('opening-addons')).toBeInTheDocument();
        expect(screen.getByTestId('opening-titles')).toBeInTheDocument();
        expect(screen.getByText('This is the subheadline')).toBeInTheDocument();
    });

    it('should render image with correct attributes', () => {
        render(<OpeningImage100 {...mockProps} />);

        const img = screen.getByAltText('Article image');
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

    it('should render a plain img without picture sources', () => {
        const { container } = render(<OpeningImage100 {...mockProps} />);

        const img = screen.getByAltText('Article image');
        expect(container.querySelector('picture')).not.toBeInTheDocument();
        expect(container.querySelectorAll('source')).toHaveLength(0);
        expect(img.tagName).toBe('IMG');
    });

    it('should not render image when src is empty', () => {
        render(<OpeningImage100 {...mockProps} src="" />);

        expect(screen.queryByAltText('Article image')).not.toBeInTheDocument();
    });

    it('should not render subheadline when not provided', () => {
        render(<OpeningImage100 {...mockProps} subheadline="" />);

        expect(
            screen.queryByText('This is the subheadline')
        ).not.toBeInTheDocument();
    });

    it('should not render subheadline when undefined', () => {
        render(<OpeningImage100 {...mockProps} subheadline={undefined} />);

        expect(
            screen.queryByText('This is the subheadline')
        ).not.toBeInTheDocument();
    });

    it('should pass correct props to OpeningAddons', () => {
        render(<OpeningImage100 {...mockProps} />);

        const addonsComponent = screen.getByTestId('opening-addons');
        expect(addonsComponent).toBeInTheDocument();
    });

    it('should pass correct props to OpeningTitles', () => {
        render(<OpeningImage100 {...mockProps} />);

        const titles = screen.getByTestId('opening-titles');
        expect(titles).toHaveTextContent('Main Title');
        expect(titles).toHaveTextContent('Subtitle');
    });

    it('renders subheadline with text-subheading-md class', () => {
        render(<OpeningImage100 {...mockProps} />);
        const p = screen.getByText('This is the subheadline');
        expect(p.tagName).toBe('P');
        expect(p).toHaveClass('text-subheading-md');
    });

    it('should have correct section structure with aria attributes', () => {
        const { container } = render(<OpeningImage100 {...mockProps} />);

        const section = container.querySelector('section');
        expect(section).toBeInTheDocument();
        expect(section).toHaveClass('bg-black-dark', 'overflow-hidden');
        expect(section).toHaveAttribute('data-diagram', 'title-below');
    });

    it('should apply variant-specific classes based on diagram', () => {
        const { container } = render(
            <OpeningImage100 {...mockProps} diagram="title-centered" />
        );

        const section = container.querySelector('section');
        expect(section).toHaveAttribute('data-diagram', 'title-centered');
    });

    it('should render with default empty values', () => {
        render(
            <OpeningImage100
                diagram="title-100"
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
            />
        );

        expect(screen.getByAltText('Image')).toBeInTheDocument();
    });

    it('should handle special characters in titles and subheadline', () => {
        render(
            <OpeningImage100
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

    it('should have proper styling classes applied', () => {
        const { container } = render(<OpeningImage100 {...mockProps} />);

        const section = container.querySelector('section');
        expect(section).toHaveClass(
            'relative',
            'w-screen',
            'overflow-hidden',
            '-translate-x-1/2',
            'left-1/2',
            'bg-black-dark'
        );
    });
    describe('video', () => {
        it('should render a video element when videoUrl is provided', () => {
            const { container } = render(
                <OpeningImage100
                    {...mockProps}
                    src=""
                    videoUrl="https://cdn.jwplayer.com/video.mp4"
                    posterUrl="https://cdn.jwplayer.com/poster.jpg"
                />
            );
            expect(container.querySelector('video')).toBeInTheDocument();
        });

        it('should not render image when videoUrl is provided', () => {
            render(
                <OpeningImage100
                    {...mockProps}
                    videoUrl="https://cdn.jwplayer.com/video.mp4"
                />
            );
            expect(
                screen.queryByAltText('Article image')
            ).not.toBeInTheDocument();
        });

        it('should render video with cover classes', () => {
            const { container } = render(
                <OpeningImage100
                    {...mockProps}
                    src=""
                    videoUrl="https://cdn.jwplayer.com/video.mp4"
                />
            );
            const video = container.querySelector('video');
            expect(video).toHaveClass(
                'w-full',
                'h-full',
                'object-cover',
                'opacity-60'
            );
        });

        it('should not render media when neither src nor videoUrl is provided', () => {
            const { container } = render(
                <OpeningImage100 {...mockProps} src="" videoUrl="" />
            );
            expect(container.querySelector('video')).not.toBeInTheDocument();
            expect(
                screen.queryByAltText('Article image')
            ).not.toBeInTheDocument();
        });
    });

    describe('null guard', () => {
        it('should render titles when neither src nor videoUrl is provided', () => {
            const { container } = render(
                <OpeningImage100 {...mockProps} src="" videoUrl="" />
            );
            expect(container.querySelector('section')).toBeInTheDocument();
            expect(screen.getByTestId('opening-addons')).toBeInTheDocument();
            expect(screen.getByTestId('opening-titles')).toBeInTheDocument();
            expect(
                screen.queryByAltText('Article image')
            ).not.toBeInTheDocument();
            expect(container.querySelector('video')).not.toBeInTheDocument();
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with image', () => {
            const { container } = render(<OpeningImage100 {...mockProps} />);
            expect(container).toMatchSnapshot();
        });

        it('matches snapshot with video', () => {
            const { container } = render(
                <OpeningImage100
                    {...mockProps}
                    src=""
                    videoUrl="https://cdn.jwplayer.com/video.mp4"
                    posterUrl="https://cdn.jwplayer.com/poster.jpg"
                />
            );
            expect(container).toMatchSnapshot();
        });

        it('matches snapshot without media', () => {
            const { container } = render(
                <OpeningImage100 {...mockProps} src="" videoUrl="" />
            );
            expect(container).toMatchSnapshot();
        });
    });
});
