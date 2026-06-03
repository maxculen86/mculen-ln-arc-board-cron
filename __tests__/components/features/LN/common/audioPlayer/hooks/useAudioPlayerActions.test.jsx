import { renderHook } from '@testing-library/react';
import { useAudioPlayerActions } from '../../../../../../../components/features/LN/common/audioPlayer/hooks/useAudioPlayerActions';
import { audioPlayerStore } from '../../../../../../../components/features/LN/common/audioPlayer/store/audioPlayerStore';

describe('Components - features - LN - common - audioPlayer - hooks - useAudioPlayerActions', () => {
    beforeEach(() => {
        audioPlayerStore.close();
    });

    it('returns the store action references', () => {
        const { result } = renderHook(() => useAudioPlayerActions());
        expect(result.current.open).toBe(audioPlayerStore.open);
        expect(result.current.close).toBe(audioPlayerStore.close);
        expect(result.current.setPlaying).toBe(audioPlayerStore.setPlaying);
        expect(result.current.setSummary).toBe(audioPlayerStore.setSummary);
        expect(result.current.setError).toBe(audioPlayerStore.setError);
    });

    it('actions are stable across re-renders', () => {
        const { result, rerender } = renderHook(() => useAudioPlayerActions());
        const firstOpen = result.current.open;
        rerender();
        expect(result.current.open).toBe(firstOpen);
    });
});
