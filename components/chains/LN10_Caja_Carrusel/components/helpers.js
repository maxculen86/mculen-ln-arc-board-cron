import React from 'react';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import get from '../../../private/common/utils/get';
import { hasValidationFailed } from '../../LN10_Caja_Segmentada/_helpers';

export const registeredIdsSetAndInteractions = new Set();

const normalizeVideoId = videoId =>
    typeof videoId === 'string' ? videoId.trim() : videoId;

export const handleEventSwipeVideo = ({
    videoIdObserved = '',
    videoTitle = ''
}) => {
    if (
        !registeredIdsSetAndInteractions ||
        registeredIdsSetAndInteractions.has(videoIdObserved)
    ) {
        return;
    }

    registeredIdsSetAndInteractions.add(videoIdObserved);

    if (registeredIdsSetAndInteractions.size > 2) {
        addEventToDataLayerV2({
            event: 'video_view',
            contentType: 'video_story',
            origin: 'video_story',
            rest: {
                page_title: videoTitle,
                id_video: videoIdObserved
            }
        });
    }
};

// TODO: Utilizar components/private/LN/common/utils/dynamicallyLoadScript.js, agregando mejora que pueda ser async y que use getElementsByTagName
export const isScriptLoaded = id => {
    const scripts = Array.from(document.getElementsByTagName('script'));
    return scripts.some(script =>
        script.src.includes(`cdn.jwplayer.com/libraries/${id}`)
    );
};

export const transformNodes = ({
    children,
    isAdmin,
    childProps = [],
    isExpanded = false,
    bannerRef
}) => {
    let counterVideos = 0;
    return childProps.reduce((acc, properties, index) => {
        const { video, title } = get(properties, 'customFields', {});
        const type = get(properties, 'type', 'LN-10/itemCarrusel');
        const isBanner = type === 'LN-common/bannerRefactor';
        const child = children[index];
        counterVideos += isBanner ? 0 : 1;
        const videoId = normalizeVideoId(video);

        const newChildren = {
            id: isBanner ? null : videoId,
            title: isBanner ? null : title,
            type,
            counterVideo: counterVideos,
            isBanner,
            node:
                !isAdmin &&
                !isExpanded &&
                // Evitamos renderizar el nodo del banner en el carrusel para evitar el llamado al adserver cuando el banner aun no es visible.
                // Se manda un div con una referencia para respetar la misma posición de cada item del carrusel
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
