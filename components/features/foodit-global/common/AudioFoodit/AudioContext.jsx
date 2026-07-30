import React, { createContext, useContext, useEffect } from 'react';
import { BEYONDWORDS_PROJECT_ID_FOODIT } from 'fusion:environment';
import { useAudioApi } from './useAudioApi';

const AudioContext = createContext(null);

export const audioApiRef = { current: null };

const DEFAULT_AUDIO = {
    segmentIndex: 0,
    isMuted: false,
    isLoading: false,
    error: null,
    goToNext: () => {},
    goToPrev: () => {},
    toggleMute: () => {},
    startPlaying: () => {},
    pausePlaying: () => {},
    restart: () => {},
    replayCurrent: () => {},
    totalSegments: 0
};

export function AudioProvider({ article, children }) {
    const audio = useAudioApi(article?._id, BEYONDWORDS_PROJECT_ID_FOODIT);

    useEffect(() => {
        audioApiRef.current = {
            startPlaying: audio.startPlaying,
            pausePlaying: audio.pausePlaying,
            restart: audio.restart
        };
        return () => {
            audioApiRef.current = null;
        };
    }, [audio.startPlaying, audio.pausePlaying, audio.restart]);

    return (
        <AudioContext.Provider value={audio}>{children}</AudioContext.Provider>
    );
}

export function useAudio() {
    const ctx = useContext(AudioContext);
    return ctx ?? DEFAULT_AUDIO;
}
