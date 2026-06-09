import { audioPlayerStore } from '../store/audioPlayerStore';

export const useAudioPlayerActions = () => ({
    open: audioPlayerStore.open,
    close: audioPlayerStore.close,
    setPlaying: audioPlayerStore.setPlaying,
    setSummary: audioPlayerStore.setSummary,
    setSummaryAvailable: audioPlayerStore.setSummaryAvailable,
    setError: audioPlayerStore.setError
});
