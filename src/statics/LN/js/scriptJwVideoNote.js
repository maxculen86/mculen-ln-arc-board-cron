import dynamicallyLoadScript from '../../../../components/private/LN/common/utils/dynamicallyLoadScript';
import {
    handleVideoEventsScript,
    getVerticalPlayer,
    buildTagsUrl
} from '../../../../components/private/common/videoPlayerJw/utils/helperJw';
import { addVideoDisplayEvent } from '../../../../components/private/common/utils/videoPlayerHelper';
import { setupVideoObserver } from '../../../../components/features/LN-10/videoPlayer/_helper';

const librariesPromises = new Map();

const loadLibrary = playerId => {
    if (!playerId) return Promise.resolve();

    const src = `https://cdn.jwplayer.com/libraries/${playerId}.js`;

    if (!librariesPromises.has(src)) {
        librariesPromises.set(src, dynamicallyLoadScript(src, 'body'));
    }

    return librariesPromises.get(src);
};

const getConfigFromElement = element => {
    const rawConfig = element.getAttribute('data-config');
    if (!rawConfig) return null;

    try {
        return JSON.parse(rawConfig);
    } catch (error) {
        console.error('JW Video Note: invalid config', error);
        return null;
    }
};

const buildInstanceConfig = ({
    playlist = [],
    hasAutoplay,
    tagsUrl,
    arcSite,
    playerId,
    autostart = true
}) => {
    const instanceConfig = {
        playlist: Array.isArray(playlist) ? playlist : [],
        autostart,
        mute: Boolean(hasAutoplay),
        width: '100%'
    };

    if (arcSite === 'foodit') {
        instanceConfig.related = null;
    }

    if (tagsUrl && playerId === 'ih0086X3') {
        instanceConfig.advertising = {
            client: 'googima',
            autoplayadsmuted: Boolean(hasAutoplay),
            schedule: [
                {
                    tag: tagsUrl,
                    offset: 'pre'
                }
            ]
        };
    }

    if (getVerticalPlayer(playerId)) {
        instanceConfig.fullscreenOrientationLock = 'portrait';
    }

    return instanceConfig;
};

const setupPlayerInstance = async ({ config, initialMode, facade }) => {
    const { playerId, mediaId, title, hasAutoplay, duration } = config || {};
    if (!playerId || !mediaId) return;

    await loadLibrary(playerId);
    const instance = window?.jwplayer?.(mediaId);
    if (!instance) return;

    const instanceConfig = buildInstanceConfig({
        playlist: config.playlist,
        hasAutoplay,
        tagsUrl: buildTagsUrl(config.tagsUrl || ''),
        arcSite: config.arcSite,
        playerId,
        autostart:
            typeof config.autostart === 'boolean' ? config.autostart : true
    });

    instance.setup(instanceConfig);

    if (facade) {
        facade.remove();
    }

    handleVideoEventsScript(
        title || '',
        mediaId,
        duration,
        initialMode,
        getVerticalPlayer(playerId) ? 'vertical' : 'horizontal'
    );
};

const attachManualHandler = (facade, initialize) => {
    if (facade) {
        const handleFacadeClick = () => {
            facade.removeEventListener('click', handleFacadeClick);
            initialize('manual');
        };

        facade.addEventListener('click', handleFacadeClick);
        return;
    }

    initialize('manual');
};

const handleEnterViewport = (config, initialize, facade) => {
    if (config.hasAutoplay) {
        setTimeout(() => initialize('autoplay'), 1000);
        return;
    }

    attachManualHandler(facade, initialize);
};

const bootstrapVideo = element => {
    if (element.dataset.jwInitialized === 'true') return;

    const config = getConfigFromElement(element);
    if (!config || !config.mediaId) return;

    const facade = document.getElementById(`facade-${config.mediaId}`);
    let hasInitialized = false;

    const initialize = initialMode => {
        if (hasInitialized) return;
        hasInitialized = true;
        setupPlayerInstance({
            config,
            initialMode,
            facade
        });
    };

    setupVideoObserver(element, (entry, observer) => {
        if (!entry.isIntersecting || hasInitialized) return;
        observer?.unobserve(element);
        handleEnterViewport(config, initialize, facade);
    });

    addVideoDisplayEvent({
        title: config.title || '',
        idVideo: config.mediaId
    });

    element.dataset.jwInitialized = 'true';
};

const init = () => {
    if (typeof window === 'undefined') return;

    const elements = document.querySelectorAll(
        '[data-has-jwplayer="true"][data-config]'
    );

    elements.forEach(bootstrapVideo);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
