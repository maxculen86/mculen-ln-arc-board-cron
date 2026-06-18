import { renderHook, act } from '@testing-library/react';
import { useIaSummaryState } from '../../../../../../../components/features/LN/common/iaSummary/hooks/useIaSummaryState';
import { iaSummaryStore } from '../../../../../../../components/features/LN/common/iaSummary/store/iaSummaryStore';

describe('Components - features - LN - common - iaSummary - useIaSummaryState', () => {
    beforeEach(() => {
        act(() => iaSummaryStore.close());
    });

    it('returns the current store snapshot', () => {
        const { result } = renderHook(() => useIaSummaryState());

        expect(result.current.isOpen).toBe(false);
    });

    it('re-renders with the updated state when the store changes', () => {
        const { result } = renderHook(() => useIaSummaryState());

        act(() => iaSummaryStore.open());

        expect(result.current.isOpen).toBe(true);
    });
});
