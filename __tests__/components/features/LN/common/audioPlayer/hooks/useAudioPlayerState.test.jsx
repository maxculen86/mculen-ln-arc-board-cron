import { renderHook, act } from '@testing-library/react';
import { useAudioPlayerState } from '../../../../../../../components/features/LN/common/audioPlayer/hooks/useAudioPlayerState';
import { audioPlayerStore } from '../../../../../../../components/features/LN/common/audioPlayer/store/audioPlayerStore';

describe('Components - features - LN - common - audioPlayer - hooks - useAudioPlayerState', () => {
    beforeEach(() => {
        audioPlayerStore.close();
    });

    it('returns initial store snapshot', () => {
        const { result } = renderHook(() => useAudioPlayerState());
        expect(result.current.isOpen).toBe(false);
        expect(result.current.noteId).toBeNull();
    });

    it('re-renders when store changes', () => {
        const { result } = renderHook(() => useAudioPlayerState());
        act(() => {
            audioPlayerStore.open('note-abc');
        });
        expect(result.current.isOpen).toBe(true);
        expect(result.current.noteId).toBe('note-abc');
    });

    it('reflects isSummary changes', () => {
        const { result } = renderHook(() => useAudioPlayerState());
        act(() => {
            audioPlayerStore.setSummary(true);
        });
        expect(result.current.isSummary).toBe(true);
    });

    it('reflects hasError after setError', () => {
        const { result } = renderHook(() => useAudioPlayerState());
        act(() => {
            audioPlayerStore.open('note-err');
            audioPlayerStore.setError();
        });
        expect(result.current.hasError).toBe(true);
        expect(result.current.isOpen).toBe(false);
    });
});
