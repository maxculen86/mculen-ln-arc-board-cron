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
            classnames,
            fetchPriority,
            loading,
            sources
        }) => (
            <picture>
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
                    className={classnames?.image}
                    data-fetch-priority={fetchPriority}
                    data-loading={loading}
                />
            </picture>
        )
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
        diagram: 'title-100',
        pictureSources: [
            { srcset: 'image-small.jpg 500w', media: '(max-width: 500px)' },
            { srcset: 'image-large.jpg 1024w', media: '(min-width: 501px)' }
        ],
        imgDefaultUrl: 'image-default.jpg',
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
    });

    it('should render responsive images with sources', () => {
        render(<OpeningImage100 {...mockProps} />);

        const sources = screen
            .getAllByRole('img')[0]
            .parentElement.querySelectorAll('source');
        expect(sources).toHaveLength(2);
        expect(sources[0]).toHaveAttribute('srcset', 'image-small.jpg 500w');
        expect(sources[1]).toHaveAttribute('srcset', 'image-large.jpg 1024w');
    });

    it('should not render image when imgDefaultUrl is empty', () => {
        render(<OpeningImage100 {...mockProps} imgDefaultUrl="" />);

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

    it('should have correct section structure with aria attributes', () => {
        const { container } = render(<OpeningImage100 {...mockProps} />);

        const section = container.querySelector('section');
        expect(section).toBeInTheDocument();
        expect(section).toHaveClass('bg-black-dark', 'overflow-hidden');
        expect(section).toHaveAttribute('data-diagram', 'title-100');
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
                pictureSources={[]}
                imgDefaultUrl="image.jpg"
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
    it('snapshot ', () => {
        const { container } = <OpeningImage100 {...mockProps} />;
        expect(container).toMatchSnapshot();
    });
});
