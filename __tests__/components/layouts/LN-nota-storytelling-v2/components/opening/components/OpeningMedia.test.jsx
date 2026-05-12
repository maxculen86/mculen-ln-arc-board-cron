import React from 'react';
import { render, screen } from '@testing-library/react';
import OpeningMedia from '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningMedia';

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
            loading
        }) => (
            <img
                data-testid="image-ui"
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
        )
    })
);

const imageProps = {
    src: 'https://example.com/image.jpg',
    srcset: 'image-small.jpg 500w, image-large.jpg 1024w',
    sizes: '(max-width: 500px) 500px, 1024px',
    width: 1024,
    height: 576,
    altText: 'Article image'
};

const videoProps = {
    videoUrl: 'https://cdn.jwplayer.com/video.mp4',
    posterUrl: 'https://cdn.jwplayer.com/poster.jpg'
};

describe('OpeningMedia', () => {
    describe('early return', () => {
        it('should return null when neither src nor videoUrl is provided', () => {
            const { container } = render(<OpeningMedia />);
            expect(container).toBeEmptyDOMElement();
        });

        it('should return null when src is empty string and videoUrl is empty string', () => {
            const { container } = render(<OpeningMedia src="" videoUrl="" />);
            expect(container).toBeEmptyDOMElement();
        });

        it('should return null when src and videoUrl are undefined', () => {
            const { container } = render(
                <OpeningMedia src={undefined} videoUrl={undefined} />
            );
            expect(container).toBeEmptyDOMElement();
        });
    });

    describe('video rendering', () => {
        it('should render a video element when videoUrl is provided', () => {
            const { container } = render(<OpeningMedia {...videoProps} />);
            expect(container.querySelector('video')).toBeInTheDocument();
        });

        it('should not render ImageUI when videoUrl is provided', () => {
            render(<OpeningMedia {...videoProps} />);
            expect(screen.queryByTestId('image-ui')).not.toBeInTheDocument();
        });

        it('should set src and poster attributes on the video element', () => {
            const { container } = render(<OpeningMedia {...videoProps} />);
            const video = container.querySelector('video');
            expect(video).toHaveAttribute(
                'src',
                'https://cdn.jwplayer.com/video.mp4'
            );
            expect(video).toHaveAttribute(
                'poster',
                'https://cdn.jwplayer.com/poster.jpg'
            );
        });

        it('should apply cover classes to the video element', () => {
            const { container } = render(<OpeningMedia {...videoProps} />);
            const video = container.querySelector('video');
            expect(video).toHaveClass(
                'w-full',
                'h-full',
                'object-cover',
                'opacity-60'
            );
        });

        it('should render video with autoPlay attribute', () => {
            const { container } = render(<OpeningMedia {...videoProps} />);
            expect(container.querySelector('video')).toHaveAttribute(
                'autoplay'
            );
        });

        it('should render video with loop attribute', () => {
            const { container } = render(<OpeningMedia {...videoProps} />);
            expect(container.querySelector('video')).toHaveAttribute('loop');
        });

        it('should render video with muted property set to true', () => {
            const { container } = render(<OpeningMedia {...videoProps} />);
            // jsdom exposes `muted` as a DOM property, not an HTML attribute
            expect(container.querySelector('video').muted).toBe(true);
        });

        it('should render video with playsinline attribute', () => {
            const { container } = render(<OpeningMedia {...videoProps} />);
            expect(container.querySelector('video')).toHaveAttribute(
                'playsinline'
            );
        });

        it('should prioritize video over image when both videoUrl and src are provided', () => {
            const { container } = render(
                <OpeningMedia {...imageProps} {...videoProps} />
            );
            expect(container.querySelector('video')).toBeInTheDocument();
            expect(screen.queryByTestId('image-ui')).not.toBeInTheDocument();
        });
    });

    describe('image rendering', () => {
        it('should render ImageUI when src is provided and no videoUrl', () => {
            render(<OpeningMedia {...imageProps} />);
            expect(screen.getByTestId('image-ui')).toBeInTheDocument();
        });

        it('should not render a video element when only src is provided', () => {
            const { container } = render(<OpeningMedia {...imageProps} />);
            expect(container.querySelector('video')).not.toBeInTheDocument();
        });

        it('should pass cover classes to ImageUI via classnames.image', () => {
            render(<OpeningMedia {...imageProps} />);
            const img = screen.getByTestId('image-ui');
            expect(img).toHaveClass(
                'w-full',
                'h-full',
                'object-cover',
                'opacity-60'
            );
        });

        it('should pass fetchPriority high to ImageUI', () => {
            render(<OpeningMedia {...imageProps} />);
            expect(screen.getByTestId('image-ui')).toHaveAttribute(
                'data-fetch-priority',
                'high'
            );
        });

        it('should pass loading eager to ImageUI', () => {
            render(<OpeningMedia {...imageProps} />);
            expect(screen.getByTestId('image-ui')).toHaveAttribute(
                'data-loading',
                'eager'
            );
        });

        it('should pass src to ImageUI', () => {
            render(<OpeningMedia {...imageProps} />);
            expect(screen.getByTestId('image-ui')).toHaveAttribute(
                'src',
                'https://example.com/image.jpg'
            );
        });

        it('should pass altText as alt to ImageUI', () => {
            render(<OpeningMedia {...imageProps} />);
            expect(screen.getByAltText('Article image')).toBeInTheDocument();
        });

        it('should pass srcset as srcSet to ImageUI', () => {
            render(<OpeningMedia {...imageProps} />);
            expect(screen.getByTestId('image-ui')).toHaveAttribute(
                'srcset',
                'image-small.jpg 500w, image-large.jpg 1024w'
            );
        });
    });

    describe('snapshots', () => {
        it('matches snapshot when rendering image', () => {
            const { asFragment } = render(<OpeningMedia {...imageProps} />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot when rendering video', () => {
            const { asFragment } = render(<OpeningMedia {...videoProps} />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot when neither src nor videoUrl is provided', () => {
            const { asFragment } = render(<OpeningMedia />);
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
