/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import isSSR from './isSSR';
import { scheduleTask } from '../../../common/utils/scheduleTask';

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
                ...(event && { event }),
                ...(action && { dynamic_action: action }),
                ...(category && { dynamic_category: category }),
                ...(label && { dynamic_label: label }),
                ...(title && { title }),
                ...(articleId && { nota_id_arc: articleId }),
                ...(type && { type }),
                ...(contentType && { content_type: contentType }),
                ...(detail && { detail }),
                ...(code && { code }),
                ...(button && { button }),
                ...(notificationsCategory && {
                    notifications_category: notificationsCategory
                }),
                ...(identifier && { identifier }),
                ...(pageNotification && {
                    page_notification: pageNotification
                }),
                ...(identifier && { identifier }),
                ...(origin && { origin }),
                ...(videoName && { videoName }),
                ...(videoID && { videoID }),
                ...(ctr_brand && { ctr_brand }),
                ...(ctr_position && { ctr_position }),
                ...(rest && { ...rest })
            });
        });
    }
};
