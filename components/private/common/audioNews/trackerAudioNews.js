import { checkUserRealoadAction } from '../utils/noteTracker/ctrTracker';

const checkExistenceInDataLayer = (layer, label) => {
    return layer.some(elem => {
        const { dynamic_label: dynamicLabel = '' } = elem;
        return dynamicLabel === label;
    });
};

const eventHandler = ({ activeWindow, action, eventLabel }) => {
    const { dataLayer } = activeWindow;
    const sentEvent = checkExistenceInDataLayer(dataLayer, eventLabel);
    const refresh = checkUserRealoadAction(activeWindow);

    return !sentEvent && !refresh && audioNewsActions[action](dataLayer);
};

const audioNewsActions = {
    listenButton: layer => {
        return layer.push({
            event: 'e_linkclick',
            dynamic_action: 'escuchar',
            dynamic_category: 'nota_ln9',
            dynamic_label: 'escuchar'
        });
    }
};

export default eventHandler;
