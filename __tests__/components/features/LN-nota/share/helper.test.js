import { handleIaToggle } from '../../../../../components/features/LN-nota/share/_children/helper';

describe('components - features - LN-nota - share - helper', () => {
    describe('handleIaToggle', () => {
        let setIsIaVisible;
        let publish;

        beforeEach(() => {
            setIsIaVisible = jest.fn();
            publish = jest.fn();
            window.LN = {
                observable: {
                    publish
                }
            };
        });

        it('should display the AI component when the button is clicked and the state becomes true', () => {
            handleIaToggle(false, setIsIaVisible);

            expect(setIsIaVisible).toHaveBeenCalledWith(true);
            expect(publish).toHaveBeenCalledWith('showIa', { show: true });
        });

        it('should hide the AI component when the button is clicked and the state becomes false', () => {
            handleIaToggle(true, setIsIaVisible);

            expect(setIsIaVisible).toHaveBeenCalledWith(false);
            expect(publish).toHaveBeenCalledWith('showIa', { show: false });
        });
    });
});
