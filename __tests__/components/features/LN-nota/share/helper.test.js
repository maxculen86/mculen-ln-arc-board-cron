import { handleIaToggle } from '../../../../../components/features/LN-nota/share/_children/helper';

describe('components - features - LN-nota - share - helper', () => {
    describe('handleIaToggle', () => {
        let setIsIaVisible;
        let setIaButtonIsClicked;
        let publish;

        beforeEach(() => {
            setIsIaVisible = jest.fn();
            setIaButtonIsClicked = jest.fn();
            publish = jest.fn();
            window.LN = {
                observable: {
                    publish
                }
            };
        });

        it('should display the AI component when the button is clicked and the state becomes true', () => {
            handleIaToggle({
                isIaVisible: false,
                setIsIaVisible,
                setIaButtonIsClicked
            });

            expect(setIsIaVisible).toHaveBeenCalledWith(true);
            expect(setIaButtonIsClicked).toHaveBeenCalledWith(
                expect.any(Function)
            );
            expect(publish).toHaveBeenCalledWith('showIa', { show: true });
        });

        it('should hide the AI component when the button is clicked and the state becomes false', () => {
            handleIaToggle({
                isIaVisible: true,
                setIsIaVisible,
                setIaButtonIsClicked
            });

            expect(setIsIaVisible).toHaveBeenCalledWith(false);
            expect(setIaButtonIsClicked).toHaveBeenCalledWith(
                expect.any(Function)
            );
            expect(publish).toHaveBeenCalledWith('showIa', { show: false });
        });
        it('should execute callback correctly', () => {
            const callback = jest.fn();
            handleIaToggle({
                isIaVisible: true,
                setIsIaVisible,
                setIaButtonIsClicked,
                callback
            });

            expect(callback).toBeCalled();
        });
    });
});
