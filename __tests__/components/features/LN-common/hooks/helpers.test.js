import {
    getScrollPercentBetweenElements,
    getOffsets,
    runTriggers
} from '../../../../../components/features/LN-common/hooks/helpers';

describe('Components - features - LN-common -  hooks - helpers', () => {
    describe('getScrollPercentBetweenElements', () => {
        it('should return 0, 50 and 100 at the expected positions', () => {
            expect(getScrollPercentBetweenElements(0, 0, 200)).toBe(0); //top
            expect(getScrollPercentBetweenElements(100, 0, 200)).toBe(50); //centro
            expect(getScrollPercentBetweenElements(200, 0, 200)).toBe(100); //bottom
        });

        it('should clamp values below 0 % and above 100 %', () => {
            expect(getScrollPercentBetweenElements(-10, 0, 200)).toBe(0);
            expect(getScrollPercentBetweenElements(250, 0, 200)).toBe(100);
        });

        it('should return 0 % when endOffset is equal to or smaller than startOffset', () => {
            expect(getScrollPercentBetweenElements(100, 300, 300)).toBe(0);
        });
    });

    describe('getOffsets', () => {
        beforeEach(() => {
            Object.defineProperty(document.documentElement, 'scrollHeight', {
                configurable: true,
                value: 1500
            });
            Object.defineProperty(window, 'scrollY', {
                configurable: true,
                value: 0
            });
        });

        it('should return offsetTop for both supplied elements', () => {
            const start = document.createElement('div');
            const end = document.createElement('div');

            start.getBoundingClientRect = () => ({ top: 120 });
            end.getBoundingClientRect = () => ({ top: 940 });

            document.body.appendChild(start);
            document.body.appendChild(end);

            const { startOffset, endOffset } = getOffsets(start, end);
            expect(startOffset).toBe(120);
            expect(endOffset).toBe(940 + end.offsetHeight);

            document.body.removeChild(start);
            document.body.removeChild(end);
        });

        it('should fall back to document scrollHeight when endEl is null', () => {
            const start = document.createElement('div');

            start.getBoundingClientRect = () => ({ top: 50 });

            document.body.appendChild(start);

            const { startOffset, endOffset } = getOffsets(start, null);
            expect(startOffset).toBe(50);
            expect(endOffset).toBe(1500);

            document.body.removeChild(start);
        });
    });

    describe('runTriggers', () => {
        it('should fire each callback only once', () => {
            const callback = jest.fn();
            const listeners = [
                {
                    id: 'scroll-Nota',
                    type: 'position',
                    threshold: 500,
                    callback
                }
            ];
            const alreadyDispatched = new Set();

            runTriggers(listeners, 500, 0, alreadyDispatched);
            runTriggers(listeners, 300, 0, alreadyDispatched);
            runTriggers(listeners, 500, 0, alreadyDispatched);

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should fire 25 % when percentage jumps to 35 %', () => {
            // Cuando salta al 35 % del área total de una, por ejemplo, en una pantalla grande donde el usuario ya puede ver el 35 % del contenido.

            const callback = jest.fn();
            const listeners = [
                {
                    id: 'scroll-Nota',
                    type: 'percentage',
                    threshold: 25,
                    thresholdStep: 25,
                    callback: callback
                }
            ];
            const alreadyDispatched = new Set();

            runTriggers(listeners, 0, 35, alreadyDispatched);

            expect(callback.mock.calls.map(c => c[0])).toEqual([25]);
        });

        it('should fire a single percentage callback when no step is provided', () => {
            const callback = jest.fn();
            const listeners = [
                {
                    id: 'scroll-Nota',
                    type: 'percentage',
                    threshold: 25,
                    callback: callback
                }
            ];
            const alreadyDispatched = new Set();

            runTriggers(listeners, 0, 25, alreadyDispatched);
            runTriggers(listeners, 0, 30, alreadyDispatched);

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith(25);
        });
    });
});
