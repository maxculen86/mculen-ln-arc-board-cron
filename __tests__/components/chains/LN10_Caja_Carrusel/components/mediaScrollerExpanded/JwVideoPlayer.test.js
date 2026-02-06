import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import JwVideoPlayer from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayer';
import { useCajaCarruselContext } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext';

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext',
    () => ({
        useCajaCarruselContext: jest.fn()
    })
);

describe('components - chains - ln10_caja_carrusel - components - JwVideoPlayer', () => {
    beforeEach(() => {
        window.jwplayer = jest.fn(() => ({
            setup: jest.fn()
        }));
        useCajaCarruselContext.mockReturnValue({
            currentIndex: 0
        });
    });

    const defaultProps = {
        videoId: 'test-video-id',
        index: 0,
        handleNextCallback: () => {},
        isLoadedScriptJw: true
    };

    it('should render placeholder video when not in view, index !== currentIndex', () => {
        const { container } = render(
            <JwVideoPlayer {...defaultProps} index={1} />
        );
        const placeholder = container.querySelector('.placeholder-jwplayer');

        expect(placeholder).toBeInTheDocument();
        expect(placeholder).toHaveClass(
            'placeholder-jwplayer flex flex-column w-100 h-100 ratio-9-16 jc-center ai-center bg-black'
        );
    });

    it('renders the video player div with the correct ID', () => {
        const videoId = 'test-video-id';
        const { container } = render(<JwVideoPlayer {...defaultProps} />);
        const videoDiv = container.querySelector(`#${videoId}`);

        expect(videoDiv).toBeInTheDocument();
    });

    it('calls jwplayer with the correct videoId and sets up the player', () => {
        const videoId = 'test-video-id';
        const mockSetup = jest.fn();
        window.jwplayer.mockReturnValue({
            setup: mockSetup
        });

        render(<JwVideoPlayer {...defaultProps} />);

        expect(window.jwplayer).toHaveBeenCalledWith(videoId);
        expect(mockSetup).toHaveBeenCalledWith({
            file: `https://cdn.jwplayer.com/videos/${videoId}.mp4`,
            image: `https://cdn.jwplayer.com/v2/media/${videoId}/poster.jpg`,
            width: '100%',
            allowFullscreen: false
        });
    });

    it('does not throw errors if jwplayer is undefined', () => {
        window.jwplayer = undefined;

        expect(() => render(<JwVideoPlayer {...defaultProps} />)).not.toThrow();
    });

    it('should match snapshot, div with id for build video', () => {
        const { container } = render(<JwVideoPlayer {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });
    it('should match snapshot, with placeholder', () => {
        const { container } = render(
            <JwVideoPlayer {...defaultProps} index={1} />
        );
        expect(container).toMatchSnapshot();
    });
});
