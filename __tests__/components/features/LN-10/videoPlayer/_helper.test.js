import {
    productClickFromClientVideoJW,
    createJWVisibilityAndMetarefreshCallback,
    isMostlyInViewport
} from '../../../../../components/features/LN-10/videoPlayer/_helper';

describe('Components - features - LN-10 - videoPlayer', () => {
    describe('productClickFromClientVideoJW', () => {
        let mockElement;
        let dataLayerPushSpy;

        beforeEach(() => {
            window.dataLayer = [];
            dataLayerPushSpy = jest.spyOn(window.dataLayer, 'push');

            mockElement = document.createElement('article');
            mockElement.dataset.id = 'm7XSUv1X';
            mockElement.dataset.pos = '01';
            mockElement.dataset.source = 'video';

            const block = document.createElement('div');
            block.dataset.blockName = 'h_tema-03';
            block.dataset.diagramacionId = 'bn_player_3_grid';
            block.dataset.chainPosition = '0103';
            block.dataset.isSubscriptor = true;
            block.dataset.roof = 'Actualidad';
            block.setAttribute('data-is-block', '');
            block.appendChild(mockElement);

            const section = document.createElement('section');
            section.dataset.section = 'breaking1';
            section.setAttribute('data-section', '');
            section.appendChild(block);

            document.body.appendChild(section);
        });

        afterEach(() => {
            document.body.innerHTML = '';
            jest.restoreAllMocks();
        });

        it('pushes the correct item to dataLayer when item_id exists and mode is provided', () => {
            productClickFromClientVideoJW(
                mockElement,
                'El juego ideal para esta Navidad en familia',
                'manual'
            );

            expect(window.dataLayer).toHaveLength(1);
            expect(window.dataLayer[0]).toEqual({
                event: 'productClickScore',
                item: {
                    item_list_id: '010301',
                    item_id: 'm7XSUv1X',
                    item_variant: 'video',
                    item_brand: 'excSuscriptor_bn_player_3_grid',
                    item_list_name: 'h_tema-03',
                    item_name: 'El juego ideal para esta Navidad en familia',
                    item_category: 'Actualidad',
                    item_category2: 'manual',
                    price: 1,
                    index: 1,
                    quantity: 1
                }
            });
        });

        it('does not push to dataLayer if item_id is missing', () => {
            delete mockElement.dataset.id;

            productClickFromClientVideoJW(mockElement, 'Video sin ID');

            expect(window.dataLayer).toHaveLength(0);
        });
    });
    describe('createJWVisibilityAndMetarefreshCallback', () => {
        let instance;
        let getPlayingVideosCount;
        let videoState;
        let callback;

        beforeEach(() => {
            instance = {
                getState: jest.fn(),
                pause: jest.fn()
            };

            getPlayingVideosCount = jest.fn();
            videoState = { isPlayingInViewport: false };

            window.LN = {
                observable: {
                    publish: jest.fn()
                }
            };

            callback = createJWVisibilityAndMetarefreshCallback(
                instance,
                getPlayingVideosCount,
                videoState
            );
        });

        afterEach(() => {
            jest.clearAllMocks();
            jest.restoreAllMocks();
        });

        it('should pause timeout when video enters viewport and is buffering', () => {
            instance.getState.mockReturnValue('buffering');

            callback({ isIntersecting: true });

            expect(window.LN.observable.publish).toHaveBeenCalledWith(
                'pauseTimeout'
            );
        });

        it('should pause video and resume timeout when video leaves viewport and no other videos playing', () => {
            instance.getState.mockReturnValue('playing');
            videoState.isPlayingInViewport = true;
            getPlayingVideosCount.mockReturnValue(0);

            callback({ isIntersecting: false });

            expect(instance.pause).toHaveBeenCalled();
            expect(videoState.isPlayingInViewport).toBe(false);
            expect(window.LN.observable.publish).toHaveBeenCalledWith(
                'resumeTimeout'
            );
        });

        it('should pause video but not resume timeout when other videos are still playing', () => {
            instance.getState.mockReturnValue('playing');
            videoState.isPlayingInViewport = true;
            getPlayingVideosCount.mockReturnValue(1);

            callback({ isIntersecting: false });

            expect(instance.pause).toHaveBeenCalled();
            expect(window.LN.observable.publish).not.toHaveBeenCalledWith(
                'resumeTimeout'
            );
        });

        it('should not change videoState if video was not playing in viewport', () => {
            instance.getState.mockReturnValue('playing');
            videoState.isPlayingInViewport = false;

            callback({ isIntersecting: false });

            expect(instance.pause).toHaveBeenCalled();
            expect(window.LN.observable.publish).not.toHaveBeenCalled();
        });
    });

    describe('isMostlyInViewport', () => {
        let element;

        beforeEach(() => {
            element = document.createElement('div');
            Object.defineProperty(window, 'innerHeight', {
                value: 800,
                configurable: true
            });
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should return false if element is null', () => {
            expect(isMostlyInViewport(null)).toBe(false);
        });

        it('should return false if element is out of viewport', () => {
            jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
                top: 800,
                bottom: 900,
                height: 100
            });

            expect(isMostlyInViewport(element)).toBe(false);
        });

        it('should return false if visible height is below threshold', () => {
            jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
                top: 780,
                bottom: 880,
                height: 100
            });

            expect(isMostlyInViewport(element)).toBe(false);
        });

        it('should return true if visible height meets threshold', () => {
            jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
                top: 740,
                bottom: 840,
                height: 100
            });

            expect(isMostlyInViewport(element)).toBe(true);
        });

        it('should respect custom ratio threshold', () => {
            jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
                top: 740,
                bottom: 800,
                height: 100
            });

            expect(isMostlyInViewport(element, 0.8)).toBe(false);
        });
    });
});
