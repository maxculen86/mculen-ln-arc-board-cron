import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { JwVideoContainer } from '../../../../../components/chains/foodit_Carousel_Videos/mediaScrollerExpanded/jwVideoContainer';
import { useCajaCarruselContext } from '../../../../../components/chains/foodit_Carousel_Videos/cajaCarruselContext';
import { isScriptLoaded } from '../../../../../components/chains/LN10_Caja_Carrusel/components/helpers';
import loadJWPlayerScript from '../../../../../components/chains/utils/loadJWPlayerScript';

jest.mock(
    '../../../../../components/chains/foodit_Carousel_Videos/cajaCarruselContext',
    () => ({
        useCajaCarruselContext: jest.fn()
    })
);

jest.mock(
    '../../../../../components/chains/foodit_Carousel_Videos/mediaScrollerExpanded/jwVideoPlayer',
    () =>
        function MockJwVideoPlayer({ videoId }) {
            return <div data-testid={`jw-video-player-${videoId}`} />;
        }
);

jest.mock(
    '../../../../../components/chains/LN10_Caja_Carrusel/components/helpers',
    () => ({ isScriptLoaded: jest.fn() })
);

jest.mock('../../../../../components/chains/utils/loadJWPlayerScript', () =>
    jest.fn()
);

jest.mock(
    '../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () =>
        function MockIconSprite() {
            return <span />;
        }
);

describe('JwVideoContainer', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        isScriptLoaded.mockReturnValue(false);
        loadJWPlayerScript.mockImplementation((_, callback) => callback());
        useCajaCarruselContext.mockReturnValue({
            onCloseMediaScrollerExpanded: mockOnClose,
            currentIndex: 0
        });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    const defaultProps = {
        handleNextCallback: jest.fn(),
        listVideoData: [
            { id: 'video1', title: 'Video 1' },
            { id: 'video2', title: 'Video 2' },
            { id: 'video3', title: 'Video 3' }
        ]
    };

    it('should render video players for each video in list', () => {
        render(<JwVideoContainer {...defaultProps} />);

        expect(
            screen.getByTestId('jw-video-player-video1')
        ).toBeInTheDocument();
        expect(
            screen.getByTestId('jw-video-player-video2')
        ).toBeInTheDocument();
        expect(
            screen.getByTestId('jw-video-player-video3')
        ).toBeInTheDocument();
    });

    it('should have accessible carousel structure with ARIA attributes', () => {
        useCajaCarruselContext.mockReturnValue({
            onCloseMediaScrollerExpanded: mockOnClose,
            currentIndex: 1
        });

        render(<JwVideoContainer {...defaultProps} />);

        const carousel = screen.getByRole('region');
        expect(carousel).toHaveAttribute('aria-label', 'Carrusel de videos');

        const slides = screen.getAllByRole('group');
        expect(slides[1]).toHaveAttribute('aria-current', 'true');
        expect(slides[0]).not.toHaveAttribute('aria-current');
    });

    it('should close carousel when close button is clicked', () => {
        render(<JwVideoContainer {...defaultProps} />);

        fireEvent.click(screen.getAllByTitle('Cerrar')[0]);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should hide swipe up legend after 5 seconds', () => {
        render(<JwVideoContainer {...defaultProps} />);

        expect(
            screen.getAllByText('Desliza hacia arriba para continuar')[0]
        ).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(5000);
        });

        expect(
            screen.queryByText('Desliza hacia arriba para continuar')
        ).not.toBeInTheDocument();
    });

    it('should load JW Player script on mount', () => {
        render(<JwVideoContainer {...defaultProps} />);

        expect(loadJWPlayerScript).toHaveBeenCalledWith(
            'OSRCuuxn',
            expect.any(Function)
        );
    });

    it('should match snapshot', () => {
        const { asFragment } = render(<JwVideoContainer {...defaultProps} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
