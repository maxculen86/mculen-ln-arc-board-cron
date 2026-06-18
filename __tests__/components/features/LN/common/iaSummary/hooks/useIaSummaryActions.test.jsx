import { renderHook, act } from '@testing-library/react';
import { useIaSummaryActions } from '../../../../../../../components/features/LN/common/iaSummary/hooks/useIaSummaryActions';
import { iaSummaryStore } from '../../../../../../../components/features/LN/common/iaSummary/store/iaSummaryStore';

describe('Components - features - LN - common - iaSummary - useIaSummaryActions', () => {
    beforeEach(() => {
        act(() => iaSummaryStore.close());
    });

    it('exposes open, close and toggle actions', () => {
        const { result } = renderHook(() => useIaSummaryActions());

        expect(typeof result.current.open).toBe('function');
        expect(typeof result.current.close).toBe('function');
        expect(typeof result.current.toggle).toBe('function');
    });

    it('open mutates the store', () => {
        const { result } = renderHook(() => useIaSummaryActions());

        act(() => result.current.open());

        expect(iaSummaryStore.getSnapshot().isOpen).toBe(true);
    });

    it('close mutates the store', () => {
        const { result } = renderHook(() => useIaSummaryActions());

        act(() => result.current.open());
        act(() => result.current.close());

        expect(iaSummaryStore.getSnapshot().isOpen).toBe(false);
    });
});
