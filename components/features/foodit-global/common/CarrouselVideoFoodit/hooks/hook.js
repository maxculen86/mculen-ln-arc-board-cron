import { useEffect, useRef } from 'react';

export function useHandlePlayVideoCarrusel({ isPlaying, videoRef }) {
    useEffect(() => {
        const videoElement = videoRef?.current;

        if (isPlaying) {
            videoElement?.play();
        } else {
            videoElement?.pause();
        }
    }, [isPlaying]);
}

export function useObserverMobAndTab({ videoRef, setIsPlaying }) {
    const observer = useRef(null);

    useEffect(() => {
        if (window.innerWidth > 1279) return;

        observer.current = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsPlaying(true);
                    } else {
                        setIsPlaying(false);
                    }
                });
            },
            {
                threshold: 0.9,
                rootMargin: '20% 0px 0px 0px'
            }
        );

        const videoElement = videoRef.current;

        if (videoElement) {
            observer?.current?.observe(videoElement);
        }

        // eslint-disable-next-line consistent-return
        return () => {
            if (observer?.current && videoElement) {
                observer?.current?.unobserve(videoElement);
            }
        };
    }, [videoRef, setIsPlaying]);
}
