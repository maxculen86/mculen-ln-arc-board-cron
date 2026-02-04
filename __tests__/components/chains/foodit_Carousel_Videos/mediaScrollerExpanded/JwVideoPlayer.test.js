import React from 'react';
import { render } from '@testing-library/react';
import JwVideoPlayer from '../../../../../components/chains/foodit_Carousel_Videos/mediaScrollerExpanded/jwVideoPlayer';
import { useCajaCarruselContext } from '../../../../../components/chains/foodit_Carousel_Videos/cajaCarruselContext';
import { handleEventVideoView } from '../../../../../components/chains/foodit_Carousel_Videos/_helper';

jest.mock(
    '../../../../../components/chains/foodit_Carousel_Videos/cajaCarruselContext',
    () => ({
        useCajaCarruselContext: jest.fn()
    })
);

jest.mock(
    '../../../../../components/chains/foodit_Carousel_Videos/_helper',
    () => ({
        handleEventVideoView: jest.fn()
    })
);

describe('JwVideoPlayer', () => {
    let mockSetup;
    let mockOn;
    let mockRemove;
    let mockPlayerInstance;

    beforeEach(() => {
        mockOn = jest.fn();
        mockRemove = jest.fn();

        mockPlayerInstance = {
            on: mockOn,
            play: jest.fn(),
            pause: jest.fn(),
            remove: mockRemove
        };

        mockSetup = jest.fn().mockReturnValue(mockPlayerInstance);

        window.jwplayer = jest.fn(() => ({
            setup: mockSetup
        }));

        useCajaCarruselContext.mockReturnValue({
            currentIndex: 0
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const defaultProps = {
        videoId: 'test-video-id',
        title: 'Test Video Title',
        index: 0,
        handleNextCallback: jest.fn(),
        isLoadedScriptJw: true
    };

    it('should render placeholder when video is not in view (lazy loading)', () => {
        const { container } = render(
            <JwVideoPlayer {...defaultProps} index={1} />
        );

        expect(
            container.querySelector('.placeholder-jwplayer')
        ).toBeInTheDocument();
        expect(window.jwplayer).not.toHaveBeenCalled();
    });

    it('should initialize JW Player with correct config when in view', () => {
        const { container } = render(<JwVideoPlayer {...defaultProps} />);

        expect(container.querySelector('#test-video-id-0')).toBeInTheDocument();
        expect(window.jwplayer).toHaveBeenCalledWith('test-video-id-0');
        expect(mockSetup).toHaveBeenCalledWith(
            expect.objectContaining({
                file: 'https://cdn.jwplayer.com/videos/test-video-id.mp4',
                mute: true,
                autostart: true
            })
        );
    });

    it('should call handleNextCallback when video completes (auto-advance)', () => {
        const handleNextCallback = jest.fn();
        render(
            <JwVideoPlayer
                {...defaultProps}
                handleNextCallback={handleNextCallback}
            />
        );

        const completeHandler = mockOn.mock.calls.find(
            call => call[0] === 'complete'
        )[1];
        completeHandler();

        expect(handleNextCallback).toHaveBeenCalled();
    });

    it('should track video_view event when video plays', () => {
        render(<JwVideoPlayer {...defaultProps} />);

        const playHandler = mockOn.mock.calls.find(
            call => call[0] === 'play'
        )[1];
        playHandler();

        expect(handleEventVideoView).toHaveBeenCalledWith({
            videoIdObserved: 'test-video-id',
            videoTitle: 'Test Video Title'
        });
    });

    it('should use ref for callback to prevent player recreation (performance)', () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        const { rerender } = render(
            <JwVideoPlayer {...defaultProps} handleNextCallback={callback1} />
        );

        const initialCalls = window.jwplayer.mock.calls.length;

        rerender(
            <JwVideoPlayer {...defaultProps} handleNextCallback={callback2} />
        );

        // Player should not be recreated when callback changes
        expect(window.jwplayer.mock.calls.length).toBe(initialCalls);

        // But latest callback should be called on complete
        const completeHandler = mockOn.mock.calls.find(
            call => call[0] === 'complete'
        )[1];
        completeHandler();

        expect(callback2).toHaveBeenCalled();
        expect(callback1).not.toHaveBeenCalled();
    });

    it('should cleanup player on unmount', () => {
        const { unmount } = render(<JwVideoPlayer {...defaultProps} />);

        unmount();

        expect(mockRemove).toHaveBeenCalled();
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
