import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RenderMediaItem from '../../../../../../../components/features/LN/common/galleryEmbed/components/RenderMediaItem';

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) => args.filter(Boolean).join(' ')
}));

jest.mock(
    '../../../../../../../components/features/ui/ln/image/default',
    () =>
        ({ alt, src, className }) => (
            <img
                data-testid="image-ui"
                alt={alt}
                src={src}
                className={className}
            />
        )
);

jest.mock(
    '../../../../../../../components/private/LN/common/utils/mediaHelper',
    () => ({
        getImagesToLoadWithPicture: jest.fn(() => [])
    })
);

const videoElement = {
    type: 'video',
    mp4: 'https://example.com/video.mp4',
    poster: 'https://example.com/poster.jpg'
};

const imageElement = {
    _id: 'img1',
    url: 'https://example.com/image.jpg',
    alt: 'Gallery image',
    resized_urls: {}
};

describe('components - features - LN - common - components - RenderMediaItem', () => {
    describe('video element', () => {
        it('renders a video tag when type is video', () => {
            const { container } = render(
                <RenderMediaItem element={videoElement} />
            );
            expect(container.querySelector('video')).toBeInTheDocument();
        });

        it('sets video src and poster from element props', () => {
            const { container } = render(
                <RenderMediaItem element={videoElement} />
            );
            const video = container.querySelector('video');
            expect(video).toHaveAttribute('src', videoElement.mp4);
            expect(video).toHaveAttribute('poster', videoElement.poster);
        });

        it('video has aria-hidden true', () => {
            const { container } = render(
                <RenderMediaItem element={videoElement} />
            );
            expect(container.querySelector('video')).toHaveAttribute(
                'aria-hidden',
                'true'
            );
        });

        it('applies aspectRatio class to video', () => {
            const { container } = render(
                <RenderMediaItem
                    element={videoElement}
                    aspectRatio="aspect-[3/2]"
                />
            );
            expect(container.querySelector('video')).toHaveClass(
                'aspect-[3/2]'
            );
        });

        it('video has object-cover class', () => {
            const { container } = render(
                <RenderMediaItem element={videoElement} />
            );
            expect(container.querySelector('video')).toHaveClass(
                'object-cover'
            );
        });

        it('snapshot of video element', () => {
            const { container } = render(
                <RenderMediaItem
                    element={videoElement}
                    aspectRatio="aspect-[3/2]"
                />
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe('image element', () => {
        it('renders an image when type is not video', () => {
            render(<RenderMediaItem element={imageElement} />);
            expect(screen.getByTestId('image-ui')).toBeInTheDocument();
        });

        it('passes alt text to the image', () => {
            render(<RenderMediaItem element={imageElement} />);
            expect(screen.getByTestId('image-ui')).toHaveAttribute(
                'alt',
                imageElement.alt
            );
        });

        it('uses fallback alt when element has no alt', () => {
            render(
                <RenderMediaItem
                    element={{ ...imageElement, alt: undefined }}
                />
            );
            expect(screen.getByTestId('image-ui')).toHaveAttribute(
                'alt',
                'Imagen de la galería'
            );
        });

        it('does not render a video tag for image elements', () => {
            const { container } = render(
                <RenderMediaItem element={imageElement} />
            );
            expect(container.querySelector('video')).not.toBeInTheDocument();
        });

        it('snapshot of image element', () => {
            const { container } = render(
                <RenderMediaItem
                    element={imageElement}
                    aspectRatio="aspect-[3/2]"
                />
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
