import isSSR from './isSSR';

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
    notificationsCategory
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
            ...(detail && { detail }),
            ...(code && { code }),
            ...(notificationsCategory && {
                notifications_category: notificationsCategory
            })
        });
};

export default addEventToDataLayer;
