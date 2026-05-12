import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import GalleryEmbed from '../../../../../../components/features/LN/common/galleryEmbed/default';
import Gallery from '../../../../../../components/features/LN/common/galleryEmbed/components/Gallery';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../../components/private/common/utils/subtypes/subtypeHelper',
    () => ({
        isFotoAl100orStorytelling: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/galleryEmbed/components/RenderMediaItem',
    () =>
        ({ element }) => <div data-testid="media-item" data-id={element?._id} />
);

import { isFotoAl100orStorytelling } from '../../../../../../components/private/common/utils/subtypes/subtypeHelper';

const galleryImages = [
    { _id: 'img1', url: 'img1.jpg', alt: 'First' },
    { _id: 'img2', url: 'img2.jpg', alt: 'Second' }
];

const validData = {
    embed: {
        config: {
            diagram: 'two-side-by-side',
            caption: 'Gallery caption',
            galleryImages,
            isFotoAl100: false
        }
    }
};

describe('components - features - LN - common - galleryEmbed - default', () => {
    beforeEach(() => {
        Context.useAppContext.mockReturnValue({
            globalContent: { subtype: '4' }
        });
        isFotoAl100orStorytelling.mockReturnValue(true);
    });

    it('renders null when subtype is not foto-al-100 or storytelling', () => {
        isFotoAl100orStorytelling.mockReturnValue(false);
        const { container } = render(<GalleryEmbed data={validData} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders null when diagram is missing from data', () => {
        const dataWithoutDiagram = {
            embed: { config: { galleryImages, caption: 'test' } }
        };
        const { container } = render(
            <GalleryEmbed data={dataWithoutDiagram} />
        );
        expect(container).toBeEmptyDOMElement();
    });

    it('renders gallery section when valid data and valid subtype', () => {
        render(<GalleryEmbed data={validData} />);
        expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('snapshot of GalleryEmbed with valid data', () => {
        const { container } = render(<GalleryEmbed data={validData} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});

describe('Gallery', () => {
    const defaultProps = {
        galleryImages,
        caption: 'Gallery caption',
        gridClass: 'grid gap-16',
        containerClass: 'mock-container',
        embedItemClass: 'gallery-embed__item',
        aspectRatio: 'aspect-[3/2]'
    };

    it('renders a section with aria-labelledby pointing to gallery-caption', () => {
        const { container } = render(<Gallery {...defaultProps} />);
        const section = container.querySelector('section');
        expect(section).toBeInTheDocument();
        expect(section).toHaveAttribute('aria-labelledby', 'gallery-caption');
    });

    it('renders a media item for each image', () => {
        render(<Gallery {...defaultProps} />);
        expect(screen.getAllByTestId('media-item')).toHaveLength(
            galleryImages.length
        );
    });

    it('renders the caption text', () => {
        render(<Gallery {...defaultProps} />);
        expect(screen.getByText('Gallery caption')).toBeInTheDocument();
    });

    it('renders empty grid when no images are provided', () => {
        render(<Gallery {...defaultProps} galleryImages={[]} />);
        expect(screen.queryByTestId('media-item')).not.toBeInTheDocument();
    });

    it('snapshot of Gallery with images and caption', () => {
        const { container } = render(<Gallery {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
