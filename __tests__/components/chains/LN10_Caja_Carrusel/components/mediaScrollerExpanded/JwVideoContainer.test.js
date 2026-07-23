import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import JwVideoContainer from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoContainer';
import { useCajaCarruselContext } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext';
import usePersistentJwPlayer from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/usePersistentJwPlayer';
import { positionOver } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwPlayerManager';
import { OVERLAY_Z_INDEX } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwPlayerShared';

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext',
    () => ({
        useCajaCarruselContext: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/usePersistentJwPlayer',
    () => jest.fn()
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwPlayerManager',
    () => ({
        positionOver: jest.fn()
    })
);

jest.mock('@ln/hooks', () => ({
    useWindowSize: jest.fn().mockReturnValue({ width: 1440 })
}));

jest.mock(
    '../../../../../../components/features/LN-common/shareV2/default',
    () =>
        ({ videoId }) => <div data-testid={`share-${videoId}`} />
);

describe('JwVideoContainer', () => {
    const mockOnClose = jest.fn();

    const baseListVideoData = [
        {
            id: 'video1',
            title: 'Video 1',
            counterVideo: 1,
            origin: 'home',
            roofData: {}
        },
        {
            id: 'video2',
            title: 'Video 2',
            counterVideo: 2,
            origin: 'home',
            roofData: {}
        }
    ];

    const defaultProps = {
        handleNextCallback: jest.fn(),
        isLastVideo: false,
        listVideoData: baseListVideoData,
        variant: 'vertical'
    };

    beforeAll(() => {
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            disconnect: jest.fn()
        }));
    });

    beforeEach(() => {
        jest.clearAllMocks();
        usePersistentJwPlayer.mockReturnValue(undefined);
        useCajaCarruselContext.mockReturnValue({
            onCloseMediaScrollerExpanded: mockOnClose,
            currentIndex: 0
        });
    });

    it('renders the anchor slot as the last presentation li without a local JW mount', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation();
        const { container } = render(<JwVideoContainer {...defaultProps} />);

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(2);

        const slot = container.querySelector(
            'li[role="presentation"].persistent-player-slot'
        );
        expect(slot).not.toBeNull();
        expect(slot.childElementCount).toBe(0);
        expect(container.querySelector('.video-instance')).toBeNull();

        const scroller = container.querySelector('ul.jw-video-container');
        expect(scroller.lastElementChild).toBe(slot);
        expect(consoleError).not.toHaveBeenCalled();
        consoleError.mockRestore();
    });

    it('calls the persistent hook with the list, variant and next handler', () => {
        render(<JwVideoContainer {...defaultProps} variant="horizontal" />);

        expect(usePersistentJwPlayer).toHaveBeenCalledWith({
            listVideoData: baseListVideoData,
            variant: 'horizontal',
            handleNextCallback: defaultProps.handleNextCallback,
            scrollerRef: undefined
        });
    });

    it('forwards the ul scroller ref to the persistent hook as scrollerRef', () => {
        const containerRef = React.createRef();

        render(<JwVideoContainer {...defaultProps} ref={containerRef} />);

        expect(usePersistentJwPlayer).toHaveBeenCalledWith(
            expect.objectContaining({ scrollerRef: containerRef })
        );
        expect(containerRef.current).toBe(
            document.querySelector('ul.jw-video-container')
        );
    });

    it('positions the persistent player over the active item placeholder box', () => {
        const { container } = render(<JwVideoContainer {...defaultProps} />);

        const slot = container.querySelector(
            'li[role="presentation"].persistent-player-slot'
        );
        const activeItem = container.querySelector('[data-scroller-index="0"]');
        const placeholder = activeItem.querySelector('.placeholder-jwplayer');

        expect(placeholder).not.toBeNull();
        expect(positionOver).toHaveBeenCalledTimes(1);
        // Position over the per-variant placeholder box (ratio-9-16 / ratio-16-9),
        // not the full list item, so each variant keeps its aspect.
        expect(positionOver).toHaveBeenCalledWith(placeholder, slot);
    });

    it('mounts the persistent player in the dialog top-layer node when present', () => {
        const dialog = document.createElement('dialog');
        document.body.appendChild(dialog);

        render(<JwVideoContainer {...defaultProps} />, { container: dialog });

        expect(positionOver).toHaveBeenCalledTimes(1);

        const [, mountTarget] = positionOver.mock.calls[0];
        expect(mountTarget).toBe(dialog);

        document.body.removeChild(dialog);
    });

    it('hides the anchor slot for banner items and does not reposition the player', () => {
        useCajaCarruselContext.mockReturnValue({
            onCloseMediaScrollerExpanded: mockOnClose,
            currentIndex: 0
        });

        const { container } = render(
            <JwVideoContainer
                {...defaultProps}
                listVideoData={[
                    {
                        id: null,
                        title: null,
                        isBanner: true,
                        node: <div data-testid="banner-node">Banner</div>
                    }
                ]}
            />
        );

        expect(screen.getByTestId('banner-node')).toBeInTheDocument();
        expect(
            container.querySelector('.persistent-player-slot.none')
        ).not.toBeNull();
        expect(positionOver).not.toHaveBeenCalled();
    });

    it('delegates closing to the carousel context', () => {
        render(<JwVideoContainer {...defaultProps} />);

        fireEvent.click(screen.getAllByTitle('Cerrar')[0]);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('renders repeated media ids with occurrence keys while preserving external ids', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation();
        const repeatedMedia = [
            {
                ...baseListVideoData[0],
                renderKey: JSON.stringify(['media', 'video1', 0])
            },
            {
                ...baseListVideoData[0],
                renderKey: JSON.stringify(['media', 'video1', 1])
            }
        ];

        const { container } = render(
            <JwVideoContainer {...defaultProps} listVideoData={repeatedMedia} />
        );

        expect(
            container.querySelectorAll('[data-scroller-id="video1"]')
        ).toHaveLength(2);
        expect(consoleError).not.toHaveBeenCalled();
        consoleError.mockRestore();
    });

    it('uses an occurrence fallback when direct list data has no render keys', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation();

        render(<JwVideoContainer {...defaultProps} />);

        expect(consoleError).not.toHaveBeenCalled();
        consoleError.mockRestore();
    });

    it('does not render the detached presentation li slot for horizontal variant', () => {
        const { container } = render(
            <JwVideoContainer {...defaultProps} variant="horizontal" />
        );

        expect(container.querySelector('li[role="presentation"]')).toBeNull();
        expect(
            container.querySelectorAll('[data-scroller-index]')
        ).toHaveLength(baseListVideoData.length);
    });

    it('resolves the horizontal mount target from the ul ref closest dialog or body', () => {
        const containerRef = React.createRef();
        const dialog = document.createElement('dialog');
        document.body.appendChild(dialog);

        render(
            <JwVideoContainer
                {...defaultProps}
                variant="horizontal"
                ref={containerRef}
            />,
            { container: dialog }
        );

        expect(positionOver).toHaveBeenCalledTimes(1);

        const [, mountTarget] = positionOver.mock.calls[0];
        expect(mountTarget).toBe(dialog);

        document.body.removeChild(dialog);
    });

    it('still renders the detached presentation li slot for vertical variant', () => {
        const { container } = render(
            <JwVideoContainer {...defaultProps} variant="vertical" />
        );

        const slot = container.querySelector(
            'li[role="presentation"].persistent-player-slot'
        );
        expect(slot).not.toBeNull();
    });

    it('stacks the social container above the video host with an inline zIndex', () => {
        const { container } = render(<JwVideoContainer {...defaultProps} />);

        const socialContainer = container.querySelector(
            '.video-social-container'
        );
        expect(socialContainer.style.zIndex).toBe(String(OVERLAY_Z_INDEX));
    });

    it('stacks the swipe legend above the video host with an inline zIndex on the last video', () => {
        useCajaCarruselContext.mockReturnValue({
            onCloseMediaScrollerExpanded: mockOnClose,
            currentIndex: 0
        });

        const { container } = render(
            <JwVideoContainer {...defaultProps} isLastVideo />
        );

        const legend = container.querySelector('.swipe-info');
        expect(legend).not.toBeNull();
        expect(legend.style.zIndex).toBe(String(OVERLAY_Z_INDEX));
    });
});
