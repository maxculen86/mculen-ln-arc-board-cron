import isSSR from './isSSR';

const addEventToDataLayer = ({
    category,
    label,
    action,
    event,
    title,
    articleId
} = {}) => {
    !isSSR() &&
        window.dataLayer &&
        window.dataLayer.push({
            ...(event && { event }),
            ...(action && { dynamic_action: action }),
            ...(category && { dynamic_category: category }),
            ...(label && { dynamic_label: label }),
            ...((title && { title }) || {}),
            ...((articleId && { nota_id_arc: articleId }) || {})
        });
};

export default addEventToDataLayer;
