import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MediaScrollerExpanded } from '../../../../../components/chains/foodit_Carousel_Videos/mediaScrollerExpanded/MediaScrollerExpanded';
import {
    useHandleBack,
    useHandleNext
} from '../../../../../components/chains/foodit_Carousel_Videos/hooks';
import { useCajaCarruselContext } from '../../../../../components/chains/foodit_Carousel_Videos/cajaCarruselContext';
import { useWindowSize } from '@ln/hooks';

const setCurrentIndex = jest.fn();
const mockOnClose = jest.fn();

jest.mock(
    '../../../../../components/chains/foodit_Carousel_Videos/cajaCarruselContext',
    () => ({
        useCajaCarruselContext: jest.fn()
    })
);

jest.mock('@ln/hooks', () => ({
    useWindowSize: jest.fn()
}));

jest.mock(
    '../../../../../components/chains/foodit_Carousel_Videos/hooks',
    () => ({
        useHandleBack: jest.fn(),
        useHandleNext: jest.fn(),
        useObserverItems: jest.fn(),
        useScrollTo: jest.fn(),
        useUpdateVideoWidth: jest.fn()
    })
);

jest.mock(
    '../../../../../components/chains/foodit_Carousel_Videos/mediaScrollerExpanded/jwVideoContainer',
    () => {
        const React = require('react');
        return {
            JwVideoContainer: React.forwardRef((props, ref) =>
                React.createElement('ul', {
                    ref,
                    'data-testid': 'jw-video-container'
                })
            )
        };
    }
);

jest.mock(
    '../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () =>
        function MockIconSprite({ name }) {
            return <span data-testid={`icon-${name}`} />;
        }
);

describe('MediaScrollerExpanded', () => {
    const defaultVideoData = [
        { id: 'video1', title: 'Video 1' },
        { id: 'video2', title: 'Video 2' },
        { id: 'video3', title: 'Video 3' },
        { id: 'video4', title: 'Video 4' },
        { id: 'video5', title: 'Video 5' },
        { id: 'video6', title: 'Video 6' },
        { id: 'video7', title: 'Video 7' },
        { id: 'video8', title: 'Video 8' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();

        useWindowSize.mockReturnValue({ width: 1024, height: 900 });

        useCajaCarruselContext.mockReturnValue({
            currentIndex: 0,
            setCurrentIndex
        });
    });
    it('desktop if currentIndex=0 show only button next', () => {
        useCajaCarruselContext.mockReturnValue({
            currentIndex: 0,
            setCurrentIndex
        });

        render(<MediaScrollerExpanded listVideoData={defaultVideoData} />);

        expect(screen.queryByTitle('Regresar')).not.toBeInTheDocument();
        expect(screen.getByTitle('Avanzar')).toBeInTheDocument();
        expect(screen.getByTestId('jw-video-container')).toBeInTheDocument();
    });

    it('desktop if currentIndex>0 show only button next', () => {
        useCajaCarruselContext.mockReturnValue({
            currentIndex: 0,
            setCurrentIndex
        });

        render(<MediaScrollerExpanded listVideoData={defaultVideoData} />);

        expect(screen.queryByTitle('Regresar')).not.toBeInTheDocument();
        expect(screen.getByTitle('Avanzar')).toBeInTheDocument();
    });

    it('desktop last currentIndex show only button back', () => {
        useCajaCarruselContext.mockReturnValue({
            currentIndex: 7,
            setCurrentIndex
        });

        render(<MediaScrollerExpanded listVideoData={defaultVideoData} />);

        expect(screen.getByTitle('Regresar')).toBeInTheDocument();
        expect(screen.queryByTitle('Avanzar')).not.toBeInTheDocument();
    });

    it('on mobile does not show back or next buttons', () => {
        useWindowSize.mockReturnValue({ width: 375 });

        useCajaCarruselContext.mockReturnValue({
            currentIndex: 3,
            setCurrentIndex
        });

        render(<MediaScrollerExpanded listVideoData={defaultVideoData} />);

        expect(screen.queryByTitle('Regresar')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Avanzar')).not.toBeInTheDocument();
    });

    it('click on Next calls the useHandleNext callback', () => {
        const nextCb = jest.fn();
        useHandleNext.mockReturnValue(nextCb);

        useCajaCarruselContext.mockReturnValue({
            currentIndex: 0,
            setCurrentIndex
        });

        render(<MediaScrollerExpanded listVideoData={defaultVideoData} />);

        fireEvent.click(screen.getByTitle('Avanzar'));
        expect(nextCb).toHaveBeenCalledTimes(1);
    });

    it('click on Back calls the useHandleBack callback', () => {
        const backCb = jest.fn();
        useHandleBack.mockReturnValue(backCb);

        useCajaCarruselContext.mockReturnValue({
            currentIndex: 3,
            setCurrentIndex
        });

        render(<MediaScrollerExpanded listVideoData={defaultVideoData} />);

        fireEvent.click(screen.getByTitle('Regresar'));
        expect(backCb).toHaveBeenCalledTimes(1);
    });

    it('should have correct ARIA labels on navigation buttons', () => {
        useCajaCarruselContext.mockReturnValue({
            currentIndex: 3,
            setCurrentIndex
        });

        render(<MediaScrollerExpanded listVideoData={defaultVideoData} />);

        expect(screen.getByTitle('Avanzar')).toHaveAttribute(
            'aria-label',
            'Botón para avanzar al siguiente video'
        );
        expect(screen.getByTitle('Regresar')).toHaveAttribute(
            'aria-label',
            'Botón para regresar al video anterior'
        );
    });

    it('should render wrapper with tabIndex for focus management', () => {
        render(<MediaScrollerExpanded listVideoData={defaultVideoData} />);

        const wrapper = document.querySelector('[tabindex="-1"]');
        expect(wrapper).toBeInTheDocument();
    });
});
