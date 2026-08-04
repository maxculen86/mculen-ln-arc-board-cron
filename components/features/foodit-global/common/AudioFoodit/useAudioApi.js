import { useState, useEffect, useRef, useCallback } from 'react';

const BEYONDWORDS_API_BASE = 'https://api.beyondwords.io/v1';

function findSegmentIndex(segments, currentTimeMs) {
    let index = 0;
    for (let i = segments.length - 1; i >= 0; i -= 1) {
        if (currentTimeMs >= segments[i].start_time) {
            index = i;
            break;
        }
    }
    return index;
}

function shouldAutoPause(segmentIndex) {
    return segmentIndex > 1;
}

function clearPauseTimeout(pauseTimeoutRef) {
    if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        // eslint-disable-next-line no-param-reassign
        pauseTimeoutRef.current = null;
    }
}

function findNextAutoPauseIndex(segments, fromIndex) {
    for (let i = fromIndex + 1; i < segments.length; i += 1) {
        if (shouldAutoPause(i)) return i;
    }
    return -1;
}

function scheduleAutoPause(
    audio,
    segments,
    fromIndex,
    currentTimeMs,
    pauseTimeoutRef
) {
    clearPauseTimeout(pauseTimeoutRef);

    const nextIndex = findNextAutoPauseIndex(segments, fromIndex);
    if (nextIndex === -1) return;

    const delayMs = segments[nextIndex].start_time - currentTimeMs;

    if (delayMs <= 0) {
        audio.pause();
        return;
    }

    // eslint-disable-next-line no-param-reassign
    pauseTimeoutRef.current = setTimeout(() => {
        // eslint-disable-next-line no-param-reassign
        pauseTimeoutRef.current = null;
        audio.pause();
    }, delayMs);
}

function detachAudio(audio, handleTimeUpdateRef, pauseTimeoutRef) {
    if (!audio) return;

    clearPauseTimeout(pauseTimeoutRef);

    if (handleTimeUpdateRef.current) {
        audio.removeEventListener('timeupdate', handleTimeUpdateRef.current);
    }
    // eslint-disable-next-line no-param-reassign
    handleTimeUpdateRef.current = null;

    audio.pause();
    // eslint-disable-next-line no-param-reassign
    audio.src = '';
}

function attachAudioListeners(
    audio,
    segments,
    segmentIndexRef,
    handleTimeUpdateRef,
    setSegmentIndex,
    pauseTimeoutRef
) {
    const handleTimeUpdate = () => {
        const currentTimeMs = audio.currentTime * 1000;
        const newIndex = findSegmentIndex(segments, currentTimeMs);

        if (newIndex === segmentIndexRef.current) return;
        if (newIndex < segmentIndexRef.current) return;

        if (shouldAutoPause(newIndex)) {
            clearPauseTimeout(pauseTimeoutRef);
            audio.pause();
            return;
        }

        // eslint-disable-next-line no-param-reassign
        segmentIndexRef.current = newIndex;
        setSegmentIndex(newIndex);
        // Only schedule a pause if no timeout is pending from seekToSegment.
        // seekToSegment's timeout is calculated from segment metadata and is
        // more precise than one derived from audio.currentTime here.
        if (!pauseTimeoutRef.current) {
            scheduleAutoPause(
                audio,
                segments,
                newIndex,
                currentTimeMs,
                pauseTimeoutRef
            );
        }
    };

    // eslint-disable-next-line no-param-reassign
    handleTimeUpdateRef.current = handleTimeUpdate;

    audio.addEventListener('timeupdate', handleTimeUpdate);
}

async function fetchAudioData(articleId, projectId) {
    const res = await fetch(
        `${BEYONDWORDS_API_BASE}/projects/${projectId}/player/by_source_id/${articleId}`
    );

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();

    const item = data?.content?.[0];
    if (!item) {
        throw new Error('No audio content available');
    }

    const mp3 = item.audio?.find(a => a.content_type === 'audio/mpeg');
    if (!mp3?.url) {
        throw new Error('No MP3 URL found');
    }

    return {
        mp3Url: mp3.url,
        segments: item.segments || []
    };
}

