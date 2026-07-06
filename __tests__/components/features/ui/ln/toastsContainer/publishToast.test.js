import publishToast from '../../../../../../components/features/ui/ln/toastsContainer/publishToast';

describe('components - features - ui - ln - toastsContainer - publishToast', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        delete window.LN;
    });

    describe('when the global bus is available', () => {
        it('should publish the addToast event with the given props', () => {
            const publish = jest.fn();
            window.LN = { observable: { publish } };
            const props = {
                variant: 'warning',
                title: 'No disponible',
                message: 'Este contenido solo está disponible para Argentina.'
            };

            publishToast(props);

            expect(publish).toHaveBeenCalledWith('addToast', props);
        });

        it('should forward the props unchanged without translating the shape', () => {
            const publish = jest.fn();
            window.LN = { observable: { publish } };

            publishToast({ color: 'error', description: 'native shape' });

            expect(publish).toHaveBeenCalledWith('addToast', {
                color: 'error',
                description: 'native shape'
            });
        });
    });

    describe('when the global bus is unavailable', () => {
        it('should do nothing when window.LN is undefined', () => {
            expect(() => publishToast({ title: 'x' })).not.toThrow();
        });

        it('should do nothing when observable.publish is missing', () => {
            window.LN = { observable: {} };

            expect(() => publishToast({ title: 'x' })).not.toThrow();
        });
    });
});
