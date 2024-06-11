import { scheduleTask } from '../../../../../components/private/common/utils/scheduleTask';

describe('Tests - function - scheduleTask', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('should use requestIdleCallback when available', () => {
        const callback = jest.fn();
        window.requestIdleCallback = jest.fn(cb => cb());

        scheduleTask(callback);

        expect(window.requestIdleCallback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledTimes(1);

        delete window.requestIdleCallback;
    });

    it('should fall back to setTimeout when requestIdleCallback is not available', () => {
        const callback = jest.fn();
        const setTimeout = jest.spyOn(global, 'setTimeout');

        delete window.requestIdleCallback;

        scheduleTask(callback);

        expect(setTimeout).toHaveBeenCalledWith(callback, 0);
        jest.runAllTimers();
        expect(callback).toHaveBeenCalledTimes(1);
    });
});
