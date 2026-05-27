import { renderHook, waitFor } from '@testing-library/react';
import useNotaSegment from '../../../../../../components/private/LN/common/hooks/useNotaSegment';
import getGaClientId from '../../../../../../components/private/LN/common/utils/segmentation/getGaClientId';
import computeSegment from '../../../../../../components/private/LN/common/utils/segmentation/computeSegment';
import {
    removeSegmentoNota,
    upsertSegmentoNota
} from '../../../../../../components/private/LN/common/utils/segmentation/segmentoNotaStorage';

jest.mock(
    '../../../../../../components/private/LN/common/utils/segmentation/getGaClientId'
);
jest.mock(
    '../../../../../../components/private/LN/common/utils/segmentation/computeSegment'
);
jest.mock(
    '../../../../../../components/private/LN/common/utils/segmentation/segmentoNotaStorage',
    () => ({
        removeSegmentoNota: jest.fn(),
        upsertSegmentoNota: jest.fn()
    })
);

describe('useNotaSegment', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns the segment and persists it when clientId resolves', async () => {
        getGaClientId.mockResolvedValue('1234567890.1234567893');
        computeSegment.mockReturnValue('test');

        const { result } = renderHook(() =>
            useNotaSegment({
                experimentName: 'Exp01',
                testDigits: ['3'],
                controlDigits: ['4']
            })
        );

        // Initial state: not ready yet, no segment.
        expect(result.current).toEqual({ segment: null, ready: false });

        await waitFor(() => {
            expect(result.current.ready).toBe(true);
        });

        expect(result.current.segment).toBe('test');
        expect(upsertSegmentoNota).toHaveBeenCalledWith('Exp01', 'test');
        expect(computeSegment).toHaveBeenCalledWith('1234567890.1234567893', {
            testDigits: ['3'],
            controlDigits: ['4']
        });
    });

    it('returns ready=true with segment=null when experimentName is missing (no compute)', () => {
        const { result } = renderHook(() =>
            useNotaSegment({
                experimentName: '',
                testDigits: ['1'],
                controlDigits: ['2']
            })
        );

        expect(result.current).toEqual({ segment: null, ready: true });
        expect(getGaClientId).not.toHaveBeenCalled();
        expect(upsertSegmentoNota).not.toHaveBeenCalled();
        expect(removeSegmentoNota).not.toHaveBeenCalled();
    });

    it('returns ready=true with segment=null when both digit lists are empty (no compute)', () => {
        const { result } = renderHook(() =>
            useNotaSegment({
                experimentName: 'Exp01',
                testDigits: [],
                controlDigits: []
            })
        );

        expect(result.current).toEqual({ segment: null, ready: true });
        expect(getGaClientId).not.toHaveBeenCalled();
        expect(removeSegmentoNota).toHaveBeenCalledWith('Exp01');
    });

    it('returns ready=true with segment=null when clientId cannot be resolved', async () => {
        getGaClientId.mockResolvedValue(null);

        const { result } = renderHook(() =>
            useNotaSegment({
                experimentName: 'Exp01',
                testDigits: ['1'],
                controlDigits: ['2']
            })
        );

        await waitFor(() => {
            expect(result.current.ready).toBe(true);
        });

        expect(result.current.segment).toBeNull();
        expect(computeSegment).not.toHaveBeenCalled();
        expect(upsertSegmentoNota).not.toHaveBeenCalled();
        expect(removeSegmentoNota).toHaveBeenCalledWith('Exp01');
    });

    it('returns ready=true with segment=null when segment cannot be computed (digit not in any list)', async () => {
        getGaClientId.mockResolvedValue('1234567890.1234567897');
        computeSegment.mockReturnValue(null);

        const { result } = renderHook(() =>
            useNotaSegment({
                experimentName: 'Exp01',
                testDigits: ['1'],
                controlDigits: ['2']
            })
        );

        await waitFor(() => {
            expect(result.current.ready).toBe(true);
        });

        expect(result.current.segment).toBeNull();
        expect(computeSegment).toHaveBeenCalled();
        expect(upsertSegmentoNota).not.toHaveBeenCalled();
        expect(removeSegmentoNota).toHaveBeenCalledWith('Exp01');
    });

    it('clears the previous segment while recalculating after config changes', async () => {
        let resolveFirstClientId;
        let resolveSecondClientId;

        getGaClientId
            .mockImplementationOnce(
                () =>
                    new Promise(res => {
                        resolveFirstClientId = res;
                    })
            )
            .mockImplementationOnce(
                () =>
                    new Promise(res => {
                        resolveSecondClientId = res;
                    })
            );
        computeSegment
            .mockReturnValueOnce('test')
            .mockReturnValueOnce('control');

        const { result, rerender } = renderHook(
            props => useNotaSegment(props),
            {
                initialProps: {
                    experimentName: 'Exp01',
                    testDigits: ['3'],
                    controlDigits: ['4']
                }
            }
        );

        resolveFirstClientId('1234567890.1234567893');
        await waitFor(() => {
            expect(result.current).toEqual({ segment: 'test', ready: true });
        });

        rerender({
            experimentName: 'Exp01',
            testDigits: ['1'],
            controlDigits: ['3']
        });

        expect(result.current).toEqual({ segment: null, ready: false });

        resolveSecondClientId('1234567890.1234567893');
        await waitFor(() => {
            expect(result.current).toEqual({
                segment: 'control',
                ready: true
            });
        });
    });

    it('skips state update after unmount even if pipeline finishes later', async () => {
        let resolveClientId;
        getGaClientId.mockImplementation(
            () =>
                new Promise(res => {
                    resolveClientId = res;
                })
        );
        computeSegment.mockReturnValue('test');

        const { unmount } = renderHook(() =>
            useNotaSegment({
                experimentName: 'Exp01',
                testDigits: ['3'],
                controlDigits: ['4']
            })
        );

        unmount();
        resolveClientId('1234567890.1234567893');

        await Promise.resolve();
        await Promise.resolve();
        expect(upsertSegmentoNota).not.toHaveBeenCalled();
    });
});
