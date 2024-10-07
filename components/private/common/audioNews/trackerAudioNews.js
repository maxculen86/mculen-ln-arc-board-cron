import { addEventToDataLayerV2 } from '../../LN/common/utils/addEventToDataLayer';
import { checkUserRealoadAction } from '../utils/noteTracker/ctrTracker';

const checkExistenceInDataLayer = (layer, eventName) =>
    layer.some(elem => elem.event === eventName);

const eventHandler = ({ activeWindow, eventName, audioNewsActions }) => {
    const { dataLayer } = activeWindow;
    const sentEvent = checkExistenceInDataLayer(dataLayer, eventName);
    const refresh = checkUserRealoadAction(activeWindow);
    const event = addEventToDataLayerV2({
        event: eventName,
        rest: audioNewsActions
    });

    return !sentEvent && !refresh && event;
};

export default eventHandler;
