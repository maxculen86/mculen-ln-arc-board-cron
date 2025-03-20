import renderToast from '../../../../../../components/features/private-global/common/utils/renderToast';

describe('components - features - private-global - utils - renderToast', () => {
    const mockObservable = {
        subscribe: jest.fn(),
        unsubscribe: jest.fn(),
        publish: jest.fn()
    };
    beforeEach(() => {
        window.LN = {
            observable: mockObservable
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should publish addToast event with given props', () => {
        const props = { message: 'Test message', type: 'success' };

        renderToast(props);

        expect(window.LN.observable.publish).toHaveBeenCalledWith(
            'addToast',
            props
        );
    });

    it('should not throw an error if window.LN is undefined', () => {
        delete global.window.LN;

        expect(() => renderToast({ message: 'Test message' })).not.toThrow();
    });

    it('should not throw an error if window.LN.observable is undefined', () => {
        global.window.LN = {};

        expect(() => renderToast({ message: 'Test message' })).not.toThrow();
    });

    it('should not throw an error if window.LN.observable.publish is undefined', () => {
        global.window.LN = { observable: {} };

        expect(() => renderToast({ message: 'Test message' })).not.toThrow();
    });
});
