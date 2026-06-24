/* eslint-disable camelcase */
import isSSR from './isSSR';
import { scheduleTask } from '../../../common/utils/scheduleTask';

const withValue = (key, value) => (value ? { [key]: value } : {});

export const addEventToDataLayerV2 = ({
    category,
    label,
    action,
    event,
    title,
    articleId,
    type,
    detail,
    code,
    notificationsCategory,
    button,
    page_notification: pageNotification,
    identifier,
    contentType,
    rest = {},
    origin,
    videoName,
    videoID,
    ctr_brand,
    ctr_position
} = {}) => {
    if (!isSSR() && window.dataLayer) {
        scheduleTask(() => {
            window.dataLayer.push({
                ...withValue('event', event),
                ...withValue('dynamic_action', action),
                ...withValue('dynamic_category', category),
                ...withValue('dynamic_label', label),
                ...withValue('title', title),
                ...withValue('nota_id_arc', articleId),
                ...withValue('type', type),
                ...withValue('content_type', contentType),
                ...withValue('detail', detail),
                ...withValue('code', code),
                ...withValue('button', button),
                ...withValue('notifications_category', notificationsCategory),
                ...withValue('identifier', identifier),
                ...withValue('page_notification', pageNotification),
                ...withValue('origin', origin),
                ...withValue('videoName', videoName),
                ...withValue('videoID', videoID),
                ...withValue('ctr_brand', ctr_brand),
                ...withValue('ctr_position', ctr_position),
                ...rest
            });
        });
    }
};
