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
    },
    pauseEvent: layer => {
        return layer.push({
            event: 'e_linkclick',
            dynamic_action: 'escuchar',
            dynamic_category: 'nota_ln9',
            dynamic_label: 'play'
        });
    },
    playEvent: layer => {
        return layer.push({
            event: 'e_linkclick',
            dynamic_action: 'escuchar',
            dynamic_category: 'nota_ln9',
            dynamic_label: 'play'
        });
    },
    backTenSecsEvent: layer => {
        return layer.push({
            event: 'e_linkclick',
            dynamic_action: 'escuchar',
            dynamic_category: 'nota_ln9',
            dynamic_label: 'retroceder_10'
        });
    },
    fowardTenSecEvent: layer => {
        return layer.push({
            event: 'e_linkclick',
            dynamic_action: 'escuchar',
            dynamic_category: 'nota_ln9',
            dynamic_label: 'adelantar_10'
        });
    },
    x1: layer => {
        return layer.push({
            event: 'e_linkclick',
            dynamic_action: 'escuchar',
            dynamic_category: 'nota_ln9',
            dynamic_label: 'velocidad_1'
        });
    },
    'x1.25': layer => {
        return layer.push({
            event: 'e_linkclick',
            dynamic_action: 'escuchar',
            dynamic_category: 'nota_ln9',
            dynamic_label: 'velocidad_1,25'
        });
    },
    'x1.5': layer => {
        return layer.push({
            event: 'e_linkclick',
            dynamic_action: 'escuchar',
            dynamic_category: 'nota_ln9',
            dynamic_label: 'velocidad_1,50'
        });
    },
    'x1.75': layer => {
        return layer.push({
            event: 'e_linkclick',
            dynamic_action: 'escuchar',
            dynamic_category: 'nota_ln9',
            dynamic_label: 'velocidad_1,75'
        });
    },
    x2: layer => {
        return layer.push({
            event: 'e_linkclick',
            dynamic_action: 'escuchar',
            dynamic_category: 'nota_ln9',
            dynamic_label: 'velocidad_2'
        });
    }
};

export default eventHandler;
