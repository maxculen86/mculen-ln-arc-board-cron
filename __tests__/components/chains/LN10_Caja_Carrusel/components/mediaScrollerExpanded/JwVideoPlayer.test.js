import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import JwVideoPlayer from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayer';

describe('components - chains - ln10_caja_carrusel - components - JwVideoPlayer', () => {
    beforeEach(() => {
        window.jwplayer = jest.fn(() => ({
            setup: jest.fn()
        }));
    });

    it('renders the video player div with the correct ID', () => {
        const videoId = 'test-video-id';
        const { container } = render(<JwVideoPlayer videoId={videoId} />);
        const videoDiv = container.querySelector(`#${videoId}`);

        expect(videoDiv).toBeInTheDocument();
    });

    it('calls jwplayer with the correct videoId and sets up the player', () => {
        const videoId = 'test-video-id';
        const mockSetup = jest.fn();
        window.jwplayer.mockReturnValue({
            setup: mockSetup
        });

        render(<JwVideoPlayer videoId={videoId} />);

        expect(window.jwplayer).toHaveBeenCalledWith(videoId);
        expect(mockSetup).toHaveBeenCalledWith({
            file: `https://cdn.jwplayer.com/videos/${videoId}.mp4`,
            image: `https://cdn.jwplayer.com/v2/media/${videoId}/poster.jpg`,
            width: '100%'
        });
    });

    it('does not throw errors if jwplayer is undefined', () => {
        window.jwplayer = undefined;

        const videoId = 'test-video-id';
        expect(() => render(<JwVideoPlayer videoId={videoId} />)).not.toThrow();
    });
});
