import React from 'react';
import { render, screen } from '@testing-library/react';
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

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve,
    disconnect
}));

describe('components - features - LN-10 - itemCarrusel', () => {
    const mockVideoData = {
        poster: 'mock-poster.jpg'
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
        useContent.mockReturnValue(mockVideoData);
        validateItemCarrusel.mockReturnValue(null);

        const { container } = renderWithProvider(
            <ItemCarrusel {...defaultProps} />,
            {}
        );

        expect(screen.getByText(/test title/i)).toBeInTheDocument();
        expect(container.querySelector('img')).toHaveAttribute(
            'src',
            'mock-poster.jpg'
        );
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

        expect(container.firstChild).toBeNull();
    });

    it('does not render anything when videoData is null', () => {
        useContent.mockReturnValue(null);
        validateItemCarrusel.mockReturnValue(null);

        const { container } = renderWithProvider(
            <ItemCarrusel {...defaultProps} />,
            {}
        );

        expect(container.firstChild).toBeNull();
    });
});
