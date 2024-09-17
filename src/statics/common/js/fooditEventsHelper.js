import { addEventToDataLayerV2 } from '../../../../components/private/LN/common/utils/addEventToDataLayer';

class FooditEventsHelper {
    constructor() {
        this.addEventListeners = (element, payload, callback) => {
            const CLICK = 'click';
            const AUX_CLICK = 'auxclick';
            const defaultCallback = () => {
                addEventToDataLayerV2(payload);
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
