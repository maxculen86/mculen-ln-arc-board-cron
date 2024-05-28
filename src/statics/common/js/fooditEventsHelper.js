class FooditEventsHelper {
    constructor() {
        this.addEventToDataLayer = ({
            eventDataLayer,
            dynamicCategory,
            dynamicLabel,
            dynamicAction,
            button,
            id
        } = {}) =>
            eventDataLayer &&
            window.dataLayer &&
            window.dataLayer.push({
                event: eventDataLayer,
                ...(dynamicCategory && { dynamic_category: dynamicCategory }),
                ...(dynamicLabel && { dynamic_label: dynamicLabel }),
                ...(dynamicAction && { dynamic_action: dynamicAction }),
                ...(id && { nota_id_arc: id }),
                ...(button && { button })
            });
        this.addEventListeners = (element, payload, callback) => {
            const CLICK = 'click';
            const AUX_CLICK = 'auxclick';
            const defaultCallback = () => {
                this.addEventToDataLayer(payload);
            };

            if (element) {
                element.addEventListener(CLICK, callback || defaultCallback);
                element.addEventListener(
                    AUX_CLICK,
                    callback || defaultCallback
                );
            }
        };
    }

    setEventsInteraction() {
        const buttons = window.document.querySelectorAll(
            '[data-interaction="dataLayerInteraction"]'
        );
        buttons.forEach(button => {
            this.addEventListeners(button, button.dataset);
        });
    }
}

const handler = {
    construct(target, args) {
        const instance = new target(...args);

        // Crear un proxy para interceptar llamadas a métodos
        return new Proxy(instance, {
            get: function(target, property, receiver) {
                const origMethod = target[property];
                if (typeof origMethod === 'function') {
                    return function(...args) {
                        setTimeout(() => origMethod.apply(target, args), 0);
                    };
                }
                return Reflect.get(target, property, receiver);
            }
        });
    }
};

const ProxiedEventsHelper = new Proxy(FooditEventsHelper, handler);

window.LN = {
    ...window.LN,
    fooditEventsHelper: new ProxiedEventsHelper()
};
