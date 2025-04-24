import usePrint from '../../../../../../components/features/foodit-global/common/utils/PrintFoodit/usePrint';
import { renderHook, act } from '@testing-library/react';

describe('usePrint', () => {
    it('return printRef y handlePrint', () => {
        const { result } = renderHook(() => usePrint());

        expect(result.current.printRef).toBeDefined();
        expect(typeof result.current.handlePrint).toBe('function');
    });

    it('handlePrint should not throw if printRef is null', () => {
        const { result } = renderHook(() => usePrint());

        expect(() => {
            act(() => {
                result.current.handlePrint();
            });
        }).not.toThrow();
    });

    it('handlePrint creates and removes iframe', () => {
        const { result } = renderHook(() => usePrint());

        result.current.printRef.current = document.createElement('div');
        result.current.printRef.current.innerHTML = '<p>Contenido</p>';

        act(() => {
            result.current.handlePrint();
        });

        const iframe = document.querySelector('iframe');
        expect(iframe).toBeInTheDocument();

        act(() => {
            iframe.onload();
        });
    });
});
