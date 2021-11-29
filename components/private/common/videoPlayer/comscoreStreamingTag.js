import getProperties from 'fusion:properties';
import get from '../utils/get';

export const streamingAnalyticsInit = (arcSite = 'la-nacion-ar') => {
    const id = get(
        getProperties(arcSite),
        'scripts.Comscore.props.config.c2',
        ''
    );
    const analytics = ns_.analytics;
    analytics.PlatformApi.setPlatformAPI(
        analytics.PlatformApi.PlatformApis.WebBrowser
    );
    analytics.configuration.addClient(
        new analytics.configuration.PublisherConfiguration({
            publisherId: id
        })
    );
    // debug comscore function analytics.configuration.enableImplementationValidationMode();   // NOSONAR
    analytics.start();

    const StreamingAnalytics = new analytics.StreamingAnalytics();
    StreamingAnalytics.createPlaybackSession();
    return StreamingAnalytics;
};

export const comscorePlayEvent = StreamingAnalytics => {
    console.warn('NotifyPlay');
    typeof StreamingAnalytics === 'object' &&
        typeof StreamingAnalytics.notifyPlay === 'function' &&
        StreamingAnalytics.notifyPlay();
};

export default {
    streamingAnalyticsInit,
    comscorePlayEvent
};
