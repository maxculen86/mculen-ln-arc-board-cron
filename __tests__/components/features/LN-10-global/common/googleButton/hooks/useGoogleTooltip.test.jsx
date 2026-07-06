import React from 'react';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import useGoogleTooltip from '../../../../../../../components/features/LN-10-global/common/googleButton/hooks/useGoogleTooltip';

const CLOSE_COUNT_KEY = 'google_tooltip_close_count';
const CTA_CLICKED_KEY = 'google_tooltip_cta_clicked';

const mockIntersectionObserver = () => {
    let storedCallback;
    global.IntersectionObserver = jest.fn(callback => {
        storedCallback = callback;
        return {
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn()
        };
    });
    return {
        fire: entries => storedCallback(entries)
    };
};

const renderWithHook = () => {
    let hook;
    function TestComponent() {
        hook = useGoogleTooltip();
        const { targetRef } = hook;
        return (
            <div
                ref={node => {
                    targetRef.current = node;
                    if (node) {
                        Object.defineProperty(node, 'offsetParent', {
                            value: document.body,
                            configurable: true
                        });
                    }
                }}
                data-testid="target"
            />
        );
    }
    const utils = render(<TestComponent />);
    return { ...utils, getHook: () => hook };
};

describe('Components - Features - LN-10-Global - common - googleButton - hooks - useGoogleTooltip', () => {
    let observerMock;

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
        observerMock = mockIntersectionObserver();
    });

    afterEach(() => {
        delete global.IntersectionObserver;
    });

    it('does not expose setIsVisible in the return (close only via handlers/Observer)', () => {
        const { getHook } = renderWithHook();
        expect(getHook().setIsVisible).toBeUndefined();
    });

    it('shows the tooltip on first visit when no blocking flags are set', async () => {
        const { getHook } = renderWithHook();
        await act(async () => {});
        expect(getHook().isVisible).toBe(true);
    });

    it('does not show the tooltip when closeCount >= 3', async () => {
        localStorage.setItem(CLOSE_COUNT_KEY, '3');
        const { getHook } = renderWithHook();
        await act(async () => {});
        expect(getHook().isVisible).toBe(false);
    });

    it('does not show the tooltip when the CTA was already clicked', async () => {
        localStorage.setItem(CTA_CLICKED_KEY, 'true');
        const { getHook } = renderWithHook();
        await act(async () => {});
        expect(getHook().isVisible).toBe(false);
    });

    it('resets scrolledAway on each new load (per-page scope, not per-tab)', async () => {
        // simula que en una carga previa el observador disparó scroll-away
        const first = renderWithHook();
        await act(async () => {});
        act(() => {
            observerMock.fire([{ isIntersecting: true }]);
        });
        act(() => {
            observerMock.fire([{ isIntersecting: false }]);
        });
        expect(first.getHook().isVisible).toBe(false);
        first.unmount();

        // una nueva carga (nueva página) debe volver a mostrar el tooltip
        // aunque la instancia anterior haya hecho scroll-away
        const second = renderWithHook();
        await act(async () => {});
        expect(second.getHook().isVisible).toBe(true);
    });

    it('handleClose hides the tooltip and increments closeCount in localStorage', async () => {
        const { getHook } = renderWithHook();
        await act(async () => {});
        expect(getHook().isVisible).toBe(true);

        act(() => {
            getHook().handleClose();
        });

        expect(getHook().isVisible).toBe(false);
        expect(localStorage.getItem(CLOSE_COUNT_KEY)).toBe('1');
    });

    it('handleCTAClick hides the tooltip and sets ctaClicked=true in localStorage', async () => {
        const { getHook } = renderWithHook();
        await act(async () => {});
        expect(getHook().isVisible).toBe(true);

        act(() => {
            getHook().handleCTAClick();
        });

        expect(getHook().isVisible).toBe(false);
        expect(localStorage.getItem(CTA_CLICKED_KEY)).toBe('true');
    });

    it('IntersectionObserver hides the tooltip when leaving the viewport (scrolledAway in memory)', async () => {
        const { getHook } = renderWithHook();
        // primer mount effect ya activó isVisible=true y montó el observer
        await act(async () => {});
        expect(getHook().isVisible).toBe(true);

        // entrada: el elemento entra en el viewport
        await act(async () => {
            observerMock.fire([{ isIntersecting: true }]);
        });
        expect(getHook().isVisible).toBe(true);

        // salida: fue visible y ahora no intersecta -> ocultar
        await act(async () => {
            observerMock.fire([{ isIntersecting: false }]);
        });
        expect(getHook().isVisible).toBe(false);
    });
});
