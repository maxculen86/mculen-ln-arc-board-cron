import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardCarrusel from '../../../../../components/features/LN-10-global/cardCarrusel/default';
import { secondsToMinutes } from '../../../../../components/features/LN-10-global/cardCarrusel/helpers';
import CajaCarruselProvider from '../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext';

jest.mock(
    '../../../../../components/features/LN-10-global/cardCarrusel/video',
    () => ({
        __esModule: true,
        default: jest.fn(({ src, poster, isPlaying }) => (
            <div data-testid="video-mock">
                <span>{src}</span>
                <span>{poster}</span>
                <span>{isPlaying ? 'Playing' : 'Paused'}</span>
            </div>
        ))
    })
);

jest.mock(
    '../../../../../components/features/LN-10-global/cardCarrusel/helpers',
    () => ({
        secondsToMinutes: jest.fn(),
        cardVideoClassNames: jest.fn(() => 'mocked-class'),
        getDesktopPreviewVideo: jest.fn(value => value),
        getDesktopPosterImage: jest.fn(value => value),
        getClassNamesMedia: jest.fn(() => ({
            classNamePoster: 'mocked-poster-class',
            classNameVideo: 'mocked-video-class'
        }))
    })
);

describe('components - features - LN-10-global - cardCarrusel - default', () => {
    const defaultProps = {
        title: 'Test Title',
        titleJwPlayer: 'Test title jw',
        cardPosition: 0,
        src: 'video.mp4',
        badgeText: 'Test Badge',
        poster: 'poster.jpg',
        duration: 120,
        videoId: 'video-id-123'
    };

    beforeEach(() => {
        secondsToMinutes.mockReturnValue('02:00');
    });

    const renderWithProvider = (ui, providerProps) => {
        return render(
            <CajaCarruselProvider {...providerProps}>{ui}</CajaCarruselProvider>
        );
    };

    it('should renders correctly with given props', () => {
        renderWithProvider(<CardCarrusel {...defaultProps} />, {});

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Badge')).toBeInTheDocument();
        expect(screen.getByText('02:00')).toBeInTheDocument();
        expect(screen.getByTestId('video-mock')).toBeInTheDocument();
    });

    it('should not render time when duration is undefined', () => {
        renderWithProvider(
            <CardCarrusel {...defaultProps} duration={undefined} />,
            {}
        );
        expect(screen.queryByText('02:00')).not.toBeInTheDocument();
    });
    it('should not render time when duration is 0', () => {
        renderWithProvider(<CardCarrusel {...defaultProps} duration={0} />, {});
        expect(screen.queryByText('02:00')).not.toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = renderWithProvider(
            <CardCarrusel {...defaultProps} />,
            {}
        );
        expect(container).toMatchSnapshot();
    });
    it('should match snapshot without title', () => {
        const { container } = renderWithProvider(
            <CardCarrusel {...defaultProps} title={undefined} />,
            {}
        );
        expect(container).toMatchSnapshot();
    });
});
