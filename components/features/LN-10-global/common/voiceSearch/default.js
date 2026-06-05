import { useCallback, useEffect, useRef, useState } from 'react';
import SpeechRecognition, {
    useSpeechRecognition
} from 'react-speech-recognition';
import { getMicPermissionState } from './getMicPermissionState';
import { useListeningTimer } from './useListeningTimer';

const startSR = () => {
    SpeechRecognition.startListening({
        continuous: false,
        interimResults: false,
        language: 'es-AR'
    });
};

const requestMicAndStart = async () => {
    if (
        typeof navigator === 'undefined' ||
        !navigator.mediaDevices?.getUserMedia
    ) {
        startSR();
        return true;
    }
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });
        stream.getTracks().forEach(track => track.stop());
        startSR();
        return true;
    } catch {
        return false;
    }
};

export const useVoiceSearch = ({ onSearch }) => {
    const [isMicPermissionPending, setIsMicPermissionPending] = useState(false);
    const [isMicDenied, setIsMicDenied] = useState(false);
    const mountedRef = useRef(true);
    const onSearchRef = useRef(onSearch);

    useEffect(() => {
        onSearchRef.current = onSearch;
    });

    const {
        listening: isListening,
        transcript,
        resetTranscript
    } = useSpeechRecognition();

    const listeningTime = useListeningTimer(isListening);

    useEffect(
        () => () => {
            mountedRef.current = false;
            SpeechRecognition.stopListening();
            SpeechRecognition.abortListening();
        },
        []
    );

    useEffect(() => {
        if (!transcript) return;
        SpeechRecognition.stopListening();
        onSearchRef.current(transcript);
    }, [isListening]);

    const startListening = useCallback(async () => {
        resetTranscript();
        if (mountedRef.current) {
            setIsMicPermissionPending(true);
            setIsMicDenied(false);
        }
        const permState = await getMicPermissionState();
        if (mountedRef.current) setIsMicPermissionPending(false);
        if (permState === 'denied') {
            if (mountedRef.current) setIsMicDenied(true);
            return;
        }
        if (permState === 'granted') {
            startSR();
            return;
        }
        const granted = await requestMicAndStart();
        if (!granted && mountedRef.current) setIsMicDenied(true);
    }, [resetTranscript]);

    const stopListening = useCallback(() => {
        SpeechRecognition.stopListening();
        resetTranscript();
        if (mountedRef.current) setIsMicPermissionPending(false);
    }, [resetTranscript]);

    return {
        shouldListen: isListening || isMicPermissionPending,
        micDenied: isMicDenied,
        listeningTime,
        startListening,
        stopListening
    };
};
