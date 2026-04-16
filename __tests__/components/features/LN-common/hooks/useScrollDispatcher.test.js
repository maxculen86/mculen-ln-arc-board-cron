import React, { useEffect } from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import useScrollDispatcher, {
    registerScrollTrigger
} from '../../../../../components/features/LN-common/hooks/useScrollDispatcher';

const dispatchScroll = y => {
    Object.defineProperty(window, 'scrollY', {
        configurable: true,
        value: y
    });
    fireEvent.scroll(window);
};

const HookHost = () => {
    useEffect(() => {
        const start = document.createElement('div');
        const end = document.createElement('div');

        start.setAttribute('data-id', 'titulo');
        end.setAttribute('data-id', 'firma');

        Object.defineProperty(end, 'offsetTop', {
            configurable: true,
            value: 200
        });

        start.getBoundingClientRect = () => ({
            top: 0 - window.scrollY,
            height: 0,
            bottom: 0 - window.scrollY,
            left: 0,
            right: 0,
            width: 0
        });
        end.getBoundingClientRect = () => ({
            top: 1000 - window.scrollY,
            height: 200,
            bottom: 1200 - window.scrollY,
            left: 0,
            right: 0,
            width: 0
        });

        document.body.append(start, end);
    }, []);

    useScrollDispatcher({
        startSelector: '[data-id="titulo"]',
        endSelector: '[data-id="firma"]'
    });

    useEffect(() => {
        registerScrollTrigger({
            id: 'test-trigger',
            type: 'percentage',
            threshold: 25,
            thresholdStep: 25,
            callback: p => window.__fired.push(p)
        });
        registerScrollTrigger({
            id: 'test-trigger2',
            type: 'percentage',
            threshold: 50,
            callback: p => window.__fired.push(p)
        });
    }, []);

    return null;
};

beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
        cb();
        return 0;
    });
});

afterEach(() => {
    window.requestAnimationFrame.mockRestore?.();
    cleanup();
    delete window.__fired;
});

describe('Components - features - LN-common -  hooks - useScrollDispatcher', () => {
    it('should add and remove the scroll listener exactly once', () => {
        const addSpy = jest.spyOn(window, 'addEventListener');
        const removeSpy = jest.spyOn(window, 'removeEventListener');

        const { unmount } = render(<HookHost />);

        expect(addSpy.mock.calls.filter(c => c[0] === 'scroll')).toHaveLength(
            1
        );

        unmount();

        expect(
            removeSpy.mock.calls.filter(c => c[0] === 'scroll')
        ).toHaveLength(1);
    });

    it('should fire the 25 % callback when bottom of viewport crosses the threshold', async () => {
        Object.defineProperty(window, 'innerHeight', {
            configurable: true,
            value: 100
        });
        window.__fired = [];
        render(<HookHost />);

        const scrollYneededToReach25Percent = Math.max(
            0,
            1200 * 0.25 - window.innerHeight
        );
        dispatchScroll(scrollYneededToReach25Percent);

        await waitFor(() => {
            expect(window.__fired).toContain(25);
            expect(window.__fired).not.toContain(50);
        });
    });
});
