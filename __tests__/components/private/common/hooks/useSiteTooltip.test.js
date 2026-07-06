import React from 'react';
import { renderHook } from '@testing-library/react';
import { GlobalContext } from '../../../../../components/private/common/context/globalContext';
import useSiteTooltip from '../../../../../components/private/common/hooks/useSiteTooltip';

const mockTooltips = [
    { text: 'paywall-label', label: 'Suscribite para seguir leyendo' },
    { text: 'newsletter-title', label: 'Recibí nuestro newsletter' },
    { text: 'trust-project', label: 'Conocé nuestro proyecto de confianza' }
];

const renderHookWithContext = (contextValue, key) =>
    renderHook(() => useSiteTooltip(key), {
        wrapper: ({ children }) => (
            <GlobalContext.Provider value={contextValue}>
                {children}
            </GlobalContext.Provider>
        )
    });

describe('useSiteTooltip', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns the tooltip object when the key exists', () => {
        const { result } = renderHookWithContext(
            { state: { siteService: { tooltips: mockTooltips } } },
            'paywall-label'
        );

        expect(result.current).toEqual({
            text: 'paywall-label',
            label: 'Suscribite para seguir leyendo'
        });
    });

    it('returns undefined when the key does not exist', () => {
        const { result } = renderHookWithContext(
            { state: { siteService: { tooltips: mockTooltips } } },
            'inexistente'
        );

        expect(result.current).toBeUndefined();
    });

    it('returns undefined when tooltips is an empty array', () => {
        const { result } = renderHookWithContext(
            { state: { siteService: { tooltips: [] } } },
            'paywall-label'
        );

        expect(result.current).toBeUndefined();
    });

    it('returns undefined when siteService has no tooltips property', () => {
        const { result } = renderHookWithContext(
            { state: { siteService: {} } },
            'paywall-label'
        );

        expect(result.current).toBeUndefined();
    });

    it('returns undefined when siteService is null', () => {
        const { result } = renderHookWithContext(
            { state: { siteService: null } },
            'paywall-label'
        );

        expect(result.current).toBeUndefined();
    });

    it('returns undefined when siteService is undefined', () => {
        const { result } = renderHookWithContext(
            { state: {} },
            'paywall-label'
        );

        expect(result.current).toBeUndefined();
    });

    it('returns undefined when state is undefined', () => {
        const { result } = renderHookWithContext({}, 'paywall-label');

        expect(result.current).toBeUndefined();
    });

    it('returns undefined when globalContext is undefined', () => {
        const { result } = renderHookWithContext(undefined, 'paywall-label');

        expect(result.current).toBeUndefined();
    });

    it('returns the first match when multiple tooltips share the same key', () => {
        const { result } = renderHookWithContext(
            {
                state: {
                    siteService: {
                        tooltips: [
                            { text: 'dup', label: 'first' },
                            { text: 'dup', label: 'second' }
                        ]
                    }
                }
            },
            'dup'
        );

        expect(result.current).toEqual({ text: 'dup', label: 'first' });
    });

    it('returns undefined when key is undefined', () => {
        const { result } = renderHookWithContext(
            { state: { siteService: { tooltips: mockTooltips } } },
            undefined
        );

        expect(result.current).toBeUndefined();
    });

    it('returns undefined when key is null', () => {
        const { result } = renderHookWithContext(
            { state: { siteService: { tooltips: mockTooltips } } },
            null
        );

        expect(result.current).toBeUndefined();
    });

    it('returns the tooltip when key is an empty string and a tooltip with empty text exists', () => {
        const { result } = renderHookWithContext(
            {
                state: {
                    siteService: {
                        tooltips: [{ text: '', label: 'Empty tooltip' }]
                    }
                }
            },
            ''
        );

        expect(result.current).toEqual({ text: '', label: 'Empty tooltip' });
    });
});
