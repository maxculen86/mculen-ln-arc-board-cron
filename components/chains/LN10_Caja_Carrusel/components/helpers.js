import React from 'react';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import get from '../../../private/common/utils/get';
import { hasValidationFailed } from '../../LN10_Caja_Segmentada/_helpers';

let lastTrackedId = '';

export const resetTracking = () => {
    lastTrackedId = '';
};

const normalizeVideoId = videoId =>
    typeof videoId === 'string' ? videoId.trim() : videoId;

export const handleEventSwipeVideo = ({
    videoIdObserved = '',
    videoTitle = '',
    origin = '',
    roofData = {}
}) => {
    const { title, hideRoof } = roofData;
    if (!videoIdObserved || videoIdObserved === lastTrackedId) {
        return;
    }

    lastTrackedId = videoIdObserved;

    addEventToDataLayerV2({
        event: 'video_view',
        contentType: 'video_story',
        rest: {
            page_title: videoTitle,
            id_video: videoIdObserved,
            origin,
            category_video: !title || hideRoof ? 'No tiene' : title
        }
    });
};

export const isScriptLoaded = id => {
    const scripts = Array.from(document.getElementsByTagName('script'));
    return scripts.some(script =>
        script.src?.includes(`cdn.jwplayer.com/libraries/${id}`)
    );
};

export const transformNodes = ({
    children,
    isAdmin,
    childProps = [],
    isExpanded = false,
    bannerRef,
    layoutType = '',
    roofData
}) => {
    let counterVideos = 0;
    const mediaOccurrences = new Map();
    return childProps.reduce((acc, properties, index) => {
        const { video, title } = get(properties, 'customFields', {});
        const type = get(properties, 'type', 'LN-10/itemCarrusel');
        const isBanner = type === 'LN-common/bannerRefactor';
        const child = children[index];
        counterVideos += isBanner ? 0 : 1;
        const videoId = normalizeVideoId(video);
        const occurrence = mediaOccurrences.get(videoId) || 0;
        if (!isBanner && videoId) {
            mediaOccurrences.set(videoId, occurrence + 1);
        }
        let renderKey;
        if (isBanner) {
            renderKey = JSON.stringify(['banner', index]);
        } else if (videoId) {
            renderKey = JSON.stringify(['media', videoId, occurrence]);
        } else {
            renderKey = JSON.stringify(['missing-media', index]);
        }

        const newChildren = {
            id: isBanner ? null : videoId,
            key: renderKey,
            renderKey,
            title: isBanner ? null : title,
            type,
            counterVideo: counterVideos,
            isBanner,
            origin: layoutType,
            roofData,
            node:
                !isAdmin &&
                !isExpanded &&
                type === 'LN-common/bannerRefactor' ? (
                    <div ref={bannerRef} id="bannerRoot" />
                ) : (
                    child
                )
        };

        if (acc.length < 20) {
            acc.push(newChildren);
        }

        return acc;
    }, []);
};

export const getAdsConfigVideoJw = ({
    adsUrl = '',
    customValidation = false
} = {}) => {
    if (adsUrl && customValidation) {
        return {
            advertising: {
                client: 'googima',
                schedule: [
                    {
                        tag: adsUrl,
                        offset: 'pre'
                    }
                ]
            },
            intl: {
                en: {
                    advertising: {
                        admessage: 'El video empezará en xx segúndos',
                        cuetext: 'Publicidad',
                        skipmessage: 'Saltar aviso en xx segúndos'
                    },
                    related: {
                        autoplaymessage: '',
                        heading: 'More Videos'
                    }
                }
            }
        };
    }
    return {};
};

export const shouldHideCarrusel = ({
    isAdmin,
    error,
    hideCarousel,
    enabledDays,
    shouldSchedule
}) => {
    if (isAdmin && error) return { hide: false, error: true };

    if (hideCarousel) return { hide: true, error: false };

    const schedulingEnabled = shouldSchedule && !isAdmin;

    if (schedulingEnabled) {
        const failedValidation = hasValidationFailed({
            isAdmin,
            hideCaja: hideCarousel,
            enabledDays,
            termica: true,
            configError: error,
            token: true,
            shouldSchedule
        });

        if (failedValidation) return { hide: true, error: false };
    }

    return { hide: false, error: false };
};