export function useAudioApi(
    articleId,
    projectId,
    { createAudio = () => new Audio() } = {}
) {
    const [segmentIndex, setSegmentIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [segments, setSegments] = useState([]);

    const audioRef = useRef(null);
    const segmentIndexRef = useRef(0);
    const handleTimeUpdateRef = useRef(null);
    const pauseTimeoutRef = useRef(null);

    useEffect(() => {
        segmentIndexRef.current = segmentIndex;
    }, [segmentIndex]);

    useEffect(() => {
        if (!articleId || !projectId) {
            return () => {};
        }

        let cancelled = false;

        setIsLoading(true);
        setError(null);

        detachAudio(audioRef.current, handleTimeUpdateRef, pauseTimeoutRef);
        audioRef.current = null;

        const audio = createAudio();
        audio.muted = isMuted;
        audioRef.current = audio;

        const loadAudio = async () => {
            try {
                const { mp3Url, segments: segs } = await fetchAudioData(
                    articleId,
                    projectId
                );

                if (cancelled) {
                    return;
                }

                setSegments(segs);
                audio.src = mp3Url;
                audio.load();

                attachAudioListeners(
                    audio,
                    segs,
                    segmentIndexRef,
                    handleTimeUpdateRef,
                    setSegmentIndex,
                    pauseTimeoutRef
                );
            } catch (err) {
                if (!cancelled) {
                    console.error('Error fetching audio:', err);
                    setError(err);
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        loadAudio();

        return () => {
            cancelled = true;
            detachAudio(audioRef.current, handleTimeUpdateRef, pauseTimeoutRef);
            audioRef.current = null;
        };
    }, [articleId, projectId]);

    useEffect(
        () => () => {
            detachAudio(audioRef.current, handleTimeUpdateRef, pauseTimeoutRef);
            audioRef.current = null;
        },
        []
    );

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const seekToSegment = useCallback(
        index => {
            clearPauseTimeout(pauseTimeoutRef);

            // Always update the segment index so steps navigation works
            // even when the audio fetch fails or is still loading.
            const targetIndex = segments.length
                ? Math.max(0, Math.min(index, segments.length - 1))
                : Math.max(0, index);

            segmentIndexRef.current = targetIndex;
            setSegmentIndex(targetIndex);

            // Audio operations: only if we have data loaded
            if (audioRef.current && segments.length) {
                const targetTimeMs = segments[targetIndex]?.start_time ?? 0;
                audioRef.current.currentTime = targetTimeMs / 1000;
                audioRef.current.play().catch(() => {});
                scheduleAutoPause(
                    audioRef.current,
                    segments,
                    targetIndex,
                    targetTimeMs,
                    pauseTimeoutRef
                );
            }
        },
        [segments]
    );

    const restart = useCallback(() => {
        seekToSegment(0);
    }, [seekToSegment]);

    const replayCurrent = useCallback(() => {
        seekToSegment(segmentIndexRef.current);
    }, [seekToSegment]);

    const goToNext = useCallback(() => {
        seekToSegment(segmentIndexRef.current + 1);
    }, [seekToSegment]);

    const goToPrev = useCallback(() => {
        seekToSegment(segmentIndexRef.current - 1);
    }, [seekToSegment]);

    const toggleMute = useCallback(() => {
        setIsMuted(prev => !prev);
    }, []);

    const startPlaying = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.play().catch(() => {});
        scheduleAutoPause(
            audio,
            segments,
            segmentIndexRef.current,
            audio.currentTime * 1000,
            pauseTimeoutRef
        );
    }, [segments]);

    const pausePlaying = useCallback(() => {
        clearPauseTimeout(pauseTimeoutRef);
        audioRef.current?.pause();
    }, []);

    return {
        segmentIndex,
        isMuted,
        isLoading,
        error,
        goToNext,
        goToPrev,
        toggleMute,
        startPlaying,
        pausePlaying,
        restart,
        replayCurrent,
        totalSegments: segments.length
    };
}
