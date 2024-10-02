import { handleIaToggle } from '../../../../../components/features/LN-nota/share/_children/helper';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('components - features - LN-nota - share - helper', () => {
    describe('handleIaToggle', () => {
        let setIaButtonIsClicked;
        let publish;
        let subscribe;
        let unsubscribe;

        beforeEach(() => {
            setIaButtonIsClicked = jest.fn();
            publish = jest.fn();
            subscribe = jest.fn();
            unsubscribe = jest.fn();
            window.LN = {
                observable: {
                    publish,
                    subscribe,
                    unsubscribe
                }
            };

            Storage.prototype.setItem = jest.fn();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should display the AI component, publish an event with defaultTab, and set localStorage', () => {
            const defaultTab = 'summary';
            handleIaToggle({ defaultTab, setIaButtonIsClicked });

            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'IA',
                category: 'nota_ln9',
                label: defaultTab
            });

            expect(setIaButtonIsClicked).toHaveBeenCalledWith(
                expect.any(Function)
            );
            expect(publish).toHaveBeenCalledWith('showIa', { show: true });
            expect(subscribe).toHaveBeenCalledWith(
                'iaClosed',
                expect.any(Function)
            );

            expect(localStorage.setItem).toHaveBeenCalledWith(
                'IA-feature-tracking',
                'wasDisplayed'
            );
        });

        it('should execute the callback correctly', () => {
            const callback = jest.fn();
            handleIaToggle({
                defaultTab: 'summary',
                setIaButtonIsClicked,
                callback
            });

            expect(callback).toHaveBeenCalled();
        });

        it('should unsubscribe from iaClosed event on cleanup', () => {
            const defaultTab = 'summary';
            const cleanup = handleIaToggle({
                defaultTab,
                setIaButtonIsClicked
            });

            cleanup();

            expect(unsubscribe).toHaveBeenCalledWith(
                'iaClosed',
                expect.any(Function)
            );
        });
    });
});
