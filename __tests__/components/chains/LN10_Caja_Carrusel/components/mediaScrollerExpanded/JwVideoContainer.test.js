import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JwVideoContainer from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoContainer';
import { useCajaCarruselContext } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext';

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext',
    () => ({
        useCajaCarruselContext: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayer',
    () =>
        ({ videoId }) => (
            <div data-testid={`jw-video-player-${videoId}`}>
                Mock Video Player for {videoId}
            </div>
        )
);

describe('components - chains - ln10_caja_carrusel - components - JwVideoContainer', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const defaultProps = {
        handleNextCallback: jest.fn(),
        isLastVideo: false,
        listVideoData: [
            { id: 'video1', title: 'Video 1' },
            { id: 'video2', title: 'Video 2' }
        ]
    };

    it('renders correctly when videosData is available', () => {
        useCajaCarruselContext.mockReturnValue({
            onCloseMediaScrollerExpanded: mockOnClose
        });

        render(<JwVideoContainer {...defaultProps} />);

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(2);

        expect(
            screen.getByTestId('jw-video-player-video1')
        ).toBeInTheDocument();
        expect(
            screen.getByTestId('jw-video-player-video2')
        ).toBeInTheDocument();
    });

    it('does not render anything if videosData is empty', () => {
        useCajaCarruselContext.mockReturnValue({
            onCloseMediaScrollerExpanded: mockOnClose
        });

        const { container } = render(
            <JwVideoContainer {...{ ...defaultProps, listVideoData: [] }} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('calls onCloseMediaScrollerExpanded when the close button is clicked', () => {
        useCajaCarruselContext.mockReturnValue({
            onCloseMediaScrollerExpanded: mockOnClose
        });

        render(
            <JwVideoContainer
                {...{
                    ...defaultProps,
                    listVideoData: [{ id: 'video1', title: 'Video 1' }]
                }}
            />
        );

        const closeButton = screen.getByTitle('Cerrar');
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalled();
    });
    it('should match snapshot', () => {
        useCajaCarruselContext.mockReturnValue({
            onCloseMediaScrollerExpanded: mockOnClose
        });
        const { asFragment } = render(<JwVideoContainer {...defaultProps} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
