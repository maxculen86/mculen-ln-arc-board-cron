import { useEffect, useRef, useState } from 'react';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import useJwScriptLoaded from './useJwScriptLoaded';
import isSSR from '../../../../private/LN/common/utils/isSSR';
import urlForPrerollAds from '../../../../private/LN/common/utils/urlForPrerollAds';
import get from '../../../../private/common/utils/get';
import { close, goToIndex, open } from './jwPlayerManager';
import { invokeMethod } from './jwPlayerShared';

export const JW_LIBRARY_SCRIPT_KEY = 'OSRCuuxn';

const callFunction = (callback, ...args) => {
    if (typeof callback !== 'function') return undefined;

    return callback(...args);
};

const DESKTOP_MIN_WIDTH = 1279;
const METADATA_FETCH_TIMEOUT_MS = 5000;
const JW_VIDEOS_CDN = 'https://cdn.jwplayer.com/videos';
const JW_MEDIA_CDN = 'https://cdn.jwplayer.com/v2/media';
const MAX_METADATA_ATTEMPTS = 2;
const METADATA_RETRY_DELAY_MS = 300;

function buildPlaylist({
    videoItems,
    preferredVideoFiles,
    videoMetadata,
    variant
}) {
    const isDesktop =
        !isSSR() && get(window, 'innerWidth', 0) > DESKTOP_MIN_WIDTH;

    return videoItems.map(item => {
        const itemId = get(item, 'id');
        const preferredFile = get(preferredVideoFiles, itemId);
        const shouldUsePreferredFile =
            isDesktop && variant === 'horizontal' && !!preferredFile;

        return {
            id: itemId,
            file: shouldUsePreferredFile
                ? preferredFile
                : `${JW_VIDEOS_CDN}/${itemId}.mp4`,
            image: `${JW_MEDIA_CDN}/${itemId}/poster.jpg`,
            mediaId: itemId,
            title: get(item, 'title', ''),
            titleJwPlayer: get(videoMetadata, [itemId, 'titleJwPlayer'], ''),
            duration: get(videoMetadata, [itemId, 'duration'], 0),
            counterVideo: get(item, 'counterVideo'),
            origin: get(item, 'origin'),
            roofData: get(item, 'roofData')
        };
    });
}

const makeTimeoutPromise = ms => {
    let timeoutId;
    const promise = new Promise((_, reject) => {
        timeoutId = undefined;
        timeoutId = setTimeout(() => reject(new Error('timeout')), ms);
    });
    promise.cancel = () => clearTimeout(timeoutId);
    return promise;
};

const fetchJwMediaMetadata = async id => {
    const hasAbortTimeout =
        typeof AbortSignal !== 'undefined' &&
        typeof get(AbortSignal, 'timeout') === 'function';

    const fetchPromise = hasAbortTimeout
        ? fetch(`${JW_MEDIA_CDN}/${id}`, {
              signal: invokeMethod(
                  AbortSignal,
                  'timeout',
                  METADATA_FETCH_TIMEOUT_MS
              )
          })
        : fetch(`${JW_MEDIA_CDN}/${id}`);

    const timeoutGuard = hasAbortTimeout
        ? null
        : makeTimeoutPromise(METADATA_FETCH_TIMEOUT_MS);

    const response = await (timeoutGuard
        ? Promise.race([fetchPromise, timeoutGuard])
        : fetchPromise);

    invokeMethod(timeoutGuard, 'cancel');

    if (!get(response, 'ok'))
        throw new Error(`JW media fetch failed: ${get(response, 'status')}`);

    const data = await invokeMethod(response, 'json');

    return {
        titleJwPlayer: get(data, 'title', ''),
        duration: get(data, 'playlist.0.duration', 0)
    };
};

