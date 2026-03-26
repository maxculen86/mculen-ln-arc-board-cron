import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useContent } from 'fusion:content';
import { validateItemCarrusel } from '../../../../../components/features/LN-10/itemCarrusel/_helper';
import ItemCarrusel from '../../../../../components/features/LN-10/itemCarrusel/default';
import CajaCarruselProvider from '../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext';

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock(
    '../../../../../components/features/LN-10/itemCarrusel/_helper',
    () => ({
        ...jest.requireActual(
            '../../../../../components/features/LN-10/itemCarrusel/_helper'
        ),
        validateItemCarrusel: jest.fn()
    })
);

const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();
let intersectionCallback = () => {};

window.IntersectionObserver = jest.fn((callback = () => {}) => {
    intersectionCallback = callback;
    return {
        observe,
        unobserve,
        disconnect
    };
});

const triggerIntersection = isIntersecting => {
    act(() => {
        intersectionCallback([
            {
                isIntersecting
            }
        ]);
    });
};

describe('components - features - LN-10 - itemCarrusel', () => {
    const mockVideoData = {
        poster: 'mock-poster.jpg',
        posterVideo: 'mock-preview.mp4',
        duration: 20,
        title: 'Mock Video'
    };
    beforeAll(() => {
        HTMLMediaElement.prototype.play = jest.fn();
        HTMLMediaElement.prototype.pause = jest.fn();
    });

    const defaultProps = {
        isAdmin: false,
        id: 'feature-id-123',
        customFields: {
            video: 'video-id-123',
            title: 'Test Title',
            chapita: 'Test Chapita',
            chapitaStyle: 'style-class'
        },
        renderables: []
    };

    afterEach(() => {
        jest.clearAllMocks();
        intersectionCallback = () => {};
    });

    const renderWithProvider = (ui, providerProps) => {
        return render(
            <CajaCarruselProvider {...providerProps}>{ui}</CajaCarruselProvider>
        );
    };

    it('renders a warning message when isAdmin is true and there is an error', () => {
        const errorMock = {
            type: 'error',
            message: 'Advertencia. El campo Video es obligatorio'
        };
        validateItemCarrusel.mockReturnValue(errorMock);

        renderWithProvider(
            <ItemCarrusel {...defaultProps} isAdmin={true} />,
            {}
        );

        expect(
            screen.getByText(/Advertencia. El campo Video es obligatorio/i)
        ).toBeInTheDocument();
        expect(screen.getByRole('article')).toHaveAttribute(
            'data-feature-id',
            'feature-id-123'
        );
    });

    it('renders the video content when no error and video data is available', () => {
        useContent.mockImplementation(({ source }) =>
            source === 'videosJwCarruselSource' ? mockVideoData : null
        );
        validateItemCarrusel.mockReturnValue(null);

        const { container } = renderWithProvider(
            <ItemCarrusel {...defaultProps} />,
            {}
        );

        triggerIntersection(true);

        expect(screen.getByText(/test title/i)).toBeInTheDocument();
        expect(container.querySelector('img')).toHaveAttribute(
            'src',
            'mock-poster.jpg'
        );
    });

    it('does not fetch video content before item enters viewport', () => {
        useContent.mockReturnValue(null);
        validateItemCarrusel.mockReturnValue(null);

        renderWithProvider(<ItemCarrusel {...defaultProps} />, {});

        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({ source: null })
        );
    });

    it('fetches video content once item enters viewport', () => {
        useContent.mockImplementation(({ source }) =>
            source === 'videosJwCarruselSource' ? mockVideoData : null
        );
        validateItemCarrusel.mockReturnValue(null);

        renderWithProvider(<ItemCarrusel {...defaultProps} />, {});

        triggerIntersection(true);

        expect(useContent).toHaveBeenLastCalledWith(
            expect.objectContaining({
                source: 'videosJwCarruselSource'
            })
        );
    });

    it('cleans up observer on unmount', () => {
        useContent.mockReturnValue(null);
        validateItemCarrusel.mockReturnValue(null);

        const { unmount } = renderWithProvider(
            <ItemCarrusel {...defaultProps} />,
            {}
        );

        unmount();

        expect(unobserve).toHaveBeenCalled();
    });

    it('keeps hover preview behavior on desktop after viewport eligibility', () => {
        useContent.mockImplementation(({ source }) =>
            source === 'videosJwCarruselSource' ? mockVideoData : null
        );
        validateItemCarrusel.mockReturnValue(null);
        window.innerWidth = 1280;

        const { container } = renderWithProvider(
            <ItemCarrusel {...defaultProps} />,
            {}
        );

        triggerIntersection(true);

        const card = container.querySelector('.card-carousel');
        expect(card).not.toBeNull();

        fireEvent.mouseEnter(card);
        expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();

        fireEvent.mouseLeave(card);
        expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    });

    it('does not render anything when there is an error and isAdmin is false', () => {
        validateItemCarrusel.mockReturnValue({
            type: 'error',
            message: 'Invalid video data'
        });

        const { container } = renderWithProvider(
            <ItemCarrusel {...defaultProps} />,
            {}
        );

        triggerIntersection(true);

        expect(container.firstChild).toBeNull();
    });

    it('does not render anything when videoData is null', () => {
        useContent.mockReturnValue(null);
        validateItemCarrusel.mockReturnValue(null);

        const { container } = renderWithProvider(
            <ItemCarrusel {...defaultProps} />,
            {}
        );

        triggerIntersection(true);

        expect(container.firstChild).toBeNull();
    });
});
