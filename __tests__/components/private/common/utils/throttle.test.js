import throttle from '../../../../../components/private/common/utils/throttle';

describe('Private - Common - Utils - throttle', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should call the function immediately on first invocation', () => {
        const mockFn = jest.fn();
        const throttledFn = throttle(mockFn, 1000);

        throttledFn('arg1', 'arg2');

        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should not call the function again within the time frame', () => {
        const mockFn = jest.fn();
        const throttledFn = throttle(mockFn, 1000);

        throttledFn();
        jest.advanceTimersByTime(500);
        throttledFn();

        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should call the function again after the time frame has passed', () => {
        const mockFn = jest.fn();
        const throttledFn = throttle(mockFn, 1000);

        throttledFn();
        jest.advanceTimersByTime(1000);
        throttledFn();

        expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should use numeric timestamps for arithmetic operations', () => {
        const mockFn = jest.fn();
        const throttledFn = throttle(mockFn, 100);

        throttledFn();
        jest.advanceTimersByTime(50);
        throttledFn();
        jest.advanceTimersByTime(50);
        throttledFn();

        expect(mockFn).toHaveBeenCalledTimes(2);
    });
});
