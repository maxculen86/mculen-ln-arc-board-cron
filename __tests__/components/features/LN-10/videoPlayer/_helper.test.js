import {
    createJWVisibilityAndMetarefreshCallback,
    productClickFromClientVideoJW,
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

        it('pushes the correct item to dataLayer when item_id exists', () => {
            productClickFromClientVideoJW(
                mockElement,
                'El juego ideal para esta Navidad en familia'
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
        let metaRefreshActive;
        let callback;

        beforeEach(() => {
            instance = {
                getState: jest.fn(),
                pause: jest.fn()
            };

            metaRefreshActive = { active: true };

            window.LN = {
                observable: {
                    publish: jest.fn()
                }
            };

            callback = createJWVisibilityAndMetarefreshCallback(
                instance,
                metaRefreshActive
            );
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should deactivate metaRefresh when video enters viewport and is buffering', () => {
            instance.getState.mockReturnValue('buffering');

            const entry = { isIntersecting: true };
            callback(entry);

            expect(window.LN.observable.publish).toHaveBeenCalledWith(
                'clearTimeout'
            );
            expect(metaRefreshActive.active).toBe(false);
        });

        it('should reactivate metaRefresh when video leaves viewport', () => {
            metaRefreshActive.active = false;
            instance.getState.mockReturnValue('paused');

            const entry = { isIntersecting: false };
            callback(entry);

            expect(instance.pause).not.toHaveBeenCalled();
            expect(window.LN.observable.publish).toHaveBeenCalledWith(
                'retriggerTimeout'
            );
            expect(metaRefreshActive.active).toBe(true);
        });

        it('should pause video and reactivate metaRefresh when video is playing and leaves viewport', () => {
            metaRefreshActive.active = false;
            instance.getState.mockReturnValue('playing');

            const entry = { isIntersecting: false };
            callback(entry);

            expect(instance.pause).toHaveBeenCalled();
            expect(window.LN.observable.publish).toHaveBeenCalledWith(
                'retriggerTimeout'
            );
            expect(metaRefreshActive.active).toBe(true);
        });
    });

    describe('isMostlyInViewport', () => {
        let element;

        beforeEach(() => {
            element = document.createElement('div');
            document.body.appendChild(element);
        });

        afterEach(() => {
            document.body.innerHTML = '';
            jest.restoreAllMocks();
        });

        it('should return false if element is null', () => {
            expect(isMostlyInViewport(null)).toBe(false);
        });

        it('should return false if element is out of viewport from below ', () => {
            //screen de 800px y el elemento aparece esta mas abajo.
            jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
                top: 800,
                bottom: 900,
                height: 100
            });
            Object.defineProperty(window, 'innerHeight', { value: 800 });

            expect(isMostlyInViewport(element)).toBe(false);
        });

        it('should return false if element is out of viewport from top', () => {
            //screen de 800px y el elemento aparece esta mas arriba.
            jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
                top: -100,
                bottom: 0,
                height: 100
            });
            Object.defineProperty(window, 'innerHeight', { value: 800 });

            expect(isMostlyInViewport(element)).toBe(false);
        });

        it('should return false if visible height ratio is below threshold', () => {
            //Se ven 20px del objeto, lo cual al treshold ser 50%, no cumple.
            jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
                top: 780,
                bottom: 880,
                height: 100
            });
            Object.defineProperty(window, 'innerHeight', { value: 800 });

            expect(isMostlyInViewport(element)).toBe(false);
        });

        it('should return true if visible height ratio meets the threshold', () => {
            //Se ven 60px del objeto, lo cual al treshold ser 50%, cumple.
            jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
                top: 740,
                bottom: 840,
                height: 100
            });
            Object.defineProperty(window, 'innerHeight', { value: 800 });

            expect(isMostlyInViewport(element)).toBe(true);
        });

        it('should allow custom ratio threshold (e.g., 0.8)', () => {
            //Se ven 60px del objeto, lo cual al treshold ser 80%, no cumple.
            jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
                top: 740,
                bottom: 800,
                height: 100
            });
            Object.defineProperty(window, 'innerHeight', { value: 800 });

            expect(isMostlyInViewport(element, 0.8)).toBe(false);
        });

        it('should return true if element is fully in viewport', () => {
            jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
                top: 100,
                bottom: 200,
                height: 100
            });
            Object.defineProperty(window, 'innerHeight', { value: 800 });

            expect(isMostlyInViewport(element)).toBe(true);
        });
    });
});
