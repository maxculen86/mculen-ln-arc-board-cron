import { useSyncExternalStore } from 'react';
import { audioPlayerStore } from '../store/audioPlayerStore';

export const useAudioPlayerState = () =>
    useSyncExternalStore(
        audioPlayerStore.subscribe,
        audioPlayerStore.getSnapshot,
        audioPlayerStore.getSnapshot
    );
