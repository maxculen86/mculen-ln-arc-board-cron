/* eslint-disable no-underscore-dangle */
import getProperties from 'fusion:properties';
import get from '../utils/get';

export const streamingAnalyticsInit = (
    arcSite = 'la-nacion-ar',
    tituloVideo = 'lanacion.com.ar'
) => {
    if (typeof window !== 'object' || typeof window.ns_ !== 'object') {
        // eslint-disable-next-line no-console
        return console.warn('El ns_ no esta definido', window.ns_);
    }

    const id = get(
        getProperties(arcSite),
        'scripts.Comscore.props.config.c2',
        ''
    );

    // eslint-disable-next-line no-underscore-dangle

    const { analytics } = window.ns_;

    analytics.PlatformApi.setPlatformAPI(
        analytics.PlatformApi.PlatformApis.WebBrowser
    );

    analytics.configuration.addClient(
        new analytics.configuration.PublisherConfiguration({
            publisherId: id
        })
    );

    // analytics.configuration.enableImplementationValidationMode();  //debug Mode // NOSONAR
    analytics.start();

    const StreamingAnalytics = new analytics.StreamingAnalytics();

    const contentMetadata = new analytics.StreamingAnalytics.ContentMetadata();
    contentMetadata.setDictionaryClassificationC3('LANACION.COM.AR');
    contentMetadata.setProgramTitle(tituloVideo);
    contentMetadata.getMetadataLabels();
    StreamingAnalytics.setMetadata(contentMetadata);
    StreamingAnalytics.createPlaybackSession();
    return StreamingAnalytics;
};

export const comscorePlayEvent = StreamingAnalytics => {
    typeof StreamingAnalytics === 'object' &&
        typeof StreamingAnalytics.notifyPlay === 'function' &&
        StreamingAnalytics.notifyPlay();
};

export default {
    streamingAnalyticsInit
};
