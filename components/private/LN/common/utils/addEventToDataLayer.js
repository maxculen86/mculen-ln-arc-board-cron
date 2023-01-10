import isSSR from './isSSR';

const addEventToDataLayer = ({ category, label, action, event } = {}) => {
    !isSSR() &&
        window.dataLayer &&
        window.dataLayer.push({
            ...(event && { event }),
            ...(action && { dynamic_action: action }),
            ...(category && { dynamic_category: category }),
            ...(label && { dynamic_label: label })
        });
};

export default addEventToDataLayer;
