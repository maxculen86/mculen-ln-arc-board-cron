import isSSR from './isSSR';
import { scheduleTask } from '../../../common/utils/scheduleTask';

//TODO: Eliminar funcion cuando se migren todos los usos al V2
const addEventToDataLayer = ({
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
    page_notification,
    identifier,
    contentType
} = {}) => {
    !isSSR() &&
        window.dataLayer &&
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
            ...(page_notification && { page_notification }),
            ...(identifier && { identifier })
        });
};

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
    page_notification,
    identifier,
    contentType
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
                ...(page_notification && { page_notification }),
                ...(identifier && { identifier })
            });
        });
    }
};

export default addEventToDataLayer;
