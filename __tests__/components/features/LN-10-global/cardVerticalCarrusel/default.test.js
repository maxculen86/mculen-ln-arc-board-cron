import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardVertical from '../../../../../components/features/LN-10-global/cardVerticalCarrusel/default';
import { secondsToMinutes } from '../../../../../components/features/LN-10-global/cardVerticalCarrusel/helpers';
jest.mock(
    '../../../../../components/features/LN-10-global/cardVerticalCarrusel/video',
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
    '../../../../../components/features/LN-10-global/cardVerticalCarrusel/helpers',
    () => ({
        secondsToMinutes: jest.fn()
    })
);

describe('components - features - LN-10-global - cardVerticalCarrusel - default', () => {
    const defaultProps = {
        title: 'Test Title',
        src: 'video.mp4',
        badgeText: 'Test Badge',
        poster: 'poster.jpg',
        duration: 120
    };
    beforeEach(() => {
        secondsToMinutes.mockReturnValue('02:00');
    });

    it('should renders correctly with given props', () => {
        render(<CardVertical {...defaultProps} />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Badge')).toBeInTheDocument();
        expect(screen.getByText('02:00')).toBeInTheDocument();
        expect(screen.getByTestId('video-mock')).toBeInTheDocument();
    });

    it('should not render time when duration is undefined', () => {
        render(<CardVertical {...defaultProps} duration={undefined} />);

        expect(screen.queryByText('02:00')).not.toBeInTheDocument();
    });
    it('should not render time when duration is 0', () => {
        render(<CardVertical {...defaultProps} duration={0} />);

        expect(screen.queryByText('02:00')).not.toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<CardVertical {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });
});
