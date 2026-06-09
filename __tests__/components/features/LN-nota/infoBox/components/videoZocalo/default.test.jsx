import React from 'react';
import { render } from '@testing-library/react';
import VideoZocalo from '../../../../../../../components/features/LN-nota/infoBox/components/videoZocalo/default';

describe('VideoZocalo', () => {
    it('Should render video element with src and className', () => {
        const { container } = render(
            <VideoZocalo
                src="https://example.com/video.mp4"
                className="w-210"
            />
        );

        const videoElement = container.querySelector('video');
        expect(videoElement).toBeInTheDocument();
        const sourceElement = videoElement.querySelector('source');
        expect(sourceElement).toHaveAttribute(
            'src',
            'https://example.com/video.mp4'
        );
        expect(videoElement).toHaveClass('w-210');
    });

    it('Should apply video attributes: loop, autoPlay, muted, playsInline', () => {
        const { container } = render(
            <VideoZocalo src="https://example.com/video.mp4" />
        );

        const videoElement = container.querySelector('video');
        expect(videoElement).toHaveAttribute('loop');
        expect(videoElement).toHaveAttribute('autoplay');
        expect(videoElement.muted).toBe(true);
        expect(videoElement.playsInline).toBe(true);
    });

    it('Should return null when src is empty string', () => {
        const { container } = render(<VideoZocalo src="" />);
        expect(container.firstChild).toBeNull();
    });

    it('Should return null when src is undefined', () => {
        const { container } = render(<VideoZocalo />);
        expect(container.firstChild).toBeNull();
    });

    it('Should return null when src is null', () => {
        const { container } = render(<VideoZocalo src={null} />);
        expect(container.firstChild).toBeNull();
    });

    it('Should accept and apply additional props to video element', () => {
        const { container } = render(
            <VideoZocalo
                src="https://example.com/video.mp4"
                data-testid="custom-video"
                title="Custom Title"
            />
        );

        const videoElement = container.querySelector('video');
        expect(videoElement).toHaveAttribute('data-testid', 'custom-video');
        expect(videoElement).toHaveAttribute('title', 'Custom Title');
    });

    it('Should preserve className even with empty src (should not render)', () => {
        const { container } = render(<VideoZocalo src="" className="w-210" />);
        expect(container.firstChild).toBeNull();
    });

    it('Should match snapshot with given src and className', () => {
        const { container } = render(
            <VideoZocalo
                src="https://example.com/video.mp4"
                className="w-210"
            />
        );
        expect(container).toMatchSnapshot();
    });

    it('Should match snapshot with empty src and className', () => {
        const { container } = render(<VideoZocalo src="" className="w-210" />);

        expect(container).toMatchSnapshot();
    });
});
