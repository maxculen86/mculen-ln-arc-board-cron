import { renderHook, waitFor } from '@testing-library/react';
import { useSegmentMatch } from '../../../../../../components/chains/LN10_Caja_Segmentada/common/hooks/useSegmentMatch';

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Segmentada/common/api/segmentationService',
    () => ({
        getUserSegments: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Segmentada/_helpers',
    () => ({
        isSegmentInUserSegments: jest.fn()
    })
);

describe('useSegmentMatch', () => {
    const {
        getUserSegments
    } = require('../../../../../../components/chains/LN10_Caja_Segmentada/common/api/segmentationService');
    const {
        isSegmentInUserSegments
    } = require('../../../../../../components/chains/LN10_Caja_Segmentada/_helpers');

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return initial state when not entered viewport', () => {
        const { result } = renderHook(() => useSegmentMatch(1, false, false));

        expect(result.current).toEqual({
            loading: false,
            segmentMatches: false,
            attemptedLoad: false
        });

        expect(getUserSegments).not.toHaveBeenCalled();
    });

    it('should set attemptedLoad to true when validation failed', async () => {
        const { result } = renderHook(() => useSegmentMatch(1, true, true));

        await waitFor(() => {
            expect(result.current.attemptedLoad).toBe(true);
        });

        expect(result.current).toEqual({
            loading: false,
            segmentMatches: false,
            attemptedLoad: true
        });

        expect(getUserSegments).not.toHaveBeenCalled();
    });

    it('should fetch segments and set segmentMatches to true when user belongs to segment', async () => {
        const mockSegments = [1, 2, 3];

        getUserSegments.mockResolvedValue(mockSegments);
        isSegmentInUserSegments.mockReturnValue(true);

        const { result } = renderHook(() => useSegmentMatch(2, true, false));

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.attemptedLoad).toBe(true);
        });

        expect(result.current).toEqual({
            loading: false,
            segmentMatches: true,
            attemptedLoad: true
        });

        expect(getUserSegments).toHaveBeenCalled();
        expect(isSegmentInUserSegments).toHaveBeenCalledWith(mockSegments, 2);
    });

    it('should fetch segments and set segmentMatches to false when user does not belong to segment', async () => {
        const mockSegments = [4, 5, 6];

        getUserSegments.mockResolvedValue(mockSegments);
        isSegmentInUserSegments.mockReturnValue(false);

        const { result } = renderHook(() => useSegmentMatch(1, true, false));

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.attemptedLoad).toBe(true);
        });

        expect(result.current).toEqual({
            loading: false,
            segmentMatches: false,
            attemptedLoad: true
        });

        expect(getUserSegments).toHaveBeenCalled();
        expect(isSegmentInUserSegments).toHaveBeenCalledWith(mockSegments, 1);
    });

    it('should handle error and set segmentMatches to false', async () => {
        const mockError = new Error('Segmentation API Error');

        getUserSegments.mockRejectedValue(mockError);

        const { result } = renderHook(() => useSegmentMatch(1, true, false));

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.attemptedLoad).toBe(true);
        });

        expect(result.current).toEqual({
            loading: false,
            segmentMatches: false,
            attemptedLoad: true
        });

        expect(console.error).toHaveBeenCalledWith(
            'Error en useSegmentMatch:',
            mockError
        );
        expect(getUserSegments).toHaveBeenCalled();
        expect(isSegmentInUserSegments).not.toHaveBeenCalled();
    });

    it('should not refetch when hasEnteredViewport changes from true to false', async () => {
        const mockSegments = [1, 2, 3];

        getUserSegments.mockResolvedValue(mockSegments);
        isSegmentInUserSegments.mockReturnValue(true);

        const { result, rerender } = renderHook(
            ({ hasEnteredViewport }) =>
                useSegmentMatch(1, hasEnteredViewport, false),
            { initialProps: { hasEnteredViewport: true } }
        );

        await waitFor(() => {
            expect(result.current.attemptedLoad).toBe(true);
        });

        expect(getUserSegments).toHaveBeenCalledTimes(1);

        rerender({ hasEnteredViewport: false });

        expect(getUserSegments).toHaveBeenCalledTimes(1);
    });

    it('should only execute effect when hasEnteredViewport becomes true', async () => {
        const mockSegments = [1, 2, 3];

        getUserSegments.mockResolvedValue(mockSegments);
        isSegmentInUserSegments.mockReturnValue(true);

        const { result, rerender } = renderHook(
            ({ hasEnteredViewport }) =>
                useSegmentMatch(1, hasEnteredViewport, false),
            { initialProps: { hasEnteredViewport: false } }
        );

        expect(getUserSegments).not.toHaveBeenCalled();
        expect(result.current.attemptedLoad).toBe(false);

        rerender({ hasEnteredViewport: true });

        await waitFor(() => {
            expect(result.current.attemptedLoad).toBe(true);
        });

        expect(getUserSegments).toHaveBeenCalledTimes(1);
    });
});
