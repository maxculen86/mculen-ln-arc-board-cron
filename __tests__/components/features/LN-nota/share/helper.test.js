import { handleOpenIAFeature } from '../../../../../components/features/LN-nota/share/_children/helper';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('components - features - LN-nota - share - helper', () => {
    describe('handleOpenIAFeature', () => {
        let setIaButtonIsClicked;
        let iaButtonIsClicked;
        let publish;
        let subscribe;
        let unsubscribe;

        beforeEach(() => {
            setIaButtonIsClicked = jest.fn();
            iaButtonIsClicked = false;
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
            handleOpenIAFeature({
                defaultTab,
                iaButtonIsClicked,
                setIaButtonIsClicked
            });

            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'IA',
                category: 'nota_ln9',
                label: defaultTab
            });

            expect(setIaButtonIsClicked).toHaveBeenCalledWith(true);

            expect(publish).toHaveBeenCalledWith('showIa', { show: true });

            expect(localStorage.setItem).toHaveBeenCalledWith(
                'IA-feature-tracking',
                'wasDisplayed'
            );
        });

        it('should execute the callback correctly', () => {
            const callback = jest.fn();
            handleOpenIAFeature({
                defaultTab: 'summary',
                iaButtonIsClicked,
                setIaButtonIsClicked,
                callback
            });

            expect(callback).toHaveBeenCalled();
        });

        it('should not execute any actions if iaButtonIsClicked is true', () => {
            iaButtonIsClicked = true;
            handleOpenIAFeature({
                defaultTab: 'summary',
                iaButtonIsClicked,
                setIaButtonIsClicked
            });

            expect(addEventToDataLayerV2).not.toHaveBeenCalled();
            expect(setIaButtonIsClicked).not.toHaveBeenCalled();
            expect(publish).not.toHaveBeenCalled();
            expect(localStorage.setItem).not.toHaveBeenCalled();
        });
    });
});
