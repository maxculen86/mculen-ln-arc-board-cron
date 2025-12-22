import * as observers from '../../../../../components/private/common/banners/intersectionObservers';

window.IntersectionObserver = jest.fn();

afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});

describe('videos banners intersection observers', () => {
    beforeEach(() => {
        global.IntersectionObserver = jest.fn((callback, options) => ({
            observe: jest.fn()
        }));
    });

    it('should test createDifferVideosObserver', () => {
        document.querySelectorAll = jest.fn(() => ['video']);
        observers.createDifferVideosObserver();

        const observerInstance =
            global.IntersectionObserver.mock.results[0].value;

        expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
        expect(observerInstance.observe).toHaveBeenCalledWith('video');
    });

    it('should call videos play pause and change src', () => {
        const mockPause = jest.fn();
        const mockPlay = jest.fn();

        const mockPauseEntry = [
            {
                isIntersecting: false,
                target: {
                    dataset: {
                        src: 'https://lanacionar-prod.video.arc-cdn.net/wp-lanacionar/20230706/64a6a5abac2d3801cb3c35e'
                    },
                    pause: mockPause,
                    paused: false,
                    src: 'https://lanacionar-prod.video.arc-cdn.net/wp-lanacionar/20230706/64a6a5abac2d3801cb3c35e'
                }
            }
        ];

        const mockPlayEntry = [
            {
                isIntersecting: true,
                target: {
                    dataset: {
                        src: 'https://lanacionar-prod.video.arc-cdn.net/wp-lanacionar/20230706/64a6a5abac2d3801cb3c35e'
                    },
                    play: mockPlay,
                    paused: true,
                    src: ''
                }
            }
        ];

        const [lazyVideo] = mockPlayEntry;

        const observe = jest.fn();

        window.IntersectionObserver.mockImplementationOnce(() => ({
            observe
        }));

        const observer = observers.createDifferVideosObserver();

        const [callback] = window.IntersectionObserver.mock.calls[0];

        callback(mockPauseEntry, observer);

        expect(observe).toBeCalledTimes(1);
        expect(mockPause).toHaveBeenCalledTimes(1);

        callback(mockPlayEntry, observer);
        expect(mockPlay).toHaveBeenCalledTimes(1);
        expect(lazyVideo.target.src).toStrictEqual(
            lazyVideo.target.dataset.src
        );
    });
});
