import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Video from '../../../../../components/features/LN-10-global/cardVerticalCarrusel/video';

jest.mock('@ln/common-ui-adaptableimage', () => ({
    Adaptableimage: jest.fn(({ src, alt, ...props }) => (
        <img src={src} alt={alt} {...props} data-testid="Adaptableimage" />
    ))
}));

const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve,
    disconnect
}));

describe('components - features - LN-10-global - cardVerticalCarrusel - video', () => {
    const defaultProps = {
        src: 'video.mp4',
        poster: 'poster.jpg',
        isPlaying: false,
        'data-testid': 'video-element',
        setIsPlaying: jest.fn()
    };
    beforeAll(() => {
        HTMLMediaElement.prototype.play = jest.fn();
        HTMLMediaElement.prototype.pause = jest.fn();
    });

    it('renders Adaptableimage with correct props', () => {
        render(<Video {...defaultProps} />);

        const adaptableImage = screen.getByTestId('Adaptableimage');
        expect(adaptableImage).toHaveAttribute('src', 'poster.jpg');
        expect(adaptableImage).toHaveAttribute('alt', 'Imagen poster de video');
        expect(adaptableImage).toHaveClass('w-100 h-100');
    });

    it('renders video element with correct props', () => {
        render(<Video {...defaultProps} />);

        const video = screen.getByTestId('video-element');
        expect(video).toHaveAttribute('src', 'video.mp4');
        expect(video).toHaveAttribute('playsInline');
        expect(video).toHaveAttribute('loop');
        expect(video).toHaveClass(
            'w-100 h-100 absolute object-cover transition transition-opacity transition-ease-in transition-duration-500'
        );
    });
    it('tag video should have correct classnames when isPlaying is false', () => {
        render(<Video {...defaultProps} />);

        const video = screen.getByTestId('video-element');
        expect(video).toHaveClass('opacity-0 z-1');
    });
    it('tag video should have correct classnames when isPlaying is true', () => {
        render(<Video {...defaultProps} isPlaying={true} />);

        const video = screen.getByTestId('video-element');
        expect(video).toHaveClass('opacity-100 z-2');
    });

    it('Adaptableimage should have correct classnames when isPlaying is false', () => {
        render(<Video {...defaultProps} />);

        const adaptableImage = screen.getByTestId('Adaptableimage');
        expect(adaptableImage).toHaveClass('z-2');
    });
    it('Adaptableimage should have correct classnames when isPlaying is true', () => {
        render(<Video {...defaultProps} isPlaying={true} />);

        const adaptableImage = screen.getByTestId('Adaptableimage');
        expect(adaptableImage).toHaveClass('z-1');
    });

    it('plays video when isPlaying is true', () => {
        const { rerender } = render(
            <Video {...defaultProps} isPlaying={false} />
        );
        const video = screen.getByTestId('video-element');
        const playSpy = jest.spyOn(video, 'play');

        rerender(<Video {...defaultProps} isPlaying={true} />);
        expect(playSpy).toHaveBeenCalled();
    });

    it('pauses and resets video when isPlaying is false', () => {
        const { rerender } = render(
            <Video {...defaultProps} isPlaying={true} />
        );
        const video = screen.getByTestId('video-element');
        const pauseSpy = jest.spyOn(video, 'pause');

        rerender(<Video {...defaultProps} isPlaying={false} />);
        expect(pauseSpy).toHaveBeenCalled();
        expect(video.currentTime).toBe(0);
    });
    it('should match snapshot', () => {
        const { container } = render(<Video {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });
});
