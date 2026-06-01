import { renderHook, act } from '@testing-library/react';
import { useBeyondWordsScript } from '../../../../../../../components/features/LN/common/audioPlayer/hooks/useBeyondWordsScript';

const SCRIPT_SRC =
    'https://proxy.beyondwords.io/npm/@beyondwords/player@latest/dist/umd.js';

describe('Components - features - LN - common - audioPlayer - hooks - useBeyondWordsScript', () => {
    beforeEach(() => {
        document.head.innerHTML = '';
        delete window.BeyondWords;
    });

    it('starts loaded when window.BeyondWords is already present', () => {
        window.BeyondWords = {};
        const { result } = renderHook(() => useBeyondWordsScript());
        expect(result.current).toBe(true);
        expect(
            document.querySelector(`script[src="${SCRIPT_SRC}"]`)
        ).toBeNull();
    });

    it('injects the script once and resolves on load', () => {
        const { result } = renderHook(() => useBeyondWordsScript());

        const script = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
        expect(result.current).toBe(false);
        expect(script).not.toBeNull();
        expect(script.async).toBe(true);
        expect(script.defer).toBe(true);

        act(() => {
            script.onload();
        });

        expect(result.current).toBe(true);
    });

    it('does not re-inject when the script already exists and resolves once BeyondWords is ready', () => {
        const existing = document.createElement('script');
        existing.src = SCRIPT_SRC;
        window.BeyondWords = {};
        document.head.appendChild(existing);

        const { result } = renderHook(() => useBeyondWordsScript());

        expect(result.current).toBe(true);
        expect(
            document.querySelectorAll(`script[src="${SCRIPT_SRC}"]`)
        ).toHaveLength(1);
    });

    it('waits for the existing script load event when BeyondWords is not ready yet', () => {
        const existing = document.createElement('script');
        existing.src = SCRIPT_SRC;
        document.head.appendChild(existing);

        const { result } = renderHook(() => useBeyondWordsScript());

        expect(result.current).toBe(false);
        expect(
            document.querySelectorAll(`script[src="${SCRIPT_SRC}"]`)
        ).toHaveLength(1);

        act(() => {
            existing.dispatchEvent(new Event('load'));
        });

        expect(result.current).toBe(true);
    });
});