export default function usePersistentJwPlayer({
    listVideoData,
    variant,
    handleNextCallback,
    scrollerRef
}) {
    const {
        videoMetadata,
        currentIndex,
        preferredVideoFiles,
        setVideoMetadata
    } = useCajaCarruselContext();

    const isLoadedScriptJw = useJwScriptLoaded(JW_LIBRARY_SCRIPT_KEY);
    const sentProgressRef = useRef(new Set());
    const currentIndexRef = useRef(currentIndex);
    const handleNextCallbackRef = useRef(handleNextCallback);
    const metadataRequestedRef = useRef(new Set());
    const metadataRetryTimersRef = useRef(new Map());
    const metadataRetryCountRef = useRef(new Map());
    const metadataFallbackRef = useRef(new Set());
    const [metadataFallbackVersion, setMetadataFallbackVersion] = useState(0);
    const mountedRef = useRef(true);
    const ownerKeyRef = useRef(
        `${variant || 'default'}-${Date.now()}-${Math.random()}`
    );

    const clearMetadataRetryTimer = id => {
        const timer = metadataRetryTimersRef.current.get(id);
        if (!timer) return;

        clearTimeout(timer);
        metadataRetryTimersRef.current.delete(id);
    };

    const requestMetadataForId = id => {
        if (
            !id ||
            metadataFallbackRef.current.has(id) ||
            metadataRequestedRef.current.has(id) ||
            metadataRetryTimersRef.current.has(id)
        ) {
            return;
        }

        const attempts = metadataRetryCountRef.current.get(id) || 0;
        if (attempts >= MAX_METADATA_ATTEMPTS) {
            metadataFallbackRef.current.add(id);
            return;
        }

        metadataRequestedRef.current.add(id);

        fetchJwMediaMetadata(id)
            .then(meta => {
                metadataRequestedRef.current.delete(id);
                clearMetadataRetryTimer(id);
                metadataRetryCountRef.current.delete(id);

                if (mountedRef.current) setVideoMetadata(id, meta);
            })
            .catch(() => {
                metadataRequestedRef.current.delete(id);

                const nextAttempts = attempts + 1;
                metadataRetryCountRef.current.set(id, nextAttempts);

                if (!mountedRef.current) {
                    clearMetadataRetryTimer(id);
                    return;
                }

                if (nextAttempts >= MAX_METADATA_ATTEMPTS) {
                    metadataFallbackRef.current.add(id);
                    clearMetadataRetryTimer(id);
                    setMetadataFallbackVersion(v => v + 1);
                    return;
                }

                clearMetadataRetryTimer(id);
                const timer = setTimeout(() => {
                    metadataRetryTimersRef.current.delete(id);
                    requestMetadataForId(id);
                }, METADATA_RETRY_DELAY_MS);

                metadataRetryTimersRef.current.set(id, timer);
            });
    };

    const urlAds = urlForPrerollAds();
    const urlAdsRef = useRef(urlAds);
    urlAdsRef.current = urlAds;

    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    useEffect(() => {
        handleNextCallbackRef.current = handleNextCallback;
    }, [handleNextCallback]);

    useEffect(() => {
        if (!isLoadedScriptJw || !listVideoData.length) {
            return;
        }

        const videoItems = listVideoData.filter(item => !get(item, 'isBanner'));
        if (!videoItems.length) return;

        const missingIds = videoItems
            .map(item => get(item, 'id'))
            .filter(
                id =>
                    id &&
                    !get(videoMetadata, [id]) &&
                    !metadataFallbackRef.current.has(id) &&
                    !metadataRequestedRef.current.has(id) &&
                    !metadataRetryTimersRef.current.has(id)
            );

        if (missingIds.length > 0) {
            missingIds.forEach(requestMetadataForId);
            return;
        }

        const activeItem = get(listVideoData, [currentIndex]);
        const activeVideoId = get(activeItem, 'id');
        const shouldWaitForHorizontalPreferredFile =
            variant === 'horizontal' &&
            activeVideoId &&
            !get(preferredVideoFiles, activeVideoId);

        if (shouldWaitForHorizontalPreferredFile) return;

        const playlist = buildPlaylist({
            videoItems,
            preferredVideoFiles,
            videoMetadata,
            variant
        });

        if (!playlist.length) return;

        open({
            playlist,
            fullListVideoData: listVideoData,
            variant,
            ownerKey: ownerKeyRef.current,
            index: currentIndex,
            urlAds: urlAdsRef.current,
            currentIndexRef,
            sentProgressRef,
            scrollerRef,
            handleNextCallback: () =>
                callFunction(handleNextCallbackRef.current)
        });
    }, [
        isLoadedScriptJw,
        listVideoData,
        metadataFallbackVersion,
        preferredVideoFiles,
        setVideoMetadata,
        variant,
        videoMetadata
    ]);

    useEffect(() => {
        goToIndex(currentIndex, listVideoData);
    }, [currentIndex, listVideoData]);

    useEffect(
        () => () => {
            mountedRef.current = false;
            metadataRetryTimersRef.current.forEach(timer =>
                clearTimeout(timer)
            );
            metadataRetryTimersRef.current.clear();
            close();
        },
        []
    );
}
