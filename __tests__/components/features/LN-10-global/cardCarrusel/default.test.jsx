import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppContext } from 'fusion:context';

const mockSetCurrentIndex = jest.fn();
const mockOnOpen = jest.fn();

jest.mock(
    '../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext',
    () => ({
        useCajaCarruselContext: () => ({
            setCurrentIndex: mockSetCurrentIndex,
            onOpenMediaScrollerExpanded: mockOnOpen,
            preferredVideoFiles: { vid1: 'file.mp4' },
            videoMetadata: { vid1: { duration: 300, titleJwPlayer: 'Test' } },
            currentIndex: 0,
            isOpenMediaScrollerExpanded: false
        })
    })
);

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../components/features/ui/ln/icon/default',
    () =>
        function MockIcon() {
            return <span />;
        }
);

jest.mock('../../../../../components/features/ui/ln/cardVideo/default', () => {
    function MockCardVideo({ onClick, children }) {
        return (
            <div data-testid="card-video" onClick={onClick}>
                {children}
            </div>
        );
    }
    MockCardVideo.Media = ({ children }) => <div>{children}</div>;
    MockCardVideo.Description = ({ children }) => <div>{children}</div>;
    MockCardVideo.Badge = ({ children }) => <span>{children}</span>;
    MockCardVideo.Title = ({ title }) => <span>{title}</span>;
    return MockCardVideo;
});

jest.mock(
    '../../../../../components/features/LN-10-global/cardCarrusel/video',
    () =>
        function MockVideo() {
            return <div />;
        }
);

jest.mock('../../../../../components/private/LN/common/utils/isSSR', () =>
    jest.fn().mockReturnValue(false)
);

jest.mock('../../../../../components/private/common/utils/viewability', () => ({
    productClickFromClient: jest.fn()
}));

import { productClickFromClient } from '../../../../../components/private/common/utils/viewability';
import CardCarruselContainer from '../../../../../components/features/LN-10-global/cardCarrusel/default';

describe('CardCarruselContainer', () => {
    const defaultProps = {
        title: 'Test Video',
        src: 'https://cdn.jwplayer.com/previews/vid1',
        badgeText: 'Video',
        poster: 'https://img.jpg',
        duration: 300,
        cardPosition: 2,
        videoId: 'vid1',
        layoutType: 'home',
        titleJwPlayer: 'Test JW Title',
        variant: 'vertical',
        shouldLoadPreview: false,
        listVideoData: [
            { id: 'vid1', title: 'V1', isBanner: false },
            { id: 'vid2', title: 'V2', isBanner: false }
        ],
        nodesByExpanded: [
            { id: 'vid1', title: 'V1', isBanner: false },
            { id: 'vid2', title: 'V2', isBanner: false }
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useAppContext.mockReturnValue({ globalContent: { _id: 'test-id' } });
    });

    it('calls ctx.onOpenMediaScrollerExpanded on card click', () => {
        const { getByTestId } = render(
            <CardCarruselContainer {...defaultProps} />
        );

        fireEvent.click(getByTestId('card-video'));

        expect(mockOnOpen).toHaveBeenCalledTimes(1);
    });

    it('sets the current index to the clicked card position on click', () => {
        const { getByTestId } = render(
            <CardCarruselContainer {...defaultProps} />
        );

        fireEvent.click(getByTestId('card-video'));

        // Must set the index to the clicked card so re-opening starts on the
        // clicked video, not the last-viewed index from a previous open.
        expect(mockSetCurrentIndex).toHaveBeenCalledWith(2);
    });

    it('keeps product click tracking for non-quesale articles', () => {
        const { getByTestId } = render(
            <CardCarruselContainer {...defaultProps} />
        );

        fireEvent.click(getByTestId('card-video'));

        expect(productClickFromClient).toHaveBeenCalledTimes(1);
    });

    it('skips product click tracking for quesale articles', () => {
        useAppContext.mockReturnValue({
            globalContent: { _id: 'que-sale-demo' }
        });

        const { getByTestId } = render(
            <CardCarruselContainer {...defaultProps} />
        );

        fireEvent.click(getByTestId('card-video'));

        expect(mockOnOpen).toHaveBeenCalledTimes(1);
        expect(productClickFromClient).not.toHaveBeenCalled();
    });
});
