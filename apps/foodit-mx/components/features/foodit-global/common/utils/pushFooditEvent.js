import isSSR from '../../../../private/LN/common/utils/isSSR';
import { scheduleTask } from '../../../../private/common/utils/scheduleTask';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import { isMobileWebView } from './isMobileWebView';
import { parseAppEvent } from './parseAppEvent';

export const pushFooditEvent = (eventData = {}) => {
    if (isSSR()) return;

    if (isMobileWebView()) {
        const eventDataToPush = { ...eventData };

        if (eventDataToPush.event === 'page_view') {
            eventDataToPush.page_title = document?.title || '';
            eventDataToPush.page_location = window?.location?.pathname || '';
            eventDataToPush.origin = document?.referrer || 'n/a';
        }

        const { event, eventJsonData } = parseAppEvent(eventDataToPush);
        scheduleTask(() => {
            window?.mobileWebView?.logEvent(event, eventJsonData);
        });
    } else {
        addEventToDataLayerV2(eventData);
    }
};
